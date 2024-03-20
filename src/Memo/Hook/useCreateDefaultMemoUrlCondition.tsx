import ENV from '../../env.json';
import { useSetAtom } from "jotai";
import { memoSearchConditionType } from '../Type/MemoType';
import { memoListUrlAtom, memoSearchConditionObjAtom } from '../Atom/MemoAtom';


/**
 * 検索条件設定リストから初期表示メモの取得用URLを作成するメソッドを返却
 * @param memoSearchConditionList メモの設定リスト
 * @returns 
 */
function useCreateDefaultMemoUrlCondition(memoSearchConditionList: memoSearchConditionType[] | undefined) {

    //メモリスト取得用URL
    const setMemoListUrl = useSetAtom(memoListUrlAtom);
    //検索条件用オブジェクト
    const setSearchConditionObj = useSetAtom(memoSearchConditionObjAtom);

    /**
     * 初期表示メモ取得用URLと検索条件オブジェクトの作成
     */
    const createDefaultUrlCondition = () => {
        if (!memoSearchConditionList) {
            return;
        }
        let tmpCondition: { [key: string]: string } = {};
        let tmpUrl = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}`;
        let query = "?";
        memoSearchConditionList.forEach((element) => {
            //値が存在するプロパティをクエリストリングに設定
            if (!element.value) {
                return;
            }
            if (query !== "?") {
                query += "&";
            }
            query += `${element.id}=${element.value}`;
            tmpCondition[element.id] = element.value;
        });
        if (query.length > 1) {
            tmpUrl += query;
        }
        //初期表示メモ取得用URLの作成
        setMemoListUrl(tmpUrl);
        //検索条件オブジェクトの作成
        setSearchConditionObj(tmpCondition);
    }

    return {
        createDefaultUrlCondition,
    }
}

export default useCreateDefaultMemoUrlCondition;