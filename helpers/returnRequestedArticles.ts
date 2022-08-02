import { Data } from "../interfaces/interface";
import findArticlesViaId from "./findArticlesViaId";
import fuzzySearch from "./fuzzySearch";

const returnRequestedArticles = (
  currentAllArticles: Data[],
  categoryId: number,
  searchValue: string
): Data[] => {
  const foundArticles: Data[] = findArticlesViaId(
    currentAllArticles,
    categoryId
  );

  if (searchValue !== "" && searchValue.length > 2) {
    const results: Data[] = fuzzySearch(foundArticles, searchValue);
    return results;
  } else {
    return foundArticles;
  }
};

export default returnRequestedArticles;
