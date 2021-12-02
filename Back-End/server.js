const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");

const app = express();

// app.use(bodyParser.json());
app.use(express.json());
const mongo_url = "mongodb://localhost:27017";
const dataBase = "contactsDB";
MongoClient.connect(mongo_url, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, "data base connection failed");
  const db = client.db(dataBase);

  app.post("/add_contact", (req, res) => {
    let newContact = req.body;
    db.collection("contacts").insertOne(newContact, (err, data) => {
      if (err) res.send("cant add product");
      else {
        res.send("product added Successfully");
      }
    });
  });

  app.get("/contacts", (req, res) => {
    db.collection("contacts")
      .find()
      .toArray((err, data) => {
        if (err) res.send("can't get contacts");
        else res.send(data);
      });
  });

  app.put("/update_contact/:id", (req, res) => {
    let id = ObjectID(req.params.id);
    let modifiedContact = req.body;
    db.collection("contacts").findOneAndUpdate(
      { _id: id },
      { $set: { ...modifiedContact } },
      (err, data) => {
        if (err) {
          res.send("cant modify contact");
        } else res.send(data.value);
      }
    );
  });

  app.delete("/delete_contact/:id", (req, res) => {
    let contactToRemoveId = ObjectID(req.params.id);
    db.collection("contacts").findOneAndDelete(
      { _id: contactToRemoveId },
      (err, data) => {
        if (err) res.send("cant delete contact");
        else res.send("contact deleted successfully");
      }
    );
  });
});

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) console.log("server error");
  else console.log(`server is running on port ${port}`);
});
