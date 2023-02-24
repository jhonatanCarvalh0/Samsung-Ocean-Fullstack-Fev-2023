const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

//const dbURL = "mongodb://127.0.0.1:27017";
const dbURL =
  "mongodb+srv://Admin:bBUpJYxi6sbqVApG@cluster0.co4nsd8.mongodb.net/";
const dbName = "steven-universe-database";

async function main() {
  // Database connection
  console.log("Connecting with database...");
  const client = await MongoClient.connect(dbURL); // connecta com o SGBD
  const db = client.db(dbName); // Conecta com db
  const collection = db.collection("characters"); // conecta com a tabela
  console.log("Database connected sucessfully!");

  //Database functions - Collection Itens
  const findAllItens = async () => collection.find({}).toArray();
  const findOneCharacter = async (_id) =>
    collection.findOne({ _id: new ObjectId(_id) });
  const createCharacter = async (data) => collection.insertOne(data);
  const updateOneCharacter = async (_id, UpdatedData) =>
    collection.updateOne({ _id: new ObjectId(_id) }, { $set: UpdatedData });
  const removeCharacter = async (_id) =>
    collection.deleteOne({ _id: new ObjectId(_id) });

  const app = express();
  app.use(cors());
  //Averthing express receive gonna be read as JSON
  app.use(express.json());

  // CRUD - Itens
  //Endpoint Create - OK
  app.post("/characters", async function (req, res) {
    const CharacterData = req.body;

    await createCharacter(CharacterData);
    res.send("Character created sucessfully!");
  });

  //Endpoint Read all - OK
  app.get("/characters", async function (req, res) {
    const documents = await findAllItens();
    res.send(documents);
  });

  //Endpoint Read Single - OK
  app.get("/characters/:id", async function (req, res) {
    const { id } = req.params;

    const CharacterFound = await findOneCharacter(id);
    res.send(CharacterFound);
  });

  //Endpoint Update - OK
  app.put("/characters/:id", async function (req, res) {
    const { id } = req.params;
    const newCharacterName = req.body;

    await updateOneCharacter(id, newCharacterName);

    res.send(`Character updated sucessfully!`);
  });

  //Endpoint Delete - OK
  app.delete("/characters/:id", async function (req, res) {
    const { id } = req.params;

    await removeCharacter(id);
    res.send(`Character Deleted Sucessfully!`);
  });

  //Endpoint / -> Hello World! and Endpoint /oi -> Olá Mundo!
  app.get("/", function (req, res) {
    res.send(`Hello World!`);
  });

  //port
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log(`Servidor rodando na porta: ${PORT}`);
  });
}
main();
