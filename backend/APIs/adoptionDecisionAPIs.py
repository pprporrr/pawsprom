from fastapi import APIRouter, Request
from APIs.dbConnector import DBConnector, get_db_connector

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

###########################CRUD###########################

@router.post("/adoptiondecision/", response_model=dict)
async def create_adoption_decision(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        adoptionRequest_requestID = data.get("requestID")
        decisionDate = data.get("decisionDate")
        decisionStatus = data.get("decisionStatus")
        
        if None in (adoptionRequest_requestID, decisionDate, decisionStatus):
            return create_error_response("missing required fields")
        
        query = "INSERT INTO adoptionDecision (adoptionRequest_requestID, decisionDate, decisionStatus) VALUES (%s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (adoptionRequest_requestID, decisionDate, decisionStatus))
        
        query = "SELECT * FROM adoptionDecision WHERE decisionID = LAST_INSERT_ID()"
        result = await db_connector.execute_query(query)
        
        if not result:
            return create_error_response("failed to create adoption decision")
        
        return create_success_response("created adoption decision")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/adoptiondecision/", response_model=dict)
async def read_adoption_decision_details(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        decisionID = data.get("decisionID")
        
        if decisionID is None:
            return create_error_response("missing 'decisionID' in the request data")
        
        query = "SELECT * FROM adoptionDecision WHERE decisionID = %s"
        result = await db_connector.execute_query(query, decisionID)
        
        if not result:
            return create_error_response("adoption decision not found")
        
        decisionDetails = {
            "decisionID": result[0][0],
            "adoptionRequest_requestID": result[0][1],
            "decisionDate": result[0][2].isoformat(),
            "decisionStatus": result[0][3]
        }
        
        return create_success_response(decisionDetails)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/adoptiondecision/", response_model=dict)
async def update_adoption_decision(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        decisionID = data.get("decisionID")
        adoptionRequest_requestID = data.get("requestID")
        decisionDate = data.get("decisionDate")
        decisionStatus = data.get("decisionStatus")
        
        if None in (adoptionRequest_requestID, decisionDate, decisionStatus):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM adoptionDecision WHERE decisionID = %s"
        result = await db_connector.execute_query(query, decisionID)
        
        if not result:
            return create_error_response("adoption decision not found")
        
        query = "UPDATE adoptionDecision SET adoptionRequest_requestID = %s, decisionDate = %s, decisionStatus = %s " \
                "WHERE decisionID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (adoptionRequest_requestID, decisionDate, decisionStatus, decisionID))
        
        return create_success_response("adoption decision updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/adoptiondecision/", response_model=dict)
async def delete_adoption_decision(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        decisionID = data.get("decisionID")
        
        if decisionID is None:
            return create_error_response("missing 'decisionID' in the request data")
        
        query = "SELECT * FROM adoptionDecision WHERE decisionID = %s"
        result = await db_connector.execute_query(query, decisionID)
        
        if not result:
            return create_error_response("adoption decision not found")
        
        query = "DELETE FROM adoptionDecision WHERE decisionID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, decisionID)
        
        return create_success_response("adoption request deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()