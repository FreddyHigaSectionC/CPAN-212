import http from "http";
import fs from "fs";
import path from "path";

const app = http.createServer((req, res) => {
  if (req.url === "/") {
    const home = fs.readFileSync(path.join("pages", "home.html"))
    res.end(home);
  }
  else if (req.url === "/about") {
    const about = fs.readFileSync(path.join("pages", "about.html"))
    res.end(about);
  }
  else if (req.url === "/product") {
    const product = fs.readFileSync(path.join("pages", "product.html"))
    res.end(product);
  }
  else if (req.url === "/cart") {
    const cart = fs.readFileSync(path.join("pages", "cart.html"))
    res.end(cart);
  }
  else if (req.url === "/contact") {
    const contact = fs.readFileSync(path.join("pages", "contact.html"))
    res.end(contact);
  }
  else {
    res.end("Page not found")
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})