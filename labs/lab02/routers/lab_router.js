/*
  /name
  /greeting
  /add
  /calculate
*/

import express from "express";

const router = express.Router()

// Checking if in route
router.get("/", (req, res) => {
  res.send("Welcome to the lab router")
})

// name route
router.get("/name", (req, res) => {
  res.send("Freddy Higa")
})

//greetings
router.get("/greeting", (req, res) => {
  res.send("Freddy Higa, N01547170")
})

// add
router.get("/add/:x/:y", (req, res) => {
  let x = parseFloat(req.params.x)
  let y = parseFloat(req.params.y)
  res.send(`${x + y}`)
})

// Calculate
router.get("/calculate/:a/:b/:operation", (req, res) => {
  let a = parseFloat(req.params.a)
  let b = parseFloat(req.params.b)
  let operation = req.params.operation
  let result = 0;

  switch (operation) {
    case "+":
      result = a + b;
      break;

    case "-":
      result = a - b;
      break;

    case "*":
      result = a * b;
      break;

    // Division -> %2f 
    case "/":
      if (b == 0) {
        res.send("Division by 0 is not allowed")
        return
      } else {
        result = a / b;
      }
      break;

    case "**":
      result = a ** b;
      break;

    default:
      res.send("Invalid Operator")
      break;
  }
  res.send(`${result}`)

})

export default router;