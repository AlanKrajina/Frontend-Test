import React, { useContext } from "react";
import { Data } from "../interfaces/interface";
import returnRequestedArticles from "../helpers/returnRequestedArticles";
import _ from "lodash";
import updateUrl from "../helpers/updateUrl";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { MediaQueryContext } from "../pages/_app";

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
  const { isDesktop } = useContext(MediaQueryContext);

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
    <MainDiv>
      <Form
        width={isDesktop ? "100%" : "18rem"}
        height={isDesktop ? "3rem" : "2rem"}
      >
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="...search article title or excerpt..."
          fontSize={isDesktop ? "0.9rem" : "0.7rem"}
        />
        <Button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          width={isDesktop ? "8rem" : "4rem"}
          fontSize={isDesktop ? "0.9rem" : "0.7rem"}
        >
          Search
        </Button>
      </Form>
    </MainDiv>
  );
};

export default React.memo(Search);

type FormProps = {
  width: string;
  height: string;
};

type ButtonProps = {
  width: string;
  fontSize: string;
};

type InputProps = {
  fontSize: string;
};

const MainDiv = styled.div`
  justify-content: center;
  display: flex;
`;

const Button = styled.button<ButtonProps>`
  padding: 10px;
  border: none;
  background-color: #63a3e5;
  border-radius: 0 5px 5px 0;
  width: ${(props) => props.width};
  font-size: ${(props) => props.fontSize};
  text-transform: uppercase;
  color: white;
  cursor: pointer;
`;

const Input = styled.input<InputProps>`
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  flex: 1;
  font-size: ${(props) => props.fontSize};
  outline: none;
`;

const Form = styled.form<FormProps>`
  display: flex;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;
