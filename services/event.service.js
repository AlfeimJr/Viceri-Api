const { v4: uuidv4 } = require("uuid");
class EventService {
  constructor() {
    // Simulação de banco de dados com uma lista de eventos
    this.events = [];
  }

  // Adicionar um novo evento
  createEvent(event) {
    if (!event.title || !event.startDate) {
      throw new Error("Campos obrigatórios ausentes");
    }
    event.id = uuidv4();
    this.events.push(event);
    return event;
  }

  // Atualizar um evento existente
  updateEvent(id, updatedEvent) {
    const eventIndex = this.events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
      throw new Error("Evento não encontrado");
    }
    this.events[eventIndex] = { id, ...updatedEvent };
    return this.events[eventIndex];
  }

  // Remover um evento
  deleteEvent(id) {
    const eventIndex = this.events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
      throw new Error("Evento não encontrado");
    }
    const [deletedEvent] = this.events.splice(eventIndex, 1);
    return deletedEvent;
  }

  // Listar todos os eventos
  getAllEvents() {
    return this.events;
  }

  // Obter evento por ID
  getEventById(id) {
    return this.events.find((event) => event.id === id) || null;
  }
}

module.exports = new EventService();
