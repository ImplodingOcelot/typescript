import * as hepburn from "hepburn";

export function conjugateJapanese(root: string, conjOption: string, verPosorNeg: boolean)   {
    console.log("conjugateJapanese() called");
    let verbGroup;
    console.log("WOWOW : " + hepburn.fromKana(root));
    if(hepburn.fromKana(root).toLowerCase().endsWith("suru") || hepburn.fromKana(root).toLowerCase().endsWith("kuru"))    {
        verbGroup = 3;
    } else if(hepburn.fromKana(root).toLowerCase().endsWith("iru") || hepburn.fromKana(root).toLowerCase().endsWith("eru")) {
        verbGroup = 2;
    } else {
        verbGroup = 1;
    }
    console.log("verbGroup = " + verbGroup);
    switch (conjOption) {
        case "masu":
            if(verbGroup == 1)  {
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
            console.log("root = " + root + "\n");
        } else if(verbGroup == 2) {
            let splitRoot = hepburn.splitKana(root);
            splitRoot.pop();
            root = splitRoot.join("");
            root += verPosorNeg ? "ます" : "ません";
        } else if(verbGroup == 3) {
            if(hepburn.fromKana(root).toLowerCase().endsWith("suru"))   {
                root = root.slice(0, -4);
                root += verPosorNeg ? "します" : "しません";
            } else if(hepburn.fromKana(root).toLowerCase().endsWith("kuru")) {
                root = root.slice(0, -4);
                root += verPosorNeg ? "きます" : "きません";
            }
        }
            break;
        default:
            root = "Error: Invalid conjugation option";
            break;
    }
    return root;
}