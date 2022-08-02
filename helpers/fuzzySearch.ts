import Fuse from "fuse.js";
import { Data } from "../interfaces/interface";

const fuzzySearch = (foundArticles: Data[], searchValue: string): Data[] => {
  const fuse = new Fuse(foundArticles, {
    keys: ["title", "excerpt"],
  });

  return fuse.search(searchValue).map((el) => el.item);
};

export default fuzzySearch;
