const express = require("express");
const app = express();
const path = require("path");

const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize.DataTypes;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/photos"
);

const photos = [
  { name: "Ibis" },
  { name: "Palms in Biscayne" },
  { name: "Peacock" },
  { name: "Fire Under Sunset" },
  { name: "Lambo" },
  { name: "Rainbow Over Utah" },
  { name: "Palms in Sky" },
];

photos.forEach((photo) => {
  const link = photo.name.toLowerCase().replace(/ /g, "-");
  photo.imageLink = `./public/${link}.JPG`;
});

const Photo = conn.define("photo", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  imageLink: {
    type: STRING,
    allowNull: false,
  },
});

async function syncAndSeed() {
  await conn.sync({
    force: true,
  });
  await Promise.all(
    photos.map((photo) => {
      Photo.create({ name: photo.name, imageLink: photo.imageLink });
    })
  );
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));
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

const init = async () => {
  app.listen(port, () =>
    console.log(`
    listening on port ${port} @ http://localhost:3000
    
    `)
  );
  await syncAndSeed();
};

init();
