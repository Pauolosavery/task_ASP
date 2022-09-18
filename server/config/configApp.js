/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
// const morgan = require('morgan');
const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const wepApiRoutes = require('../routes/api/wepApiRoutes');
const userRoutes = require('../routes/api/userRoutes');

module.exports = function configApp(app) {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.resolve('public')));
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));//
  app.use('/personal', userRoutes);
  app.use('/se8xcjl879apvmu', wepApiRoutes);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
};
