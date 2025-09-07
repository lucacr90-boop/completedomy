module.exports = function (cfg) {
  // Cartelle sorgenti → nomi storici usati nel markup
  cfg.addPassthroughCopy({ style1: "style" });
  cfg.addPassthroughCopy({ imagebox1: "imagebox" });
  cfg.addPassthroughCopy({ jsscripts1: "jscripts" });
  cfg.addPassthroughCopy({ igm1: "img" }); // icone/logo reali

  // Font e TinyMCE (adegua al nome reale della cartella)
  cfg.addPassthroughCopy({ "style1/fonts": "style/fonts" });
  cfg.addPassthroughCopy({ "jsscripts1/tiny_mce61": "jscripts/tiny_mce61" });

  // NIENTE copia forzata di index1.html -> index.html
  // cfg.addPassthroughCopy({ "index1.html": "index.html" });

  // Collezione post (md o njk)
  cfg.addCollection("posts", (c) => c.getFilteredByGlob("posts/*.{md,njk}"));

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
