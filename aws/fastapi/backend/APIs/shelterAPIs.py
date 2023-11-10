from fastapi import APIRouter, Request, File, UploadFile
from APIs.dbConnector import DBConnector, get_db_connector

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

###########################CRUD###########################

@router.post("/shelter/", response_model=dict)
async def create_shelter(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        shelterName = data.get("shelterName")
        shelterAddress = data.get("address")
        sheltercontactInfo = data.get("sheltercontactInfo")
        shelterphoneNumber = data.get("shelterphoneNumber")
        
        if None in (shelterName, shelterAddress, sheltercontactInfo, shelterphoneNumber):
            return create_error_response("missing required fields")
        
        createShelterQuery = "INSERT INTO shelter (shelterName, shelterAddress, sheltercontactInfo, shelterphoneNumber) " \
                "VALUES (%s, %s, %s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(createShelterQuery, (shelterName, shelterAddress, sheltercontactInfo, shelterphoneNumber))
        
        checkShelterQuery = "SELECT * FROM shelter WHERE shelterID = LAST_INSERT_ID()"
        checkShelterResult = await db_connector.execute_query(checkShelterQuery)
        
        if not checkShelterResult:
            return create_error_response("failed to create shelter")
        
        return create_success_response("shelter created")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/shelter/", response_model=dict)
async def get_shelter_details(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        shelterID = data.get("shelterID")
        
        if shelterID is None:
            return create_error_response("missing 'shelterID' in the request data")
        
        checkShelterQuery = "SELECT * FROM shelter WHERE shelterID = %s"
        checkShelterResult = await db_connector.execute_query(checkShelterQuery, shelterID)
        
        if not checkShelterResult:
            return create_error_response("shelter not found")
        
        shelterDetails = {
            "shelterID": checkShelterResult[0][0],
            "shelterName": checkShelterResult[0][1],
            "shelterAddress": checkShelterResult[0][2],
            "sheltercontactInfo": checkShelterResult[0][3],
            "shelterphoneNumber": checkShelterResult[0][4],
            "shelterImage": checkShelterResult[0][5]
        }
        
        return create_success_response(shelterDetails)
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
        shelterAddress = data.get("address")
        sheltercontactInfo = data.get("sheltercontactInfo")
        shelterphoneNumber = data.get("shelterphoneNumber")
        
        if None in (shelterID, shelterName, shelterAddress, sheltercontactInfo, shelterphoneNumber):
            return create_error_response("missing required fields")
        
        checkShelterQuery = "SELECT * FROM shelter WHERE shelterID = %s"
        checkShelterResult = await db_connector.execute_query(checkShelterQuery, shelterID)
        
        if not checkShelterResult:
            return create_error_response("shelter not found")
        
        updateShelterQuery = "UPDATE shelter SET shelterName = %s, shelterAddress = %s, sheltercontactInfo = %s, shelterphoneNumber = %s " \
                "WHERE shelterID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(updateShelterQuery, (shelterName, shelterAddress, sheltercontactInfo, shelterphoneNumber, shelterID))
        
        return create_success_response("shelter updated")
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
        
        checkShelterQuery = "SELECT * FROM shelter WHERE shelterID = %s"
        checkShelterResult = await db_connector.execute_query(checkShelterQuery, shelterID)
        
        if not checkShelterResult:
            return create_error_response("shelter not found")
        
        deleteShelterQuery = "DELETE FROM shelter WHERE shelterID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(deleteShelterQuery, shelterID)
        
        return create_success_response("shelter deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

##########################################################

@router.post("/list-shelter/", response_model=dict)
async def get_list_shelter(request: Request):
    try:
        await db_connector.connect()
        
        searchQuery = "SELECT * FROM shelter"
        searchResults = await db_connector.execute_query(searchQuery)
        
        shelters = []
        
        if not searchResults:
            return create_error_response("shelter not found")
        
        for shelter in searchResults:
            shelterDetails = {
                "shelterID": shelter[0],
                "shelterName": shelter[1],
                "shelterAddress": shelter[2],
                "sheltercontactInfo": shelter[3],
                "shelterphoneNumber": shelter[4],
                "shelterImage": shelter[5]
            }
            shelters.append(shelterDetails)
        
        return create_success_response(shelters)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/search-shelter/", response_model=dict)
async def search_shelter(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        shelterName = data.get("shelterName")
        
        if shelterName is None:
            return create_error_response("missing 'shelterName' in the request data")
        
        searchQuery = "SELECT * FROM shelter WHERE shelterName LIKE %s"
        shelter_name_with_wildcard = f"%{shelterName}%"
        searchResults = await db_connector.execute_query(searchQuery, shelter_name_with_wildcard)
        
        shelters = []
        
        if not searchResults:
            return create_error_response("shelter not found")
        
        for shelter in searchResults:
            shelterDetails = {
                "shelterID": shelter[0],
                "shelterName": shelter[1],
                "shelterAddress": shelter[2],
                "sheltercontactInfo": shelter[3],
                "shelterphoneNumber": shelter[4],
                "shelterImage": shelter[5]
            }
            shelters.append(shelterDetails)
        
        return create_success_response(shelters)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()