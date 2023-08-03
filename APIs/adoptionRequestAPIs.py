from fastapi import APIRouter, Request
from APIs.dbConnector import DBConnector, get_db_connector

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

@router.post("/adoptionrequest/", response_model=dict)
async def create_adoption_request(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        pet_petID = data.get("petID")
        user_userID = data.get("userID")
        requestStatus = data.get("requestStatus")
        requestDate = data.get("requestDate")
        
        if None in (pet_petID, user_userID, requestStatus, requestDate):
            return create_error_response("missing required fields")
        
        query = "INSERT INTO adoptionRequest (pet_petID, user_userID, requestStatus, requestDate) VALUES (%s, %s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (pet_petID, user_userID, requestStatus, requestDate))
        
        query = "SELECT * FROM adoptionRequest WHERE requestID = LAST_INSERT_ID()"
        result = await db_connector.execute_query(query)
        
        if not result:
            return create_error_response("failed to create adoption request")
        
        return create_success_response("created adoption request")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/adoptionrequest/", response_model=dict)
async def read_adoption_request_details(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        requestID = data.get("requestID")
        
        if requestID is None:
            return create_error_response("missing 'requestID' in the request data")
        
        query = "SELECT * FROM adoptionRequest WHERE requestID = %s"
        result = await db_connector.execute_query(query, requestID)
        
        if not result:
            return create_error_response("adoption request not found")
        
        requestDetails = {
            "requestID": result[0][0],
            "petID": result[0][1],
            "userID": result[0][2],
            "requestStatus": result[0][3],
            "requestDate": result[0][4].isoformat()
        }
        
        return create_success_response(requestDetails)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/adoptionrequest/", response_model=dict)
async def update_adoption_request(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        requestID = data.get("requestID")
        requestStatus = data.get("requestStatus")
        
        if None in (requestID, requestStatus):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM adoptionRequest WHERE requestID = %s"
        result = await db_connector.execute_query(query, requestID)
        
        if not result:
            return create_error_response("adoption request not found")
        
        query = "UPDATE adoptionRequest SET requestStatus = %s WHERE requestID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (requestStatus, requestID))
        
        return create_success_response("adoption request updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/adoptionrequest/", response_model=dict)
async def delete_adoption_request(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        requestID = data.get("requestID")
        
        if requestID is None:
            return create_error_response("missing 'requestID' in the request data")
        
        query = "SELECT * FROM adoptionRequest WHERE requestID = %s"
        result = await db_connector.execute_query(query, requestID)
        
        if not result:
            return create_error_response("adoption request not found")
        
        query = "DELETE FROM adoptionRequest WHERE requestID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, requestID)
        
        return create_success_response("adoption request deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()