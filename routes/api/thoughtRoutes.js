const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addTag,
  removeTag,
} = require('../../controllers/thoughtController');

// /api/Thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:ThoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/Thoughts/:ThoughtId/tags
router.route('/:ThoughtId/tags')
  .post(addTag);

// /api/Thoughts/:ThoughtId/tags/:tagId
router.route('/:ThoughtId/tags/:tagId')
  .delete(removeTag);

module.exports = router;
