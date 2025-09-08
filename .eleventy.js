module.exports = function (eleventyConfig) {
  // Cartelle sorgenti → nomi storici usati nel markup
  eleventyConfig.addPassthroughCopy({ style1: "style" });
  eleventyConfig.addPassthroughCopy({ imagebox1: "imagebox" });
  eleventyConfig.addPassthroughCopy({ jsscripts1: "jscripts" });
  eleventyConfig.addPassthroughCopy({ igm1: "img" }); // icone/logo reali
  eleventyConfig.addPassthroughCopy({ banners1: "banners" });
  eleventyConfig.addPassthroughCopy({ favicon1: "favicon" });

  // Font e TinyMCE (adegua al nome reale della cartella)
  eleventyConfig.addPassthroughCopy({ "style1/fonts": "style/fonts" });
  eleventyConfig.addPassthroughCopy({
    "jsscripts1/tiny_mce61": "jscripts/tiny_mce61",
  });

  // NIENTE copia forzata di index1.html -> index.html
  // eleventyConfig.addPassthroughCopy({ "index1.html": "index.html" });

  // Collezione post (md o njk)
  eleventyConfig.addCollection("posts", (c) =>
    c.getFilteredByGlob("posts/*.{md,njk}"),
  );

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_includes/layouts", // dove sta base.njk
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
