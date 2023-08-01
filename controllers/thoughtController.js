// controllers/thoughtController.js

const { User, Thought } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body).then((thoughtData) => {
      User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      )
        .then((userData) =>
          !userData
            ? res.status(404).json({ message: "No user found with this id" })
            : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    });
  },

  updateThoughtById(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought found with this id" })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThoughtById(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "No thought found with this id" })
          : res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id" });
        } else {
          res.json(userData);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
