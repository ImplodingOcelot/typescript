import * as hepburn from "hepburn";

export function conjugateJapanese(root, conjOption, verPosorNeg)   {
    console.log("conjugateJapanese() called");
    let verbGroup;
    if(hepburn.fromKana(root.slice(-2)) == "suru")    {
        verbGroup = 3;
        console.log("verb 3");
    } else if(hepburn.fromKana(root.slice(-2)).includes("iru") || hepburn.fromKana(root.slice(-2)).includes("eru")) {
        verbGroup = 2;
        console.log("verb 2");
    } else {
        verbGroup = 1;
        console.log("verb 1");
    }
    switch (conjOption) {
        case "masu":
            console.log("masu called");
            let splitRoot = hepburn.splitKana(root);
            let lastChar = splitRoot[splitRoot.length - 1];
            let lastCharRomanji = hepburn.fromKana(lastChar);
            splitRoot.pop();
            let newRoot = splitRoot.join("");
            let ending = "";
            console.log("newRoot = " + newRoot + "; lastCharRomanji = " + lastCharRomanji);
            if(!lastCharRomanji.includes("i")) {
                ending = lastCharRomanji.charAt(0) + "i";
                console.log("ending1 = " + hepburn.toHiragana(ending.toLowerCase()));
            }
            if(ending === "ci" || ending === "si") {
                ending = ending.charAt(0) + "hi";
            }
            ending = hepburn.toHiragana(ending.toLowerCase());
            ending += verPosorNeg ? "ます" : "ません";
            root = newRoot + ending;
            console.log("root = " + root);
            break;
        default:
            break;
    }
    return root;
}