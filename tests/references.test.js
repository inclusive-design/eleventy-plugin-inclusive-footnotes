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
