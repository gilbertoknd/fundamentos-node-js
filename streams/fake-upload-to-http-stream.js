import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 10) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i + "\n"));

        this.push(buf);
      }
    }, 1000);
  }
}

//Usando o fetch para enviar informação para o servidor
fetch("http://localhost:3001", {
  method: "POST",
  body: new OneToHundredStream(),
  //Opção para indicar que a requisição
  //é de envio (writable) mas não de recebimento simultâneo (readable)
  //na parte do body/stream.
  duplex: "half",
})
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    console.log(data);
  });
