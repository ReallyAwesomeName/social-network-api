// controllers/userController.js

const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    // get all users
    User.findAll()
      .then((users) => res.json(users))
      .catch((err) => res.status(422).json(err));
  },
  // get one user by _id
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId });
  },
  // post a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(422).json(err));
  },
  // update a user by _id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(422).json(err));
  },
  // delete a user by _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => res.json(user))
      .catch((err) => res.status(422).json(err));
  },
  // add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(422).json(err));
  },
  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = userController;
