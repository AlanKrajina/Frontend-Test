import Link from "next/link";
import React, { useState } from "react";
import { Data, Item } from "../interfaces/interface";
import styled from "@emotion/styled";
import Image from "next/image";
import LinesEllipsis from "react-lines-ellipsis";
import { useVirtualizer } from "@tanstack/react-virtual";

interface Props {
  displayedArticles: Data[];
  setCurrentAllArticles: React.Dispatch<React.SetStateAction<Data[]>>;
}

const VirtualizedArticles: React.FC<Props> = ({
  displayedArticles,
  setCurrentAllArticles,
}) => {
  const [showDeleteButton, setShowDeleteButtons] = useState<boolean>(false);
  const [currentArticle, setCurrentArticle] = useState<string>("");

  const deleteArticle = (deletedArticle: Item): void => {
    setCurrentAllArticles((previousArticles: Data[]) =>
      previousArticles.filter(
        (article: Data) => article.slug !== deletedArticle.slug
      )
    );
  };

  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: displayedArticles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 125,
  });

  return (
    <div
      className="list"
      ref={parentRef}
      style={{
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            ref={virtualRow.measureElement}
            className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div style={{ height: 290 }}>
              <ArticleMain>
                <ImageDiv>
                  <Image
                    src={`https://www.alpha-orbital.com/assets/images/post_img/${
                      displayedArticles[virtualRow.index].post_image
                    }`}
                    alt="Picture of the author"
                    width={500}
                    height={230}
                  />
                  <DeleteButtonDiv
                    onMouseEnter={() => {
                      setCurrentArticle(
                        displayedArticles[virtualRow.index].slug
                      );
                      setShowDeleteButtons(true);
                    }}
                    onMouseLeave={() => setShowDeleteButtons(false)}
                  >
                    {currentArticle ===
                      displayedArticles[virtualRow.index].slug &&
                      showDeleteButton && (
                        <DeleteButton
                          onClick={() =>
                            deleteArticle(displayedArticles[virtualRow.index])
                          }
                        >
                          X
                        </DeleteButton>
                      )}
                  </DeleteButtonDiv>
                </ImageDiv>
                <ArticleDiv>
                  <TitleDateDiv>
                    <Link
                      href={`/article/${encodeURIComponent(
                        displayedArticles[virtualRow.index].slug
                      )}`}
                    >
                      <Title>{displayedArticles[virtualRow.index].title}</Title>
                    </Link>
                    <Date>{displayedArticles[virtualRow.index].date}</Date>
                  </TitleDateDiv>
                  <Text>
                    <LinesEllipsis
                      text={displayedArticles[virtualRow.index].excerpt.replace(
                        /<\/?p[^>]*>/g,
                        ""
                      )}
                      maxLine="5"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                    />
                  </Text>
                  <a
                    href={`https://www.alpha-orbital.com/news/${encodeURIComponent(
                      displayedArticles[virtualRow.index].slug
                    )}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <ExternalLink>Full Article</ExternalLink>
                  </a>
                </ArticleDiv>
              </ArticleMain>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(VirtualizedArticles);

const ArticleMain = styled.div`
  display: flex;
  height: 23rem;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.6);
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
  font-size: 1.4rem;
  margin: 0.6rem 0 0.6rem 0;
  cursor: pointer;
`;

const Date = styled.p`
  color: grey;
  font-size: 1rem;
  margin: 0.1rem 0 0.6rem 0;
`;

const Text = styled.div`
  color: white;
  font-size: 1rem;
  margin: 0.6rem 0 0.6rem 0;
`;

const ExternalLink = styled.p`
  color: #6da8e5;
  font-size: 1rem;
  margin: 0.6rem 0 0.6rem 0;
  display: flex;
  justify-content: end;
`;

const ImageDiv = styled.div`
  flex: 1;
  position: relative;
`;

const DeleteButtonDiv = styled.div`
  height: 50px;
  width: 50px;
  position: absolute;
  top: 0;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.button`
  height: 20px;
  width: 20px;
  cursor: pointer;
  background-color: red;
  border-radius: 30%;
  color: white;
  display: flex;
  justify-content: center;
  margin: 0 0 5px 5px;
`;
