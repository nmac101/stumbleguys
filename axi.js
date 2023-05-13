const axios = require('axios')
const fs = require('fs')

const resposta = async ()=>{
    const data =  await axios({
        url:'https://cdn.discordapp.com/attachments/522935291355332608/1106687485716729856/WebGL.data.unityweb',
        method: 'GET',
        responseType: 'stream'
    });
    return data

}
resposta().then(json =>{
    const write = fs.createWriteStream('./public/Build/WebGL.data.unityweb')
    json.data.pipe(write)
    write.on('finish',() => console.log('Tudo ok'))
}).catch(error =>{
    console.log(error)
})