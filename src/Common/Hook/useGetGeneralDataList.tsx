import ENV from '../../env.json';
import {
    generalDataType,
    inputSettingType,
    inputTaskSettingType,
} from "../../Common/Type/CommonType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";


/**
 * 汎用詳細リストを取得
 * @param selectedMaster 
 * @returns 
 */
function useGetGeneralDataList() {

    //汎用詳細リスト
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    return {
        generalDataList
    }
}

export default useGetGeneralDataList;