import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    //O primeiro argumento do callback é o erro
    callback(null, Buffer.from(String(transformed)));
  }
}

//req -> ReadableStream
//res -> WritableStream

const server = http.createServer(async (req, res) => {
  const buffers = [];

  //A função do await aqui dentro de uma stream é aguardar cada pedaço ser retornado
  //Permite percorrer cada chunk e adicionar no array de buffers
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return res.end(fullStreamContent);
});

server.listen(3001);
