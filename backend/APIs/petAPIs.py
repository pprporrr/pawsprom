from fastapi import APIRouter, Request
from typing import List
from APIs.dbConnector import DBConnector, get_db_connector

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

@router.post("/pet/", response_model=dict)
async def create_pet(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petName = data.get("petName")
        species = data.get("species")
        breed = data.get("breed")
        age = data.get("age")
        gender = data.get("gender")
        weight = data.get("weight")
        color = data.get("color")
        dateofbirth = data.get("dateofbirth")
        availabilityStatus = data.get("availabilityStatus")
        description = data.get("description")
        shelters_shelterID = data.get("shelterID")
        
        if None in (petName, species, breed, age, gender, weight, color, dateofbirth, availabilityStatus):
            return create_error_response("missing required fields")
        
        query = "INSERT INTO pet (petName, species, breed, age, gender, weight, color, dateofbirth, description, " \
                "availabilityStatus, shelters_shelterID) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (petName, species, breed, age, gender, weight, color, dateofbirth,
                                             description, availabilityStatus, shelters_shelterID))
        
        query = "SELECT * FROM pet WHERE petID = LAST_INSERT_ID()"
        result = await db_connector.execute_query(query)
        
        if not result:
            return create_error_response("failed to create pet")
        
        return create_success_response("pet created")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/pet/list/", response_model=dict)
async def read_pet_details_list(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        limit = data.get("limitNumber")
        
        if limit is None:
            return create_error_response("missing 'limitNumber' in the request data")
        
        try:
            limit = int(limit)
        except ValueError:
            return create_error_response("'limitNumber' must be an integer")
        
        query = "SELECT * FROM pet LIMIT %s"
        results = await db_connector.execute_query(query, limit)
        
        pets = []
        
        if not results:
            return create_error_response("pet not found")
        
        for result in results:
            petDetails = {
            "petID": result[0],
            "petName": result[1],
            "species": result[2],
            "breed": result[3],
            "age": result[4],
            "gender": result[5],
            "weight": result[6],
            "color": result[7],
            "dateofbirth": result[8].isoformat(),
            "description": result[9],
            "availabilityStatus": result[10],
            "shelters_shelterID": result[11]
            }
            pets.append(petDetails)
        
        return create_success_response(pets)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/pet/list_in_shelter/", response_model=dict)
async def read_pet_details_list(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        shelters_shelterID = data.get("shelterID")
        
        if shelters_shelterID is None:
            return create_error_response("missing 'shelterID' in the request data")
        
        query = "SELECT * FROM pet WHERE shelters_shelterID = %s"
        results = await db_connector.execute_query(query, shelters_shelterID)
        
        pets = []
        
        if not results:
            return create_error_response("pet not found")
        
        for result in results:
            petDetails = {
            "petID": result[0],
            "petName": result[1],
            "species": result[2],
            "breed": result[3],
            "age": result[4],
            "gender": result[5],
            "weight": result[6],
            "color": result[7],
            "dateofbirth": result[8].isoformat(),
            "description": result[9],
            "availabilityStatus": result[10],
            "shelters_shelterID": result[11]
            }
            pets.append(petDetails)
        
        return create_success_response(pets)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/pet/", response_model=dict)
async def update_pet(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petID = data.get("petID")
        petName = data.get("petName")
        species = data.get("species")
        breed = data.get("breed")
        age = data.get("age")
        gender = data.get("gender")
        weight = data.get("weight")
        color = data.get("color")
        dateofbirth = data.get("dateofbirth")
        description = data.get("description")
        
        if None in (petName, species, breed, age, gender, weight, color, dateofbirth):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM pet WHERE petID = %s"
        result = await db_connector.execute_query(query, petID)
        
        if not result:
            return create_error_response("pet not found")
        
        query = "UPDATE pet SET petName = %s, species = %s, breed = %s, age = %s, gender = %s, weight = %s, " \
                "color = %s, dateofbirth = %s, description = %s " \
                "WHERE petID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (petName, species, breed, age, gender, weight, color, dateofbirth, description, petID))
        
        return create_success_response("pet updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/pet/update_status/", response_model=dict)
async def update_pet_status(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petID = data.get("petID")
        availabilityStatus = data.get("availabilityStatus")
        
        if availabilityStatus is None:
            return create_error_response("missing 'availabilityStatus' in the request data")
        
        query = "SELECT * FROM pet WHERE petID = %s"
        result = await db_connector.execute_query(query, petID)
        
        if not result:
            return create_error_response("pet not found")
        
        query = "UPDATE pet SET availabilityStatus = %s WHERE petID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (availabilityStatus, petID))
        
        return create_success_response("pet status updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/pet/", response_model=dict)
async def delete_pet(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petID = data.get("petID")
        
        if petID is None:
            return create_error_response("missing 'petID' in the request data")
        
        query = "SELECT * FROM pet WHERE petID = %s"
        result = await db_connector.execute_query(query, petID)
        
        if not result:
            return create_error_response("pet not found")
        
        query = "DELETE FROM pet WHERE petID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, petID)
        
        return create_success_response("pet deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()