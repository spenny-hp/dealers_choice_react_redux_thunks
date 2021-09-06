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

syncAndSeed();

module.exports = {
  Photo
};
