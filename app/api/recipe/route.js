export async function POST(req) {
  const { ingredients } = await req.json();

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCVeBTjvt08a__H6vop6P2SfyKEd8LIWzM",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Creează o rețetă simplă folosind aceste ingrediente: ${ingredients}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const recipe =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (recipe) {
      return Response.json({ recipe });
    }

    // fallback dacă AI nu merge
    return Response.json({
      recipe: `
🍳 Rețetă simplă

Ingrediente:
- ${ingredients}

Pași:
1. Pregătește ingredientele.
2. Gătește-le într-o tigaie timp de 10 minute.
3. Adaugă condimente după gust.
4. Servește cald.

Poftă bună!
      `
    });

  } catch (error) {
    return Response.json({
      recipe: `
🍳 Rețetă simplă

Ingrediente:
- ${ingredients}

Pași:
1. Pregătește ingredientele.
2. Gătește-le într-o tigaie timp de 10 minute.
3. Servește cald.

Poftă bună!
      `
    });
  }
}