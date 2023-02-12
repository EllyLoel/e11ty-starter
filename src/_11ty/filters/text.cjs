const excerpt = (post) => {
  const content = post.replace(/(<([^>]+)>)/gi, "");
  return content.substr(0, content.lastIndexOf(" ", 200)) + "…";
};

const addNonBreakingSpace = (str) => {
  if (!str) return;

  let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
  title = title.replace(/"(.*)"/g, '\\"$1\\"');
  return title;
};

module.exports = { excerpt, addNonBreakingSpace };
