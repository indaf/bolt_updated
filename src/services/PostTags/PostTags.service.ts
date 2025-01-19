import API from "../index.service";

export const searchPostTags = (query: string) => {
  console.log({ query });
  return API.get("/post-tags/search?query=" + query.slice(1));
};
