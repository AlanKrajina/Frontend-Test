import { useRouter } from "next/router";
import Image from "next/image";

const Article = () => {
  const router = useRouter();

  return (
    <div>
      {/*             <Image
        alt={article.slug}
        src={`https://www.alpha-orbital.com/assets/images/post_img/${article.post_image}`}
        width={500}
        height={500}
      /> */}
      <p>{router.query.title}</p>
      {/*       <p>{article.date}</p> <p>{article.excerpt}</p>
       */}{" "}
    </div>
  );
};

export default Article;
