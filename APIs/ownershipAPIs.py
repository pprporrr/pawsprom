from fastapi import APIRouter, Request
from APIs.dbConnector import DBConnector, get_db_connector

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

@router.post("/ownership/", response_model=dict)
async def create_pet_ownership(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        pet_petID = data.get("petID")
        user_userID = data.get("userID")
        adoptionDate = data.get("adoptionDate")
        
        if None in (pet_petID, user_userID):
            return create_error_response("missing required fields")
        
        query = "INSERT INTO petOwnership (pet_petID, user_userID, adoptionDate) VALUES (%s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (pet_petID, user_userID, adoptionDate))
        
        query = "SELECT * FROM petOwnership WHERE ownershipID = LAST_INSERT_ID()"
        result = await db_connector.execute_query(query)
        
        if not result:
            return create_error_response("failed to create pet ownership record")
        
        return create_success_response("created pet ownership record")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/ownership/", response_model=dict)
async def read_pet_ownership_details(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        ownershipID = data.get("ownershipID")
        
        if ownershipID is None:
            return create_error_response("missing 'ownershipID' in the request data")
        
        query = "SELECT * FROM petOwnership WHERE ownershipID = %s"
        result = await db_connector.execute_query(query, ownershipID)
        
        if not result:
            return create_error_response("pet ownership record not found")
        
        ownershipDetails = {
            "ownershipID": result[0][0],
            "petID": result[0][1],
            "userID": result[0][2],
            "adoptionDate": result[0][3].isoformat() if result[0][3] else None,
        }
        
        return create_success_response(ownershipDetails)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/ownership/", response_model=dict)
async def update_pet_ownership(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        ownershipID = data.get("ownershipID")
        pet_petID = data.get("petID")
        user_userID = data.get("userID")
        adoptionDate = data.get("adoptionDate")
        
        if None in (ownershipID, pet_petID, user_userID):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM petOwnership WHERE ownershipID = %s"
        result = await db_connector.execute_query(query, ownershipID)
        
        if not result:
            return create_error_response("pet ownership record not found")
        
        query = "UPDATE petOwnership SET pet_petID = %s, user_userID = %s, adoptionDate = %s WHERE ownershipID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (pet_petID, user_userID, adoptionDate, ownershipID))
        
        return create_success_response("pet ownership record updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/ownership/", response_model=dict)
async def delete_pet_ownership(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        ownershipID = data.get("ownershipID")
        
        if ownershipID is None:
            return create_error_response("missing 'ownershipID' in the request data")
        
        query = "SELECT * FROM petOwnership WHERE ownershipID = %s"
        result = await db_connector.execute_query(query, ownershipID)
        
        if not result:
            return create_error_response("pet ownership record not found")
        
        query = "DELETE FROM petOwnership WHERE ownershipID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, ownershipID)
        
        return create_success_response("pet ownership record deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()