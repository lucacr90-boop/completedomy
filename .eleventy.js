module.exports = function (cfg) {
  cfg.addPassthroughCopy({ "style1": "style" });
  cfg.addPassthroughCopy({ "img1": "img" });
  cfg.addPassthroughCopy({ "imagebox1": "imagebox" });
  cfg.addPassthroughCopy({ "jsscripts1": "jscripts" });
  cfg.addPassthroughCopy({ "index1.html": "index.html" });

  cfg.addCollection("posts", c => c.getFilteredByGlob("posts/*.{md,njk}"));

  return {
    dir: { input: ".", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
