const { job } = require("../models")
const { BaseRepository } = require("./base-repository");

class JobRepository extends BaseRepository {
    create(payload) {
        return this._create(payload);
    }
}

module.exports = new JobRepository({ model: job });
