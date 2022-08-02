import { Data } from "../interfaces/interface";

enum CategorieEnums {
  "X Universe",
  "Elite: Dangerous",
  "Starpoint Gemini",
  "EVE Online",
}

const stringIsNumber = (value: string) => isNaN(Number(value)) === false;

const toArray = (enumme: any) => {
  return Object.keys(enumme)
    .filter(stringIsNumber)
    .map((key, index) => ({ category: enumme[key], id: index + 1 }));
};

const uniqueCategories = (data: Data[]) => {
  const uniqueCategories = Array.from(
    new Set(data?.map((article: Data) => parseInt(article.post_category_id)))
  ).sort();

  const enumCategories = toArray(CategorieEnums);

  const categories = enumCategories.filter((cat) =>
    uniqueCategories.find((el) => el === cat.id)
  );

  return categories;
};

export default uniqueCategories;
