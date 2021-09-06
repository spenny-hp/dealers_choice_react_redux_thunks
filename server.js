const express = require("express");
const { Photo } = require('./db')
const app = express();
const path = require("path");

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

const port = process.env.PORT || 3000;

app.get("/api/photos", async (req, res, next) => {
    try {
      const restaurants = await Photo.findAll();
      console.log(JSON.stringify(restaurants, null, 2));
      res.send(restaurants);
    } catch (err) {
      next(err);
    }
  });

  app.listen(port, () =>
  console.log(`
  
  
  
  listening on port ${port} @ http://localhost:3000
  
  
  
  `)
);