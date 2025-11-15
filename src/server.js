import http from 'http'

//Rotas no node.js
/**
 * CRUD de rotas para o usuário
 * Criar usuários
 * Listar usuários
 * Editar usuários
 * Remover usuários
 * 
 * HTTP
 * * Métodos HTTP: GET / POST / PUT / PATCH / DELETE 
 * * URL
 * 
 * GET para buscar um recurso
 * POST criar recurso
 * PUT editar um recurso
 * PATCH editar uma informação específica de um recurso
 * 
 * Exemplo de diferença entre PUT e PATCH:
 * Ao atualizar por exemplo o perfil inteiro, utilizamos o PUT, podemos mudar várias informações, nome, foto, email.
 * Já o PATCH, por exemplo, se o usuário quer receber uma notificação, ou não, é uma informação específica para ser atualizada.
 */

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method == 'GET' && url == '/users') {
    return res.end("Listagem de usuários")
  }

  if (method == 'POST' && url == '/users') {
    return res.end("Criação de usuários")
  }

  return res.end("Hello World")
})

server.listen(3000)
