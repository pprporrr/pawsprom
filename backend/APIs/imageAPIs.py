from fastapi import APIRouter, Request, UploadFile, File
from APIs.dbConnector import DBConnector, get_db_connector
from fastapi.responses import StreamingResponse
import io

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

###########################CRUD###########################

@router.post("/image/{petID}/")
async def upload_image(petID: int, imageFile: UploadFile = File(...)):
    try:
        await db_connector.connect()
        
        if petID is None:
                return create_error_response("pet not found")
        
        with open(imageFile.filename, "wb") as image:
            image.write(imageFile.file.read())
        
        if image is None:
                return create_error_response("missing imageFile fields")
        
        query = "INSERT INTO petImages (pet_petID, image) VALUES (%s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (petID, image))
        
        query = "SELECT * FROM petImages WHERE imageID = LAST_INSERT_ID()"
        result = await db_connector.execute_query(query)
        
        if not result:
            return create_error_response("failed to create pet image")
            
        return create_success_response("pet image created")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/image/{petID}/")
async def get_pet_image(petID: int):
    try:
        await db_connector.connect()
        
        if petID is None:
            return create_error_response("missing 'petID' in the request data")
        
        petImagesquery = "SELECT * FROM petImages WHERE pet_petID = %s"
        petImagesresult = await db_connector.execute_query(petImagesquery, petID)
        
        if not petImagesresult:
            return create_error_response("image not found")
        
        petImages = {
                "image": [row[2] for row in petImagesresult]
        }
        
        return create_success_response(petImages)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()