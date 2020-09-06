const {Band} = require('../models');

const bandData = [
    {
        bandName: "testBand",
        genre: "pop"
    }
];

module.exports = () => Band.bulkCreate(bandData);