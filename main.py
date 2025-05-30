import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data = pd.read_csv("gene_drug_data.csv")

class UserData(BaseModel):
    age: int
    gender: str
    weight: float
    smoker: str
    geneMarker: str

@app.post("/analyze")
async def analyze(user: UserData):
    if "*" in user.geneMarker:
        gene, variant = user.geneMarker.upper().split("*")
        variant = f"*{variant}"
    else:
        gene, variant = user.geneMarker.upper(), ""

    match = data[(data["Gene"] == gene) & (data["Variant"] == variant)]

    if not match.empty:
        result = match.iloc[0]
        return {
            "drug": result["Drug"],
            "effect": result["Effect"],
            "explanation": result["Explanation"]
        }
    else:
        return {
            "drug": "Unknown",
            "effect": "No match found",
            "explanation": "We could not find a match for the given gene marker."
        }
