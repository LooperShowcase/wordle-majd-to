const express = require("express");

const server = express();

const theAnswer = "tacos";

server.get("/guess/:word", (Request, Response) => {
  const useWord = Request.params.word;
  let answer = [];
  for (let i = 0; i < useWord.length; i++) {
    const ch = useWord[i];
    if (ch == theAnswer[i]) {
      answer.push(1);
    } else if (theAnswer.includes(ch)) {
      answer.push(0);
    } else {
      answer.push(-1);
    }
  }
  Response.json(answer);
});

server.use(express.static("public"));

server.listen(3000, () => {
  console.log("server is running on 3000");
});
