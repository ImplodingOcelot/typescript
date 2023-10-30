let root;
let conjOption = "masu";
let verPosorNeg = true;
let tense = 2;
function accessJapaneseConjugator() {
    console.log("accessJapaneseConjugator() called");
    const rootInput = document.getElementById('root');
    rootInput.addEventListener('change', () => {
        root = rootInput.value;
        console.log(root);
        getConjVerb();
    });

}
async function getConjVerb() {
    let output;
    if (root != "") {
        const url = '/conjugateJapaneseServer?root=' + root + '&conjOption=' + conjOption + '&verPosorNeg=' + verPosorNeg + '&tense=' + tense;
        output = await fetch(url).then((response) => response.text());
        console.log("WOWZA: " + output);
    } else {
        output = "INVALID";
    }
    document.getElementById('result').innerText = output;
    return output;
}
accessJapaneseConjugator();