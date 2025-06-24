import { useSearchParams } from "react-router";

export const useDynamicSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const updateSearchParams = (params: { key: string; value: string }[]) => {
    const newParams = new URLSearchParams(searchParams); // clona quelli esistenti
    params.forEach((param) => newParams.set(param.key, param.value));
    setSearchParams(newParams);
  };

  const removeSearchParam = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  return { queryParams, updateSearchParams, removeSearchParam };
};
