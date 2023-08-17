from fastapi import APIRouter, UploadFile, File
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

@router.post("/image/create/{petID}/", response_model=dict)
async def upload_image(petID: int, imageFiles: List[UploadFile] = File(...)):
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
            
            createImageQuery = "INSERT INTO petImages (pet_petID, image) VALUES (%s, %s)"
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

@router.get("/image/ids/{petID}/", response_model=dict)
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

@router.get("/image/{imageID}/")
async def get_pet_image(imageID: int):
    try:
        await db_connector.connect()
        
        getImageQuery = "SELECT image FROM petImages WHERE imageID = %s"
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