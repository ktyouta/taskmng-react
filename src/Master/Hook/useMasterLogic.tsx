import { useContext, useEffect } from "react";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedMasterAtom, selectedMasterNmAtom } from "../Master";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMasterLogic() {

    //全マスタのリスト(マスタメンテ画面のコンボ用)
    const masterDataList = useGlobalAtomValue(masterDataListAtom);
    //現在選択しているマスタ
    const setSelectedMaster = useSetAtom(selectedMasterAtom);
    //現在選択(テーブルに表示)しているマスタの名称
    const setSelectedMasterNm = useSetAtom(selectedMasterNmAtom);


    //マスタデータリストの先頭のデータをセット
    useEffect(() => {
        if (masterDataList && masterDataList.length > 0) {
            setSelectedMaster(masterDataList[0].value);
            setSelectedMasterNm(masterDataList[0].label);
        }
    }, [masterDataList]);
}

export default useMasterLogic;