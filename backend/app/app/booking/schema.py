from pydantic import BaseModel, constr
from datetime import datetime
from enum import Enum
from typing import Optional

from app.catalog.schema import Flight
from app.user.schema import User

#BookingStatus schema
class BookingStatus(str, Enum):
    UNCONFIRMED = 'UNCONFIRMED'
    CONFIRMED = 'CONFIRMED'
    CANCELLED = 'CANCELLED'


#Booking schema
class BookingBase(BaseModel):
    status: BookingStatus = None
    paymentToken: str
    checkedIn: bool = False
    createdAt: datetime
    bookingReference: constr(max_length=40)

class BookingCreate(BookingBase):
    pass

class BookingInDBBase(BookingBase):
    id: int
    flight: Flight
    customer: User
    class Config:
        orm_mode = True

class Booking(BookingInDBBase):
    pass

class BookingInDB(BookingInDBBase):
    pass


