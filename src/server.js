// Pouco utilziado hoje em dia, o CommonJS, padrão de importação utilizando o require
//const http = require('http')
//ESModule é o mais utilizado atualmente, com import/export, porém não suportado por padrão pelo node.js, 
//Por isso mudamos o type:"commonjs" para type:"module" no package.json
import http from 'http'

/**
 * @param request: É a requisição de quem estiver utilizando o servidor, para pegar informações por exemplo
 * @param response: É a resposta dada pelo servidor para o cliente
 */
const server = http.createServer((request, response) => {
  return response.end("Hello World")
})

//Atrelando a porta ao server
server.listen(3000)
