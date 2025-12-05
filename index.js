const dictionary = {
    "హలో": "Hello",
    "నమస్తే": "Hello",
    "నీ పేరు ఏమిటి": "What is your name",
    "నాకు సహాయం కావాలి": "I need help",
    "ధన్యవాదాలు": "Thank you",
    "శుభోదయం": "Good Morning",
    "శుభరాత్రి": "Good Night",
    "నేను బాగున్నాను": "I am fine",
    "మీరు ఎలా ఉన్నారు": "How are you",
    "ప్రేమ": "Love",
    "ఆహారం": "Food",
    "నీరు": "Water"
};

function translateText() {
    let input = document.getElementById("inputText").value.trim();
    let output = document.getElementById("outputText");

    if (dictionary[input]) {
        output.innerText = dictionary[input];
    } else {
        output.innerText = "Translation not found in dictionary.";
    }
}
