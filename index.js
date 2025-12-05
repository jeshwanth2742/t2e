const API_URL = '/api/translate';

const inputText = document.getElementById('inputText');
const backendSelect = document.getElementById('backend');
const translateBtn = document.getElementById('translateBtn');
const outputDiv = document.getElementById('output');
const metaDiv = document.getElementById('meta');
const copyBtn = document.getElementById('copyBtn');

function setStatus(text, isError = false) {
  outputDiv.textContent = text;
  outputDiv.style.color = isError ? '#B00020' : '';
}

async function translate() {
  const text = inputText.value.trim();
  if (!text) {
    setStatus('Please enter Telugu text.', true);
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

    if (data.error) {
      setStatus(`Error: ${data.error}`, true);
      metaDiv.textContent = data.detail || '';
      return;
    }

    let translation = data.translation || data.translatedText || '';

    if (!translation && Array.isArray(data) && data[0]) {
      translation = data[0].translation_text || data[0].generated_text || '';
    }

    outputDiv.textContent = translation || '— no translation returned —';
    metaDiv.textContent = `Backend: ${backendSelect.value} • te → en`;

  } catch (err) {
    setStatus(`Network error: ${err.message}`, true);
  }
}

translateBtn.addEventListener('click', translate);

copyBtn.addEventListener('click', async () => {
  const text = outputDiv.textContent;
  if (!text || text.startsWith('—')) return;

  await navigator.clipboard.writeText(text);
  copyBtn.textContent = 'Copied ✅';
  setTimeout(() => (copyBtn.textContent = 'Copy Output'), 1000);
});

// Ctrl + Enter shortcut
inputText.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    translate();
  }
});
