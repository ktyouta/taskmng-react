import { QueryKey, useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import axios from "axios";
import { useMemo } from 'react';


//レスポンスの型
export type resType = {
    status: number,
    errMessage: string,
    token: string,
}

//エラーレスポンスの型
export type errResType = {
    response: { data: { errMessage: string } }
}

//引数の型
type propsType = {
    url: string,
    method: methodType,
    queryKey?: [string, (Record<string, unknown> | string)?],
    //処理待ち中の処理
    waitingFn?: () => void,
    //処理成功後の処理
    afSuccessFn?: (res: resType) => void,
    //失敗後の処理
    afErrorFn?: (res: errResType) => void,
    finaliryFn?: () => void,
}

//HTTPメソッド
type methodType = "POST" | "PUT" | "DELETE" | undefined;


const useMutationWrapperBase = <
    T,
>(props: propsType) => {

    const queryClient = useQueryClient();

    //POST
    const postQuery = async (postData: T) => {
        const { data } = await axios.post(props.url, postData, { withCredentials: true },);
        return data;
    }

    //PUT
    const putQuery = async (putData: T) => {
        const { data } = await axios.put(props.url, putData, { withCredentials: true },);
        return data;
    }

    //DELETE
    const deleteQuery = async (delData: T) => {
        const { data } = await axios.delete(props.url, { data: delData, withCredentials: true },);
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
        mutationFn: queryMethod ? (data: T) => queryMethod(data) : undefined,
        onMutate: props.waitingFn ?? undefined,
        onSuccess: props.afSuccessFn ?? undefined,
        onError: props.afErrorFn ?? undefined,
        onSettled: props.queryKey ? () => {
            queryClient.invalidateQueries(props.queryKey);
        } : undefined,
    });
}

export default useMutationWrapperBase;