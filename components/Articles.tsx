import Link from "next/link";
import React, { useEffect } from "react";
import returnRequestedArticles from "../helpers/returnRequestedArticles";
import { Data, Item } from "../interfaces/interface";
import styled from "@emotion/styled";
import Image from "next/image";

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
        (article: {
          title: string;
          slug: string;
          date: string;
          excerpt: string;
          post_image: string;
        }) => {
          return (
            <ArticleMain key={article.slug}>
              <Image
                src={`https://www.alpha-orbital.com/assets/images/post_img/${article.post_image}`}
                alt="Picture of the author"
                width={500}
                height={500}
                style={{ flex: 1 }}
              />
              <ArticleDiv>
                <TitleDateDiv>
                  <Link href={`/article/${encodeURIComponent(article.slug)}`}>
                    <Title>{article.title}</Title>
                  </Link>
                  <Date>{article.date}</Date>
                </TitleDateDiv>
                <Text>{article.excerpt.replace(/<\/?p[^>]*>/g, "")}</Text>
                <a
                  href={`https://www.alpha-orbital.com/news/${encodeURIComponent(
                    article.slug
                  )}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink>Full Article</ExternalLink>
                </a>
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
  height: 23rem;
  padding: 2rem;
  background-color: black;
  gap: 2rem;
`;

const ArticleDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleDateDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.p`
  color: white;
  font-size: 1.6rem;
  margin: 0.6rem 0 0.6rem 0;
  cursor: pointer;
`;

const Date = styled.p`
  color: grey;
  font-size: 1.1rem;
  margin: 0.6rem 0 0.6rem 0;
`;

const Text = styled.p`
  color: white;
  font-size: 1.1rem;
  margin: 0.6rem 0 0.6rem 0;
`;

const ExternalLink = styled.p`
  color: #6da8e5;
  font-size: 1.1rem;
  margin: 0.6rem 0 0.6rem 0;
  display: flex;
  justify-content: end;
`;
