import { Readable, Writable, Transform } from 'node:stream'

/**
 * Criando streams de exemplo
 */

//Stream de leitura
class OneToHundredStream extends Readable {
  index = 1
  
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i+'\n'))
  
        this.push(buf)
      }
    }, 1000)
  }
}

//Stream de escrita
class MultiplyByTenStream extends Writable { 
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

//Stream de transformação
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    //O primeiro argumento do callback é o erro
    callback(null, Buffer.from(String(transformed)))
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
