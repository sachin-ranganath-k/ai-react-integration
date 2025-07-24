import React from "react";
import { endpoint } from "../constants";

function InputForm() {
  const [prompt, setPrompt] = React.useState("");

  const params = {
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    max_tokens: 250,
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    const body = { ...params, prompt };

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    console.log(data);
  };

  return (
    <div>
      Chatbot
      <form onSubmit={handlePromptSubmit}>
        <input
          type="text"
          name="prompt"
          placeholder="Enter Prompt"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InputForm;
