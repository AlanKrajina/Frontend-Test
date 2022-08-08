import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
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
    <div className={styles.container}>
      <div className={styles.main}>
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
          {!isFetching &&
            `Currently showing ${displayedArticles?.length} articles`}
        </CurrentArticlesParaghraph>

        <Articles
          displayedArticles={displayedArticles}
          currentAllArticles={currentAllArticles}
          setDisplayedArticles={setDisplayedArticles}
          setCurrentAllArticles={setCurrentAllArticles}
          categoryId={categoryId}
          searchValue={searchValue}
        />
      </div>
    </div>
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
  padding: 10px;
  border: none;
`;

const CurrentArticlesParaghraph = styled.p`
  display: flex;
  justify-content: right;
  font-size: 1.1rem;
  height: 1.1rem;
`;
