import React from "react";
import { getData } from "../api/fetchData";
import Image from "next/image";
import { Data } from "../../interfaces/interface";

const Article = (props: { article: Data }) => {
  const { article } = props;

  /*   console.log(props);
   */
  if (!article) return <div>No Article!</div>;

  return (
    <div>
      <Image
        alt={article.slug}
        src={`https://www.alpha-orbital.com/assets/images/post_img/${article.post_image}`}
        width={500}
        height={500}
      />
      <p>{article.title}</p>
      <p>{article.date}</p> <p>{article.excerpt}</p>
    </div>
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
