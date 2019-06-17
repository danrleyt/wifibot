let configExpress = require('./src/config/express');
let db = require('./src/config/database');
const PORT = process.env.PORT || 5000;
const envs = require('dotenv');
const macReader = require('./src/api/controllers/macReader');

envs.load();

console.log(macReader('192.168.0.0', '254'));

let app = configExpress();

app.listen(PORT, '192.168.0.15', () => {
  console.log('Server running on ', PORT);
});

// db(
//   `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBURL}`
// );
