import { QueryKey, useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import axios from "axios";
import { useMemo } from 'react';
import useMutationWrapperBase from './useMutationWrapperBase';


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


const useMutationWrapper = <
    T,
>(props: propsType) => {

    const mutationObj = useMutationWrapperBase({ ...props });

    function mutation(data?: T) {
        mutationObj.mutate(data ?? {});
    }

    return { ...mutationObj, mutate: mutation };
}

export default useMutationWrapper;