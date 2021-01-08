const mongoose = require('mongoose'); //instanciar Banco de Dados
const { Schema } = mongoose;

const meta = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String
    }
},{
    timestamps: true
});

//const schema = new mongoose.Schema({ name: 'string', size: 'string' });
mongoose.model('Meta', meta);