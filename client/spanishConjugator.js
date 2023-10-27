// const root = document.getElementById('root');
// const personal = document.getElementById('personal');
// const numPeople = document.getElementById('numPeople');
let root;
let personal;
let numPeople;
function accessSpanishConjugators() {
    const rootInput = document.getElementById('root');
    rootInput.addEventListener('change', () => {
        root = rootInput.value;
        console.log(root);
        conjugateSpanish();
    });
    const personalInput = document.getElementById('personal');
    personalInput.addEventListener('change', () => {
        personal = personalInput.value;
        console.log(personal);
        conjugateSpanish();
    });
    const numPeopleInput = document.getElementById('numPeople');
    numPeopleInput.addEventListener('change', () => {
        numPeople = numPeopleInput.value;
        console.log(numPeople);
        conjugateSpanish();
    });
}

function conjugateSpanish() {
    const rootInput = document.getElementById('root');
    const personalInput = document.getElementById('personal');
    const numPeopleInput = document.getElementById('numPeople');
  
    if (detectEmpty()) {
      document.getElementById('result').innerText = '';
      return '';
    }
    let root = rootInput.value;
    let personal = personalInput.value;
    let numPeople = numPeopleInput.value;
    var ending = root.slice(-2);
    root = root.slice(0, -2);
    console.log(root);
    if(numPeople > 2)   {
        numPeople = 2;
    }
    switch (ending) {
        case "ar":
            const AR_ED = Array.from([["o", "as", "a"], ["amos", "ais", "an"]]);
            root = root.concat(AR_ED[numPeople-1][personal-1]);
            break;
        case "er":
            const ER_ED = Array.from([["o", "as", "a"], ["amos", "ais", "an"]]);
            root = root.concat(ER_ED[numPeople-1][personal-1]);
            break;
        case "ir":
            const IR_ED = Array.from([["o", "as", "a"], ["amos", "ais", "an"]]);
            root = root.concat(IR_ED[numPeople-1][personal-1]);
            break;
        default:
            root = "Invalid";
            break;
    }

    document.getElementById('result').innerText = root;
    return result;
}
function detectEmpty()  {
    if(root == ""  || personal == "" || numPeople == "") {
        console.log("detect empty true");
        return true;
    }
    return false;
}
accessSpanishConjugators();