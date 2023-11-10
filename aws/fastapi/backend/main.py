from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from APIs.userAPIs import router as user_router
from APIs.shelterAPIs import router as shelter_router
from APIs.petAPIs import router as pet_router
from APIs.ownershipAPIs import router as ownership_router
from APIs.imageAPIs import router as image_router
from APIs.vaccinationAPIs import router as vaccination_router
from APIs.adoptionApplicationAPIs import router as adoptionApplication_router

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/userAPI", tags=["userAPIs"])
app.include_router(shelter_router, prefix="/shelterAPI", tags=["shelterAPIs"])
app.include_router(pet_router, prefix="/petAPI", tags=["petAPIs"])
app.include_router(ownership_router, prefix="/ownershipAPI", tags=["ownershipAPIs"])
app.include_router(image_router, prefix="/imageAPI", tags=["imageAPIs"])
app.include_router(vaccination_router, prefix="/vaccinationAPI", tags=["vaccinationAPIs"])
app.include_router(adoptionApplication_router, prefix="/adoptionAPI", tags=["adoptionAPIs"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)