import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { PRIORITY_URL, STATUS_URL } from '../Task';
import { generalDataType } from '../Type/TaskType';


function useTask() {

    //優先度リストを取得
    useQueryWrapper<generalDataType[]>(
        {
            url: PRIORITY_URL,
        }
    );

    //ステータスリストを取得
    useQueryWrapper<generalDataType[]>(
        {
            url: STATUS_URL,
        }
    );

}

export default useTask;