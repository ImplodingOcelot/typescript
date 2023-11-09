export function conjugateSpanish(root: string, personal: number, numPeople: number) {
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
      return root;
}