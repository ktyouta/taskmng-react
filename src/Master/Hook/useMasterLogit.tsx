import { useContext, useEffect } from "react";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
import { useAtomValue } from "jotai";

//引数の型
type propsType = {
    setSelectedMaster: React.Dispatch<React.SetStateAction<string>>
}

/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMasterLogit(props: propsType) {

  //全マスタのリスト(マスタメンテ画面のコンボ用)
  const masterDataList = useAtomValue(masterDataListAtom);

    //マスタデータリストの先頭のデータをセット
    useEffect(() => {
        if (masterDataList && masterDataList.length > 0) {
            props.setSelectedMaster(masterDataList[0].value);
        }
    }, [masterDataList]);
}

export default useMasterLogit;