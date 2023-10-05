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

@router.post("/info-short/", response_model=dict)
async def get_pet_profiles_short(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        petIDs = data.get("petIDs")
        
        if petIDs is None or len(petIDs) == 0:
            return create_error_response("missing or invalid 'petIDs' in the request data")
        
        pet_info_list = []
        
        for petID in petIDs:
            try:
                getPetDetailsQuery = "SELECT * FROM pet WHERE petID = %s"
                getPetDetailsResult = await db_connector.execute_query(getPetDetailsQuery, petID)
                
                getPetImagesQuery = "SELECT imageID FROM petImages WHERE pet_petID = %s"
                getPetImagesResult = await db_connector.execute_query(getPetImagesQuery, petID)
            except:
                pet_info_list.append({"petID": petID, "error": "pet not found"})
            
            if getPetDetailsResult[0][11] == "Available":
                getShelterQuery = "SELECT * FROM shelter WHERE shelterID = %s"
                getShelterResult = await db_connector.execute_query(getShelterQuery, getPetDetailsResult[0][13])
                
                petInfo = {
                    "petName": getPetDetailsResult[0][1],
                    "species": getPetDetailsResult[0][2],
                    "breed": getPetDetailsResult[0][3],
                    "availabilityStatus": getPetDetailsResult[0][11],
                    "vaccinationRecord": getPetDetailsResult[0][12],
                    "imageIDs": [imageID for sublist in getPetImagesResult for imageID in sublist],
                    "features": json.loads(getPetDetailsResult[0][10]),
                    "name": getShelterResult[0][1],
                    "phone": getShelterResult[0][4],
                    "address": getShelterResult[0][2]
                }
            elif getPetDetailsResult[0][11] == "Adopted" or getPetDetailsResult[0][11] == "Owned":
                getPetOwnerQuery = "SELECT * FROM petOwnership WHERE pet_petID = %s"
                getPetOwnerResult = await db_connector.execute_query(getPetOwnerQuery, petID)
                
                getOwnerQuery = "SELECT * FROM user WHERE userID = %s"
                getOwnerResult = await db_connector.execute_query(getOwnerQuery, getPetOwnerResult[0][2])
                
                petInfo = {
                    "petName": getPetDetailsResult[0][1],
                    "species": getPetDetailsResult[0][2],
                    "breed": getPetDetailsResult[0][3],
                    "availabilityStatus": getPetDetailsResult[0][11],
                    "vaccinationRecord": getPetDetailsResult[0][12],
                    "imageIDs": [imageID for sublist in getPetImagesResult for imageID in sublist],
                    "features": json.loads(getPetDetailsResult[0][10]),
                    "name": f"{getOwnerResult[0][3]} {getOwnerResult[0][4]}",
                    "phone": getOwnerResult[0][5],
                    "address": getOwnerResult[0][6],
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
            
            applicationDict = {}
            
            if getPetDetailsResult[0][11] == "Available":
                getShelterQuery = "SELECT * FROM shelter WHERE shelterID = %s"
                getShelterResult = await db_connector.execute_query(getShelterQuery, getPetDetailsResult[0][13])
                
                getAdoptionQuery = "SELECT user_userID, dateofapplication FROM adoptionApplication WHERE pet_petID = %s AND approvalStatus = %s"
                getAdoptionResult = await db_connector.execute_query(getAdoptionQuery, petID, "Pending")
                
                for userID, dateofapplication in getAdoptionResult:
                    getAddressQuery = "SELECT * FROM user WHERE userID = %s"
                    getAddressResult = await db_connector.execute_query(getAddressQuery, userID)
                    applicationDict[userID] = {"firstName": getAddressResult[0][3], "lastName": getAddressResult[0][4], "phoneNo": getAddressResult[0][5], "address": getAddressResult[0][6], "dateofapplication": dateofapplication}
                
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
                "name": getShelterResult[0][1],
                "phone": getShelterResult[0][4],
                "address": getShelterResult[0][2],
                "adoptionApplications": applicationDict
                }
            elif getPetDetailsResult[0][11] == "Adopted" or getPetDetailsResult[0][11] == "Owned":
                getPetOwnerQuery = "SELECT * FROM petOwnership WHERE pet_petID = %s"
                getPetOwnerResult = await db_connector.execute_query(getPetOwnerQuery, petID)
                
                getOwnerQuery = "SELECT * FROM user WHERE userID = %s"
                getOwnerResult = await db_connector.execute_query(getOwnerQuery, getPetOwnerResult[0][2])
                
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
                "name": f"{getOwnerResult[0][3]} {getOwnerResult[0][4]}",
                "phone": getOwnerResult[0][5],
                "address": getOwnerResult[0][6],
                "adoptionApplications": applicationDict
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

@router.post("/drop-down/", response_model=dict)
async def get_drop_down():
    try:
        await db_connector.connect()
        
        getSpeciesQuery = "SELECT DISTINCT species FROM pet"
        getSpeciesResult = await db_connector.execute_query(getSpeciesQuery)
        
        dropDownDict = {}
        
        for Species in getSpeciesResult:
            getBreedQuery = "SELECT DISTINCT breed FROM pet WHERE species = %s"
            getBreedResult = await db_connector.execute_query(getBreedQuery, Species)
            
            breedList = [Breed[0] for Breed in getBreedResult]
            sortedbreedList = sorted(breedList)
            
            dropDownDict[Species] = sortedbreedList
        
        getColorQuery = "SELECT DISTINCT color FROM pet"
        getColorResult = await db_connector.execute_query(getColorQuery)
        
        colorList = [Color[0] for Color in getColorResult]
        sortedcolorList = sorted(colorList)
        
        dropDownDict["color"] = sortedcolorList
        
        return create_success_response(dropDownDict)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/drop-down/filter/", response_model=dict)
async def get_drop_down_colors(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        colorList = data.get("color")
        speciesList = data.get("species")
        breedList = data.get("breed")
        
        speciesSet = set()
        breedSet = set()
        speciesColors = set()
        breedColors = set()
        breedSpecies = set()
        speciesBreed = set()
        
        if colorList:
            for color in colorList:
                getSpeciesbyColorQuery = "SELECT DISTINCT species FROM pet WHERE color = %s"
                getSpeciesbyColorResult = await db_connector.execute_query(getSpeciesbyColorQuery, color)
                
                speciesListbyColor = [species[0] for species in getSpeciesbyColorResult]
                speciesSet.update(speciesListbyColor)
                
                getBreedbyColorQuery = "SELECT DISTINCT breed FROM pet WHERE color = %s"
                getBreedbyColorResult = await db_connector.execute_query(getBreedbyColorQuery, color)
                
                breedListbyColor = [breed[0] for breed in getBreedbyColorResult]
                breedSet.update(breedListbyColor)
            
            if speciesList:
                commonSpecies = list(speciesSet.intersection(set(speciesList)))
                for species in commonSpecies:
                    for color in colorList:
                        getBreedbyColorQuery = "SELECT DISTINCT breed FROM pet WHERE species = %s AND color = %s"
                        getBreedbyColorResult = await db_connector.execute_query(getBreedbyColorQuery, species, color)
                        breedListbyColor = [breed[0] for breed in getBreedbyColorResult]
                        breedSet.update(breedListbyColor)
                return create_success_response({"species": sorted(list(commonSpecies)), "breed": sorted(list(breedSet)), "color": sorted(list(colorList))})
            if breedList:
                commonBreed = list(breedSet.intersection(set(breedList)))
                for breed in commonBreed:
                    for color in colorList:
                        getSpeciesbyColorQuery = "SELECT DISTINCT species FROM pet WHERE breed = %s AND color = %s"
                        getSpeciesbyColorResult = await db_connector.execute_query(getSpeciesbyColorQuery, breed, color)
                        speciesListbyColor = [species[0] for species in getSpeciesbyColorResult]
                        speciesSet.update(speciesListbyColor)
                return create_success_response({"species": sorted(list(speciesSet)), "breed": sorted(list(commonBreed)), "color": sorted(list(colorList))})
            return create_success_response({"species": sorted(list(speciesSet)), "breed": sorted(list(breedSet)), "color": sorted(list(colorList))})
        
        if speciesList:
            for species in speciesList:
                getColorbySpeciesQuery = "SELECT DISTINCT color FROM pet WHERE species = %s"
                getColorbySpeciesResult = await db_connector.execute_query(getColorbySpeciesQuery, species)
                
                getBreedbySpeciesQuery = "SELECT DISTINCT breed FROM pet WHERE species = %s"
                getBreedbySpeciesResult = await db_connector.execute_query(getBreedbySpeciesQuery, species)
                
                colorList = [color[0] for color in getColorbySpeciesResult]
                speciesColors.update(colorList)
                
                breedList = [breed[0] for breed in getBreedbySpeciesResult]
                breedSpecies.update(breedList)
        
        if breedList:
            for breed in breedList:
                getColorbyBreedQuery = "SELECT DISTINCT color FROM pet WHERE breed = %s"
                getColorbyBreedResult = await db_connector.execute_query(getColorbyBreedQuery, breed)
                
                getSpeciesbyBreedQuery = "SELECT DISTINCT breed FROM pet WHERE breed = %s"
                getSpeciesbyBreedResult = await db_connector.execute_query(getSpeciesbyBreedQuery, breed)
                
                colorList = [color[0] for color in getColorbyBreedResult]
                breedColors.update(colorList)
                
                speciesList = [species[0] for species in getSpeciesbyBreedResult]
                speciesBreed.update(speciesList)
        
        if speciesList and breedList:
            commonColors = list(speciesColors.intersection(breedColors))
            sortedColors = sorted(commonColors)
            commonSpecies = list(speciesBreed.intersection(set(speciesList)))
            sortedSpecies = sorted(commonSpecies)
            commonBreed = list(breedSpecies.intersection(set(breedList)))
            sortedBreed = sorted(commonBreed)
        elif speciesList:
            commonColors = list(speciesColors)
            sortedColors = sorted(commonColors)
            commonBreed = list(breedSpecies)
            sortedBreed = sorted(commonBreed)
        elif breedList:
            commonColors = list(breedColors)
            sortedColors = sorted(commonColors)
            commonSpecies = list(speciesBreed)
            sortedSpecies = sorted(commonSpecies)
        
        return create_success_response({"species": sortedSpecies, "breed": sortedBreed, "color": sortedColors})
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/search-pet/", response_model=dict)
async def search_pet(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        species = data.get("species", [])
        breeds = data.get("breed", [])
        age_range = data.get("age_range")
        gender = data.get("gender", [])
        weight_range = data.get("weight_range")
        colors = data.get("color", [])
        features = json.dumps(data.get("features"))
        
        search_pet_query = "SELECT * FROM pet WHERE 1"
        
        if species != []:
            species_filter = " OR ".join([f"species = '{s}'" for s in species])
            search_pet_query += f" AND ({species_filter})"
        if breeds != []:
            breeds_filter = " OR ".join([f"breed = '{b}'" for b in breeds])
            search_pet_query += f" AND ({breeds_filter})"
        if age_range:
            search_pet_query += f" AND age >= {age_range[0]} AND age <= {age_range[1]}"
        if gender != []:
            gender_filter = " OR ".join([f"gender = '{g}'" for g in gender])
            search_pet_query += f" AND ({gender_filter})"
        if weight_range:
            search_pet_query += f" AND weight >= {weight_range[0]} AND weight <= {weight_range[1]}"
        if colors != []:
            colors_filter = " OR ".join([f"color = '{c}'" for c in colors])
            search_pet_query += f" AND ({colors_filter})"
        if not features:
            search_pet_query += f" AND features LIKE '{features}'"
        
        search_pet_results = await db_connector.execute_query(search_pet_query)
        
        if not search_pet_results:
            return create_error_response("no matching pets found")
        
        pet_ids = []
        
        for pet in search_pet_results:
            if pet[11] == "Available":
                pet_ids.append(pet[0])
        
        return create_success_response(pet_ids)
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()

@router.post("/dashboard/info/", response_model=dict)
async def get_user_dashboard_info(request: Request):
    try:
        await db_connector.connect()
        data = await request.json()
        
        username = data.get("username")
        userRole = data.get("userRole")
        
        if None in (username, userRole):
            return create_error_response("missing 'username or userRole' in the request data")
        
        if userRole == "User":
            getUserQuery = "SELECT userID FROM user WHERE username = %s AND userRole = %s"
            getUserResult = await db_connector.execute_query(getUserQuery, username, userRole)
            
            if not getUserResult:
                return create_error_response("user not found")
            
            getOwnerShipQuery = "SELECT pet_petID FROM petOwnership WHERE user_userID = %s"
            getOwnerShipResult = await db_connector.execute_query(getOwnerShipQuery, getUserResult[0])
            
            if not getOwnerShipResult:
                return create_error_response("user don't have pet")
            
            pet_info_list = []
            
            for petID in getOwnerShipResult:
                try:
                    getPetDetailsQuery = "SELECT * FROM pet WHERE petID = %s"
                    getPetDetailsResult = await db_connector.execute_query(getPetDetailsQuery, petID)
                    
                    getPetImagesQuery = "SELECT imageID FROM petImages WHERE pet_petID = %s"
                    getPetImagesResult = await db_connector.execute_query(getPetImagesQuery, petID)
                except:
                    pet_info_list.append({"petID": petID, "error": "pet not found"})
                
                petInfo = {
                    "petName": getPetDetailsResult[0][1],
                    "species": getPetDetailsResult[0][2],
                    "breed": getPetDetailsResult[0][3],
                    "availabilityStatus": getPetDetailsResult[0][11],
                    "vaccinationRecord": getPetDetailsResult[0][12],
                    "imageIDs": [imageID for sublist in getPetImagesResult for imageID in sublist],
                    "features": json.loads(getPetDetailsResult[0][10])
                }
                
                pet_info_list.append(petInfo)
            
            return create_success_response(pet_info_list)
        elif userRole == "ShelterStaff":
            getShelterIDQuery = "SELECT shelter_shelterID FROM user WHERE username = %s AND userRole = %s"
            getShelterIDResult = await db_connector.execute_query(getShelterIDQuery, username, userRole)
            
            if not getShelterIDResult:
                return create_error_response("user not found")
            
            getPetQuery = "SELECT petID FROM pet WHERE shelter_shelterID = %s"
            getPetResult = await db_connector.execute_query(getPetQuery, getShelterIDResult[0])
            
            pet_info_list = []
            pet_info_list_requested = []
            
            for petID in getPetResult:
                try:
                    getPetDetailsQuery = "SELECT * FROM pet WHERE petID = %s"
                    getPetDetailsResult = await db_connector.execute_query(getPetDetailsQuery, petID)
                    
                    getPetImagesQuery = "SELECT imageID FROM petImages WHERE pet_petID = %s"
                    getPetImagesResult = await db_connector.execute_query(getPetImagesQuery, petID)
                except:
                    pet_info_list.append({"petID": petID, "error": "pet not found"})
                
                if getPetDetailsResult[0][11] == "Available":
                    checkAdoptionQuery = "SELECT * FROM adoptionApplication WHERE pet_petID = %s AND approvalStatus = %s"
                    checkAdoptionResult = await db_connector.execute_query(checkAdoptionQuery, petID, "Pending")
                    
                    if checkAdoptionResult:
                        petInfo = {
                            "petName": getPetDetailsResult[0][1],
                            "species": getPetDetailsResult[0][2],
                            "breed": getPetDetailsResult[0][3],
                            "availabilityStatus": getPetDetailsResult[0][11],
                            "vaccinationRecord": getPetDetailsResult[0][12],
                            "imageIDs": [imageID for sublist in getPetImagesResult for imageID in sublist],
                            "features": json.loads(getPetDetailsResult[0][10])
                        }
                        
                        pet_info_list_requested.append(petInfo)
                    else:
                        petInfo = {
                            "petName": getPetDetailsResult[0][1],
                            "species": getPetDetailsResult[0][2],
                            "breed": getPetDetailsResult[0][3],
                            "availabilityStatus": getPetDetailsResult[0][11],
                            "vaccinationRecord": getPetDetailsResult[0][12],
                            "imageIDs": [imageID for sublist in getPetImagesResult for imageID in sublist],
                            "features": json.loads(getPetDetailsResult[0][10])
                        }
                        
                        pet_info_list.append(petInfo)
            
            return create_success_response({"Available": pet_info_list, "Requested": pet_info_list_requested})
    except Exception as e:
        return create_error_response(str(e))
    finally:
        await db_connector.disconnect()