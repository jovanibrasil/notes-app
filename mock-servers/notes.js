var express = require("express");
var app = express();
var cors = require("cors");
const bodyParser = require('body-parser')

app.use(bodyParser.json())
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
    backgroundColor: "#3a5393"
}

var notes = [note, note, note, 
    note, note, note, note, note, 
    note, note, note, note, 
    note, note, note, 
    note, note, note, note, note, 
    note, note, note, note];

var colors = [];

app.get("/notes-api/notebooks", (req, rest) => {
    let page = req.params.page;
    let hasNext = true;
    if(page){
        begin = page * 9;
        end = begin + 9 < notebooks.length ? begin + 9 : notebooks.length -1;
    }else{
        begin = 0;
        end = notebooks.length;
    }

    if(end + 9 > notebook.length) {
        hasNext = false;
    }

    return rest.status(200).send({
        data: notebooks.slice(begin, end),
        hasNext, 
        errors: []
    });
});

app.get("/notes-api/notebooks/:notebookId/notes", (req, rest) => {
    let notebookId = req.params.notebookId;

    return rest.status(200).send({
        data: notes.slice(0, 5),
        hasNext: true,
        errors: []
    });
});

app.get("/notes-api/notes", (req, rest) => {
    let page = req.query.page;
    console.log(page);
    let hasNext = true;
    
    if(page != null && page < page + 9 < notes.length){
        begin = page * 9;
        end = begin + 9;
    }else{
        begin = page * 9;
        end = notes.length;
    }

    console.log(begin + " --- " + end);
    
    if(end + 9 > notes.length) {
        hasNext = false;
    }

    return rest.status(200).send({
        data: notes.slice(begin, end),
        hasNext,
        errors: []
    });
});

app.get("/notes-api/colorPallet", (req, rest) => {
    return rest.status(200).send({
        data: colors,
        errors: []
    });
})

app.post("/notes-api/colorPallet", (req, rest) => {
    colors = req.body;
    return rest.status(201).send();
})