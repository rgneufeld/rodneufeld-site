module.exports = function(eleventyConfig) {

  // Pass existing static files through unchanged
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("blog/Blog_Assets");

  // Blog post collection — newest first
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("blog/posts/*.md").reverse();
  });

  // Date filter for templates
  eleventyConfig.addFilter("dateFilter", function(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  });

  // ISO date for <time> elements
  eleventyConfig.addFilter("isoDate", function(date) {
    return new Date(date).toISOString().split("T")[0];
  });

  return {
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes"
    }
  };
};
