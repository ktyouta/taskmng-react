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
    callback?: (data: TData) => RData
}

const useQueryWrapper = <
    TData = unknown,
    RData = TData,
>(props: propsType<TData, RData>) => {

    const fetchData = async () => {
        const { data } = await axios.get(props.url);
        return data;
    }

    return useQuery<TData, unknown, RData>(
        props.queryKey ?? [props.url],
        fetchData,
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