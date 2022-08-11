import React, { useEffect } from "react";
import returnRequestedArticles from "../helpers/returnRequestedArticles";
import { Data } from "../interfaces/interface";
import VirtualizedArticles from "./VirtualizedArticles";

interface Props {
  displayedArticles: Data[];
  currentAllArticles: Data[];
  categoryId: number;
  searchValue: string;
  setDisplayedArticles: React.Dispatch<React.SetStateAction<Data[]>>;
  setCurrentAllArticles: React.Dispatch<React.SetStateAction<Data[]>>;
}

const Articles: React.FC<Props> = ({
  displayedArticles,
  setDisplayedArticles,
  currentAllArticles,
  setCurrentAllArticles,
  categoryId,
  searchValue,
}) => {
  useEffect(() => {
    setDisplayedArticles(
      returnRequestedArticles(currentAllArticles, categoryId, searchValue)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAllArticles]);

  return (
    <VirtualizedArticles
      displayedArticles={displayedArticles}
      setCurrentAllArticles={setCurrentAllArticles}
    />
  );
};

export default React.memo(Articles);
