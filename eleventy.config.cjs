// External imports
const pluginFavicons = require("eleventy-plugin-gen-favicons");
const { EleventyHtmlBasePlugin: pluginHtmlBase } = require("@11ty/eleventy");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginVite = require("@11ty/eleventy-plugin-vite");
const pluginWebC = require("@11ty/eleventy-plugin-webc");

// Internal imports

module.exports = function (eleventyConfig) {
	// External plugins
	eleventyConfig.addPlugin(pluginFavicons, { generateManifest: false });
	eleventyConfig.addPlugin(pluginHtmlBase);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 },
	});
	eleventyConfig.addPlugin(pluginVite);
	eleventyConfig.addPlugin(pluginWebC, {
		components: "src/_includes/components/**/*.webc",
	});

	// Internal plugins
	eleventyConfig.addPlugin(require("./src/_11ty/plugins/drafts.cjs"));
	eleventyConfig.addPlugin(require("./src/_11ty/plugins/image.cjs"));
	eleventyConfig.addPlugin(require("./src/_11ty/plugins/wikilinks.cjs"));

	// Filters
	eleventyConfig.addFilter("limit", require("./src/_11ty/filters/limit.cjs"));
	eleventyConfig.addFilter("unique", require("./src/_11ty/filters/unique.cjs"));
	eleventyConfig.addFilter(
		"readableDate",
		require("./src/_11ty/filters/readableDate.cjs")
	);
	eleventyConfig.addFilter(
		"htmlDateString",
		require("./src/_11ty/filters/htmlDateString.cjs")
	);
	eleventyConfig.addFilter(
		"getAllTags",
		require("./src/_11ty/filters/getAllTags.cjs")
	);
	eleventyConfig.addFilter(
		"filterTagList",
		require("./src/_11ty/filters/filterTagList.cjs")
	);
	eleventyConfig.addFilter(
		"excerpt",
		require("./src/_11ty/filters/excerpt.cjs")
	);
	eleventyConfig.addFilter(
		"addNonBreakingSpace",
		require("./src/_11ty/filters/addNonBreakingSpace.cjs")
	);
	eleventyConfig.addFilter("newUrl", require("./src/_11ty/filters/newUrl.cjs"));

	// Shortcodes
	eleventyConfig.addShortcode(
		"figure",
		require("./src/_11ty/shortcodes/figure.cjs")
	);

	// Collections
	const types = ["article", "bookmark"];
	for (const type of types) {
		eleventyConfig.addCollection(type, (collectionApi) =>
			collectionApi.getAll().filter((item) => item.data.type === type)
		);
	}

	// Passthrough copy
	eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

	return {
		templateFormats: ["html", "md", "njk", "webc"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "src/content",
			includes: "../_includes", // Relative to input
			data: "../_data", // Relative to input
			output: "_site",
		},
	};
};
