import React, { useState } from "react";
import { endpoint } from "../constants";

function InputForm() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const params = {
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    max_tokens: 10,
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...params,
      messages: [{ role: "user", content: prompt }],
    };

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json();
    setResult(data.choices?.[0]?.message?.content);
  };

  const resetForm = () => {
    setPrompt("");
    setResult("");
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <form onSubmit={handlePromptSubmit}>
        <input
          type="text"
          name="prompt"
          value={prompt}
          placeholder="Enter Prompt"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={resetForm}>Reset</button>
      <p>Result</p>
      {result && <p>{result}</p>}
    </div>
  );
}

export default InputForm;
