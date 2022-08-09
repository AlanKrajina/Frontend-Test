import React, { useEffect, useState } from "react";
import { Category, Data } from "../interfaces/interface";
import uniqueCategories from "../helpers/uniqueCategories";
import returnRequestedArticles from "../helpers/returnRequestedArticles";
import updateUrl from "../helpers/updateUrl";
import styled from "@emotion/styled";
import ToggleDropdown from "./ToggleDropdown";

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
  const [showDeleteButton, setShowDeleteButtons] = useState<boolean>(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<number>(0);

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
    <Container>
      {categories.map((cat) => {
        return (
          <CategoriesDiv key={cat.id}>
            <CategoriesParagraph
              onClick={() => {
                updateCategoryAndArticles(cat.id);
              }}
              style={{
                color: cat.id === categoryId ? "#6da8e5" : "rgb(246, 246, 246)",
                borderBottom:
                  cat.id === categoryId ? "2px solid #6da8e5" : "none",
              }}
            >
              {cat.category}
            </CategoriesParagraph>
          </CategoriesDiv>
        );
      })}
      <ShowAll
        onClick={() => updateCategoryAndArticles(0)}
        style={{
          color: categoryId === 0 ? "#6da8e5" : "rgb(246, 246, 246)",
          borderBottom: categoryId === 0 ? "2px solid #6da8e5" : "none",
        }}
      >
        Show All
      </ShowAll>
      {currentAllArticles.length < 100 && (
        <Refetch onClick={refetchArticles}>Refetch</Refetch>
      )}
      {categories.length > 0 && (
        <ToggleDropdown
          categories={categories}
          deleteCategoryAndArticles={deleteCategoryAndArticles}
        />
      )}
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 1.3rem;
  position: relative;
`;

const CategoriesDiv = styled.div`
  position: relative;
`;

const CategoriesParagraph = styled.p`
  cursor: pointer;
`;

const ShowAll = styled.p`
  cursor: pointer;
`;

const Refetch = styled.p`
  cursor: pointer;
  color: #ff5b5b;
`;

const DeleteButton = styled.button`
  height: 17px;
  width: 15px;
  cursor: pointer;
  background-color: red;
  border-radius: 30%;
  color: white;
  display: flex;
  justify-content: center;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 0;
  font-size: x-small;
  z-index: 2;
`;
