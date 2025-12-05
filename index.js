const dictionary = {
  "హలో": "Hello",
  "నమస్తే": "Hello",
  "ప్రేమ": "Love",
  "ఆహారం": "Food",
  "నీరు": "Water",
  "నేను బాగున్నాను": "I am fine",
  "మీరు ఎలా ఉన్నారు": "How are you",
  "ధన్యవాదాలు": "Thank you"
};

document.getElementById("btn").addEventListener("click", function() {

  const input = document.getElementById("inputText").value.trim();
  const output = document.getElementById("outputText");

  if (dictionary[input]) {
    output.innerText = dictionary[input];
  } else {
    output.innerText = "Word not found in dictionary";
  }

});
