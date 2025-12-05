// index.js (ES module)
const API_URL = '/api/translate'; // change this if your endpoint differs (e.g. https://your-app.vercel.app/api/translate)

const preset = document.getElementById('preset');
const inputText = document.getElementById('inputText');
const backendSelect = document.getElementById('backend');
const translateBtn = document.getElementById('translateBtn');
const outputDiv = document.getElementById('output');
const metaDiv = document.getElementById('meta');
const copyBtn = document.getElementById('copyBtn');

// initialize textarea with selected preset
inputText.value = preset.value;
preset.addEventListener('change', () => {
  inputText.value = preset.value;
});

// simple helper to show status
function setStatus(text, isError = false) {
  outputDiv.textContent = text;
  outputDiv.style.color = isError ? '#B00020' : '';
}

// perform translation request
async function translate() {
  const text = inputText.value.trim();
  if (!text) {
    setStatus('Please enter text to translate.', true);
    return;
  }

  setStatus('Translating…');

  const payload = {
    text,
    source: 'te',
    target: 'en',
    backend: backendSelect.value
  };

  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const t = await resp.text();
      setStatus(`Server error: ${resp.status} ${t}`, true);
      metaDiv.textContent = '';
      return;
    }

    const data = await resp.json();

    // the API returns either {translation: "..."} or {error: "..."} or google's shape
    if (data.error) {
      setStatus(`Error: ${data.error}`, true);
      metaDiv.textContent = data.detail ? `detail: ${data.detail}` : '';
      return;
    }

    // handle different shapes
    let translation = '';
    if (typeof data === 'string') translation = data;
    else if (data.translation) translation = data.translation;
    else if (data.translatedText) translation = data.translatedText; // some libs
    else if (data.data && data.data.translations && data.data.translations[0]) {
      translation = data.data.translations[0].translatedText;
    } else if (Array.isArray(data) && data[0]) {
      // e.g. HF might return [{'translation_text': '...'}]
      const first = data[0];
      translation = first.translation_text || first.generated_text || JSON.stringify(first);
    } else {
      translation = JSON.stringify(data);
    }

    outputDiv.textContent = translation || '— no translation returned —';
    metaDiv.textContent = `Backend: ${backendSelect.value} • source: te → target: en`;
  } catch (err) {
    setStatus(`Network error: ${err.message}`, true);
    metaDiv.textContent = '';
  }
}

translateBtn.addEventListener('click', translate);

// copy output helper
copyBtn.addEventListener('click', async () => {
  const text = outputDiv.textContent;
  if (!text || text.startsWith('—')) return;
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => (copyBtn.textContent = 'Copy Output'), 1200);
  } catch {
    copyBtn.textContent = 'Copy failed';
    setTimeout(() => (copyBtn.textContent = 'Copy Output'), 1200);
  }
});

// allow Ctrl+Enter to translate
inputText.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    translate();
  }
});
