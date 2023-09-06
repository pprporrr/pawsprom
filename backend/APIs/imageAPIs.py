from fastapi import APIRouter, Request, UploadFile, File
from APIs.dbConnector import get_db_connector
from fastapi.responses import StreamingResponse
from typing import List
from io import BytesIO

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

##################################userImage######################################

@router.put("/upload-userImage/{userID}/", response_model=dict)
async def upload_user_image(userID: int, imageFile: UploadFile = File(...)):
    try:
        await db_connector.connect()
        
        checkUserQuery = "SELECT * FROM user WHERE userID = %s"
        checkUserResult = await db_connector.execute_query(checkUserQuery, userID)
        
        if not checkUserResult:
            return create_error_response("user not found")
        
        if imageFile is None:
            return create_error_response("missing 'imageFile' fields")
        
        imageData = await imageFile.read()
        
        if imageData is None:
            return create_error_response("missing imageFile fields")
        
        updateImageQuery = "UPDATE user SET userImage = %s WHERE userID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(updateImageQuery, (imageData, userID))
        
        return create_success_response("user image updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/get-userImage/{userID}/")
async def get_pet_image(userID: int):
    try:
        await db_connector.connect()
        
        getImageQuery = "SELECT userImage FROM user WHERE userID = %s"
        getImageResult = await db_connector.execute_query(getImageQuery, userID)
        
        if getImageResult[0][0] != None:
            image = getImageResult[0][0]
            return StreamingResponse(BytesIO(image), media_type="image/jpeg")
        else:
            return create_error_response("user image not found")
    except Exception as e:
        raise create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/delete-userImage/{userID}/", response_model=dict)
