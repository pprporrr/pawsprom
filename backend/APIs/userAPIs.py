from fastapi import APIRouter, Request, File, UploadFile
from APIs.dbConnector import DBConnector, get_db_connector
from datetime import datetime, timedelta
import jwt, bcrypt

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

SECRET_KEY = "nongproject"
ALGORITHM = "HS256"

###########################CRUD###########################

@router.post("/user/", response_model=dict)
async def create_user(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        username = data.get("username")
        password = data.get("password")
        firstName = data.get("firstName")
        lastName = data.get("lastName")
        userphoneNumber = data.get("phoneNumber")
        userAddress = data.get("address")
        userRole = data.get("role")
        shelter_shelterID = data.get("shelterID")
        
        if None in (username, password, firstName, lastName, userphoneNumber, userAddress, userRole):
            return create_error_response("missing required fields")
        
        usernameQuery = "SELECT * FROM user WHERE username = %s"
        usernameExists = await db_connector.execute_query(usernameQuery, username)
        
        if usernameExists:
            return create_error_response("username already exists")
        
        hashedPassword = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        
        createUserQuery = "INSERT INTO user (username, password, firstName, lastName, userphoneNumber, userAddress, userRole, shelter_shelterID) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(createUserQuery, (username, hashedPassword, firstName, lastName, userphoneNumber, userAddress, userRole, shelter_shelterID))
        
        checkUserQuery = "SELECT * FROM user WHERE userID = LAST_INSERT_ID()"
        checkUserResult = await db_connector.execute_query(checkUserQuery)
        
        if not checkUserResult:
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
        
        getUserQuery = "SELECT * FROM user WHERE userID = %s"
        getUserResult = await db_connector.execute_query(getUserQuery, userID)
        
        if not getUserResult:
            return create_error_response("user not found")
        
        userDetails = {
            "userID": getUserResult[0][0],
            "username": getUserResult[0][1],
            "firstName": getUserResult[0][3],
            "lastName": getUserResult[0][4],
            "phoneNumber": getUserResult[0][5],
            "address": getUserResult[0][6],
            "role": getUserResult[0][7],
            "image": getUserResult[0][8],
            "shelterID": getUserResult[0][9]
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
        userphoneNumber = data.get("phoneNumber")
        userAddress = data.get("address")
        
        if None in (userID, firstName, lastName, userphoneNumber, userAddress):
            return create_error_response("missing required fields")
        
        checkUserQuery = "SELECT * FROM user WHERE userID = %s"
        checkUserResult = await db_connector.execute_query(checkUserQuery, userID)
        
        if not checkUserResult:
            return create_error_response("user not found")
        
        updateUserQuery = "UPDATE user SET firstName = %s, lastName = %s, userphoneNumber = %s, userAddress = %s " \
                "WHERE userID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(updateUserQuery, (firstName, lastName, userphoneNumber, userAddress, userID))
        
        return create_success_response("user updated")
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
        
        checkUserQuery = "SELECT * FROM user WHERE userID = %s"
        checkUserResult = await db_connector.execute_query(checkUserQuery, userID)
        
        if not checkUserResult:
            return create_error_response("user not found")
        
        deleteUserQuery = "DELETE FROM user WHERE userID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(deleteUserQuery, userID)
        
        return create_success_response("user deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

##########################################################

@router.post("/register/", response_model=dict)
async def register_user(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        username = data.get("username")
        password = data.get("password")
        firstName = data.get("firstName")
        lastName = data.get("lastName")
        userphoneNumber = data.get("phoneNumber")
        userAddress = data.get("address")
        userRole = "User"
        
        if None in (username, password, firstName, lastName, userphoneNumber, userAddress, userRole):
            return create_error_response("missing required fields")
        
        checkUsernameQuery = "SELECT * FROM user WHERE username = %s"
        checkUsernameExists = await db_connector.execute_query(checkUsernameQuery, username)
        
        if checkUsernameExists:
            return create_error_response("username already exists")
        
        hashedPassword = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        
        createUserQuery = "INSERT INTO user (username, password, firstName, lastName, userphoneNumber, userAddress, userRole) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(createUserQuery, (username, hashedPassword, firstName, lastName, userphoneNumber, userAddress, userRole))
        
        checkUserQuery = "SELECT * FROM user WHERE userID = LAST_INSERT_ID()"
        checkUserResult = await db_connector.execute_query(checkUserQuery)
        
        if not checkUserResult:
            return create_error_response("failed to create user")
        
        return create_success_response("user registered")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/login/", response_model=dict)
async def login_user(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        username = data.get("username")
        password = data.get("password")
        
        if None in (username, password):
            return create_error_response("missing username or password")
        
        getUserQuery = "SELECT password, userRole FROM user WHERE username = %s"
        getUserResult = await db_connector.execute_query(getUserQuery, username)
        
        if not getUserResult:
            return create_error_response("invalid credentials")
        
        databasePassword = getUserResult[0][0]
        userRole = getUserResult[0][1]
        
        if bcrypt.checkpw(password.encode("utf-8"), databasePassword.encode("utf-8")):
            if userRole == "User":
                getUserInfoQuery = "SELECT * FROM user WHERE username = %s AND userRole = %s"
                getUserInfoResult = await db_connector.execute_query(getUserInfoQuery, username, userRole)
                
                if not getUserInfoResult:
                    return create_error_response("user not found")
                
                userDetails = {
                    "username": getUserInfoResult[0][1],
                    "userRole": getUserInfoResult[0][7],
                    "firstName": getUserInfoResult[0][3],
                    "lastName": getUserInfoResult[0][4],
                    "phoneNumber": getUserInfoResult[0][5],
                    "address": getUserInfoResult[0][6]
                }
                return create_success_response(userDetails)
            elif userRole == "ShelterStaff":
                getUserInfoQuery = "SELECT * FROM user WHERE username = %s AND userRole = %s"
                getUserInfoResult = await db_connector.execute_query(getUserInfoQuery, username, userRole)
                
                if not getUserInfoResult:
                    return create_error_response("user not found")
                
                shelterID = getUserInfoResult[0][9]
                
                getShelterQuery = "SELECT * FROM shelter WHERE shelterID = %s"
                getShelterResult = await db_connector.execute_query(getShelterQuery, shelterID)
                
                if not getShelterResult:
                    return create_error_response("shelter not found")
                
                shelterDetails = {
                    "username": username, 
                    "userRole": userRole,
                    "shelterID": getShelterResult[0][0],
                    "shelterName": getShelterResult[0][1],
                    "shelterAddress": getShelterResult[0][2],
                    "sheltercontactInfo": getShelterResult[0][3],
                    "shelterphoneNumber": getShelterResult[0][4]
                }
                return create_success_response(shelterDetails)
        else:
            return create_error_response("invalid credentials")
        
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()