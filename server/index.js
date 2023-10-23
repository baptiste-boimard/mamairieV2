require(`dotenv`).config();
const debug = require(`debug`)(`SERVER`);
const PORT = process.env.PORT || 3030;
const express = require(`express`);
const router = require(`./app/routers/router`);
const handleError = require(`./app/handlers/handleError`);
const deleteIp = require(`./app/middleware/deleteIp`);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET, PATCH, PUT, POST, DELETE, OPTIONS, HEAD`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With,Content-Type,Authorization, Accept`);
  res.header(`Access-Control-Allow-Credentials`, true);
  next();
});

app.use(router);
app.use(express.static(`docs`));
app.use(deleteIp.deleteIp);

app.use(handleError);

app.listen(PORT, () => {
  debug(`Listening on http://localhost:${PORT} `);
});

module.exports = app;
