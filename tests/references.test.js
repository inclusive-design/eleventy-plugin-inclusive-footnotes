import assert from 'node:assert';
import {beforeEach, test} from 'node:test';
import fs from 'node:fs';
import Eleventy from '@11ty/eleventy';

beforeEach(async () => {
	const elev = new Eleventy('.', '_site', {
		quietMode: true,
	});
	await elev.write();
});

test('References have appropriate role', async () => {
	const indexPage = fs.readFileSync('_site/index.html', 'utf8');
	assert.ok(indexPage.includes('<a href="#fn1" role="doc-noteref"'));
});
