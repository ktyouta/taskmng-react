import { useContext, useEffect } from "react";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedMasterAtom } from "../Master";
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

    //マスタデータリストの先頭のデータをセット
    useEffect(() => {
        if (masterDataList && masterDataList.length > 0) {
            setSelectedMaster(masterDataList[0].value);
        }
    }, [masterDataList]);
}

export default useMasterLogic;