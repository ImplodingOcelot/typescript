// TRANS RIGHTS
import express from "express";
import * as fs from 'fs';
import WebSocketServer from "ws";
import cors from "cors";
let activeUsers = {
    "text.txt": "abc123",
};
// make array for activeUsersOnCooldown
let activeUsersOnCooldown = [
    "abc123",
];
function removeElementAfterCooldown(activeUsersOnCooldown, elementToRemove, cooldownTimeInSeconds) {
    setTimeout(() => {
        const index = activeUsersOnCooldown.indexOf(elementToRemove);
        if (index !== -1) {
            activeUsersOnCooldown.splice(index, 1);
        } else {
            console.log("Element not found");
        }
    }, cooldownTimeInSeconds * 1000);
}
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(cors())
let option = "masu";
var bodyParser = require('body-parser');
app.use(bodyParser.json());
let tense = 2;
import { conjugateJapanese } from "./src/japaneseConjugatorServer.js";
app.use(express.json());
// CLIENT SIDE
app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/index.html");
});
app.get("/spanishConj", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/spanishConjugator.html");
})
app.get("/spanishConjugator.js", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/spanishConjugator.js");
})
app.get("/index.css", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/index.css");
})
app.get("/japaneseConj", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/japaneseConjugator.html");
})
app.get("/japaneseConjugator.js", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/japaneseConjugator.js");
})
app.get("/conjugateJapaneseServer", (req, res) => {
    let root = req.query.root as string;
    let verPosorNeg = req.query.verPosorNeg == "true";
    let tense = req.query.tense as string;
    let tenseNum = parseInt(tense);
    let conjugatedVerb = conjugateJapanese(root, option, verPosorNeg, tenseNum);

    res.status(200).send(conjugatedVerb);
});
app.get("/changeJapaneseConjOption", (req, res) => {
    option = req.query.option as string;
    console.log("option = " + option);
    res.status(200).sendFile(__dirname + "/client/japaneseConjugator.html");
});
app.get("/changeJapaneseTense", (req, res) => {
    tense = parseInt(req.query.tense as string);
    console.log("tense = " + tense);
    res.status(200).sendFile(__dirname + "/client/japaneseConjugator.html");
});
app.get("/textEditor", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/editorPage.html");
});
app.get("/editorPage.js", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/editorPage.js");
});
// SERVER SIDE
app.post("/write", (req, res) => {
    const { text, filename, key } = req.body;
    console.log(text, filename, key);
    let tester = fs.readFileSync(__dirname + "/key.txt", "utf8");
    if (key != tester) { res.status(403).send("Wrong key!"); return; }
    fs.writeFile(__dirname + "/src/storage/" + filename, text, function (err) {
        if (err) throw res.status(500).send(err);
        console.log('Saved!');
        res.status(200).send("Saved!");
    });
});
app.get("/read", (req, res) => {
    // make test url
    // http://localhost:8000/read?filename=hello.txt
    res.status(200).sendFile(__dirname + "/src/storage/" + req.query.filename as string);
});
const wss = new WebSocketServer.Server({ port: 8080 });
wss.on('connection', (ws, req) => {
    ws.on("message", (message) => {
        try {
            let text: string;
            let filename = JSON.parse(message.toString()).filename;
            let data = JSON.parse(message.toString()).data;
            let key = JSON.parse(message.toString()).key;
            let userid = req.socket.remoteAddress + req.socket.remotePort;
            if (activeUsers[filename] != userid && !activeUsersOnCooldown.includes(userid)) {
                let lastUser = activeUsers[filename];
                // add userid to activeUsersOnCooldown
                activeUsersOnCooldown.push(lastUser);
                removeElementAfterCooldown(activeUsersOnCooldown, lastUser, 4);
                activeUsers[filename] = userid;
                console.log("User " + userid + " is now active on file " + filename);
                console.log(activeUsers);
            } else {
                console.log("User ") + userid + " failed to gain active user status on file " + filename;
            }
            if (activeUsers[filename] == userid) {
                if (key == fs.readFileSync(__dirname + "/key.txt", "utf8")) {
                    fs.writeFileSync(__dirname + "/src/storage/" + filename, data);
                    console.log("Saved E");
                }
            }
            text = fs.readFileSync(__dirname + "/src/storage/" + filename, "utf8");
            ws.send(JSON.stringify({ text: text }));
        } catch (error) {
            console.log(error);
            ws.send("Error: " + error);
        }
    });
});
app.get("/delete", (req, res) => {
    // make test url
    // http://localhost:8000/delete?filename=hello.txt&key=testing
    let key = req.query.key as string;
    let tester = fs.readFileSync(__dirname + "/key.txt", "utf8");
    if (key != tester) { res.status(403).send("Wrong key!"); return; }
    fs.unlink(__dirname + "/src/storage/" + req.query.filename as string, function (err) {
        if (err) throw res.status(500).send(err);
        console.log('File deleted!');
        res.status(200).send("File deleted!");
    });
});
app.get("/fileList.js", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/fileList.js");
});
app.get("/fileList", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/fileList.html");
});
app.get("/fileListData", (req, res) => {
    let files = fs.readdirSync(__dirname + "/src/storage/");
    console.log(files);
    if (files.length == 0) res.status(200).send("No files stored yet!");
    res.status(200).send(files);
});

// start app, has to be last i think
app.listen(8000, () => {
    console.log("Listening on port 8000");
});