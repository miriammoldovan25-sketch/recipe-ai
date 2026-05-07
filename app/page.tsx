"use client";

import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateRecipe() {
    setLoading(true);
    setRecipe("");

    const res = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients })
    });

    const data = await res.json();
    setRecipe(data.recipe);
    setLoading(false);
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🍳 AI Recipe Generator</h1>

      <textarea
        rows={4}
        style={{ width: "100%", marginTop: 10 }}
        placeholder="ex: ouă, brânză, roșii"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <button onClick={generateRecipe} style={{ marginTop: 10 }}>
        Generează rețetă
      </button>

      {loading && <p>Se generează...</p>}

      {recipe && (
        <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
          {recipe}
        </pre>
      )}
    </main>
  );
}