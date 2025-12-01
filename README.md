# Weather Voice Agent

A voice-enabled web application that listens to user speech, extracts a city name, fetches real-time weather information, and reads the result aloud.  
This project was built as part of a Software Developer Intern assignment.

---

## Features

- Voice input using the Web Speech API  
- City name extraction from free-form speech (e.g., “weather in Mumbai”)  
- Real-time weather retrieval using a backend proxy  
- Text-to-Speech output for spoken weather results  
- Manual city input option in the UI  
- Secure API key handling using `.env` and backend proxy  
- Clean and minimal user interface  

---

## Project Structure

weather_voice_agent/
│── index.html # Frontend UI
│── style.css # Styling
│── script.js # Client logic (speech, parsing, fetch)
│── server.js # Node.js backend + weather API proxy
│── .env # Stores API key (ignored in Git)
│── package.json
│── .gitignore


---

## Technologies Used

- HTML, CSS, JavaScript  
- Web Speech API (speech recognition)  
- Web Speech Synthesis API (voice output)  
- Node.js and Express  
- OpenWeatherMap API (via backend proxy)  

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your_repo_url>
cd weather_voice_agent
npm install

OWM_API_KEY=YOUR_API_KEY_HERE

