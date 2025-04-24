import pluginJs from "@eslint/js";
import parserTs from "@typescript-eslint/parser";
//import pluginCypress from "eslint-plugin-cypress";
import globals from "globals";

// La configuration ESLint au format "flat config"
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: parserTs, // Utilisation du parser TypeScript pour les fichiers TS et TSX
      globals: globals.browser, // Variables globales du navigateur (ex. window, document)
    },
  },
  // Appliquer les configurations recommandées de JavaScript
  pluginJs.configs.recommended,

  // Appliquer les configurations recommandées de TypeScript
  // tseslint.configs.recommended,

  // Appliquer les configurations recommandées de React (pour React et les Hooks)
  // pluginReact.configs.flat.recommended,

  // Appliquer les configurations recommandées de Cypress
  //pluginCypress.configs.recommended,
];
