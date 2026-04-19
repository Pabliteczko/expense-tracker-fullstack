# Personal Expense Tracker 💰

A sleek, responsive **fullstack** web application built to help users manage their personal finances. It allows users to track their daily expenses, view a dynamic budget breakdown, and permanently persist data using a custom Python backend with a SQLite database.

## 🌟 Features
* **Expense Management:** Add new expenses with custom names and amounts.
* **Real-time Calculation:** Automatically calculates and updates the total budget spent.
* **Item Removal:** Delete individual expenses with a single click.
* **Visual Breakdown:** A dynamic, color-coded progress bar that visually represents the proportion of each expense relative to the total budget.
* **Responsive Design:** Optimized for both mobile devices and desktop monitors.
* **Data Persistence:** Integrated with a custom Python (FastAPI) backend and a local SQLite database (via SQLModel ORM) to ensure data is saved permanently and securely across sessions.

## 💻 Tech Stack
* **Frontend:** React, TypeScript, HTML5, CSS3 (Built with Vite)
* **Backend:** Python, FastAPI, Uvicorn
* **Database:** SQLite, SQLModel (ORM)

## 🚀 How to run locally

To run this application, you need to start both the backend and the frontend servers in two separate terminals.

### 1. Start the Backend (Terminal 1)
Navigate to the backend directory, install dependencies, and start the server:
```bash
cd backend
pip install fastapi uvicorn sqlmodel
uvicorn main:app --reload
```

### 2. Start the Frontend (Terminal 2)
Open a new terminal, navigate to the frontend directory, install dependencies, and start the app:
```bash
cd frontend
npm install
npm run dev
```
Note: If running in GitHub Codespaces, ensure the backend port (8000) is set to 'Public' in the Ports tab so the frontend can successfully fetch data.