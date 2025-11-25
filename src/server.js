import http from "http";

/**
 * Trabalhando http status code
 * Por padrão, as requisições retornam 200: ok.
 *
 * Códigos de 100 - 199 são respostas informacionais, acabamos não usando
 * De 200 - 299 são os códigos que indicam sucesso
 * Entre 300 - 399 são mensagens de redirecionamento
 * Já 400 - 499 são erros do cliente
 * E 500 - 509 são erros do servidor, erros inesperados
 */

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  if (method == "GET" && url == "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method == "POST" && url == "/users") {
    const { name, email } = req.body;

    users.push({
      id: users.length + 1,
      name,
      email,
    });

    return res.writeHead(201).end();
  }

  //Fallback
  return res.writeHead(404).end("Not Found");
});

server.listen(3000);
