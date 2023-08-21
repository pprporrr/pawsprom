from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

from APIs.userAPIs import router as user_router
from APIs.shelterAPIs import router as shelter_router
from APIs.petAPIs import router as pet_router
from APIs.ownershipAPIs import router as ownership_router
from APIs.imageAPIs import router as image_router
from APIs.vaccinationAPIs import router as vaccination_router
from APIs.adoptionRequestAPIs import router as request_router
from APIs.adoptionDecisionAPIs import router as decision_router

origins = [
    "http://localhost:3000"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Instrumentator().instrument(app).expose(app)

app.include_router(user_router, prefix="/userAPI", tags=["userAPI"])
app.include_router(shelter_router, prefix="/shelterAPI", tags=["shelterAPI"])
app.include_router(pet_router, prefix="/petAPI", tags=["petAPI"])
app.include_router(ownership_router, prefix="/ownershipAPI", tags=["ownershipAPI"])
app.include_router(image_router, prefix="/imageAPI", tags=["imageAPI"])
app.include_router(vaccination_router, prefix="/vaccinationAPI", tags=["vaccinationAPI"])
app.include_router(request_router, prefix="/requestAPI", tags=["requestAPI"])
app.include_router(decision_router, prefix="/decisionAPI", tags=["decisionAPI"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    #http://prometheus:9090