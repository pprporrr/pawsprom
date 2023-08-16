from fastapi import APIRouter, Request, UploadFile, File
from APIs.dbConnector import DBConnector, get_db_connector
from fastapi.responses import StreamingResponse
from io import BytesIO

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

###########################CRUD###########################

@router.post("/image/create/{petID}/", response_model=dict)
async def upload_image(petID: int, imageFile: UploadFile = File(...)):
    try:
        await db_connector.connect()
        
        if petID is None:
            return create_error_response("missing 'petID' fields")
        
        chechPetQuery = "SELECT * FROM pet WHERE petID = %s"
        chechPetResult = await db_connector.execute_query(chechPetQuery, petID)
        
        if not chechPetResult:
            return create_error_response("pet not found")
        
        imageData = await imageFile.read()
        
        if imageData is None:
            return create_error_response("missing 'imageFile' fields")
        
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

@router.get("/image/{imageID}/", response_model=dict)
async def get_image(imageID: int):
    try:
        await db_connector.connect()
        
        getImageQuery = "SELECT image FROM petImages WHERE imageID = %s"
        image_data = await db_connector.execute_query(getImageQuery, imageID)
        
        if not image_data:
            return create_error_response("Image not found")
        
        image_bytes = image_data[0][0]  # Access the first element of the first row
        image_stream = BytesIO(image_bytes)
        
        return StreamingResponse(content=image_stream, media_type="image/jpeg")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/image/pet/{petID}/", response_model=dict)
async def get_pet_images(petID: int):
    try:
        await db_connector.connect()
        
        getPetImagesQuery = "SELECT image FROM petImages WHERE pet_petID = %s"
        image_data = await db_connector.execute_query(getPetImagesQuery, petID)
        
        if not image_data:
            return create_error_response("No images found for the given petID")
        
        images = []
        for row in image_data:
            image_bytes = row[0]
            image_stream = BytesIO(image_bytes)
            images.append(image_stream)
        
        return StreamingResponse(content=images, media_type="image/jpeg")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()