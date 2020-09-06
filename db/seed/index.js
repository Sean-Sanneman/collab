const artistSeeder = require('./seed-artist');
const bandSeeder = require('./band-seed');
const sequelize = require('../../config/connection');

(async () => {
    await sequelize.sync({ force: true });
    await bandSeeder();
    await artistSeeder();
    await sequelize.close();
})();