const express = require('express'); // instanciar express para Rotas
const mongoose = require('mongoose'); //instanciar Banco de Dados
const cors = require('cors');

require('./models/metas'); //incluir o arquivo metas
const Meta = mongoose.model('Meta'); //para utilizar esta models

const app = express(); //executar a função express para o nome 'app'

app.use(express.json()); //receber dados das rotas post(neste exemplo)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Com o * qualquer aplicativo pode fazer requisição.
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
})
//Genova31
//connexão Umbler com banco de dados MongoDB
mongoose.connect('mongodb://anderson:Genova31@mongo_celke:27017/celke', {
 //connexão Localhot com banco de dados MongoDB   
//mongoose.connect('mongodb://localhost:27017/celke', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com BD MongoDB realizado com sucesso!");
}).catch((err) => {
    console.log("Erro: Conexão com o BD MongoDB não realizado com sucesso: " + err);
});
//---------------------------------------------------------------------------

//rota com o comndo get(enviando)
app.get('/metas', async (req, res) => {
    await Meta.find({}).then((metas)=> {
        return res.json({
            error: false,
            metas
        });
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum registro encontrado!"
        });
    });
});

//rot com o comando post(Recebenco)
app.post('/metas', async (req, res) => {
    await Meta.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Meta não cadastrado com sucesso!"
        });
    });

    return res.json({
        erro:false,
        message: "Meta cadastrada com sucesso!!"
       })
});

//modelo de conexão local

//porta onde foi instanciado o app
// app.listen(8080, () => {
//     console.log("Servidor iniciado na porta 8080: http://localhost:8080");
// });

//modelo de conexão na Umbler
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Servidor iniciado na porta " + port + ": http://api-anderson-souza-nom-br.umbler.net");
});