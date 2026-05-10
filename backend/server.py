from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=6, max_length=30)
    message: str = Field(min_length=1, max_length=2000)

    @field_validator("name")
    @classmethod
    def _strip_name(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name is required")
        return v

    @field_validator("phone")
    @classmethod
    def _validate_phone(cls, v: str) -> str:
        v = v.strip()
        if not re.fullmatch(r"[\d\s()+\-]{6,30}", v):
            raise ValueError("Please enter a valid phone number")
        return v

    @field_validator("message")
    @classmethod
    def _validate_word_count(cls, v: str) -> str:
      words = [w for w in re.split(r"\s+", v.strip()) if w]
    # 50 words ki limit hata kar 1 kar di hai taaki testing asaan ho
      if len(words) < 1 or len(words) > 100:
         raise ValueError("Message must be between 1 and 100 words")
      return v.strip()


class LeadOut(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    name: str
    phone: str
    message: str
    timestamp: datetime
    synced_to_sheet: bool = False


# ---------- Helpers ----------
def _forward_to_google_sheet(payload: dict) -> bool:
    """Fire-and-forget POST to a Google Apps Script Web App URL.
    Returns True if the Apps Script replied 2xx, False otherwise.
    """
    url = os.environ.get("GOOGLE_APPS_SCRIPT_URL").strip()
  
    if not url:
        return False
    try:
        r = requests.post(url, json=payload, timeout=8)
      
        return r.status_code // 100 == 2
    except Exception as e:
        logging.getLogger(__name__).warning("Apps Script forward failed: %s", e)
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/leads", response_model=LeadOut)
async def create_lead(lead: LeadCreate):
    now = datetime.now(timezone.utc)
    lead_id = str(uuid.uuid4())
    doc = {
        "id": lead_id,
        "name": lead.name,
        "phone": lead.phone,
        "message": lead.message,
        "timestamp": now.isoformat(),
        "synced_to_sheet": False,
    }

    # Try forwarding to Google Sheet first (non-blocking via thread).
    synced = await asyncio.to_thread(
        _forward_to_google_sheet,
        {
            "id": lead_id,
            "timestamp": now.isoformat(),
            "name": lead.name,
            "phone": lead.phone,
            "message": lead.message,
        },
    )
    doc["synced_to_sheet"] = synced

    await db.leads.insert_one(doc.copy())

    return LeadOut(
        id=lead_id,
        name=lead.name,
        phone=lead.phone,
        message=lead.message,
        timestamp=now,
        synced_to_sheet=synced,
    )


@api_router.get("/leads", response_model=List[LeadOut])
async def list_leads(limit: int = 100):
    rows = await db.leads.find({}, {"_id": 0}).sort("timestamp", -1).to_list(limit)
    out: List[LeadOut] = []
    for r in rows:
        ts = r.get("timestamp")
        if isinstance(ts, str):
            ts = datetime.fromisoformat(ts)
        out.append(
            LeadOut(
                id=r["id"],
                name=r["name"],
                phone=r["phone"],
                message=r["message"],
                timestamp=ts,
                synced_to_sheet=bool(r.get("synced_to_sheet", False)),
            )
        )
    return out


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
