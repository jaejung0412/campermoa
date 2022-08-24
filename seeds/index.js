const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/campermoa", {
  useNewUrlParser: true,
  //   useCreateIndex: true, -> 지원 안됨.
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "연결 에러 발생:"));
db.once("open", () => {
  console.log("데이터베이스 연결됨");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 150) * 1000;
    const camp = new Campground({
      author: "62fba041d98cf31224e68bf1",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      description: "좋은 곳",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dcij2hiq0/image/upload/v1661261909/Campermoa/ksptadhu9rw0v454ndkz.jpg",
          filename: "Campermoa/ksptadhu9rw0v454ndkz",
        },
        {
          url: "https://res.cloudinary.com/dcij2hiq0/image/upload/v1661261911/Campermoa/ogrn1qckjycdhnvgl4jy.jpg",
          filename: "Campermoa/ogrn1qckjycdhnvgl4jy",
        },
        {
          url: "https://res.cloudinary.com/dcij2hiq0/image/upload/v1661261913/Campermoa/vu6z6tmtw21da3s13z24.jpg",
          filename: "Campermoa/vu6z6tmtw21da3s13z24",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
