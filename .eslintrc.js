module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  rules: {
    'max-len': ['warn', { code: 80 }],
  },
  overrides: [
    {
      files: ['examples/*.shader.ts'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
};
