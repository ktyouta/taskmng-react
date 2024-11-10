import '../App.css';
import Loading from '../Common/Loading';
import WaitLoading from '../Common/WaitLoading';
import useMemoEdit from './Hook/useMemoEdit';
import './css/MemoEdit.css';
import MemoEditFooter from './MemoEditFooter';
import MemoEditForm from './MemoEditForm';
import React from 'react';
import useMemoDetail from './Hook/useMemoDetail';
import MemoView from './MemoView';
import MemoEdit from './MemoEdit';
import { VIEW_MODE } from '../Common/Const/CommonConst';


//引数の型
type propsType = {
    updMemoId: string,
    closeFn?: () => void,
    backBtnTitle?: string,
}


function MemoDetail(props: propsType) {

    console.log("MemoDetail render");

    const {
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
        memoStatus,
        isMatchUser,
        addTag,
        deleteTag,
        memoTagList,
        tagSuggestList,
        initMemoTagList,
    } = useMemoDetail({ ...props });


    return (
        <React.Fragment>
            {
                (() => {
                    switch (viewMode) {
                        //閲覧
                        case VIEW_MODE.view:
                            return (
                                <MemoView
                                    openEditPage={openEditPage}
                                    closeFn={props.closeFn}
                                    backBtnTitle={props.backBtnTitle}
                                    memoTitle={initMemoTitle ?? ""}
                                    memoContent={initMemoContent ?? ""}
                                    isLoading={isLoadinGetUpdMemo}
                                    isMatchUser={isMatchUser}
                                    memoTagList={
                                        initMemoTagList &&
                                            initMemoTagList.length > 0
                                            ?
                                            initMemoTagList
                                            :
                                            []
                                    }
                                />
                            )
                        //編集
                        case VIEW_MODE.edit:
                            return (
                                <MemoEdit
                                    updMemoId={props.updMemoId}
                                    backFn={openViewPage}
                                    closeFn={props.closeFn}
                                    memoTitle={memoTitle}
                                    setMemoTitle={setMemoTitle}
                                    memoContent={memoContent}
                                    setMemoContent={setMemoContent}
                                    initMemoTitle={initMemoTitle}
                                    initMemoContent={initMemoContent}
                                    memoStatus={memoStatus}
                                    addTag={addTag}
                                    deleteTag={deleteTag}
                                    memoTagList={memoTagList}
                                    tagSuggestList={tagSuggestList}
                                />
                            )
                        default:
                            return (
                                <React.Fragment></React.Fragment>
                            )
                    }
                })()
            }
        </React.Fragment>
    );
}

export default MemoDetail;