import React, { useState } from 'react';
import '../App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { selectedMasterDataType } from '../Common/Type/CommonType';
import { Provider, useAtomValue } from 'jotai';
import MemoTop from './MemoTop';
import MemoFooter from './MemoFooter';
import './css/Memo.css';
import ENV from '../env.json';
import MemoMain from './MemoMain';
import useMemo from './Hook/useMemo';
import MemoDetail from './MemoDetail';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import { DUMMY_ID } from './Const/MemoConst';


type propsType = {
    path: string,
    detailRoutingId: string,
    backPageFunc: () => void,
}

function MemoEditRoute(props: propsType) {

    console.log("MemoEditRoute render");

    return (
        <HeightDiv
            height='100%'
        >
            <Routes>
                {/* メモ詳細画面のルーティング */}
                {
                    props.detailRoutingId &&
                    <React.Fragment>
                        {
                            (() => {
                                switch (props.detailRoutingId) {
                                    case DUMMY_ID:
                                        return <Route
                                            key={"*"}
                                            path="*"
                                            element={
                                                <NotFoundComponent
                                                    backUrl={props.path}
                                                />
                                            }
                                        />
                                    default:
                                        return <Route
                                            path={props.detailRoutingId}
                                            element={
                                                <MemoDetail
                                                    updMemoId={props.detailRoutingId}
                                                    closeFn={props.backPageFunc}
                                                />
                                            }
                                        />
                                }
                            })()
                        }
                    </React.Fragment>
                }
            </Routes>
        </HeightDiv>
    );
}

export default MemoEditRoute;