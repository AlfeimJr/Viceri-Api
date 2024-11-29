const express = require("express");
const router = express.Router();
const EventService = require("../services/event.service");

router.post("/", (req, res) => {
  try {
    console.log("caiu aq");
    const newEvent = EventService.createEvent(req.body);

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const updatedEvent = EventService.updateEvent(req.params.id, req.body);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const deletedEvent = EventService.deleteEvent(req.params.id);
    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/", (req, res) => {
  const events = EventService.getAllEvents();
  res.status(200).json(events);
});

router.get("/:id", (req, res) => {
  const event = EventService.getEventById(req.params.id);
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).json({ message: "Evento não encontrado" });
  }
});

module.exports = router;
