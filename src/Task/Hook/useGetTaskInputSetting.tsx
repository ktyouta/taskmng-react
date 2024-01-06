import ENV from '../../env.json';
import {
    inputSettingType,
} from "../../Common/Type/CommonType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { inputTaskSettingType } from '../Type/TaskType';



/**
 * 入力欄設定リストを取得
 * @param selectedMaster 
 * @returns 
 */
function useGetTaskInputSetting() {

    //入力欄設定リスト
    const { data: taskSettingList, isLoading } = useQueryWrapper<inputTaskSettingType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKINPUTSETTING}`,
    });

    return {
        taskSettingList,
        isLoading
    }
}

export default useGetTaskInputSetting;