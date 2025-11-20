# Real Estate Analysis Chatbot

A full-stack web application for analyzing real estate data using natural language queries.

## Tech Stack

- *Backend*: Django 4.2, Django REST Framework, Pandas
- *Frontend*: React 18, Recharts, Axios, Lucide Icons
- *Database*: SQLite (default)

## Features

- 🏠 Natural language query processing
- 📊 Interactive data visualizations
- 📈 Price trend analysis
- 🔄 Area comparison
- 📁 Excel file upload support
- 💬 Chat-based interface

## Quick Start

### Backend Setup
bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


### Frontend Setup
bash
cd frontend
npm install
npm start


## Sample Queries

- "Analyze Wakad"
- "Compare Ambegaon Budruk and Aundh"
- "Show price growth for Akurdi"

## API Endpoints

- POST /api/upload/ - Upload Excel file
- POST /api/analyze/ - Analyze query

## License

MIT License

## Author  
Sigmavalue Full Stack Developer Assignment
