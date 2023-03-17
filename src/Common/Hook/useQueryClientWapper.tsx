import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import axios from "axios";


const useQueryClientWapper = <T,>(
    key: string
) => {

    const queryClient = useQueryClient();

    return queryClient.getQueryData<T>(key);
}

export default useQueryClientWapper;