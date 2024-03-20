import ENV from '../../env.json';
import {
    inputSettingType,
} from "../../Common/Type/CommonType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { inputMemoSettingType } from '../Type/MemoType';



/**
 * 入力欄設定リストを取得
 * @param selectedMaster 
 * @returns 
 */
function useGetMemoInputSetting() {

    //入力欄設定リスト
    const { data: memoSettingList, isLoading } = useQueryWrapper<inputMemoSettingType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMOINPUTSETTING}`,
    });

    return {
        memoSettingList,
        isLoading
    }
}

export default useGetMemoInputSetting;