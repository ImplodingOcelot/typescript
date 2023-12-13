// TRANS RIGHTS
import express from "express";
import * as child_process from 'child_process';
import * as fs from 'fs';
const app = express();
let option = "masu";
let tense = 2;
import { conjugateJapanese } from "./src/japaneseConjugatorServer.js";

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
app.get("/test", (req, res) => {
    let output: string = '';
    const child = child_process.exec('./test');
    // child.stdin?.write(wow);
    if (child.stdout) {
        child.stdout.on('data', (data) => {
            output += data.toString();
        });
    }

    if (child.stderr) {
        child.stderr.on('data', (data) => {
            output += data.toString();
        });
    }

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}` + ", output = " + output);
        res.status(200).send(output);
    });
});
app.get("/store", (req, res) => {
    let text = req.query.text as string;
    let filename = req.query.filename as string;
    fs.writeFile(__dirname + "/src/storage/" + filename, text, function (err) {
        if (err) throw res.status(500).send(err);
        console.log('Saved!');
        res.status(200).send("Saved!");
    });
});
app.get("/read", (req, res) => {
    res.status(200).sendFile(__dirname + "/src/storage/" + req.query.filename as string);
});
app.listen(8000);