import React from "react";
import { Data } from "../interfaces/interface";
import returnRequestedArticles from "../helpers/returnRequestedArticles";
import _ from "lodash";
import updateUrl from "../helpers/updateUrl";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface Props {
  currentAllArticles: Data[];
  categoryId: number;
  searchValue: string;
  setDisplayedArticles: React.Dispatch<React.SetStateAction<Data[]>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<Props> = ({
  currentAllArticles,
  setDisplayedArticles,
  categoryId,
  searchValue,
  setSearchValue,
}) => {
  const router = useRouter();
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
          placeholder="...search article title or excerpt..."
        />
        <Button onClick={(e) => handleSubmit(e)} type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default React.memo(Search);

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #63a3e5;
  border-radius: 0 5px 5px 0;
  width: 8rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  flex: 1;
  font-size: 1rem;
  outline: none;
`;

const Form = styled.form`
  display: flex;
  height: 3rem;
`;
