const express = require('express')
const cors = require('cors')

const server = express()

server.use(cors({
    origin: '*'
  }));
server.use(express.static('public'));


server.listen(3000, ()=>{
    console.log('Web Server iniciou com sucesso')
})