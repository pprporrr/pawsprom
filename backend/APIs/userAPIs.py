from fastapi import APIRouter, Request
from APIs.dbConnector import DBConnector, get_db_connector

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

@router.post("/user/", response_model=dict)
async def create_user(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        username = data.get("username")
        password = data.get("password")
        firstName = data.get("firstName")
        lastName = data.get("lastName")
        phoneNumber = data.get("phoneNumber")
        address = data.get("address")
        role = data.get("role")
        imageURL = data.get("imageURL")
        shelter_shelterID = data.get("shelterID")
        
        if None in (username, password, firstName, lastName, phoneNumber, address, role):
            return create_error_response("missing required fields")
        
        query = "INSERT INTO user (username, password, firstName, lastName, phoneNumber, address, role, imageURL, shelter_shelterID) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (username, password, firstName, lastName, phoneNumber, address, role, imageURL, shelter_shelterID))
        
        query = "SELECT * FROM user WHERE userID = LAST_INSERT_ID()"
        result = await db_connector.execute_query(query)
        
        if not result:
            return create_error_response("failed to create user")
        
        return create_success_response("user created")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/user/", response_model=dict)
async def read_user_details(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        userID = data.get("userID")
        
        if userID is None:
            return create_error_response("missing 'userID' in the request data")
        
        query = "SELECT * FROM user WHERE userID = %s"
        result = await db_connector.execute_query(query, userID)
        
        if not result:
            return create_error_response("user not found")
        
        userDetails = {
            "userID": result[0][0],
            "username": result[0][1],
            "firstName": result[0][3],
            "lastName": result[0][4],
            "phoneNumber": result[0][5],
            "address": result[0][6],
            "role": result[0][7],
            "imageURL": result[0][8],
            "shelterID": result[0][9]
        }
        
        return create_success_response(userDetails)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/user/", response_model=dict)
async def update_user(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        userID = data.get("userID")
        firstName = data.get("firstName")
        lastName = data.get("lastName")
        phoneNumber = data.get("phoneNumber")
        address = data.get("address")
        
        if None in (userID, firstName, lastName, phoneNumber, address):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM user WHERE userID = %s"
        result = await db_connector.execute_query(query, userID)
        
        if not result:
            return create_error_response("user not found")
        
        query = "UPDATE user SET firstName = %s, lastName = %s, phoneNumber = %s, address = %s " \
                "WHERE userID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (firstName, lastName, phoneNumber, address, userID))
        
        return create_success_response("user updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/user/update_image/", response_model=dict)
async def update_user_image(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        userID = data.get("userID")
        imageURL = data.get("imageURL")
        
        if None in (userID, imageURL):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM user WHERE userID = %s"
        result = await db_connector.execute_query(query, userID)
        
        if not result:
            return create_error_response("user not found")
        
        query = "UPDATE user SET imageURL = %s WHERE userID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (imageURL, userID))
        
        return create_success_response("user image updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/user/update_role/", response_model=dict)
async def update_user_role(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        userID = data.get("userID")
        role = data.get("role")
        
        if None in (userID, role):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM user WHERE userID = %s"
        result = await db_connector.execute_query(query, userID)
        
        if not result:
            return create_error_response("user not found")
        
        query = "UPDATE user SET role = %s WHERE userID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (role, userID))
        
        return create_success_response("user image updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/user/", response_model=dict)
async def delete_user(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        userID = data.get("userID")
        
        if userID is None:
            return create_error_response("missing 'userID' in the request data")
        
        query = "SELECT * FROM user WHERE userID = %s"
        result = await db_connector.execute_query(query, userID)
        
        if not result:
            return create_error_response("user not found")
        
        query = "DELETE FROM user WHERE userID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, userID)
        
        return create_success_response("user deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()