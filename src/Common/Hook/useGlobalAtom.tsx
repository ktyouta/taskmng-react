import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from "axios";
import { atom, createStore, PrimitiveAtom } from 'jotai';
import useQueryWrapper from './useQueryWrapper';
import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';


type WithInitialValue<Value> = {
    init: Value
}

type Store = ReturnType<typeof createStore>

//グローバル用ストア
let globalStore: Store | undefined = undefined;

//Providerの内側からアクセス可能なAtom
export const useGlobalAtom = <T,>(atom: PrimitiveAtom<T> & WithInitialValue<T>) => {
    if (!globalStore) {
        globalStore = createStore();
    }
    return useAtom(atom, { store: globalStore });
}

//値のみ返却
export const useGlobalAtomValue = <T,>(atom: PrimitiveAtom<T> & WithInitialValue<T>) => {
    return useAtomValue(atom, { store: globalStore });
}