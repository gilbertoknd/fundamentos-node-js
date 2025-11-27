import fs from "fs/promises";

//Usaremos a import.meta.url, pois ela retorna exatamente a URL do arquivo atual
const databasePath = new URL("../db.json", import.meta.url);

//console.log(databasePath); //O .href retorna a URL do arquivo ao final
//Criando um banco de dados baseado em JSON
export class Database {
  #database = {}; //Definindo propriedade como privada para a classe

  //Método para carregar o banco de dados
  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        //Tratamento, caso o arquivo não exista, ele cria um arquivo vazio
        this.#persist();
      });
  }

  //Método para escrever nosso banco num arquivo físico, ele persiste os dados na pasta em que a aplicação está sendo executada
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  //Se já existe um array inserido na tabela, adicionamos o item, se não existir, cria um novo array com o item
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}
