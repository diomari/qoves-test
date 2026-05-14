import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "next-env.d.ts",
      "node_modules/**",
      "out/**",
      "dist/**",
      ".DS_Store"
    ]
  },
  ...nextVitals,
  ...nextTypescript
];

export default eslintConfig;
