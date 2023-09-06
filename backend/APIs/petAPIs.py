from fastapi import APIRouter, Request, UploadFile, File
from APIs.dbConnector import DBConnector, get_db_connector
from typing import List
import json

router = APIRouter()

db_connector = get_db_connector()

def create_success_response(data):
    return {"success": True, "data": data}

def create_error_response(error_msg):
    return {"success": False, "error": error_msg}

@router.post("/create-profile/byUser/", response_model=dict)
async def create_pet_profile_by_User(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petName = data.get("petName")
        species = data.get("species")
        breed = data.get("breed")
        age = data.get("age")
        gender = data.get("gender")
        weight = data.get("weight")
        color = data.get("color")
        dateofbirth = data.get("dateofbirth")
        availabilityStatus = "Owned"
        description = data.get("description")
        features = json.dumps(data.get("features"))
        user_userID = data.get("userID")
        
        if user_userID is None:
            return create_error_response("missing 'userID' in the request data")
        
        checkUserQuery = "SELECT * FROM user WHERE userID = %s"
        checkUserResult = await db_connector.execute_query(checkUserQuery, user_userID)
        
        if not checkUserResult:
            return create_error_response("user not found")
        
        if None in (petName, species, breed, age, gender, weight, color, dateofbirth, availabilityStatus, features):
            return create_error_response("missing required fields")
        
        createPetQuery = "INSERT INTO pet (petName, species, breed, age, gender, weight, color, dateofbirth, description, " \
                "features, availabilityStatus) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(createPetQuery, (petName, species, breed, age, gender, weight, color, dateofbirth,
                                             description, features, availabilityStatus))
        
        checkPetQuery = "SELECT * FROM pet WHERE petID = LAST_INSERT_ID()"
        checkPetResult = await db_connector.execute_query(checkPetQuery)
        
        if not checkPetResult:
            return create_error_response("failed to create pet")
        
        pet_petID = int(checkPetResult[0][0])
        
        createOwnerShipQuery = "INSERT INTO petOwnership (pet_petID, user_userID, adoptionDate) VALUES (%s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(createOwnerShipQuery, (pet_petID, user_userID, None))
        
        checkOwnerShipQuery = "SELECT * FROM petOwnership WHERE ownershipID = LAST_INSERT_ID()"
        checkOwnerShipResult = await db_connector.execute_query(checkOwnerShipQuery)
        
        if not checkOwnerShipResult:
            return create_error_response("failed to create pet ownership record")
        
        return create_success_response("pet created")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/create-profile/byShelter/", response_model=dict)
async def create_pet_profile_by_Shelter(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petName = data.get("petName")
        species = data.get("species")
        breed = data.get("breed")
        age = data.get("age")
        gender = data.get("gender")
        weight = data.get("weight")
        color = data.get("color")
        dateofbirth = data.get("dateofbirth")
        availabilityStatus = "Available"
        description = data.get("description")
        features = json.dumps(data.get("features"))
        shelter_shelterID = data.get("shelterID")
        
        if shelter_shelterID is None:
            return create_error_response("missing 'shelterID' in the request data")
        
        checkShelterQuery = "SELECT * FROM shelter WHERE shelterID = %s"
        checkShelterResult = await db_connector.execute_query(checkShelterQuery, shelter_shelterID)
        
        if not checkShelterResult:
            return create_error_response("shelter not found")
        
        if None in (petName, species, breed, age, gender, weight, color, dateofbirth, availabilityStatus, features):
            return create_error_response("missing required fields")
        
        createPetQuery = "INSERT INTO pet (petName, species, breed, age, gender, weight, color, dateofbirth, description, " \
                "features, availabilityStatus, shelter_shelterID) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(createPetQuery, (petName, species, breed, age, gender, weight, color, dateofbirth,
                                             description, features, availabilityStatus, shelter_shelterID))
        
        checkPetQuery = "SELECT * FROM pet WHERE petID = LAST_INSERT_ID()"
        checkPetResult = await db_connector.execute_query(checkPetQuery)
        
        if not checkPetResult:
            return create_error_response("failed to create pet")
        
        return create_success_response("pet created")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/update-profile/", response_model=dict)
