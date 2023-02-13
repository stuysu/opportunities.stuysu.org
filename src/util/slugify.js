// Convert a URL to a slug

const slugify = (url) => {
  return url
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export default slugify;
