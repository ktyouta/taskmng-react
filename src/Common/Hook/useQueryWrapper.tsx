import { useQuery, UseQueryOptions } from 'react-query';
import axios from "axios";

//引数の型
type propsType = {
    url: string,
    options?: Omit<
        UseQueryOptions<any, unknown, any, string[]>,
        "queryKey" | "queryFn" | "enabled" | "notifyOnChangeProps" | "select"
    >,
    init?: any,
    callback?: (data: any) => any
}

const useQueryWrapper = (
    props: propsType
) => {

    const fetchData = async () => {
        const { data } = await axios.get(props.url);
        return data;
    }

    return useQuery(
        [props.url],
        fetchData,
        {
            enabled: !!props.url,
            notifyOnChangeProps: "tracked",
            select: props.callback,
            initialData: props.init,
            ...props.options
        });
}

export default useQueryWrapper;