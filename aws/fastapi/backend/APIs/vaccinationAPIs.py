from fastapi import APIRouter, Request
from APIs.dbConnector import DBConnector, get_db_connector

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

###########################CRUD###########################

@router.post("/vaccination/", response_model=dict)
async def create_pet_vaccination(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        pet_petID = data.get("petID")
        vaccinationName = data.get("vaccinationName")
        vaccinationDate = data.get("vaccinationDate")
        
        if None in (pet_petID, vaccinationName, vaccinationDate):
            return create_error_response("missing required fields")
        
        createVaccineQuery = "INSERT INTO petVaccinations (pet_petID, vaccinationName, vaccinationDate) VALUES (%s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(createVaccineQuery, (pet_petID, vaccinationName, vaccinationDate))
        
        checkVaccineQuery = "SELECT * FROM petVaccinations WHERE vaccinationID = LAST_INSERT_ID()"
        checkVaccineResult = await db_connector.execute_query(checkVaccineQuery)
        
        if not checkVaccineResult:
            return create_error_response("failed to create pet vaccination record")
        
        return create_success_response("created pet vaccination record")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/vaccination/", response_model=dict)
async def get_pet_vaccination_details(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        vaccinationID = data.get("vaccinationID")
        
        if vaccinationID is None:
            return create_error_response("missing 'vaccinationID' in the request data")
        
        getVaccineQuery = "SELECT * FROM petVaccinations WHERE vaccinationID = %s"
        getVaccineResult = await db_connector.execute_query(getVaccineQuery, vaccinationID)
        
        if not getVaccineResult:
            return create_error_response("pet vaccination record not found")
        
        vaccinationDetails = {
            "vaccinationID": getVaccineResult[0][0],
            "pet_petID": getVaccineResult[0][1],
            "vaccinationName": getVaccineResult[0][2],
            "vaccinationDate": getVaccineResult[0][3].isoformat()
        }
        
        return create_success_response(vaccinationDetails)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/vaccination/", response_model=dict)
async def update_pet_vaccination(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        vaccinationID = data.get("vaccinationID")
        pet_petID = data.get("petID")
        vaccinationName = data.get("vaccinationName")
        vaccinationDate = data.get("vaccinationDate")
        
        if None in (vaccinationID, pet_petID, vaccinationName, vaccinationDate):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM petVaccinations WHERE vaccinationID = %s"
        result = await db_connector.execute_query(query, vaccinationID)
        
        if not result:
            return create_error_response("pet vaccination record not found")
        
        query = "UPDATE petVaccinations SET pet_petID = %s, vaccinationName = %s, vaccinationDate = %s " \
                "WHERE vaccinationID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (pet_petID, vaccinationName, vaccinationDate, vaccinationID))
        
        return create_success_response("pet vaccination record updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/vaccination/", response_model=dict)
async def delete_pet_vaccination(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        vaccinationID = data.get("vaccinationID")
        
        if vaccinationID is None:
            return create_error_response("missing 'vaccinationID' in the request data")
        
        query = "SELECT * FROM petVaccinations WHERE vaccinationID = %s"
        result = await db_connector.execute_query(query, vaccinationID)
        
        if not result:
            return create_error_response("pet vaccination record not found")
        
        query = "DELETE FROM petVaccinations WHERE vaccinationID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, vaccinationID)
        
        return create_success_response("pet vaccination record deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()