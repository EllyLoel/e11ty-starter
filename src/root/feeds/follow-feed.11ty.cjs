module.exports = class {
  data() {
    return {
      // Controls where the file is written
      permalink: "/follow.rss",
    };
  }

  async render() {
    const { ActivityFeed } = await import("@11ty/eleventy-activity-feed");

    let feed = new ActivityFeed();

    feed.setCacheDuration("4h");

    // YouTube
    // feed.addSource("youtubeUser", "YouTube", "");

    // Blog
    feed.addSource("atom", "Blog", `${metadata.url}/feed.xml`);

    // Mastodon
    feed.addSource("rss", "Mastodon", `${metadata.author.links.Mastodon}.rss`);

    // Twitter
    // feed.addSource("twitterUser", "Twitter", "", "");

    return feed.toRssFeed({
      title: `${metadata.author.name}’s Activity Feed`,
      language: metadata.language,
      url: `${metadata.url}/follow.rss`,
      subtitle: `One centralized feed of ${metadata.author.name} activity across the web.`,
    });
  }
};
