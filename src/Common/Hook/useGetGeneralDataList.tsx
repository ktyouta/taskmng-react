import ENV from '../../env.json';
import {
    generalDataType,
} from "../../Common/Type/CommonType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";

//汎用詳細取得APIのクエリパラメータキー
const GENERAL_DETAIL_QUERY_KEY = `generalId`;

/**
 * 汎用詳細リストを取得
 * @param selectedMaster 
 * @returns 
 */
function useGetGeneralDataList(pathParam?: string) {

    //汎用詳細リスト
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}${pathParam ? `?${GENERAL_DETAIL_QUERY_KEY}=${pathParam}` : ""}`,
    });

    return {
        generalDataList
    }
}

export default useGetGeneralDataList;