const pic1 = require("../assets/fountain-images/eda-fountain1.jpeg");
const pic2 = require("../assets/fountain-images/island_park_1.jpeg");
const pic3 = require("../assets/fountain-images/trollwood_park_1.jpeg");
const pic4 = require("../assets/fountain-images/ftn-1.jpeg");

const testData = [
  {
    id: 1,
    coordinate: {
      latitude: 46.9249837,
      longitude: -96.8145239,
    },
    imagePath: pic4,
  },
  {
    id: 2,
    coordinate: {
      latitude: 46.8699271,
      longitude: -96.7905943,
    },
    imagePath: pic2,
  },
  {
    id: 3,
    coordinate: {
      latitude: 46.9243756,
      longitude: -96.7804359,
    },
    imagePath: pic3,
  },
  {
    id: 4,
    coordinate: {
      latitude: 46.87257304836294,
      longitude: -96.78109645843506,
    },
    imagePath: pic1,
  },
];

module.exports = {
  testData,
};
