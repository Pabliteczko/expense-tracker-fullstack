from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Expense(BaseModel):
    id: int
    name: str
    amount: float

expenses_db: List[Expense] = []

@app.get("/")
def read_root():
    return {"message": "Hello from Python Backend! 🐍"}

@app.get("/expenses", response_model=List[Expense])
def get_expenses():
    return expenses_db

@app.post("/expenses", response_model=Expense)
def add_expense(expense: Expense):
    expenses_db.append(expense)
    return expense

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int):
    global expenses_db
    expenses_db = [exp for exp in expenses_db if exp.id != expense_id]
    return {"message": "Expense deleted!"}