const LINE_COUNT = 6;
const CHAR_COUNT = 5;

const uncleWorld = document.getElementById("words");

for (let i = 0; i < LINE_COUNT; i++) {
  const wordDiv = document.createElement("div");

  wordDiv.className = "word";
  for (let j = 0; j < CHAR_COUNT; j++) {
    const chardiv = document.createElement("div");
    chardiv.className = "char";
    wordDiv.appendChild(chardiv);
  }

  uncleWorld.appendChild(wordDiv);
}
let currentChar = 0;
let currentWord = 0;
document.addEventListener("keydown", async (event) => {
  const firstWord = uncleWorld.children[currentWord];

  if (event.code == "Enter") {
    if (currentChar == CHAR_COUNT) {
      const answer = getCurrentWord();
      const res = await guess(answer);
      colorize(res);
      currentWord++;
      currentChar = 0;
    }
  } else if (event.code == "Backspace") {
    if (currentChar > 0) {
      currentChar--;
      firstWord.children[currentChar].innerHTML = "";
    }
  } else if (currentChar < CHAR_COUNT) {
    firstWord.children[currentChar].innerHTML = event.key;
    currentChar++;
  } else {
    alert("no more");
  }
});

async function guess(word) {
  const Request = await fetch("/guess/" + word);
  const result = await Request.json();
  return result;
}
function getCurrentWord() {
  var word = "";
  var wordDiv = document.getElementById("words").children[currentWord];
  for (var i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
}
function colorize(results) {
  const wordDiv =
    document.getElementById("words").children[currentWord].children;
  for (let i = 0; i < results.length; i++) {
    if (results[i] == 1) {
      wordDiv[i].style.backgroundColor = "green";
    } else if (results[i] == 0) {
      wordDiv[i].style.backgroundColor = "yellow";
    } else {
      wordDiv[i].style.backgroundColor = "gray";
    }
  }
}
