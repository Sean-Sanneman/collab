const app = require("./app");
const sequelize = require("./config/connection");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
