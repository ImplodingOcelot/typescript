import * as hepburn from "hepburn";
export function conjugateJapanese(root: string, conjOption: string, verPosorNeg: boolean, tense: number) {
    // console.log("conjugateJapanese() called");
    let verbGroup;
    console.log("WOWOW : " + hepburn.fromKana(root));
    if (hepburn.fromKana(root).toLowerCase().endsWith("suru") || hepburn.fromKana(root).toLowerCase().endsWith("kuru")) {
        verbGroup = 3;
    } else if (hepburn.fromKana(root).toLowerCase().endsWith("iru") || hepburn.fromKana(root).toLowerCase().endsWith("eru")) {
        verbGroup = 2;
    } else {
        verbGroup = 1;
    }
    console.log("verbGroup = " + verbGroup);
    switch (conjOption) {
        case "masu":
            if (verbGroup == 1) {
                console.log("masu called");
                let splitRoot = hepburn.splitKana(root);
                let lastChar = splitRoot[splitRoot.length - 1];
                let lastCharRomanji = hepburn.fromKana(lastChar);
                splitRoot.pop();
                let newRoot = splitRoot.join("");
                let ending = "";
                console.log("newRoot = " + newRoot + "; lastCharRomanji = " + lastCharRomanji);
                if (!lastCharRomanji.includes("i")) {
                    ending = lastCharRomanji.charAt(0) + "i";
                    console.log("ending1 = " + hepburn.toHiragana(ending.toLowerCase()));
                }
                if (ending === "ci" || ending === "si") {
                    ending = ending.charAt(0) + "hi";
                }
                console.log("tense = " + tense);
                ending = hepburn.toHiragana(ending.toLowerCase());
                if (tense == 2 || tense == 3) {
                    ending += verPosorNeg ? "ます" : "ません";
                } else if (tense == 1) {
                    ending += verPosorNeg ? "ました" : "ませんでした";
                }
                root = newRoot + ending;
                console.log("root = " + root + "\n");
            } else if (verbGroup == 2) {
                let splitRoot = hepburn.splitKana(root);
                splitRoot.pop();
                root = splitRoot.join("");
                if (tense == 2 || tense == 3) {
                    root += verPosorNeg ? "ます" : "ません";
                } else if (tense == 1) {
                    root += verPosorNeg ? "ました" : "ませんでした";
                }
            } else if (verbGroup == 3) {
                if (hepburn.fromKana(root).toLowerCase().endsWith("suru")) {
                    root = root.slice(0, -4);
                    root += verPosorNeg ? "します" : "しません";
                } else if (hepburn.fromKana(root).toLowerCase().endsWith("kuru")) {
                    root = root.slice(0, -4);
                    root += verPosorNeg ? "きます" : "きません";
                }
                if (tense == 1) {
                    root.replace("ます", "ました");
                    root.replace("ません", "ませんでした");
                }
            }
            break;
        case "nai":
            if (verbGroup == 1) {
                if(root.endsWith('う')){
                    root = root.slice(0, -1);
                    root += "わない";
                } else {
                    let splitRoot = hepburn.splitKana(root);
                    let lastChar = splitRoot[splitRoot.length - 1];
                    let lastCharRomanji = hepburn.fromKana(lastChar);
                    splitRoot.pop();
                    let newRoot = splitRoot.join("");
                    lastCharRomanji = lastCharRomanji.charAt(0) + "a";
                    let newNewRoot = newRoot + hepburn.toHiragana(lastCharRomanji.toLowerCase());
                    root = newNewRoot + "ない";
                }
            } else if (verbGroup == 2) {
                root = root.slice(0, -1);
                root += "ない";
            } else if (verbGroup == 3) {
                if (hepburn.fromKana(root).toLowerCase().endsWith("suru")) {
                    root = root.slice(0, -4);
                    root += "しない";
                } else if (hepburn.fromKana(root).toLowerCase().endsWith("kuru")) {
                    root = root.slice(0, -4);
                    root += "こない";
                }
            }
            break;
        case "ta": // both ta and nakkata
            if(verPosorNeg) {
            if(verbGroup == 1){
                let lastChar = hepburn.splitKana(root)[hepburn.splitKana(root).length - 1];
                if(root == "いく" || root == "行く")  {
                    root= "いった";
                } else if(lastChar == "う" || lastChar == "つ" || lastChar == "る"){
                    root = root.slice(0, -1);
                    root += "った";
                } else if(lastChar == "ぶ" || lastChar == "む" || lastChar == "ぬ"){
                    root = root.slice(0, -1);
                    root += "んだ";
                } else if(lastChar == "く"){
                    root = root.slice(0, -1);
                    root += "いた";
                } else if(lastChar == "ぐ") {
                    root = root.slice(0, -1);
                    root += "いだ";
                } else if(lastChar == "す") {
                    root = root.slice(0, -1);
                    root += "した";
                }
            } else if (verbGroup == 2) {
                root = root.slice(0, -1);
                root += "た";
            } else if (verbGroup == 3) {
                if (hepburn.fromKana(root).toLowerCase().endsWith("suru")) {
                    root = root.slice(0, -4);
                    root += "した";
                } else if (hepburn.fromKana(root).toLowerCase().endsWith("kuru")) {
                    root = root.slice(0, -4);
                    root += "きた";
                }
            }
        } else {
            root = "code this remember later lmao";
        }
        default:
            root = "Error: Invalid conjugation option";
            break;
    }
    return root;
}