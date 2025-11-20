@echo off
 echo =========================================
 echo Real Estate Chatbot - Frontend Setup
 echo =========================================
 :: Create React app
 echo Creating React application...
 call npx create-react-app frontend
 :: Navigate to frontend
 cd frontend
 :: Install dependencies
 echo Installing additional dependencies...
 call npm install axios recharts lucide-react
 echo =========================================
 echo Frontend setup complete!
 echo =========================================
 echo.
 echo Next steps:
 echo 1. Copy all frontend files to their respective locations
 echo 2. Run: npm start
 echo.
 pause