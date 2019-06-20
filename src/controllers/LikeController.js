const Bolo = require('../models/Bolo');

module.exports={

    async likein(req, res){

        const bolo = await Bolo.findById(req.params.id);
            bolo.likes += 1;
               await bolo.save();

            return res.json(bolo);
    }


}