async def update_pet_profile(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petID = data.get("petID")
        
        if petID is None:
            return create_error_response("missing 'petID' in the request data")
        
        checkPetQuery = "SELECT * FROM pet WHERE petID = %s"
        checkPetResult = await db_connector.execute_query(checkPetQuery, petID)
        
        if not checkPetResult:
            return create_error_response("pet not found")
        
        updateFields = {}
        
        if "petName" in data:
            updateFields["petName"] = data["petName"]
        if "species" in data:
            updateFields["species"] = data["species"]
        if "breed" in data:
            updateFields["breed"] = data["breed"]
        if "age" in data:
            updateFields["age"] = data["age"]
        if "gender" in data:
            updateFields["gender"] = data["gender"]
        if "weight" in data:
            updateFields["weight"] = data["weight"]
        if "color" in data:
            updateFields["color"] = data["color"]
        if "dateofbirth" in data:
            updateFields["dateofbirth"] = data["dateofbirth"]
        if "description" in data:
            updateFields["description"] = data["description"]
        if "features" in data:
            updateFields["features"] = json.dumps(data.get("features"))
        
        if len(updateFields) == 0:
            return create_error_response("missing data to update")
        
        updateQuery = "UPDATE pet SET "
        updatePetDetailsValues = []
        
        for key, value in updateFields.items():
            updateQuery += f"{key} = %s, "
            updatePetDetailsValues.append(value)
        
        updatePetDetailsQuery = updateQuery.rstrip(", ")
        updatePetDetailsQuery += " WHERE petID = %s"
        updatePetDetailsValues.append(petID)
        
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(updatePetDetailsQuery, updatePetDetailsValues)
        
        checkPetDetailsQuery = "SELECT * FROM pet WHERE petID = %s"
        checkPetDetailsresult = await db_connector.execute_query(checkPetDetailsQuery, petID)
        
        if not checkPetDetailsresult:
            return create_error_response("failed to update pet details")
        
        return create_success_response("pet details updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/info-short/", response_model=list)
async def get_pet_profiles_short(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petIDs = data.get("petIDs")
        
        if petIDs is None or len(petIDs) == 0:
            return create_error_response("missing or invalid 'petIDs' in the request data")
        
        pet_info_list = []
        
        for petID in petIDs:
            getPetDetailsQuery = "SELECT * FROM pet WHERE petID = %s"
            getPetDetailsResult = await db_connector.execute_query(getPetDetailsQuery, petID)
            
            if not getPetDetailsResult:
                pet_info_list.append({"petID": petID, "error": "pet not found"})
            else:
                getPetImagesQuery = "SELECT imageID FROM petImages WHERE pet_petID = %s"
            getPetImagesResult = await db_connector.execute_query(getPetImagesQuery, petID)
            
            if getPetDetailsResult[0][11] == "Available":
                getPetAddressQuery = "SELECT * FROM shelter WHERE shelterID = %s"
                getPetAddressResult = await db_connector.execute_query(getPetAddressQuery, getPetDetailsResult[0][13])
                
                petInfo = {
                    "petName": getPetDetailsResult[0][1],
                    "species": getPetDetailsResult[0][2],
                    "breed": getPetDetailsResult[0][3],
                    "availabilityStatus": getPetDetailsResult[0][11],
                    "vaccinationRecord": getPetDetailsResult[0][12],
                    "imageIDs": [imageID for sublist in getPetImagesResult for imageID in sublist],
                    "features": json.loads(getPetDetailsResult[0][10]),
                    "address": getPetAddressResult[0][2]
                }
            elif getPetDetailsResult[0][11] == "Adopted" or getPetDetailsResult[0][11] == "Owned":
                getPetOwnerQuery = "SELECT * FROM petOwnership WHERE pet_petID = %s"
                getPetOwnerResult = await db_connector.execute_query(getPetOwnerQuery, petID)
                
                getOwnerAddressQuery = "SELECT * FROM user WHERE userID = %s"
                getOwnerAddressResult = await db_connector.execute_query(getOwnerAddressQuery, getPetOwnerResult[0][2])
                
                petInfo = {
                    "petName": getPetDetailsResult[0][1],
                    "species": getPetDetailsResult[0][2],
                    "breed": getPetDetailsResult[0][3],
                    "availabilityStatus": getPetDetailsResult[0][11],
                    "vaccinationRecord": getPetDetailsResult[0][12],
                    "imageIDs": [imageID for sublist in getPetImagesResult for imageID in sublist],
                    "features": json.loads(getPetDetailsResult[0][10]),
                    "address": getOwnerAddressResult[0][6]
                }
            
            pet_info_list.append(petInfo)
        
        return create_success_response(pet_info_list)
        
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/info-long/", response_model=dict)
async def get_pet_profile_long(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petID = data.get("petID")
        
        if petID is None:
            return create_error_response("missing 'petID' in the request data")
        
        getPetDetailsQuery = "SELECT * FROM pet WHERE petID = %s"
        getPetDetailsResult = await db_connector.execute_query(getPetDetailsQuery, petID)
        
        if not getPetDetailsResult:
            return create_error_response("pet not found")
        
        if getPetDetailsResult:
            getPetImagesQuery = "SELECT imageID FROM petImages WHERE pet_petID = %s"
            getPetImagesResult = await db_connector.execute_query(getPetImagesQuery, petID)
            
            getPetVaccinesQuery = "SELECT * FROM petVaccinations WHERE pet_petID = %s"
            getPetVaccinesResult = await db_connector.execute_query(getPetVaccinesQuery, petID)
            
            if getPetDetailsResult[0][11] == "Available":
                getPetAddressQuery = "SELECT * FROM shelter WHERE shelterID = %s"
                getPetAddressResult = await db_connector.execute_query(getPetAddressQuery, getPetDetailsResult[0][13])
                
                petInfo = {
                "petName": getPetDetailsResult[0][1],
                "species": getPetDetailsResult[0][2],
                "breed": getPetDetailsResult[0][3],
                "age": getPetDetailsResult[0][4],
                "gender": getPetDetailsResult[0][5],
                "weight": getPetDetailsResult[0][6],
                "color": getPetDetailsResult[0][7],
                "dateofbirth": getPetDetailsResult[0][8].isoformat(),
                "description": getPetDetailsResult[0][9],
                "imageIDs": [imageID for sublist in getPetImagesResult for imageID in sublist],
                "features": json.loads(getPetDetailsResult[0][10]),
                "availabilityStatus": getPetDetailsResult[0][11],
                "vaccinationRecord": getPetDetailsResult[0][12],
                "shelterID": getPetDetailsResult[0][13],
                "vaccinationName": [row[2] for row in getPetVaccinesResult],
                "vaccinationDate": [row[3] for row in getPetVaccinesResult],
                "address": getPetAddressResult[0][2]
                }
            elif getPetDetailsResult[0][11] == "Adopted" or getPetDetailsResult[0][11] == "Owned":
                getPetOwnerQuery = "SELECT * FROM petOwnership WHERE pet_petID = %s"
                getPetOwnerResult = await db_connector.execute_query(getPetOwnerQuery, petID)
                
                getOwnerAddressQuery = "SELECT * FROM user WHERE userID = %s"
                getOwnerAddressResult = await db_connector.execute_query(getOwnerAddressQuery, getPetOwnerResult[0][2])
                
                petInfo = {
                "petName": getPetDetailsResult[0][1],
                "species": getPetDetailsResult[0][2],
                "breed": getPetDetailsResult[0][3],
                "age": getPetDetailsResult[0][4],
                "gender": getPetDetailsResult[0][5],
                "weight": getPetDetailsResult[0][6],
                "color": getPetDetailsResult[0][7],
                "dateofbirth": getPetDetailsResult[0][8].isoformat(),
                "description": getPetDetailsResult[0][9],
                "imageIDs": [imageID for sublist in getPetImagesResult for imageID in sublist],
                "features": json.loads(getPetDetailsResult[0][10]),
                "availabilityStatus": getPetDetailsResult[0][11],
                "vaccinationRecord": getPetDetailsResult[0][12],
                "vaccinationName": [row[2] for row in getPetVaccinesResult],
                "vaccinationDate": [row[3] for row in getPetVaccinesResult],
                "address": getOwnerAddressResult[0][6]
                }
            
            return create_success_response(petInfo)
        else:
            return create_error_response("pet not found")
        
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.delete("/delete-profile/{petID}/", response_model=dict)
async def delete_pet_profile(petID: int):
    try:
        await db_connector.connect()
        
        getPetDetailsQuery = "SELECT * FROM pet WHERE petID = %s"
        getPetDetailsResult = await db_connector.execute_query(getPetDetailsQuery, petID)
        
        if not getPetDetailsResult:
            return create_error_response("pet not found")
        
        if getPetDetailsResult:
            deletePetImagesQuery = "DELETE FROM petImages WHERE pet_petID = %s"
            async with db_connector.pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(deletePetImagesQuery, (petID,))
            
            deletePetVaccinesQuery = "DELETE FROM petVaccinations WHERE pet_petID = %s"
            async with db_connector.pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(deletePetVaccinesQuery, (petID,))
            
            if getPetDetailsResult[0][11] == "Owned":
                deletePetOwnerQuery = "DELETE FROM petOwnership WHERE pet_petID = %s"
                async with db_connector.pool.acquire() as conn:
                    async with conn.cursor() as cursor:
                        await cursor.execute(deletePetOwnerQuery, (petID,))
            elif getPetDetailsResult[0][11] == "Adopted":
                getPetOwnerQuery = "SELECT * FROM petOwnership WHERE pet_petID = %s"
                getPetOwnerResult = await db_connector.execute_query(getPetOwnerQuery, (petID))
                
                user_userID = getPetOwnerResult[0][2]
                
                deleteAdoptionApplicationQuery = "DELETE FROM adoptionApplication WHERE pet_petID = %s AND user_userID = %s"
                async with db_connector.pool.acquire() as conn:
                    async with conn.cursor() as cursor:
                        await cursor.execute(deleteAdoptionApplicationQuery, (petID, user_userID))
                
                deletePetOwnerQuery = "DELETE FROM petOwnership WHERE pet_petID = %s"
                async with db_connector.pool.acquire() as conn:
                    async with conn.cursor() as cursor:
                        await cursor.execute(deletePetOwnerQuery, (petID,))
            else:
                deleteAdoptionApplicationQuery = "DELETE FROM adoptionApplication WHERE pet_petID = %s"
                async with db_connector.pool.acquire() as conn:
                    async with conn.cursor() as cursor:
                        await cursor.execute(deleteAdoptionApplicationQuery, (petID,))
            
            deletePetQuery = "DELETE FROM pet WHERE petID = %s"
            async with db_connector.pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(deletePetQuery, (petID,))
            
            return create_success_response("pet deleted")
        else:
            return create_error_response("pet not found")
        
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

"""
@router.post("/pet/search/", response_model=dict)
async def search_pet(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petName = data.get("petName")
        breed = data.get("breed")
        ageRange = data.get("ageRange")
        weightRange = data.get("weightRange")
        gender = data.get("gender")
        color = data.get("color")
        
        query = "SELECT * FROM pet WHERE 1"
        
        if petName:
            query += f" AND petName LIKE '%{petName}%'"
        if breed:
            query += f" AND breed = '{breed}'"
        if ageRange:
            query += f" AND age >= {ageRange[0]} AND age <= {ageRange[1]}"
        if weightRange:
            query += f" AND weight >= {weightRange[0]} AND weight <= {weightRange[1]}"
        if gender:
            query += f" AND gender = '{gender}'"
        if color:
            query += f" AND color = '{color}'"
        
        results = await db_connector.execute_query(query)
        
        if not results:
            return create_error_response("no matching pets found")
        
        petImagesquery = "SELECT * FROM petImages WHERE pet_petID = %s"
        
        pets = []
        for result in results:
            petImagesresult = await db_connector.execute_query(petImagesquery, result[0])
            petDetails = {
                "petID": result[0],
                "petName": result[1],
                "species": result[2],
                "breed": result[3],
                "age": result[4],
                "gender": result[5],
                "weight": result[6],
                "color": result[7],
                "dateofbirth": result[8].isoformat(),
                "description": result[9],
                "images": StreamingResponse(content=images, media_type="image/jpeg"),
                "features": json.loads(result[10]),
                "availabilityStatus": result[11],
                "vaccinationRecord": result[12],
                "shelterID": result[13],
            }
            if result[11] == "Available":
                pets.append(petDetails)
        
        return create_success_response(pets)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/pet/search_by_features/", response_model=dict)
async def search_pet_by_features(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        features = data.get("features")
        feature_conditions = []
        
        for feature, value in features.items():
            feature_conditions.append(f'features->>"$.{feature}" = {value}')
        
        query = "SELECT * FROM pet WHERE 1"
        
        if feature_conditions:
            query += " AND " + " AND ".join(feature_conditions)
        
        results = await db_connector.execute_query(query)
        
        if not results:
            return create_error_response("no matching pets found")
        
        petImagesquery = "SELECT * FROM petImages WHERE pet_petID = %s"
        
        pets = []
        for result in results:
            petImagesresult = await db_connector.execute_query(petImagesquery, result[0])
            petDetails = {
                "petID": result[0],
                "petName": result[1],
                "species": result[2],
                "breed": result[3],
                "age": result[4],
                "gender": result[5],
                "weight": result[6],
                "color": result[7],
                "dateofbirth": result[8].isoformat(),
                "description": result[9],
                "image": [row[2] for row in petImagesresult],
                "features": json.loads(result[10]),
                "availabilityStatus": result[11],
                "vaccinationRecord": result[12],
                "shelterID": result[13],
            }
            if result[11] == "Available":
                pets.append(petDetails)
        
        return create_success_response(pets)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/pet/list_in_shelter/", response_model=dict)
async def read_pet_details_list_in_shelter(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        shelter_shelterID = data.get("shelterID")
        
        if shelter_shelterID is None:
            return create_error_response("missing 'shelterID' in the request data")
        
        query = "SELECT * FROM pet WHERE shelter_shelterID = %s"
        results = await db_connector.execute_query(query, shelter_shelterID)
        
        pets = []
        
        if not results:
            return create_error_response("pet not found")
        
        petImagesquery = "SELECT * FROM petImages WHERE pet_petID = %s"
        
        for result in results:
            petImagesresult = await db_connector.execute_query(petImagesquery, result[0])
            petDetails = {
            "petID": result[0],
            "petName": result[1],
            "species": result[2],
            "breed": result[3],
            "age": result[4],
            "gender": result[5],
            "weight": result[6],
            "color": result[7],
            "dateofbirth": result[8].isoformat(),
            "description": result[9],
            "image": [row[2] for row in petImagesresult],
            "features": json.loads(result[10]),
            "availabilityStatus": result[11],
            "vaccinationRecord": result[12],
            "shelterID": result[13],
            }
            if result[11] == "Available":
                pets.append(petDetails)
        
        return create_success_response(pets)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.put("/pet/update_status/", response_model=dict)
async def update_pet_status(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petID = data.get("petID")
        availabilityStatus = data.get("availabilityStatus")
        
        if availabilityStatus is None:
            return create_error_response("missing 'availabilityStatus' in the request data")
        
        query = "SELECT * FROM pet WHERE petID = %s"
        result = await db_connector.execute_query(query, petID)
        
        if not result:
            return create_error_response("pet not found")
        
        query = "UPDATE pet SET availabilityStatus = %s WHERE petID = %s"
        async with db_connector.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (availabilityStatus, petID))
        
        return create_success_response("pet status updated")
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()
"""