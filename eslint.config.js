import {defineConfig} from 'eslint/config';
import eslintConfigInclusiveDesign from '@inclusive-design/eslint-config';

export default defineConfig([
	{
		extends: [eslintConfigInclusiveDesign],
		rules: {
			camelcase: ['error', {properties: 'never'}],

			'max-params': ['error', {max: 5}],
		},
	},
	{
		ignores: ['_site/**', 'README.md'],
	},
]);