async def delete_pet_image(userID: int):
    try:
        await db_connector.connect()
        
        checkUserQuery = "SELECT * FROM user WHERE userID = %s"
        checkUserResult = await db_connector.execute_query(checkUserQuery, userID)
        
        if not checkUserResult:
            return create_error_response("user not found")
        
        updateImageQuery = "UPDATE user SET userImage = %s WHERE userID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(updateImageQuery, (None, userID))
        
        return create_success_response("user image deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

##################################shelterImage######################################

@router.put("/upload-shelterImage/{shelterID}/", response_model=dict)
async def upload_shelter_image(shelterID: int, imageFile: UploadFile = File(...)):
    try:
        await db_connector.connect()
        
        checkShelterQuery = "SELECT * FROM shelter WHERE shelterID = %s"
        checkShelterResult = await db_connector.execute_query(checkShelterQuery, shelterID)
        
        if not checkShelterResult:
            return create_error_response("shelter not found")
        
        if imageFile is None:
            return create_error_response("missing 'imageFile' fields")
        
        imageData = await imageFile.read()
        
        if imageData is None:
            return create_error_response("missing imageFile fields")
        
        updateImageQuery = "UPDATE shelter SET shelterImage = %s WHERE shelterID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(updateImageQuery, (imageData, shelterID))
        
        return create_success_response("shelter image updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/get-shelterImage/{shelterID}/")
async def get_pet_image(shelterID: int):
    try:
        await db_connector.connect()
        
        getImageQuery = "SELECT shelterImage FROM shelter WHERE shelterID = %s"
        getImageResult = await db_connector.execute_query(getImageQuery, shelterID)
        
        if getImageResult[0][0] != None:
            image = getImageResult[0][0]
            return StreamingResponse(BytesIO(image), media_type="image/jpeg")
        else:
            return create_error_response("shelter image not found")
    except Exception as e:
        raise create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/delete-shelterImage/{shelterID}/", response_model=dict)
async def delete_pet_image(shelterID: int):
    try:
        await db_connector.connect()
        
        checkUserQuery = "SELECT * FROM shelter WHERE shelterID = %s"
        checkUserResult = await db_connector.execute_query(checkUserQuery, shelterID)
        
        if not checkUserResult:
            return create_error_response("shelter not found")
        
        updateImageQuery = "UPDATE shelter SET shelterImage = %s WHERE shelterID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(updateImageQuery, (None, shelterID))
        
        return create_success_response("user image deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

##################################petImage######################################

@router.post("/upload-petImage/{petID}/", response_model=dict)
async def upload_pet_image(petID: int, imageFiles: List[UploadFile] = File(...)):
    try:
        await db_connector.connect()
        
        checkPetQuery = "SELECT * FROM pet WHERE petID = %s"
        checkPetResult = await db_connector.execute_query(checkPetQuery, petID)
        
        if not checkPetResult:
            return create_error_response("pet not found")
        
        if imageFiles is None:
            return create_error_response("missing 'imageFiles' fields")
        
        for imageFile in imageFiles:
            imageData = await imageFile.read()
            
            createImageQuery = "INSERT INTO petImages (pet_petID, petImage) VALUES (%s, %s)"
            async with db_connector.pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(createImageQuery, (petID, imageData))
            
            checkImageQuery = "SELECT * FROM petImages WHERE imageID = LAST_INSERT_ID()"
            checkImageResult = await db_connector.execute_query(checkImageQuery)
            
            if not checkImageResult:
                return create_error_response("failed to create pet image")
        
        return create_success_response("pet image created")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/get-petImageIDs/{petID}/", response_model=dict)
async def get_pet_image_ids(petID: int):
    try:
        await db_connector.connect()
        
        checkPetQuery = "SELECT * FROM pet WHERE petID = %s"
        checkPetResult = await db_connector.execute_query(checkPetQuery, petID)
        
        if not checkPetResult:
            return create_error_response("pet not found")
        
        getPetImagesQuery = "SELECT imageID FROM petImages WHERE pet_petID = %s"
        getPetImagesResult = await db_connector.execute_query(getPetImagesQuery, petID)
        
        if getPetImagesResult:
            imageIDs = [imageID for sublist in getPetImagesResult for imageID in sublist]
            return create_success_response({"imageIDs": imageIDs})
        else:
            return create_error_response("this pet don't have any image")
        
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/get-petImage/{imageID}/")
async def get_pet_image(imageID: int):
    try:
        await db_connector.connect()
        
        getImageQuery = "SELECT petImage FROM petImages WHERE imageID = %s"
        getImageResult = await db_connector.execute_query(getImageQuery, imageID)
        
        if getImageResult:
            image = getImageResult[0][0]
            return StreamingResponse(BytesIO(image), media_type="image/jpeg")
        else:
            return create_error_response("pet image not found")
        
    except Exception as e:
        raise create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/delete-petImage/{imageID}/", response_model=dict)
async def delete_pet_image(imageID: int):
    try:
        await db_connector.connect()
        
        deleteImageQuery = "DELETE FROM petImages WHERE imageID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(deleteImageQuery, imageID)
        
        return create_success_response("pet ownership record deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

##################################vaccinationRecord######################################

@router.put("/upload-vaccinationRecord/{petID}/", response_model=dict)
async def upload_pet_vaccination_record(petID: int, imageFile: UploadFile = File(...)):
    try:
        await db_connector.connect()
        
        checkPetQuery = "SELECT * FROM pet WHERE petID = %s"
        checkPetResult = await db_connector.execute_query(checkPetQuery, petID)
        
        if not checkPetResult:
            return create_error_response("pet not found")
        
        if imageFile is None:
            return create_error_response("missing 'imageFiles' fields")
        
        imageData = await imageFile.read()
        
        updateVaccinationRecordVaquery = "UPDATE pet SET vaccinationRecord = %s WHERE petID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(updateVaccinationRecordVaquery, (imageData, petID))
        
        return create_success_response("vaccination record updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/get-vaccinationRecord/{petID}/", response_model=dict)
async def get_pet_vaccination_record(petID: int):
    try:
        await db_connector.connect()
        getImageQuery = "SELECT vaccinationRecord FROM pet WHERE petID = %s"
        getImageResult = await db_connector.execute_query(getImageQuery, petID)
        
        if getImageResult[0][0] != None:
            image = getImageResult[0][0]
            return StreamingResponse(BytesIO(image), media_type="image/jpeg")
        else:
            return create_error_response("pet image not found")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/delete-vaccinationRecord/{petID}/", response_model=dict)
async def delete_pet_vaccination_record(petID: int):
    try:
        await db_connector.connect()
        
        checkPetQuery = "SELECT * FROM pet WHERE petID = %s"
        checkPetResult = await db_connector.execute_query(checkPetQuery, petID)
        
        if not checkPetResult:
            return create_error_response("pet not found")
        
        updateVaccinationRecordVaquery = "UPDATE pet SET vaccinationRecord = %s WHERE petID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(updateVaccinationRecordVaquery, (None, petID))
        
        return create_success_response("vaccination record deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()