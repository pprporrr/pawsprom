from fastapi import APIRouter, Request
from APIs.dbConnector import DBConnector, get_db_connector

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

@router.post("/shelter/", response_model=dict)
async def create_shelter(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        shelterName = data.get("shelterName")
        location = data.get("location")
        contactInfo = data.get("contactInfo")
        phoneNumber = data.get("phoneNumber")
        imageURL = data.get("imageURL")
        
        if None in (shelterName, location, contactInfo, phoneNumber):
            return create_error_response("missing required fields")
        
        query = "INSERT INTO shelter (shelterName, location, contactInfo, phoneNumber, imageURL) " \
                "VALUES (%s, %s, %s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (shelterName, location, contactInfo, phoneNumber, imageURL))
        
        query = "SELECT * FROM shelter WHERE shelterID = LAST_INSERT_ID()"
        result = await db_connector.execute_query(query)
        
        if not result:
            return create_error_response("failed to create shelter")
        
        return create_success_response("shelter created")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/shelter/", response_model=dict)
async def read_shelter_details(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        shelterID = data.get("shelterID")
        
        if shelterID is None:
            return create_error_response("missing 'shelterID' in the request data")
        
        query = "SELECT * FROM shelter WHERE shelterID = %s"
        result = await db_connector.execute_query(query, shelterID)
        
        if not result:
            return create_error_response("shelter not found")
        
        shelterDetails = {
            "shelterID": result[0][0],
            "shelterName": result[0][1],
            "location": result[0][2],
            "contactInfo": result[0][3],
            "phoneNumber": result[0][4],
            "imageURL": result[0][5]
        }
        
        return create_success_response(shelterDetails)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/shelter/list/", response_model=dict)
async def read_shelter_details_list(request: Request):
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
        
        query = "SELECT * FROM shelter LIMIT %s"
        results = await db_connector.execute_query(query, limit)
        
        shelters = []
        
        if not results:
            return create_error_response("shelter not found")
        
        for result in results:
            shelterDetails = {
                "shelterID": result[0],
                "shelterName": result[1],
                "location": result[2],
                "contactInfo": result[3],
                "phoneNumber": result[4],
                "imageURL": result[5]
            }
            shelters.append(shelterDetails)
        
        return create_success_response(shelters)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/shelter/", response_model=dict)
async def update_shelter(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        shelterID = data.get("shelterID")
        shelterName = data.get("shelterName")
        location = data.get("location")
        contactInfo = data.get("contactInfo")
        phoneNumber = data.get("phoneNumber")
        
        if None in (shelterID, shelterName, location, contactInfo, phoneNumber):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM shelter WHERE shelterID = %s"
        result = await db_connector.execute_query(query, shelterID)
        
        if not result:
            return create_error_response("shelter not found")
        
        query = "UPDATE shelter SET shelterName = %s, location = %s, contactInfo = %s, phoneNumber = %s " \
                "WHERE shelterID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (shelterName, location, contactInfo, phoneNumber, shelterID))
        
        return create_success_response("shelter updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/shelter/update_image/", response_model=dict)
async def update_shelter_image(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        shelterID = data.get("shelterID")
        imageURL = data.get("imageURL")
        
        if None in (shelterID, imageURL):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM shelter WHERE shelterID = %s"
        result = await db_connector.execute_query(query, shelterID)
        
        if not result:
            return create_error_response("shelter not found")
        
        query = "UPDATE shelter SET imageURL = %s WHERE shelterID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (imageURL, shelterID))
        
        return create_success_response("shelter image updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/shelter/", response_model=dict)
async def delete_shelter(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        shelterID = data.get("shelterID")
        
        if shelterID is None:
            return create_error_response("missing 'shelterID' in the request data")
        
        query = "SELECT * FROM shelter WHERE shelterID = %s"
        result = await db_connector.execute_query(query, shelterID)
        
        if not result:
            return create_error_response("shelter not found")
        
        query = "DELETE FROM shelter WHERE shelterID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, shelterID)
        
        return create_success_response("shelter deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()