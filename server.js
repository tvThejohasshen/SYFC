fetch("https://453raaitvf.execute-api.us-east-1.amazonaws.com/default", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log("OpenAI Response:", data.reply);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  