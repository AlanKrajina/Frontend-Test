import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { getData } from "./api/fetchData";
import { Data } from "../interfaces/interface";
import Articles from "../components/Articles";
import Categories from "../components/Categories";
import Search from "../components/Search";
import { useRouter } from "next/router";
import _ from "lodash";
import styled from "@emotion/styled";

const Home: NextPage = () => {
  const [displayedArticles, setDisplayedArticles] = useState<Data[]>([]);
  const [currentAllArticles, setCurrentAllArticles] = useState<Data[]>([]);
  const [categoryId, setsCategoryId] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!_.isEmpty(router.query)) {
      if (router.query.filter && router.query.filter !== "") {
        setsCategoryId(parseInt(router.query.filter as string));
      }
      if (router.query.query && router.query.query !== "") {
        setSearchValue(router.query.query as string);
      }
    }
  }, [router.query]);

  // this query FETCHES FROM CACHE from data that is already there
  const { data, isFetching } = useQuery<Data[]>(["alpha-orbital"], getData, {
    onSuccess: () => {
      if (data) {
        setCurrentAllArticles(data);
      }
    },
  });

  if (!data) return <div>No Data!</div>;

  return (
    <MainContainer>
      <MainDiv>
        {!isFetching && (
          <>
            <Categories
              currentAllArticles={currentAllArticles}
              searchValue={searchValue}
              setDisplayedArticles={setDisplayedArticles}
              setCurrentAllArticles={setCurrentAllArticles}
              setsCategoryId={setsCategoryId}
              unMutatedData={data}
              router={router}
              categoryId={categoryId}
            />
            <Search
              currentAllArticles={currentAllArticles}
              setDisplayedArticles={setDisplayedArticles}
              categoryId={categoryId}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              router={router}
            />

            <CurrentArticlesParaghraph>
              {`Currently showing ${displayedArticles?.length} articles`}
            </CurrentArticlesParaghraph>
            <Articles
              displayedArticles={displayedArticles}
              currentAllArticles={currentAllArticles}
              setDisplayedArticles={setDisplayedArticles}
              setCurrentAllArticles={setCurrentAllArticles}
              categoryId={categoryId}
              searchValue={searchValue}
            />
          </>
        )}
      </MainDiv>
    </MainContainer>
  );
};

export default Home;

export async function getStaticProps() {
  // because of getStaticProps, Next.js will pre-render this page at build time using the props returned by getStaticProps.
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<Data[]>(["alpha-orbital"], getData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const MainContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  color: rgb(246, 246, 246);
  font-family: sans-serif;
`;

const MainDiv = styled.div`
  width: 70rem;
`;

const CurrentArticlesParaghraph = styled.p`
  display: flex;
  justify-content: right;
  font-size: 1.1rem;
  height: 1.1rem;
`;
