const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000
const {mogoUrl} = require('./keys')


require('./models/User');
require('./models/Evaluation');
require('./models/Tache');
require('./models/Pub');
require('./models/Reclamation');
mongoose.set('useCreateIndex', true);
const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
const evaRoutes = require('./routes/EvaRoutes')
const tacheRoutes = require('./routes/TacheRoutes')
const pubRoutes = require('./routes/PubRoutes')
const recRoutes = require('./routes/RecRoutes')


app.use(bodyParser.json())
app.use(authRoutes)
app.use('/evas', evaRoutes);
app.use('/taches', tacheRoutes);
app.use('/pubs', pubRoutes);
app.use('/recs', recRoutes);
mongoose.set('useFindAndModify', false);
mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})

mongoose.connection.on('error',(err)=>{
    console.log("this is error",err)
})



app.get('/',requireToken,(req,res)=>{
    res.send({email:req.user.email})
})

app.listen(PORT,()=>{
    console.log("server running "+PORT)
})