const linkGraph = (posts) => {
  const linkGraph = {
    nodes: [],
    links: [],
  };

  // Search all posts for links
  for (const post of posts) {
    linkGraph.nodes.push({
      id: post.url,
      group: post.url.split("/")[1],
      name: post.data.title,
      val: "2",
    });

    const postContent = post.template.frontMatter.content;

    // Get all links from the post
    const outboundLinks = (
      [...new Set(postContent.match(wikilinkRegEx))] || []
    ).map((wikilink) => {
      return slugify(wikilink.slice(2, -2).split("|")[0], { lower: true });
    });

    for (const link of outboundLinks) {
      for (const otherPost of posts) {
        otherPost.url.includes(link)
          ? linkGraph.links.push({
              source: post.url,
              target: otherPost.url,
            })
          : null;
      }
    }
  }

  return linkGraph;
};

module.exports = { linkGraph };
