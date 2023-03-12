import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from "axios";


//引数の型
type propsType<TData, RData> = {
    url: string,
    queryKey?: [string, (Record<string, unknown> | string)?],
    options?: Omit<
        UseQueryOptions<TData, unknown, RData, QueryKey>,
        "queryKey" | "queryFn" | "enabled" | "notifyOnChangeProps" | "select" | "initialData"
    >,
    init?: TData,
    callback?: (data: TData) => RData,
    method?: methodType,
}

//HTTPメソッド
type methodType = "GET" | "POST";

const useQueryWrapper = <
    TData = unknown,
    RData = TData,
>(props: propsType<TData, RData>) => {

    //GET
    const getQuery = async () => {
        const { data } = await axios.get(props.url);
        return data;
    }

    //POST
    const postQuery = async () => {
        const { data } = await axios.post(props.url,{ withCredentials: true},);
        return data;
    }

    //HTTPメソッドのリスト
    const queryList = {
        GET: getQuery,
        POST: postQuery,
    }

    return useQuery<TData, unknown, RData>(
        props.queryKey ?? [props.url],
        props.method ? queryList[props.method] : queryList["GET"],
        {
            enabled: !!props.url,
            notifyOnChangeProps: "tracked",
            select: props.callback,
            initialData: props.init,
            ...props.options
        }
    );
}

export default useQueryWrapper;