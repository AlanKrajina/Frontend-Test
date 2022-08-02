import React from "react";
import { Data } from "../interfaces/interface";
import returnRequestedArticles from "../helpers/returnRequestedArticles";
import _ from "lodash";
import updateUrl from "../helpers/updateUrl";
import styled from "@emotion/styled";

interface Props {
  currentAllArticles: Data[];
  categoryId: number;
  searchValue: string;
  setDisplayedArticles: React.Dispatch<React.SetStateAction<Data[]>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  router: any;
}

const Search: React.FC<Props> = ({
  currentAllArticles,
  setDisplayedArticles,
  categoryId,
  searchValue,
  setSearchValue,
  router,
}) => {
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setDisplayedArticles(
      returnRequestedArticles(currentAllArticles, categoryId, searchValue)
    );

    updateUrl(router, searchValue, categoryId);
  };

  return (
    <div>
      <Form>
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button onClick={(e) => handleSubmit(e)} type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default Search;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #6da8e5;
  border-radius: 0 5px 5px 0;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  flex: 1;
`;

const Form = styled.form`
  display: flex;
`;