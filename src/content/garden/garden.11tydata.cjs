module.exports = {
  layout: "layouts/post.njk",
  type: "article",
  permalink: "/garden/{{ title | slugify }}/",
};
