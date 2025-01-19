export const isEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const convertStringAsBoolean = (value: string): boolean => {
  return value === "True" || value === "true";
};
export const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const formatTagLink = (post: any) => {
  let newContent = post.content;
  post?.tags?.forEach((tag: any) => {
    newContent = newContent.replace(
      new RegExp(`${tag.name}`, "g"),
      `<a href="/discover?tag=${tag.id}&tagname=${tag.name.slice(
        1
      )}" class="text-blue-500">${tag.name}</a>`
    );
  });
  return newContent;
};
