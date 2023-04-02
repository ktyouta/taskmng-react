import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from "axios";
import { atom } from 'jotai';
import useQueryWrapper from './useQueryWrapper';
import { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai/react';
import { queryAtom } from './useQueryAtom';


const useQueryAtomValue = <T,>(key: string) => {

    const qAtom = useAtomValue(queryAtom);

    //キーに一致するデータを取得
    function getKeyData(){
        let selectKey = [key];
        let tmpAtom = [...qAtom];
        let tmp = undefined;
        for (let i = 0; i < tmpAtom.length; i++) {
            //キーに一致するデータが存在する
            if (JSON.stringify(tmpAtom[i].key) === JSON.stringify(selectKey)) {
                tmp = tmpAtom[i].data;
                break;
            }
        }
        if(!tmp){
            return;
        }
        return tmp;
    }

    return { data:getKeyData() as T };
}

export default useQueryAtomValue;