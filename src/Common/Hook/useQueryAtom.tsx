import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from "axios";
import { atom } from 'jotai';
import useQueryWrapper from './useQueryWrapper';
import { useEffect } from 'react';
import { useAtom } from 'jotai/react';


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
    method?: methodType,
    postData?: PData
}

//HTTPメソッド
type methodType = "GET" | "POST";

type queryAtomType = {
    key: [string, (string | Record<string, unknown> | undefined)?],
    data: any,
}

//取得後のデータを保存
export const queryAtom = atom<queryAtomType[]>([]);
//キーに対応したデータ
const selectQueryAtom = atom<queryAtomType | undefined>(undefined);


const useQueryAtom = <
    TData = unknown,
    RData = TData,
    PData extends {} = {},
>(props: propsType<TData, RData, PData>) => {

    //データを取得
    const res = useQueryWrapper(
        { ...props }
    );

    //取得後のデータを保存
    const [fetchDataMap, setFetchDataMap] = useAtom(queryAtom);
    //キーに対応したデータ
    const [selectKeyData, setSelectKeyData] = useAtom(selectQueryAtom);

    useEffect(() => {
        let tmpAtom = [...fetchDataMap];
        let key = props.queryKey ?? [props.url];
        let isChange = false;
        tmpAtom.some((element) => {
            //更新
            if (JSON.stringify(element.key) === JSON.stringify(key)) {
                element.data = res.data;
                return isChange = true;
            }
        });
        //データを追加
        if (!isChange && res.data) {
            tmpAtom.push({ key, data: res.data });
        }
        setFetchDataMap(tmpAtom);
    }, [res.data]);

    useEffect(() => {
        let key = props.queryKey ?? [props.url];
        let tmpAtom = [...fetchDataMap];
        let tmp = undefined;
        tmpAtom.some((element) => {
            if (JSON.stringify(element.key) === JSON.stringify(key)) {
                tmp = element.data;
                return true;
            }
        });
        if (!tmp) {
            return;
        }
        setSelectKeyData(tmp);
    }, [fetchDataMap]);

    return { ...res, clientData: selectKeyData as TData | RData };
}

export default useQueryAtom;