function translateText() {
  const input = document.getElementById("inputText").value.trim();
  const output = document.getElementById("outputBox");

  const dictionary = {
    "నమస్తే": "Hello",
    "మీరు ఎలా ఉన్నారు": "How are you?",
    "నా పేరు జెష్వంత్": "My name is Jeshwanth",
    "నాకు ఆకలిగా ఉంది": "I am hungry",
    "నేను కాలేజీకి వెళ్తున్నాను": "I am going to college",
    "ఇది చాలా మంచిది": "This is very good",
    "ధన్యవాదాలు": "Thank you",
    "శుభోదయం": "Good morning",
    "శుభ రాత్రి": "Good night"
  };

  if (input === "") {
    output.innerText = "Please enter Telugu text 😅";
    return;
  }

  const result = dictionary[input];

  if (result) {
    output.innerText = result;
  } else {
    output.innerText = "Translation not found in dictionary ❌";
  }
}
