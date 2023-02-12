// External
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const { EleventyHtmlBasePlugin: pluginHtmlBase } = require("@11ty/eleventy");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginVite = require("@11ty/eleventy-plugin-vite");
const pluginWebC = require("@11ty/eleventy-plugin-webc");

// Internal
const pluginDrafts = require("./src/_11ty/plugins/drafts.cjs");
const { limit, unique } = require("./src/_11ty/filters/arrays.cjs");
const {
  readableDate,
  htmlDateString,
} = require("./src/_11ty/filters/dates.cjs");
const { linkGraph } = require("./src/_11ty/filters/link-graph.cjs");
const { getAllTags, filterTagList } = require("./src/_11ty/filters/tags.cjs");
const {
  excerpt,
  addNonBreakingSpace,
} = require("./src/_11ty/filters/text.cjs");

module.exports = function (eleventyConfig) {
  // External plugins
  eleventyConfig.addPlugin(pluginBundle);
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
  eleventyConfig.addPlugin(pluginDrafts);

  // Filters
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("unique", unique);
  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addFilter("htmlDateString", htmlDateString);
  eleventyConfig.addFilter("linkGraph", linkGraph);
  eleventyConfig.addFilter("getAllTags", getAllTags);
  eleventyConfig.addFilter("filterTagList", filterTagList);
  eleventyConfig.addFilter("excerpt", excerpt);
  eleventyConfig.addFilter("addNonBreakingSpace", addNonBreakingSpace);

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
