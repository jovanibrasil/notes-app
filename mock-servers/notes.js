var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors())

app.listen(8082, () => {
    console.log("Server running on port 8082");
})

var notebook = {
    id: 1,
    name: 'ntb',
    numberOfNotes: 0
}

var notebooks = [notebook, notebook, notebook];

var note = {
    id: 1,
    title: "note",
    text: "text",
    notebookId: 1,
    lastModifiedOn: Date(),
    backgroundColor: ""
}

var notes = [note, note, note, 
    note, note, note, note, note, 
    note, note, note, note, 
    note, note, note, 
    note, note, note, note, note, 
    note, note, note, note];

app.get("/notes-api/notebooks", (req, rest) => {
    return rest.status(200).send({
        data: notebooks ,
        errors: []
    });
});

app.get("/notes-api/notes", (req, rest) => {
    return rest.status(200).send({
        data: notes ,
        errors: []
    });
});

