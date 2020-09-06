const {Artist} = require('../models');

const artistData = [
    {
        firstName: "artist firstName",
        lastName: "artist lastName",
        phone: "123456789",
        email: "artist@gmail.com",
        city: "Oslo",
        country: "Norway",
        instrument: "guitar",
        username: "artist1234",
        password: "$2b$10$Ylo5sy6RLJCJ6qxYpf/JLeSnxRoG.3v27tbVIa7tRR6IPjK6KuDBO",
        band_id: 1
    }
];

module.exports = () => Artist.bulkCreate(artistData);

