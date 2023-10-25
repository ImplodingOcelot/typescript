// const root = document.getElementById('root');
// const personal = document.getElementById('personal');
// const numPeople = document.getElementById('numPeople');
let root;
let personal;
let numPeople;
function accessConjugators(s) {
    const rootInput = document.getElementById('root');
    rootInput.addEventListener('change', () => {
        root = rootInput.value;
        console.log(root);
        conjugateSpanish(root, personal, numPeople);
    });
    const personalInput = document.getElementById('personal');
    personalInput.addEventListener('change', () => {
        personal = personalInput.value;
        console.log(personal);
        conjugateSpanish(root, personal, numPeople);
    });
    const numPeopleInput = document.getElementById('numPeople');
    numPeopleInput.addEventListener('change', () => {
        numPeople = numPeopleInput.value;
        console.log(numPeople);
        conjugateSpanish(root, personal, numPeople);
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
    root = root.slice(0, -2);
    console.log(root);

    switch (ending) {
        case "ar":
            const AR_ED = Array.from([["o", "as", "a"], ["amos", "ais", "an"]]);
            root = root.concat(AR_ED[personal][numPeople]);
            break;
        case "er":
            const ER_ED = Array.from([["o", "as", "a"], ["amos", "ais", "an"]]);
            root = root.concat(ER_ED[personal][numPeople]);
            break;
        case "ir":
            const IR_ED = Array.from([["o", "as", "a"], ["amos", "ais", "an"]]);
            root = root.concat(IR_ED[personal][numPeople]);
            break;
        default:
            root = "Invalid";
            break;
    }

    document.getElementById('result').innerText = root;
    return result;
}
