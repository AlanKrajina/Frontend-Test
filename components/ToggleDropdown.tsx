import React, { useState } from "react";
import styled from "@emotion/styled";
import { Category } from "../interfaces/interface";

interface Props {
  categories: Category[];
  deleteCategoryAndArticles: (catId: number) => void;
}

const ToggleDropdown: React.FC<Props> = ({
  categories,
  deleteCategoryAndArticles,
}) => {
  const [showSelectbox, setShowSelectbox] = useState<boolean>(false);

  const SelectBox = () => {
    return (
      <BoxDiv>
        {categories.map((cat: Category) => {
          return (
            <CatBoxDiv key={cat.id}>
              <p>{cat.category}</p>
              <Span onClick={() => deleteCategoryAndArticles(cat.id)}>
                Delete
              </Span>
            </CatBoxDiv>
          );
        })}
      </BoxDiv>
    );
  };

  return (
    <MainDiv>
      <DeleteButton
        onClick={() => setShowSelectbox(!showSelectbox)}
        backgroundColor={showSelectbox ? "#ff5b5b" : "#63a3e5"}
      >
        {showSelectbox ? "+" : "-"}
      </DeleteButton>
      {showSelectbox ? <SelectBox /> : ""}
    </MainDiv>
  );
};

export default ToggleDropdown;

const MainDiv = styled.div`
  position: absolute;
  align-self: center;
  right: 0;
`;

type ButtonProps = {
  backgroundColor: string;
};

const DeleteButton = styled.button<ButtonProps>`
  height: 22px;
  width: 22px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
`;

const BoxDiv = styled.div`
  width: 12rem;
  background-color: #808080;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30px;
  right: 0px;
  z-index: 2;
  padding: 5px 15px 5px 15px;
  font-size: small;
`;

const CatBoxDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Span = styled.span`
  cursor: pointer;
  color: red;
  font-size: smaller;
`;
