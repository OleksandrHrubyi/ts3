const appPort = require("../app");
const dbMain = require("../model/db");

const PORT = process.env.PORT || 3000;

db.then(() => {
  try {
    appPort.listen(PORT, () => {
      console.log("Database connection successful", PORT);
    });
  } catch (err) {
    console.log("Server is not running");
  }
});
