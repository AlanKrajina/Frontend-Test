export const getData = async () => {
  let res = await fetch("https://www.alpha-orbital.com/last-100-news.json");
  return await res.json();
};
