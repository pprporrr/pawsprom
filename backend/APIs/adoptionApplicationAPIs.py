from fastapi import APIRouter, Request
from APIs.dbConnector import DBConnector, get_db_connector
from datetime import datetime

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

###########################CRUD###########################

@router.post("/create-application/", response_model=dict)
async def create_adoption_application(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        pet_petID = data.get("petID")
        user_userID = data.get("userID")
        dateofapplication = data.get("dateofapplication")
        approvalStatus = "Pending"
        
        if None in (pet_petID, user_userID, dateofapplication):
            return create_error_response("missing required fields")
        
        checkDate = datetime.strptime(dateofapplication, "%Y-%m-%d")
        
        checkUserQuery = "SELECT * FROM user WHERE userID = %s"
        checkUserResult = await db_connector.execute_query(checkUserQuery, user_userID)
        
        if not checkUserResult:
            return create_error_response("user not found")
        
        checkPetQuery = "SELECT * FROM pet WHERE petID = %s"
        checkPetResult = await db_connector.execute_query(checkPetQuery, pet_petID)
        
        if not checkPetResult:
            return create_error_response("pet not found")
        
        if checkPetResult[0][11] != "Available":
            return create_error_response("pet not available")
        
        checkRedunAdoptionQuery = "SELECT * FROM adoptionApplication WHERE pet_petID = %s AND user_userID = %s;"
        checkRedunAdoptionResult = await db_connector.execute_query(checkRedunAdoptionQuery, pet_petID, user_userID)
        
        if checkRedunAdoptionResult and checkRedunAdoptionResult[0][3] != "Rejected":
            return create_error_response("adoption application already created")
        
        createAdoptionQuery = "INSERT INTO adoptionApplication (pet_petID, user_userID, dateofapplication, approvalStatus) VALUES (%s, %s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(createAdoptionQuery, (pet_petID, user_userID, checkDate, approvalStatus))
        
        checkAdoptionQuery = "SELECT * FROM adoptionApplication WHERE applicationID = LAST_INSERT_ID()"
        checkAdoptionResult = await db_connector.execute_query(checkAdoptionQuery)
        
        if not checkAdoptionResult:
            return create_error_response("failed to create adoption application")
        
        return create_success_response("created adoption application")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/get-application/", response_model=dict)
async def get_adoption_application_details(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        shelter_shelterID = data.get("shelterID")
        
        if shelter_shelterID is None:
            return create_error_response("missing 'shelterID' in the request data")
        
        getPetByShelterQuery = "SELECT * FROM pet WHERE shelter_shelterID  = %s"
        getPetByShelterResult = await db_connector.execute_query(getPetByShelterQuery, shelter_shelterID)
        
        if not getPetByShelterResult:
            return create_error_response("shelter not have any pet")
        
        adoptionDetailsList = []
        
        for petDetails in getPetByShelterResult:
            petID = petDetails[0]
            petStatus = petDetails[11]
            #(แก้วิธีส่งข้อมูลไปให้โฟม ให้งานต่อการทำต่อ)
            if petStatus == "Available":
                checkAdoptionQuery = "SELECT * FROM adoptionApplication WHERE pet_petID = %s AND approvalStatus = %s"
                checkAdoptionResult = await db_connector.execute_query(checkAdoptionQuery, petID, "Pending")
                
                if checkAdoptionResult:
                    for adoptionApplication in checkAdoptionResult:
                        if adoptionApplication[3] == "Pending":
                            adoptionDetails = {
                                "adoptionID": adoptionApplication[0],
                                "petID": adoptionApplication[1],
                                "userID": adoptionApplication[2],
                                "approvalStatus": adoptionApplication[3],
                                "dateofapplication": adoptionApplication[4].isoformat()
                            }
                            adoptionDetailsList.append(adoptionDetails)
                        else:
                            adoptionDetailsList.append(None)
                else:
                    adoptionDetailsList.append(None)
        
        return create_success_response(adoptionDetailsList)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/update-application/", response_model=dict)
async def update_approvalStatus(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        applicationID = data.get("applicationID")
        approvalStatus = data.get("approvalStatus")
        
        if None in (applicationID, approvalStatus):
            return create_error_response("missing required fields")
        
        if approvalStatus != "Approved" and approvalStatus != "Rejected":
            return create_error_response("wrong approvalStatus")
        
        checkAdoptionQuery = "SELECT * FROM adoptionApplication WHERE applicationID = %s"
        checkAdoptionResult = await db_connector.execute_query(checkAdoptionQuery, applicationID)
        
        if not checkAdoptionResult:
            return create_error_response("adoption application not found")
        
        if approvalStatus == "Approved":
            checkAdoptionByPetQuery = "SELECT * FROM adoptionApplication WHERE pet_petID = %s"
            checkAdoptionByPetResult = await db_connector.execute_query(checkAdoptionByPetQuery, checkAdoptionResult[0][1])
            
            for adoptionApplication in checkAdoptionByPetResult:
                updateAdoptionQuery = "UPDATE adoptionApplication SET approvalStatus = %s WHERE applicationID = %s"
                async with db_connector.pool.acquire() as conn:
                    async with conn.cursor() as cursor:
                        await cursor.execute(updateAdoptionQuery, ("Rejected", adoptionApplication[0]))
            
            updateAdoptionQuery = "UPDATE adoptionApplication SET approvalStatus = %s WHERE applicationID = %s"
            async with db_connector.pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(updateAdoptionQuery, (approvalStatus, applicationID))
            
            pet_petID = checkAdoptionResult[0][1]
            user_userID = checkAdoptionResult[0][2]
            adoptionDate = checkAdoptionResult[0][4]
            
            creartOwnerQuery = "INSERT INTO petOwnership (pet_petID, user_userID, adoptionDate) VALUES (%s, %s, %s)"
            async with db_connector.pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(creartOwnerQuery, (pet_petID, user_userID, adoptionDate))
            
            checkOwnerQuery = "SELECT * FROM petOwnership WHERE ownershipID = LAST_INSERT_ID()"
            checkOwnerResult = await db_connector.execute_query(checkOwnerQuery)
            
            if not checkOwnerResult:
                return create_error_response("failed to create pet ownership record")
            
            updatePetQuery = "UPDATE pet SET availabilityStatus = %s WHERE petID = %s"
            async with db_connector.pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(updatePetQuery, ("Adopted", pet_petID))
        else:
            updateAdoptionQuery = "UPDATE adoptionApplication SET approvalStatus = %s WHERE applicationID = %s"
            async with db_connector.pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(updateAdoptionQuery, (approvalStatus, applicationID))
        
        return create_success_response("adoption application updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/delete-application/", response_model=dict)
async def delete_adoption_application(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        applicationID = data.get("applicationID")
        
        if applicationID is None:
            return create_error_response("missing 'applicationID' in the request data")
        
        checkAdoptionQuery = "SELECT * FROM adoptionApplication WHERE applicationID = %s"
        checkAdoptionResult = await db_connector.execute_query(checkAdoptionQuery, applicationID)
        
        if not checkAdoptionResult:
            return create_error_response("adoption application not found")
        
        deleteAdoptionQuery = "DELETE FROM adoptionApplication WHERE applicationID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(deleteAdoptionQuery, applicationID)
        
        return create_success_response("adoption application deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()