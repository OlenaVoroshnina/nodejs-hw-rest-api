const mongoose = require('mongoose');
const app = require('./app');
// const dotenv = require('dotenv');
// dotenv.config();

const {DB_HOST, PORT = 3000} = process.env;

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(PORT, () => {
    console.log('Database connection successful');
  })
})
.catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
