from fastapi import APIRouter, Request
from APIs.dbConnector import DBConnector, get_db_connector

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

@router.post("/image/", response_model=dict)
async def create_pet_image(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        pet_petID = data.get("petID")
        imageURL = data.get("imageURL")
        
        if None in (pet_petID, imageURL):
            return create_error_response("missing required fields")
        
        query = "INSERT INTO petImages (pet_petID, imageURL) VALUES (%s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (pet_petID, imageURL))
        
        query = "SELECT * FROM petImages WHERE imageID = LAST_INSERT_ID()"
        result = await db_connector.execute_query(query)
        
        if not result:
            return create_error_response("failed to create pet image")
        
        return create_success_response("pet image created")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.get("/image/", response_model=dict)
async def read_pet_image_details(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        pet_petID = data.get("petID")
        
        if pet_petID is None:
            return create_error_response("missing 'petID' in the request data")
        
        query = "SELECT * FROM petImages WHERE pet_petID = %s"
        result = await db_connector.execute_query(query, pet_petID)
        
        if not result:
            return create_error_response("pet image not found")
        
        imageDetails = {
            "petID": pet_petID,
            "imageURLs": [row[2] for row in result]
        }
        
        return create_success_response(imageDetails)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/image/", response_model=dict)
async def update_pet_image(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        imageID = data.get("imageID")
        pet_petID = data.get("petID")
        imageURL = data.get("imageURL")
        
        if None in (imageID, pet_petID, imageURL):
            return create_error_response("missing required fields")
        
        query = "SELECT * FROM petImages WHERE imageID = %s"
        result = await db_connector.execute_query(query, imageID)
        
        if not result:
            return create_error_response("pet image not found")
        
        query = "UPDATE petImages SET pet_petID = %s, imageURL = %s WHERE imageID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (pet_petID, imageURL, imageID))
        
        return create_success_response("pet image updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/image/", response_model=dict)
async def delete_pet_image(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        imageID = data.get("imageID")
        
        if imageID is None:
            return create_error_response("missing 'image_id' in the request data")
        
        query = "SELECT * FROM petImages WHERE imageID = %s"
        result = await db_connector.execute_query(query, imageID)
        
        if not result:
            return create_error_response("pet image not found")
        
        query = "DELETE FROM petImages WHERE imageID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, imageID)
        
        return create_success_response("pet image deleted")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()