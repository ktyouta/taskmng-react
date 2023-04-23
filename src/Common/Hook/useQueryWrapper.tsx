import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from "axios";


//引数の型
type propsType<TData, RData, PData> = {
    url: string,
    queryKey?: [string, (Record<string, unknown> | string)?],
    options?: Omit<
        UseQueryOptions<TData, unknown, RData, QueryKey>,
        "queryKey" | "queryFn" | "enabled" | "notifyOnChangeProps" | "select" | "initialData"
    >,
    init?: TData,
    callback?: (data: TData) => RData,
    afSuccessFn?: (data: RData) => void,
    method?: methodType,
    postData?: PData
}

//HTTPメソッド
type methodType = "GET" | "POST";

const useQueryWrapper = <
    TData = unknown,
    RData = TData,
    PData extends {} = {},
>(props: propsType<TData, RData, PData>) => {

    //GET
    const getQuery = async () => {
        const { data } = await axios.get(props.url);
        return data;
    }

    //POST
    const postQuery = async () => {
        const { data } = await axios.post(props.url, props.postData ?? {}, { withCredentials: true },);
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
            onSuccess: props.afSuccessFn,
            ...props.options
        }
    );
}

export default useQueryWrapper;