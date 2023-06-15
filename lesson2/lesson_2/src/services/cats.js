const { CatsRepository } = require("../repository");

class CatsService {
  constructor() {
    this.repository = {
      cats: new CatsRepository(),
    };
  }
  getAll() {
    const data = this.repository.cats.getAll();
    return data;
  }

  getById({ id }) {
    const data = this.repository.cats.getById(id);
    return data;
  }

  create(body) {
    const data = this.repository.cats.create(body);
    return data;
  }

  update({ id }, body) {
    const data = this.repository.cats.update(id, body);
    return data;
  }

  remove({ id }) {
    const data = this.repository.cats.remove(id);
    return data;
  }
}

module.exports = CatsService;
