// routes/api/thoughtRoutes.js

const router = require("express").Router();

const thoughtController = require("../../controllers/thoughtController");

router
  .route("/")
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router
  .route("/:thoughtId")
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThoughtById)
  .delete(thoughtController.deleteThoughtById);

router
  .route("/:thoughtId/reactions")
  .post(thoughtController.addReaction)
  .delete(thoughtController.deleteReactionById);

module.exports = router;
