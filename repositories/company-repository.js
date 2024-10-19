const { company } = require("../models");
const { BaseRepository } = require("./base-repository");


class CompanyRepository extends BaseRepository {

    async create(payload) {
        return await this._create(payload);
    }

    async get(criteria) { 
        return await this._findOne(criteria);
    }

    async update(criteria, payload) { }
    

}

module.exports = new CompanyRepository({  model: company });