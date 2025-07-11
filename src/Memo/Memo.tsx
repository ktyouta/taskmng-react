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
import { DUMMY_ID, MEMO_EDIT_PATH, MEMO_ROOT_PATH } from './Const/MemoConst';
import MemoRegister from './MemoRegister';
import styled from 'styled-components';


//メモ画面のスタイル
const MemoDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    background-color: #f5f5f5;
`;

//引数の型
type propsType = {
  path: string,
  testId: string,
  menuId: string,
}

function Memo(props: propsType) {

  console.log("Memo render");

  const {
    detailRoutingId,
    backPageFunc,
  } = useMemo({ ...props });

  return (
    <MemoDiv
      height='100%'
      data-testid={props.testId}
    >
      <Routes>
        {/* メモ一覧画面のルーティング */}
        <Route
          path={MEMO_ROOT_PATH}
          element={
            <MemoMain
              path={props.path}
            />
          }
        />
        {/* メモ登録画面のルーティング */}
        <Route
          path={MEMO_EDIT_PATH}
          element={
            <MemoRegister path={props.path} />
          }
        />
        {/* メモ詳細画面のルーティング */}
        {
          detailRoutingId &&
          <React.Fragment>
            {
              (() => {
                switch (detailRoutingId) {
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
                      path={detailRoutingId}
                      element={
                        <MemoDetail
                          updMemoId={detailRoutingId}
                          closeFn={backPageFunc}
                        />
                      }
                    />
                }
              })()
            }
          </React.Fragment>
        }
      </Routes>
    </MemoDiv>
  );
}

export default Memo;