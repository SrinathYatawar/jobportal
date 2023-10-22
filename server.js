const express =require('express');
const cors = require('cors')

const mongodbConnect=require('./database/db');

mongodbConnect();

const app=express();

const HTTP=require('http').createServer(app);

const Port = process.env.PORT || 4000 ;

app.use(cors())
app.use(express.json());

app.use('/api/auth',require('./routers/auth'));
app.use('/api/fetch',require('./routers/jobs'));



HTTP.listen(Port);