Weather Voice Agent

A voice-enabled web application that listens to user speech, extracts a city name, fetches real-time weather information, and reads the result aloud.
This project was built as part of a Software Developer Intern assignment.

Features

Voice input using the Web Speech API

City name extraction from free-form speech (e.g., “weather in Mumbai”)

Real-time weather retrieval using a backend proxy

Text-to-Speech output for spoken weather results

Manual city input option in the UI

Secure API key handling using .env and backend proxying

Clean and minimal user interface

Project Structure
weather_voice_agent/
│── index.html # Frontend UI
│── style.css # Styling
│── script.js # Client logic (speech, parsing, fetch)
│── server.js # Node.js backend + weather API proxy
│── .env # Stores API key (ignored in Git)
│── package.json
│── .gitignore

Technologies Used

HTML, CSS, JavaScript

Web Speech API (speech recognition)

Web Speech Synthesis API (voice output)

Node.js and Express

OpenWeatherMap API (via backend proxy)

Setup Instructions

1. Clone the repository
   git clone <your_repo_url>
   cd weather_voice_agent

2. Install dependencies
   npm install

3. Add API key

Create a .env file in the project root:

OWM_API_KEY=YOUR_API_KEY_HERE

(Do not commit the .env file.)

4. Start the server
   npm start

The application will be available at:

http://localhost:3000

How the Application Works

User clicks Start Listening.

The browser captures speech and converts it to text.

The system extracts the city name from the spoken sentence.

The frontend requests weather from the backend using:
/weather?city=<city>

The backend securely forwards the request to OpenWeatherMap using the API key.

The frontend displays the result and also speaks it aloud using Text-to-Speech.

Demo Workflow (for the required assignment video)

Launch the server and open the application in Chrome.

Click Start Listening.

Say: “Weather in London”.

Show the transcript updating.

Show weather information loading and displaying.

Allow the application to read the weather aloud.

Type another city manually and click Get Weather.

This demonstration should be recorded as a short assignment video.

Notes

Best used on Google Chrome due to Web Speech API support.

Microphone permission must be enabled for the site.

The backend must be running for weather data to load.

The API key is never exposed to the client; it remains on the server.
