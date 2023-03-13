const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUsers,
  updateUser,
  getUser,
  deleteUser,
} = require('./../controller/users.controller');

router.route('/').get(getAllUsers).post(createUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
