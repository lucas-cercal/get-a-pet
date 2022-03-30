const Pet = require('../models/Pet');

module.exports = class PetController{
    // Create a pet
    static async create (req, res){
        res.json({message: 'Deu certo.'});
    }
}