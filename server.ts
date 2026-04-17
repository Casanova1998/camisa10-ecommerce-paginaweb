import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/v1/carrinho", (req, res) => {
    const { items, coupon } = req.body;
    console.log("Carrinho recebido:", { items, coupon });
    
    // Calculate total accounting for quantity
    const total = items.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 1)), 0);
    let discount = 0;
    if (coupon === "CAMISA10") {
      discount = total * 0.1;
    }

    res.json({ 
      success: true, 
      data: { 
        items, 
        coupon, 
        originalTotal: total,
        discount,
        finalTotal: total - discount
      } 
    });
  });

  app.post("/api/v1/enviar", (req, res) => {
    const { cart, customer } = req.body;
    console.log("Pedido finalizado:", { cart, customer });

    // In a real app, this would save to a database and trigger emails
    res.json({ 
      success: true, 
      orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
      message: "Pedido recebido com sucesso!" 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
