import ENV from '../../env.json';
import {
    generalDataType,
} from "../../Common/Type/CommonType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";

// 引数の型
type propsType = {
    pathParam?: string,
}

/**
 * 汎用詳細リストを取得
 * @param selectedMaster 
 * @returns 
 */
function useGetGeneralDataList(props: propsType) {

    //汎用詳細リスト
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}${props.pathParam ?? ""}`,
    });

    return {
        generalDataList
    }
}

export default useGetGeneralDataList;