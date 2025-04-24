// run-alphabet-tests.js
const { execSync } = require("child_process");

// Définir les lettres à tester
const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
];

// Créer un tableau pour stocker les résultats
const results = {};

// Fonction pour exécuter un test pour une lettre spécifique
function runTestForLetter(letter) {
  console.log(`\n----- Testing letter ${letter} -----`);
  try {
    // Exécuter Cypress avec la variable d'environnement pour la lettre
    execSync(
      `CYPRESS_VIDEO_LETTER=${letter} npx cypress run --spec "cypress/e2e/sign-detection.js"`,
      { stdio: "inherit" }
    );

    console.log(`✓ Test for letter ${letter} completed successfully`);
    return true;
  } catch (error) {
    console.error(`✗ Test for letter ${letter} failed`);
    return false;
  }
}

// Exécuter les tests pour chaque lettre
console.log("Starting sign language alphabet detection tests...");
letters.forEach((letter) => {
  results[letter] = runTestForLetter(letter);
});

// Afficher un résumé des résultats
console.log("\n----- Results Summary -----");
let passed = 0;
Object.entries(results).forEach(([letter, success]) => {
  console.log(`Letter ${letter}: ${success ? "PASSED" : "FAILED"}`);
  if (success) passed++;
});

console.log(`\nTotal: ${passed}/${letters.length} tests passed`);
