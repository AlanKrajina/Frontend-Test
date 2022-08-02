interface Data {
  date: string;
  excerpt: string;
  post_category_id: string;
  post_image: string;
  post_thumbnail: string;
  slug: string;
  title: string;
}

interface Item {
  slug: string;
  title: string;
}

interface Category {
  category: string;
  id: number;
}

interface Query {
  filter: number;
  query: string;
}

export type { Data, Item, Category, Query };
