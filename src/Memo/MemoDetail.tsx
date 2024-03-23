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


//引数の型
type propsType = {
    updMemoId: string,
    closeFn?: () => void,
    backBtnTitle?: string,
}


function MemoDetail(props: propsType) {

    console.log("MemoDetail render");

    const {
        updMemo,
        generalDataList,
        memoSettingList,
        viewMode,
        openViewPage,
        openEditPage,
        memoTitle,
        setMemoTitle,
        memoContent,
        setMemoContent,
        isLoadinGetUpdMemo,
    } = useMemoDetail({ ...props });


    return (
        <React.Fragment>
            {
                (() => {
                    switch (viewMode) {
                        //閲覧
                        case 1:
                            return (
                                <MemoView
                                    memoSettingList={memoSettingList}
                                    generalDataList={generalDataList}
                                    updMemo={updMemo}
                                    openEditPage={openEditPage}
                                    closeFn={props.closeFn}
                                    backBtnTitle={props.backBtnTitle}
                                    memoTitle={memoTitle}
                                    setMemoTitle={setMemoTitle}
                                    memoContent={memoContent}
                                    setMemoContent={setMemoContent}
                                    isLoading={isLoadinGetUpdMemo}
                                />
                            )
                        //編集
                        case 2:
                            return (
                                <MemoEdit
                                    updMemoId={props.updMemoId}
                                    memoSettingList={memoSettingList}
                                    generalDataList={generalDataList}
                                    updMemo={updMemo}
                                    backFn={openViewPage}
                                    closeFn={props.closeFn}
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