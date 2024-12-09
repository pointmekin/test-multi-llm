import { Elysia, error, t } from "elysia";
import ollama from "ollama";

const app = new Elysia()
  .get("/", () => "Hello Elysia 2")
  .get("/ask", () => "Hello Elysia 3")
  .post(
    "/ask",
    async ({ body }) => {
      console.log(body);
      const { query } = body;

      try {
        const response = await ollama.chat({
          model: "product-owner-llm",
          messages: [{ role: "user", content: query }],
        });

        return { reply: response.message.content };
      } catch (e) {
        return error(500, "Error interacting with the model");
      }
    },
    {
      body: t.Object({
        query: t.String(),
      }),
    }
  )
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}.`
);
