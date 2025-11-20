#!/bin/bash
 echo "========================================="
 echo "Real Estate Chatbot - Backend Setup"
 echo "========================================="
 # Create backend directory
 mkdir -p backend
 cd backend
 # Create virtual environment
 echo "Creating virtual environment..."
 python3 -m venv venv
 # Activate virtual environment
 echo "Activating virtual environment..."
 source venv/bin/activate
 # Install dependencies
 echo "Installing dependencies..."
 pip install --upgrade pip
 pip install Django==4.2.7
 pip install djangorestframework==3.14.0
 pip install django-cors-headers==4.3.1
 pip install pandas==2.1.3
 pip install openpyxl==3.1.2
 pip install xlrd==2.0.1
 pip install Pillow==10.1.0
 # Create Django project
 echo "Creating Django project..."
 django-admin startproject realestate_chatbot .
 python manage.py startapp api
 # Create media directory
 mkdir -p media/uploads
 # Run migrations
 echo "Running migrations..."
 python manage.py makemigrations
 python manage.py migrate
 echo "========================================="
 echo "Backend setup complete!"
 echo "========================================="
 echo ""
 echo "Next steps:"
 echo "1. Copy all backend files to their respective locations"
 echo "2. Run: python manage.py runserver"
 echo ""