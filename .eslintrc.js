// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Prettier'ı en son sırada ekleyin
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Eski kuralları kaldırın veya güncelleyin
    // '@typescript-eslint/interface-name-prefix': 'off', // Kullanımdan kaldırıldı
    // '@typescript-eslint/explicit-function-return-type': 'off', // Gerekirse açık bırakabilirsiniz
    // '@typescript-eslint/explicit-module-boundary-types': 'off', // Gerekirse açık bırakabilirsiniz
    // '@typescript-eslint/no-explicit-any': 'off', // Gerekirse açık bırakabilirsiniz

    // Örnek güncel kurallar
    '@typescript-eslint/no-explicit-any': ['warn'], // Kullanımı teşvik etmeyen ama tamamen kapatmayan bir uyarı
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      // Diğer isimlendirme kuralları
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
  },
};
