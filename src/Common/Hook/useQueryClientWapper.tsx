import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import axios from "axios";


const useQueryClientWapper = (
    key: string
) => {

    const queryClient = useQueryClient();

    return queryClient.getQueryData(key);
}

export default useQueryClientWapper;