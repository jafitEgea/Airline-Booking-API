from fastapi import APIRouter, Depends, status, Response, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date

from app.database import db
from . import schema
from . import services
from . import validation
from app.core import security
from app.user import schema as user_schema

api_router = APIRouter(tags = ["Catalog"])

#Endpoint solo de ayuda. Eliminar en caso del despliegue
@api_router.get("/catalog/all", response_model = List[schema.Flight])
async def get_all_flights(db_session: Session = Depends(db.get_db_session)):
    return await services.get_all_flights(db_session)

@api_router.get("/catalog/", response_model=List[schema.Flight])
async def get_flights(departureAirportCode: str, arrivalAirportCode: str, departureDate: date, db_session: Session = Depends(db.get_db_session)):
    flights = await services.get_flights(departureAirportCode,arrivalAirportCode,departureDate,db_session)
    if not flights:
        raise HTTPException(status_code=404, detail="flight(s) not found")

    return flights

@api_router.get("/catalog/{airportCode}", response_model=List[schema.Flight])
async def get_flights_by_airportcode_and_departuredate(airportCode: str, departureDate: Optional[date] = None, db_session: Session = Depends(db.get_db_session)):
    flights = await services.get_flights_by_departureairportcode_and_departuredate(airportCode,departureDate,db_session)
    if not flights:
        raise HTTPException(status_code=404, detail="flight(s) not found")

    return flights

@api_router.post("/catalog/", status_code = status.HTTP_201_CREATED)
async def create_flight(flight_in: schema.FlightCreate, db_session: Session = Depends(db.get_db_session),
                        current_user: user_schema.User = Depends(security.get_current_user)):
    new_flight = await services.create_new_flight(flight_in, db_session = db_session)
    return new_flight

@api_router.put('/catalog/{id}', status_code = status.HTTP_201_CREATED)
async def update_flight(id: int, flight: schema.FlightUpdate, db_session: Session = Depends(db.get_db_session),
                        current_user: user_schema.User = Depends(security.get_current_user)):
    existingflight = await validation.verify_flight_exist(id, db_session)
    if not existingflight:
        raise HTTPException(status_code=404, detail="Non-existent flight")
    
    new_flight = await services.update_flight(id, flight, db_session)
    return new_flight

@api_router.delete("/catalog/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_flight(id: int, db_session: Session = Depends(db.get_db_session),
                        current_user: user_schema.User = Depends(security.get_current_user)):
    existingflight = await validation.verify_flight_exist(id, db_session)
    if not existingflight:
        raise HTTPException(status_code=404, detail="Non-existent flight")
    
    return await services.delete_flight(id, db_session)