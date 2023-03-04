import { useQuery } from 'react-query';
import axios from "axios";

function useQueryWrapper(url: string) {
    const fetchData = async () => {
        if(!url){
            return;
        }
        const { data } = await axios.get(url);
        return data;
      }

    return useQuery([url], fetchData);
}

export default useQueryWrapper;