import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";
import ENV from '../../../env.json';


function SettingCustomTable() {

    //カスタム属性のリストを取得する
    const { data: customAttributeList } = useQueryWrapper(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}`,
        }
    );

    return { customAttributeList }

}

export default SettingCustomTable;
