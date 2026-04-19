from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import List

class Expense(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    amount: float

sqlite_file_name = "expenses.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


@app.get("/")
def read_root():
    return {"message": "Hello from Python Backend! 🐍"}

@app.get("/expenses", response_model=List[Expense])
def get_expenses():
    with Session(engine) as session:
        expensions = session.exec(select(Expense)).all()
        return expensions

@app.post("/expenses", response_model=Expense)
def add_expense(expense: Expense):
    with Session(engine) as session:
        session.add(expense)
        session.commit()
        session.refresh(expense)
        return expense

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int):
    with Session(engine) as session:
        expense = session.get(Expense, expense_id)
        if expense:
            session.delete(expense)
            session.commit()
            return {"message": "Expense deleted!"}
    return {"message": "Expense deleted!"}