'@'
/* script.js - client side (calls /weather on your local server) */
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const micStatus = document.getElementById('micStatus');
const transcriptBox = document.getElementById('transcriptBox');
const weatherBox = document.getElementById('weatherBox');
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let recognition = null;

if (!SpeechRecognition) {
  micStatus.textContent = 'Mic: not supported in this browser';
  startBtn.disabled = true;
} else {
  recognition = new SpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.addEventListener('start', () => {
    micStatus.textContent = 'Mic: listening…';
    startBtn.disabled = true;
    stopBtn.disabled = false;
    transcriptBox.textContent = 'Listening... (speak now)';
  });

  recognition.addEventListener('end', () => {
    micStatus.textContent = 'Mic: idle';
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });

  recognition.addEventListener('result', (ev) => {
    const transcript = Array.from(ev.results)
      .map(r => r[0].transcript)
      .join(' ')
      .trim();
    transcriptBox.textContent = transcript || '—';
    const city = parseCityFromText(transcript) || transcript;
    if (city) fetchWeatherFor(city);
  });

  recognition.addEventListener('error', (ev) => {
    console.warn('Speech recognition error', ev);
    micStatus.textContent = 'Mic: error – ' + (ev.error || 'unknown');
  });
}

startBtn.onclick = () => {
  if (!recognition) return;
  try { recognition.start(); } catch (e) { console.warn(e); }
};
stopBtn.onclick = () => {
  if (!recognition) return;
  recognition.stop();
};
getWeatherBtn.onclick = () => {
  const city = cityInput.value.trim();
  if (!city) { alert('Type a city or use voice'); return; }
  fetchWeatherFor(city);
};

function parseCityFromText(text){
  if (!text) return null;
  const regex = /\b(weather|forecast|temperature)\b(?:.*\b(in|at|for)\b\s*)?([A-Za-z\s]+)$/i;
  const m = text.match(regex);
  if (m && m[3]) return m[3].trim();
  const words = text.split(/\s+/);
  if (words.length <= 3) return text;
  return null;
}

async function fetchWeatherFor(city){
  weatherBox.textContent = `Loading weather for ${city}…`;
  try {
    const resp = await fetch(`/weather?city=${encodeURIComponent(city)}`);
    if (!resp.ok) {
      const txt = await resp.text();
      weatherBox.innerHTML = `<strong>Server error:</strong> ${resp.status} — ${escapeHtml(txt)}`;
      return;
    }
    const data = await resp.json();
    if (data && data.cod && data.cod !== 200) {
      weatherBox.innerHTML = `<strong>API:</strong> ${escapeHtml(JSON.stringify(data))}`;
      return;
    }
    renderWeather(data);
    speakWeather(data);
  } catch (err) {
    console.error(err);
    weatherBox.innerHTML = `<strong>Network error:</strong> ${escapeHtml(err.message)}`;
  }
}

function renderWeather(data){
  if (!data || !data.weather || !data.main) {
    weatherBox.textContent = 'No weather data';
    return;
  }
  const name = `${data.name}${data.sys && data.sys.country ? ', ' + data.sys.country : ''}`;
  const desc = data.weather[0].description;
  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like || temp);
  const humidity = data.main.humidity;
  const wind = data.wind && data.wind.speed ? data.wind.speed : '—';

  weatherBox.innerHTML = `
    <div><strong>${escapeHtml(name)}</strong> — ${escapeHtml(desc)}</div>
    <div>Temperature: <strong>${temp}°C</strong> (feels like ${feels}°C)</div>
    <div>Humidity: ${humidity}% — Wind: ${wind} m/s</div>
  `;
}

function speakWeather(data){
  if (!('speechSynthesis' in window)) return;
  try {
    const name = `${data.name}${data.sys && data.sys.country ? ', ' + data.sys.country : ''}`;
    const desc = data.weather[0].description;
    const temp = Math.round(data.main.temp);
    const text = `Weather in ${name}: ${desc}. Temperature ${temp} degrees Celsius.`;
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(ut);
  } catch(e){ console.warn('TTS failed', e); }
}

function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
'@ | Set-Content -Path .\script.js -Encoding UTF8'


