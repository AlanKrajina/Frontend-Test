import { Data } from "../interfaces/interface";

const findArticlesViaId = (
  currentAllArticles: Data[],
  categoryId: number
): Data[] => {
  if (categoryId === 0) {
    return currentAllArticles;
  } else {
    return currentAllArticles.filter(
      (cat) => cat.post_category_id === categoryId.toString()
    );
  }
};

export default findArticlesViaId;
