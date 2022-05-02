from fastapi import APIRouter, Depends, status, Response, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import db
from . import schema
from . import services
from . import validation
from app.core import security
from app.user import validation as user_validation, services as user_services , schema as user_schema
from app.catalog import validation as catalog_validation

api_router = APIRouter(tags = ["Booking"])

@api_router.get('/booking/{id}', response_model = schema.Booking)
async def get_booking_by_id(id: int, db_session: Session = Depends(db.get_db_session)):
    booking_info = await services.get_booking_by_id(id, db_session)
    if not booking_info:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking(s) not found")

    return booking_info

@api_router.get('/booking/flight/{idflight}', response_model = List[schema.Booking])
async def get_bookings_by_idflight(idflight: int, db_session: Session = Depends(db.get_db_session)):
    existingflight = await catalog_validation.verify_flight_exist(idflight, db_session)
    if not existingflight:
        raise HTTPException(status_code=404, detail="Non-existent flight")
    
    bookings = await services.get_bookings_by_idflight(idflight, db_session)
    if not bookings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking(s) not found")

    return bookings

@api_router.get('/booking/', response_model = List[schema.Booking])
async def get_bookings_by_status_and_customername(status: Optional[schema.BookingStatus] = None, customername: Optional[str] = None, db_session: Session = Depends(db.get_db_session)):
    if customername:
        existinguser = await user_validation.verify_fullname_exist(customername, db_session)
        if not existinguser:
            raise HTTPException(status_code=404, detail = "Non-existent user")
    bookings = await services.get_bookings_by_status_and_customername(status,customername, db_session)
    if not bookings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking(s) not found")

    return bookings

@api_router.post("/booking/flight/{idflight}/user/{iduser}", status_code = status.HTTP_201_CREATED)
async def create_booking(idflight: int, iduser: int, booking_in: schema.BookingCreate, db_session: Session = Depends(db.get_db_session),
                         current_user: user_schema.User = Depends(security.get_current_user)):
    existingflight = await catalog_validation.verify_flight_exist(idflight, db_session)
    if not existingflight:
        raise HTTPException(status_code=404, detail="Non-existent flight")
    
    existinguser = await user_services.get_user_by_id(iduser, db_session)
    if not existinguser:
        raise HTTPException(status_code=404, detail = "Non-existent user")

    existingreference = await validation.verify_bookingreference_exist(booking_in.bookingReference, db_session)
    if existingreference:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The booking with this reference already exists in the system.")

    new_booking = await services.create_new_booking(idflight, iduser, booking_in, db_session)
    return new_booking

@api_router.delete("/booking/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_booking(id: int, db_session: Session = Depends(db.get_db_session),
                         current_user: user_schema.User = Depends(security.get_current_user)):
    existingbooking = await services.get_booking_by_id(id, db_session)
    if not existingbooking:
        raise HTTPException(status_code=404, detail="Non-existent booking")
    
    return await services.delete_booking_by_id(id, db_session)
