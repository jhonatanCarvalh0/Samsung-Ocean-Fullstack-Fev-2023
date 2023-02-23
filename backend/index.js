const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

//const dbURL = "mongodb://127.0.0.1:27017";
const dbURL =
  "mongodb+srv://Admin:bBUpJYxi6sbqVApG@cluster0.co4nsd8.mongodb.net/";
const dbName = "ocean-bancodedados-09-02-2023";

async function main() {
  // Database connection
  console.log("Connecting with database...");
  const client = await MongoClient.connect(dbURL); // connecta com o SGBD
  const db = client.db(dbName); // Conecta com db
  const collection = db.collection("itens"); // conecta com a tabela
  console.log("Database connected sucessfully!");

  //Database functions - Collection Itens
  const findAllItens = async () => collection.find({}).toArray();
  const findOneItem = async (_id) =>
    collection.findOne({ _id: new ObjectId(_id) });
  const createItem = async (data) => collection.insertOne(data);
  const updateOneItem = async (_id, UpdatedData) =>
    collection.updateOne({ _id: new ObjectId(_id) }, { $set: UpdatedData });
  const removeItem = async (_id) =>
    collection.deleteOne({ _id: new ObjectId(_id) });

  const app = express();
  app.use(cors());
  //Averthing express receive gonna be read as JSON
  app.use(express.json());
  const PORT = 3000;

  // CRUD - Itens
  //Endpoint Create - OK
  app.post("/itens", async function (req, res) {
    const itemData = req.body;

    await createItem(itemData);
    res.send("Item created sucessfully!");
  });

  //Endpoint Read all - OK
  app.get("/itens", async function (req, res) {
    const documents = await findAllItens();
    res.send(documents);
  });

  //Endpoint Read Single - OK
  app.get("/itens/:id", async function (req, res) {
    const { id } = req.params;

    const itemFound = await findOneItem(id);
    res.send(itemFound);
  });

  //Endpoint Update - OK
  app.put("/itens/:id", async function (req, res) {
    const { id } = req.params;
    const newItemName = req.body;

    await updateOneItem(id, newItemName);

    res.send(`Item updated sucessfully!`);
  });

  //Endpoint Delete - OK
  app.delete("/itens/:id", async function (req, res) {
    const { id } = req.params;

    await removeItem(id);
    res.send(`Item Deleted Sucessfully!`);
  });

  //Endpoint / -> Hello World! and Endpoint /oi -> Olá Mundo!
  app.get("/", function (req, res) {
    res.send(`Hello World!`);
  });

  //port
  app.listen(PORT, function () {
    console.log(`We are listening! Acess: http://localhost:${PORT}`);
  });
}
main();
