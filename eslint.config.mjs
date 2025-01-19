import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "prefer-const": [
        "error",
        {
          destructuring: "any",
          ignoreReadBeforeAssign: false,
        },
      ],
      "object-shorthand": ["error", "always"],
      "no-unused-vars": "error",
      "no-array-constructor": "error",
      "array-callback-return": "error",
      quotes: ["error", "single", { avoidEscape: true }],
      "prefer-template": "error",
      "no-eval": "error",
      "func-style": ["error", "expression"],
      "no-loop-func": "error",
      "prefer-rest-params": "error",
      "default-param-last": ["error"],
      "function-paren-newline": ["error", "multiline"],
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];
