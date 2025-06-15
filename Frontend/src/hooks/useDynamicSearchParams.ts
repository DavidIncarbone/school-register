import { useSearchParams } from "react-router";

export const useDynamicSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());

    const updateSearchParam = (params: { key: string; value: string }[]) => {
        const newParams = new URLSearchParams(searchParams); // clona quelli esistenti
        params.forEach((param) => newParams.set(param.key, param.value));
        setSearchParams(newParams);
    };

    return { params, updateSearchParam };
};
