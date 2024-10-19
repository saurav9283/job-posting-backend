
exports.BaseRepository = class base_repository {
    constructor({ model }) {
        this.model = model;
    }
    async _create(payload) {
        const data = new  this.model(payload);
        const response = await data.save();
        return response;
    }

    async find_all(criteria, projections ={_id:0}, options = {}){
        if(!Object.hasOwnProperty.call(options, "lean")) options.lean = true;
        const response = await this.model.find(criteria, projections, options);
        return response;
    }

    async _findOne(criteria, projections = {}, options = {}) {
        const response = await this.model.findOne(criteria, projections, options);
        return response;
    }

};
