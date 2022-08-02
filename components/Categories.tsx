import React, { useEffect, useState } from "react";
import { Category, Data } from "../interfaces/interface";
import uniqueCategories from "../hooks/use-uniqueCategories";
import returnRequestedArticles from "../helpers/returnRequestedArticles";
import updateUrl from "../helpers/updateUrl";
import styles from "./Categories.module.css";

interface Props {
  currentAllArticles: Data[];
  unMutatedData: Data[];
  searchValue: string;
  setsCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setDisplayedArticles: React.Dispatch<React.SetStateAction<Data[]>>;
  setCurrentAllArticles: React.Dispatch<React.SetStateAction<Data[]>>;
  router: any;
  categoryId: number;
}

const Categories: React.FC<Props> = ({
  currentAllArticles,
  setDisplayedArticles,
  searchValue,
  setsCategoryId,
  unMutatedData,
  setCurrentAllArticles,
  router,
  categoryId,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // from enums on mount sets categories + when category gets deleted
    setCategories(uniqueCategories(currentAllArticles));
  }, [currentAllArticles]);

  const updateCategoryAndArticles = (catId: number): void => {
    setDisplayedArticles(
      returnRequestedArticles(currentAllArticles, catId, searchValue)
    );
    setsCategoryId(catId);
    updateUrl(router, searchValue, catId);
  };

  const deleteCategoryAndArticles = (catId: number): void => {
    setCurrentAllArticles((prev: Data[]) =>
      prev?.filter((el: Data) => el.post_category_id !== catId.toString())
    );
    setsCategoryId(0);
    updateUrl(router, searchValue, 0);
  };

  const refetchArticles = (): void => {
    setCurrentAllArticles(unMutatedData);
    updateUrl(router, searchValue, categoryId);
  };

  return (
    <div className={styles.container}>
      {categories.map((cat) => {
        return (
          <div key={cat.id}>
            <p
              onClick={() => {
                updateCategoryAndArticles(cat.id);
              }}
            >
              {cat.category}
              <span onClick={() => deleteCategoryAndArticles(cat.id)}>X</span>
            </p>
          </div>
        );
      })}
      <p onClick={() => updateCategoryAndArticles(0)}>Show All</p>
      {currentAllArticles.length < 100 && (
        <p onClick={refetchArticles}>Refetch</p>
      )}
    </div>
  );
};

export default Categories;
