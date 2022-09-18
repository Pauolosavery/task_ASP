require('dotenv').config();

const wepApiRoutes = require('express').Router();

wepApiRoutes.get('/', (req, res) => {
  const { API_KEY } = process.env;
  res.status(200).json({ API_KEY });
});
module.exports = wepApiRoutes;
