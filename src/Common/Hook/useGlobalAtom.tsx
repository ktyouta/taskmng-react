import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios from "axios";
import { atom, createStore, PrimitiveAtom } from 'jotai';
import useQueryWrapper from './useQueryWrapper';
import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import { getDefaultStore } from 'jotai/vanilla';


type WithInitialValue<Value> = {
    init: Value
}


//Providerの内側からアクセス可能なAtom
export const useGlobalAtom = <T,>(atom: PrimitiveAtom<T> & WithInitialValue<T>) => {
    return useAtom(atom, { store: getDefaultStore() });
}

//値のみ返却
export const useGlobalAtomValue = <T,>(atom: PrimitiveAtom<T> & WithInitialValue<T>) => {
    return useAtomValue(atom, { store: getDefaultStore() });
}

//セッターのみ返却
export const useSetGlobalAtom = <T,>(atom: PrimitiveAtom<T> & WithInitialValue<T>) => {
    return useSetAtom(atom, { store: getDefaultStore() });
}