const router = require("express").Router();
const helper = require("../helpers/helpers.js");
router.get("/notes", (req, res) => {
  helper
    .getNote()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});
router.post("/notes", (req, res) => {
  helper
    .createNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});
router.delete("/notes/:id", (req, res) => {
  const params = req.params.id
  helper.deleteNote(params).then(() => res.json())})

module.exports = router;