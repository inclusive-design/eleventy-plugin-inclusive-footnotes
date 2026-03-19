import {Merge as eleventyMerge} from '@11ty/eleventy-utils';
import {I18n} from 'i18n-js';
import translations from './localization/translations.json' with {type: 'json'};
import markdownItFootnote from 'markdown-it-footnote';

const inclusiveFootnotesPlugin = {
	configFunction(eleventyConfig, options = {}) {
		options = eleventyMerge({
			headingLevel: 2,
			translations,
		}, options);

		const i18n = new I18n(options.translations);

		eleventyConfig.addGlobalData('footnotesHeadingLevel', options.headingLevel);

		eleventyConfig.amendLibrary('md', md => {
			md.use(markdownItFootnote);

			md.renderer.rules.footnote_caption = (tokens, index, _options, _environment, _slf) => (Number(tokens[index].meta.id + 1).toString());

			md.renderer.rules.footnote_ref = (tokens, index, options, environment, slf) => {
				i18n.locale = environment.lang ?? 'en';

				const id = slf.rules.footnote_anchor_name(tokens, index, options, environment, slf);
				const caption = slf.rules.footnote_caption(tokens, index, options, environment, slf);
				let refid = id;

				if (tokens[index].meta.subId > 0) {
					refid += `:${tokens[index].meta.subId}`;
				}

				return (`<sup class="footnote-ref"><a href="#fn${id}" role="doc-noteref" id="fnref${refid}" aria-label="${i18n.t('footnote_ref', {id})}">${caption}</a></sup>`);
			};

			md.renderer.rules.footnote_block_open = (_tokens, _index, options, environment, _slf) => {
				i18n.locale = environment.lang ?? 'en';

				return (
					`<section class="footnotes" role="doc-endnotes" aria-labelledby="footnotes">
					<h${environment.footnotesHeadingLevel} id="footnotes">${i18n.t('footnotes')}</h${environment.footnotesHeadingLevel}>
					<ol class="footnotes-list">`
				);
			};

			md.renderer.rules.footnote_open = (tokens, index, options, environment, slf) => {
				let id = slf.rules.footnote_anchor_name(tokens, index, options, environment, slf);

				if (tokens[index].meta.subId > 0) {
					id += `:${tokens[index].meta.subId}`;
				}

				return (`<li id="fn${id}" role="doc-endnote" class="footnote-item">`);
			};

			md.renderer.rules.footnote_anchor = (tokens, index, options, environment, slf) => {
				i18n.locale = environment.lang ?? 'en';

				let id = slf.rules.footnote_anchor_name(tokens, index, options, environment, slf);
				const label = i18n.t('backlink', {ref: tokens[index].meta.subId + 1, footnote: id});

				if (tokens[index].meta.subId > 0) {
					id += `:${tokens[index].meta.subId}`;
				}

				/* ↩ with escape code to prevent display as Apple Emoji on iOS */
				return (`<a href="#fnref${id}" role="doc-backlink" class="footnote-backref" aria-label="${label}">\u21A9\uFE0E</a>`);
			};
		});
	},
};

export default inclusiveFootnotesPlugin;
