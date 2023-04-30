import { QueryKey, useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import axios from "axios";
import { useMemo } from 'react';


//レスポンスの型
export type resType = {
    status: number,
    errMessage: string,
}

//エラーレスポンスの型
export type errResType = {
    response: { data: { errMessage: string } }
}

//引数の型
type propsType<T> = {
    url: string,
    method: T,
    queryKey?: [string, (Record<string, unknown> | string)?],
    //処理待ち中の処理
    waitingFn?: () => void,
    //処理成功後の処理
    afSuccessFn?: (res: resType) => void,
    //失敗後の処理
    afErrorFn?: (res: errResType) => void,
    finaliryFn?: () => void,
}

//DELETEメソッドの場合はmutateの引数なし
type axiosDataType<T, U> = T extends "DELETE" ? void : U;

//HTTPメソッド
type methodType = "POST" | "PUT" | "DELETE" | undefined;


const useMutationWrapper = <
    T extends methodType,
    U,
>(props: propsType<T>) => {

    const queryClient = useQueryClient();

    //POST
    const postQuery = async (postData: axiosDataType<T, U>) => {
        const { data } = await axios.post(props.url, postData, { withCredentials: true },);
        return data;
    }

    //PUT
    const putQuery = async (putData: axiosDataType<T, U>) => {
        const { data } = await axios.put(props.url, putData, { withCredentials: true },);
        return data;
    }

    //DELETE
    const deleteQuery = async () => {
        const { data } = await axios.delete(props.url, { withCredentials: true },);
        return data;
    }

    //HTTPメソッドによりaxiosを切り替える
    const queryMethod = useMemo(() => {
        switch (props.method) {
            case "POST":
                return postQuery;
            case "PUT":
                return putQuery;
            case "DELETE":
                return deleteQuery;
            default:
                return undefined;
        }
    }, [props.url]);

    return useMutation({
        //HTTPリクエスト送信処理
        mutationFn: queryMethod ? (data: axiosDataType<T, U>) => queryMethod(data) : undefined,
        onMutate: props.waitingFn ?? undefined,
        onSuccess: props.afSuccessFn ?? undefined,
        onError: props.afErrorFn ?? undefined,
        onSettled: props.queryKey ? () => {
            queryClient.invalidateQueries(props.queryKey);
        } : undefined,
    });
}

export default useMutationWrapper;