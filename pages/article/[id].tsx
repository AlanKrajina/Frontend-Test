import React from "react";
import { getData } from "../api/fetchData";
import Image from "next/image";
import { Data } from "../../interfaces/interface";
import styled from "@emotion/styled";
import Link from "next/link";

const Article = (props: { article: Data }) => {
  const { article } = props;

  if (!article) return <div>No Article!</div>;

  return (
    <ArticleMain>
      <LinkWrapper>
        <Link href="/">Return</Link>
      </LinkWrapper>

      <Image
        alt={article.slug}
        src={`https://www.alpha-orbital.com/assets/images/post_img/${article.post_image}`}
        width={1000}
        height={400}
      />
      <Title>{article.title}</Title>
      <TextDateDiv>
        <Date>{article.date}</Date>
        <Text>{article.excerpt.replace(/<\/?p[^>]*>/g, "")}</Text>
      </TextDateDiv>
    </ArticleMain>
  );
};

export default Article;

// fetches data at request
export const getServerSideProps = async (context: {
  params: { id: string };
}) => {
  const id: string = context.params.id;
  const response: Data[] = await getData();

  const article = response.find((art: Data) => art.slug === id);
  return {
    props: { article: article },
  };
};

const ArticleMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 3rem;
  max-width: 80rem;
  margin: auto;
  text-align: center;
`;

const Title = styled.p`
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const Date = styled.p`
  color: grey;
  font-size: 1.4rem;
  margin: 0 0 2rem 0;
`;

const Text = styled.div`
  color: white;
  font-size: 1.3rem;
`;

const TextDateDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 60rem;
`;

const LinkWrapper = styled.div`
  padding: 10px;
  background-color: #63a3e5;
  border-radius: 10%;
  width: 6rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
  margin: 1rem;
`;
