import inclusiveFootnotesPlugin from './index.js';

/**
 * @param {object} eleventyConfig The Eleventy configuration object.
 * @returns {object} Eleventy configuration.
 */
export default function eleventy(eleventyConfig) {
	eleventyConfig.addPlugin(inclusiveFootnotesPlugin, {
		translations: {
			en: {
				footnote_ref: 'Endnote %{id}',
				footnotes: 'Endnotes',
				backlink: 'Back to reference %{ref} for endnote %{footnote}',
			},
			de: {
				footnote_ref: 'Endnote %{id}',
				footnotes: 'Endnoten',
				backlink: 'Zurück zur Referenz %{ref} für Endnote %{footnote}',
			},
		},
	});

	return {
		dir: {
			input: 'fixtures',
		},
	};
}
