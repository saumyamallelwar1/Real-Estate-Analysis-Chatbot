# Real Estate Chatbot - Backend
 Django REST API for real estate data analysis.
 ## Setup
 1. Create virtual environment:
 ```bash
 python -m venv venv
 source venv/bin/activate
 ```
 2. Install dependencies:
 ```bash
 pip install -r requirements.txt
 ```
 3. Run migrations:
 ```bash
 python manage.py migrate
 ```
 4. Start server:
 ```bash
 python manage.py runserver
 ```
 ## API Documentation
 ### Upload File
 **POST** `/api/upload/`
 Upload Excel file with real estate data.
 ### Analyze Query
 **POST** `/api/analyze/`
 Body:
 ```json
 {
 "query": "Analyze Wakad"
 }
 ```
 Response:
 ```json
 {
  "summary": "...",
  "chart_data": [...],
  "table_data": [...],
  "query_type": "single"
 }
 ```
 ## Running Tests
 ```bash
 python manage.py test
 ```