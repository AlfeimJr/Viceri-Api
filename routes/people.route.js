const express = require("express");
const router = express.Router();
const {
  getPeople,
  getPersonById,
  addPerson,
  patchPeople,
  deletePeople,
} = require("../services/people.service");

router.get("/", getPeople);

router.get("/:id", getPersonById);

router.post("/add-person", addPerson);

router.put("/edit/:id", patchPeople);

router.delete("/delete/:id", deletePeople);

module.exports = router;
