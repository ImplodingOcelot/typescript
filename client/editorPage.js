currentlyUpdated = false;
let bypass = "false";
async function save() {
    let data = document.getElementById("editor").innerText;
    let filename = document.getElementById("filename").innerText;
    url = '/write'
    let key = document.getElementById("key").innerText;
    key = key.trim();
    const postReq = {
        text: data,
        filename: filename,
        key: key
    }
    console.log(postReq);
    // o = await fetch(url, ).then((response) => response.text());
    o = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postReq)
    }).then((response) => response.text());
}

let syncCurrent = false;
let syncInterval = 1; // in seconds; keep under seconds that cooldown is active for or else it wont work

// ws://localhost:8080
// wss://jwfj4l11-8080.usw3.devtunnels.ms/
const socket = new WebSocket('ws://localhost:8080');
// change this based on if its using ms or localhost
async function sync() {
    setInterval(function () {
        load()
    }, syncInterval * 1000)
}

async function load() {
    let filename = document.getElementById("filename").innerText;
    filename = filename.trim();
    let userid = document.getElementById("userid").innerText;
    userid = userid.trim();
    let data = document.getElementById("editor").innerText;
    let key = document.getElementById("key").innerText;
    key = key.trim();
    if (currentlyUpdated == false) {
        bypass = "true";
        console.log("hi");
        currentlyUpdated = true;
    } else {
        bypass = "false";
    }
    console.log("bypass: " + bypass);
    const postReq = {
        filename: filename,
        data: data,
        key: key,
        bypass: bypass,
    }
    console.log(JSON.stringify(postReq));
    socket.send(JSON.stringify(postReq));
    socket.onmessage = function (event) {
        console.log("abc: " + JSON.parse(event.data).text);
        if (bypass == "true") {
            document.getElementById("editor").innerText = JSON.parse(event.data).text;
        } else {
            try {
                if (JSON.parse(event.data).ifActiveUser == true) {
                    document.getElementById("editor").contentEditable = false;
                }
                if (document.getElementById("editor").innerText != JSON.parse(event.data).text && JSON.parse(event.data).ifActiveUser == true && syncCurrent == true) {
                    document.getElementById("editor").innerText = JSON.parse(event.data).text;
                } else if (JSON.parse(event.data).ifActiveUser == false) {
                    document.getElementById("editor").contentEditable = false;
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}

function main() {
    let button = document.getElementById("save");
    button.addEventListener('click', e => {
        save();
    });
    let button2 = document.getElementById("controlSync");
    button2.addEventListener('click', e => {
        syncCurrent = !syncCurrent;
        if (syncCurrent == true) {
            document.getElementById("syncOptions").hidden = false;
        } else {
            document.getElementById("syncOptions").hidden = true;
        }
        console.log("aaa: " + syncCurrent);
    });
    let button3 = document.getElementById("sync");
    button3.addEventListener('click', e => {
        sync();
    });
    let insert = document.getElementById("filename");
    insert.addEventListener('input', e => {
        currentlyUpdated = false;
    })
}
main();