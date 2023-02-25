import { useContext, useEffect } from "react";
import { masterDataListContext } from "../../Main/Main";

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

    //マスタのリスト(マスタメンテ画面のコンボ用)
    const { masterDataList } = useContext(masterDataListContext);

    //マスタデータリストの先頭のデータをセット
    useEffect(() => {
        if (masterDataList && masterDataList.length > 0) {
            props.setSelectedMaster(masterDataList[0].value);
        }
    }, [masterDataList]);
}

export default useMasterLogit;