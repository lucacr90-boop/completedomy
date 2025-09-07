module.exports = function (cfg) {
  // Cartelle sorgenti → nomi storici usati nel markup
  cfg.addPassthroughCopy({ "style1": "style" });
  cfg.addPassthroughCopy({ "imagebox1": "imagebox" });
  cfg.addPassthroughCopy({ "jsscripts1": "jscripts" });
  cfg.addPassthroughCopy({ "igm1": "img" });               // icone/logo reali

  // Font e TinyMCE (se presenti nelle cartelle “1”)
  cfg.addPassthroughCopy({ "style1/fonts": "style/fonts" });
  cfg.addPassthroughCopy({ "jsscripts1/tiny_mce6": "jscripts/tiny_mce6" });

  // (RIMOSSO qualsiasi copia di index1.html → index.html per non sovrascrivere la home)
  // cfg.addPassthroughCopy({ "index1.html": "index.html" });

  cfg.addCollection("posts", c => c.getFilteredByGlob("posts/*.{md,njk}"));

  return {
    dir: { input: ".", includes: "_includes", data: "_data", layouts: "_includes/layouts", output: "_site" },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};