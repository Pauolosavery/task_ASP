/* eslint-disable max-len */
const userRoutes = require('express').Router();
const { User, Position } = require('../../db/models');

userRoutes
  .route('/list')
  .get(async (req, res) => {
    try {
      const users = await User.findAll({
        raw: true,
        include: [User.Position],
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ errorMessage: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { fullname, jobTitle } = req.body;
      const thisUser = await User.findOne({ where: { fullname } });
      if (thisUser) {
        res.json({ message: 'Такой сотрудник уже в списке' });
      } else {
        const newJob = await Position.create({ jobTitle });
        await User.create({
          fullname,
          positionId: newJob.id,
        });
        const messageCompletedSuccessfully = 'Сотрудник успешно добавлен в список.';
        res.status(200).json({ messageCompletedSuccessfully });
      }
    } catch (err) {
      res.status(500).json({ errorMessage: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const {
        id, fullname, jobTitle,
      } = req.body;
      const thisUser = await User.findOne({ where: { fullname } });
      if (!thisUser) {
        await User.update({
          fullname,
        }, {
          where: { id },
        });
        await Position.update({
          jobTitle,
        }, {
          where: { id: thisUser.id },
        });
        const messageCompletedSuccessfully = 'Данные сотрудника успешно изменёны';
        res.status(200).json({ messageCompletedSuccessfully });
      } else if (thisUser.id !== id) {
        res.status(400).json({ errorMessage: 'Такой сотрудник уже есть в списке' });
      }
    } catch (err) {
      res.status(500).json({ errorMessage: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const {
        id, webApi,
      } = req.body;
      if (process.env.API_KEY !== webApi.API_KEY) {
        const errorPut = 'К сожалению, изменять данные сотрудника можно только через Веб-приложение';
        res.status(500).json({ errorPut });
      } else {
        const delUser = await User.findOne({
          where: { id },
        });
        const delUserJob = await Position.findOne({
          where: { id: delUser.positionId },
        });
        await delUser.destroy();
        await delUserJob.destroy();
        const messageCompletedSuccessfully = `Cотрудника ${delUser.fullname} больше нет в списке`;
        res.status(200).json({ messageCompletedSuccessfully });
      }
    } catch (err) {
      res.status(500).json({ errorMessage: err.message });
    }
  });
module.exports = userRoutes;
