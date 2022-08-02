import Link from "next/link";
import React, { useEffect } from "react";
import returnRequestedArticles from "../helpers/returnRequestedArticles";
import { Data, Item } from "../interfaces/interface";
import styled from "@emotion/styled";

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

  const deleteArticle = (deletedArticle: Item): void => {
    setCurrentAllArticles((previousArticles: Data[]) =>
      previousArticles.filter(
        (article: Data) => article.slug !== deletedArticle.slug
      )
    );
  };

  return (
    <div>
      {displayedArticles.map(
        (el: {
          title: string;
          slug: string;
          date: string;
          excerpt: string;
        }) => {
          return (
            <ArticleMain key={el.slug}>
              <Image></Image>
              <ArticleDiv>
                <Link
                  key={el.slug}
                  href={`/article/${encodeURIComponent(el.slug)}`}
                >
                  <Title>{el.title}</Title>
                </Link>
                <Date>{el.date}</Date>
                <Text>{el.excerpt}</Text>
                <Link
                  key={el.slug}
                  href={`https://www.alpha-orbital.com/news/${encodeURIComponent(
                    el.slug
                  )}`}
                >
                  <Title>Full Article</Title>
                </Link>
                {/*                 <ExternalLink>Full Article</ExternalLink>
                 */}{" "}
                {/*                 <button onClick={() => deleteArticle(el)}>Delete</button>
                 */}{" "}
              </ArticleDiv>
            </ArticleMain>
          );
        }
      )}
    </div>
  );
};

export default React.memo(Articles);

const ArticleMain = styled.div`
  display: flex;
  height: 15rem;
  padding: 1rem;
  background-color: black;
  gap: 2rem;
`;

const Image = styled.img`
  flex: 1;
`;

const ArticleDiv = styled.div`
  flex: 1;
`;

const Title = styled.p`
  color: white;
  font-size: 20px;
`;

const Date = styled.p`
  color: grey;
`;

const Text = styled.p`
  color: white;
`;

const ExternalLink = styled.p`
  color: blue;
`;
