const Artist = require('./Artist');
const Band = require('./Band');


Band.hasMany(Artist, {as: 'artists'});

Artist.belongsTo(Band);


module.exports = {
    Artist,
    Band
}