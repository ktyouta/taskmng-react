import ENV from '../../env.json';
import { useAtom, useSetAtom } from "jotai";
import { memoSearchConditionType, tagListResType } from '../Type/MemoType';
import { memoListQueryParamAtom, memoListUrlAtom, memoSearchConditionObjAtom, selectedTagListAtom } from '../Atom/MemoAtom';
import { MEMO_SEARCH_URL, TAG_QUERY_KEY } from '../Const/MemoConst';
import { useNavigate } from "react-router-dom";


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
    //選択中のタグリスト
    const setSelectedTagList = useSetAtom(selectedTagListAtom);
    //一覧画面のルーティング用
    const setMemoListQueryParam = useSetAtom(memoListQueryParamAtom);
    //ルーティング用
    const navigate = useNavigate();


    /**
     * 初期表示メモ取得用URLと検索条件オブジェクトの作成
     */
    const createDefaultUrlCondition = () => {
        //クエリパラメータが存在する場合はスキップ
        if (window.location.search) {
            return;
        }
        if (!memoSearchConditionList) {
            return;
        }

        let tmpCondition: { [key: string]: string } = {};
        let tmpTagList: tagListResType[] = []
        let tmpUrl = MEMO_SEARCH_URL;
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
        setMemoListQueryParam(tmpUrl);
        navigate(query);
        //検索条件オブジェクトの作成
        setSearchConditionObj(tmpCondition);
        setSelectedTagList([]);
    }

    return {
        createDefaultUrlCondition,
    }
}

export default useCreateDefaultMemoUrlCondition;