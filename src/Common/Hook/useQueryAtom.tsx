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
    const [qAtom, setQAtom] = useAtom(queryAtom);
    //キーに対応したデータ
    const [selectQAtom, setSelectQAtom] = useAtom(selectQueryAtom);

    useEffect(() => {
        let tmpAtom = [...qAtom];
        let key = props.queryKey ?? [props.url];
        let isChange = false;
        for (let i = 0; i < tmpAtom.length; i++) {
            //更新
            if (tmpAtom[i].key === key) {
                tmpAtom[i].data = res.data;
                isChange = true;
                break;
            }
        }
        //データを追加
        if (!isChange && res.data) {
            tmpAtom.push({ key, data: res.data });
        }
        setQAtom(tmpAtom);
    }, [res.data]);

    useEffect(() => {
        let key = props.queryKey ?? [props.url];
        let tmpAtom = [...qAtom];
        let tmp = undefined;
        for (let i = 0; i < tmpAtom.length; i++) {
            if (JSON.stringify(tmpAtom[i].key) === JSON.stringify(key)) {
                tmp = tmpAtom[i].data;
                break;
            }
        }
        if(!tmp){
            return;
        }
        setSelectQAtom(tmp);
    }, [qAtom]);

    return { ...res, data: selectQAtom as TData | RData };
}

export default useQueryAtom;