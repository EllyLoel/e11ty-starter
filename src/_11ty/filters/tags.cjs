const getAllTags = (collection) => {
  let tagSet = new Set();
  for (let item of collection) {
    (item.data.tags || []).forEach((tag) => tagSet.add(tag));
  }
  return Array.from(tagSet);
};

const filterTagList = (tags) =>
  (tags || []).filter(
    (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
  );

module.exports = { getAllTags, filterTagList };
