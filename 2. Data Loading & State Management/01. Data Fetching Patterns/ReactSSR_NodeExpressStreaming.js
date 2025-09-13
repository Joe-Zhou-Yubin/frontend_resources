// server.ts (minimal idea)
import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App"; // your React tree

const app = express();

app.get("/products", async (req, res) => {
  // Fetch data server-side
  const data = await fetch("https://api.example.com/products").then(r => r.json());

  // Render React to a stream; start sending HTML early
  const { pipe } = renderToPipeableStream(<App initialData={data} />, {
    onShellReady() {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      pipe(res); // stream HTML to the client
    },
  });
});

app.listen(3000);
