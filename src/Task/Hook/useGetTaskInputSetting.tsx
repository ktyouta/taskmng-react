import ENV from '../../env.json';
import {
    inputSettingType,
    inputTaskSettingType,
} from "../../Common/Type/CommonType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";


/**
 * 入力欄設定リストを作成
 * @param data 
 * @returns 
 */
function createInputSettingList(data: inputSettingType): inputTaskSettingType[] {
    return data.taskEditSetting;
}


/**
 * 入力欄設定リストを取得
 * @param selectedMaster 
 * @returns 
 */
function useGetTaskInputSetting() {

    //入力欄設定リスト
    const { data: taskSettingList } = useQueryWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.INPUTSETTING}`,
        callback: createInputSettingList
    });

    return {
        taskSettingList
    }
}

export default useGetTaskInputSetting;