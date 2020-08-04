var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors())

app.listen(8083, () => {
    console.log("Server running on port 8083");
});

app.post("/token", (req, rest) => {
    console.log("Post received");
    return rest.status(200).send({
        token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZSI6IlJPTEVfVVNFUiIsImFwcG5hbWUiOiJOT1RFU19BUFAiLCJjcmVhdGVkIjoxNTgyMjM4NzU2ODIzLCJleHAiOjE2NDUzNTI2NjB9.Anvc8an9A7W8t4k5Z3_Uq9gkzfx3LYk3NFwNgUDneVY'
    });
});