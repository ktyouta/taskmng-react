import { tagType } from "../../Common/TagsComponent";


//引数の型
type propsType = {
    memoTitle: string,
    memoContent: string,
    initMemoTitle: string | undefined,
    initMemoContent: string | undefined,
    setMemoTitle: React.Dispatch<React.SetStateAction<string>>,
    setMemoContent: React.Dispatch<React.SetStateAction<string>>,
    initMemoTagList: tagType[],
    setMemoTagList: React.Dispatch<React.SetStateAction<tagType[]>>
}


/**
 * useMemoEditBaseコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoEditBase(props: propsType) {

    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (props.initMemoTitle === undefined) {
            return;
        }
        if (props.initMemoContent === undefined) {
            return;
        }
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }

        props.setMemoTitle(props.initMemoTitle);
        props.setMemoContent(props.initMemoContent);
        props.setMemoTagList(props.initMemoTagList);
    }


    return {
        clearButtonFunc,
    }
}

export default useMemoEditBase;