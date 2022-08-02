import { Query } from "../interfaces/interface";

const updateUrl = (router: any, searchValue: string, categoryId: number) => {
  const urlQuery = {} as Query;

  if (searchValue !== "" && searchValue.length > 2) {
    urlQuery["query"] = searchValue;
  }

  if (categoryId !== 0) {
    urlQuery["filter"] = categoryId;
  }

  router.push(
    {
      pathname: "/",
      query: urlQuery,
    },
    undefined,
    { shallow: true }
  );
};

export default updateUrl;
