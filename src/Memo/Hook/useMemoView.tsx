import { bodyObj, buttonObjType, comboType, generalDataType, inputMasterSettingType, refInfoType } from "../../Common/Type/CommonType";


//引数の型
type propsType = {
    openEditPage: () => void,
    closeFn?: () => void,
    backBtnTitle?: string,
}


/**
 * useMemoViewコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoView(props: propsType) {

    /**
     * 閉じるボタン押下処理
     */
    const backPageButtonFunc = () => {
        if (props.closeFn) {
            props.closeFn();
        }
    }

    return {
        backPageButtonObj: {
            title: props.backBtnTitle ?? `戻る`,
            type: `BASE`,
            onclick: props.closeFn ? backPageButtonFunc : undefined
        } as buttonObjType,
        positiveButtonObj: {
            title: `編集`,
            type: `RUN`,
            onclick: props.openEditPage
        } as buttonObjType,
    }
}

export default useMemoView;