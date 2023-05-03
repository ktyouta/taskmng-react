import ENV from '../../env.json';
import { bodyObj, inputSettingType } from "../../Common/Type/CommonType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useSetAtom } from 'jotai';
import { addDataInputAtom, summaryInputAtom } from '../AddMaster';
import { useEffect } from 'react';


//返り値の型
type retType = {
    inputsSettingList: inputSettingType | undefined,
}


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useAddMaster(): retType {

    //入力欄設定リストを取得
    const { data: inputsSettingList } = useQueryWrapper<inputSettingType>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.INPUTSETTING}`,
        options: {
            cacheTime: 0
        }
    });

    //概要画面の入力値(POST用のボディ)
    const setSummaryInputBody = useSetAtom(summaryInputAtom);
    //概要画面の入力値(POST用のボディ保存用)
    const setAddDataInput = useSetAtom(addDataInputAtom);

    //マウント時に入力値をリセット
    useEffect(() => {
        setSummaryInputBody({});
        setAddDataInput({});
    }, []);

    return {
        inputsSettingList,
    }
}

export default useAddMaster;