import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { apiMemoDetailType, memoListType, tagListResType } from "../Type/MemoType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useSetAtom } from "jotai";
import { detailRoutingIdAtom } from "../Atom/MemoAtom";
import { DUMMY_ID, TAG_MAX_SETTINGNUM } from "../Const/MemoConst";
import { VIEW_MODE } from "../../Common/Const/CommonConst";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { tagType } from "../../Common/TagsComponent";
import { userInfoAtom } from "../../Content/Atom/ContentAtom";


//引数の型
type propsType = {
    updMemoId: string,
    closeFn?: () => void,
}


/**
 * useMemoEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoDetail(props: propsType) {

    //閲覧モード(1:閲覧 2:編集)
    const [viewMode, setViewMode] = useState(1);
    //詳細画面へのルーティング用ID
    const setDetailRoutingId = useSetAtom(detailRoutingIdAtom);
    //メモのタイトル
    const [memoTitle, setMemoTitle] = useState("");
    //メモの内容
    const [memoContent, setMemoContent] = useState("");
    //ユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);
    //メモタグリスト
    const [memoTagList, setMemoTagList] = useState<tagType[]>([]);
    //タグのサジェスト用リスト
    const [tagSuggestList, setTagSuggestList] = useState<tagListResType[]>([]);


    //詳細画面遷移時に更新用メモを取得
    const { data: updMemo, isLoading: isLoadinGetUpdMemo } = useQueryWrapper<apiMemoDetailType>(
        {
            url: props.updMemoId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}/${props.updMemoId}` : ``,
            afSuccessFn: (data: apiMemoDetailType) => {
                setMemoTitle(data.title);
                setMemoContent(data.content);
                setMemoTagList(data.tagList);
            }
            , afErrorFn: (res) => {
                let tmp = res as errResType;
                //NotFound画面に遷移
                setDetailRoutingId(DUMMY_ID);
            }
        }
    );

    //タグリストを取得
    useQueryWrapper<tagListResType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TAGLIST}`,
            afSuccessFn: (data: tagListResType[]) => {
                setTagSuggestList(data);
            }
        }
    );


    //メモのタイトルの初期値
    let initMemoTitle = useMemo(() => {
        if (!updMemo) {
            return;
        }
        return updMemo.title;
    }, [updMemo]);

    //メモの内容の初期値
    let initMemoContent = useMemo(() => {
        if (!updMemo) {
            return;
        }
        return updMemo.content;
    }, [updMemo]);

    //タグリストの内容の初期値
    let initMemoTagList = useMemo(() => {
        if (!updMemo) {
            return;
        }
        return updMemo.tagList;
    }, [updMemo]);

    /**
     * 編集ボタン押下処理
     */
    const openEditPage = () => {
        setViewMode(VIEW_MODE.edit);
    }

    /**
     * 戻るボタン押下処理(閲覧モードに切り替え)
     */
    const openViewPage = () => {
        setViewMode(VIEW_MODE.view);
    }

    /**
     * タグの追加イベント
     */
    const addTag = (newTag: tagType) => {
        //同名のタグは設定不可
        if (memoTagList.find((element) => {
            return element.label === newTag.label;
        })) {
            alert("同名のタグは設定できません。");
            return;
        }

        if (memoTagList.length >= TAG_MAX_SETTINGNUM) {
            alert("タグの最大設定可能数は5個です。");
            return;
        }
        setMemoTagList([...memoTagList, newTag]);
    };

    /**
     * タグの削除イベント
     */
    const deleteTag = (tagIndex: number) => {
        setMemoTagList(memoTagList.filter((_, i) => i !== tagIndex))
    }


    return {
        updMemo,
        viewMode,
        openViewPage,
        openEditPage,
        memoTitle,
        setMemoTitle,
        memoContent,
        setMemoContent,
        isLoadinGetUpdMemo,
        initMemoTitle,
        initMemoContent,
        memoStatus: updMemo?.status,
        isMatchUser: userInfo?.userId === updMemo?.userId,
        addTag,
        deleteTag,
        memoTagList,
        tagSuggestList,
        initMemoTagList,
        setMemoTagList,
    }
}

export default useMemoDetail;