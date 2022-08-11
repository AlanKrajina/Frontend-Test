import React, { useEffect, useState } from "react";
import { Category, Data } from "../interfaces/interface";
import uniqueCategories from "../helpers/uniqueCategories";
import returnRequestedArticles from "../helpers/returnRequestedArticles";
import updateUrl from "../helpers/updateUrl";
import styled from "@emotion/styled";
import ToggleDropdown from "./ToggleDropdown";
import { useRouter } from "next/router";

interface Props {
  currentAllArticles: Data[];
  unMutatedData: Data[];
  searchValue: string;
  setsCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setDisplayedArticles: React.Dispatch<React.SetStateAction<Data[]>>;
  setCurrentAllArticles: React.Dispatch<React.SetStateAction<Data[]>>;
  categoryId: number;
}

const Categories: React.FC<Props> = ({
  currentAllArticles,
  setDisplayedArticles,
  searchValue,
  setsCategoryId,
  unMutatedData,
  setCurrentAllArticles,
  categoryId,
}) => {
  const router = useRouter();
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
    <Container>
      {categories.map((cat) => {
        return (
          <CategoriesDiv key={cat.id}>
            <CategoriesParagraph
              onClick={() => {
                updateCategoryAndArticles(cat.id);
              }}
              color={cat.id === categoryId ? "#6da8e5" : "rgb(246, 246, 246)"}
              borderBottom={
                cat.id === categoryId ? "2px solid #6da8e5" : "none"
              }
            >
              {cat.category}
            </CategoriesParagraph>
          </CategoriesDiv>
        );
      })}
      <CategoriesParagraph
        onClick={() => updateCategoryAndArticles(0)}
        color={categoryId === 0 ? "#6da8e5" : "rgb(246, 246, 246)"}
        borderBottom={categoryId === 0 ? "2px solid #6da8e5" : "none"}
      >
        Show All
      </CategoriesParagraph>
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

export default React.memo(Categories);

type StylingProps = {
  color: string;
  borderBottom: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 1.3rem;
  position: relative;
  margin: 0 2rem 0 2rem;
`;

const CategoriesDiv = styled.div`
  position: relative;
`;

const CategoriesParagraph = styled.p<StylingProps>`
  cursor: pointer;
  color: ${(props) => props.color};
  border-bottom: ${(props) => props.borderBottom};
`;

const Refetch = styled.p`
  cursor: pointer;
  color: #ff5b5b;
`;
