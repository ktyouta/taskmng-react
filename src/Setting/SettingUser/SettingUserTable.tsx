import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import Loading from '../../Common/Loading';
import MessageComponent, { labelType } from '../../Common/MessageComponent';
import useSettingUserTable from '../SettingUser/Hook/useSettingUserTable';

//外側のスタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
    overflow: auto;
    overflow-x: hidden;
    margin-left: auto;
    margin-right: auto;
    box-sizing:box-border;
    padding-top:1%;
`;

//TDのスタイル
const TdSt = styled.td`
  text-align:center;
`;

//IDのスタイル
const IdTd = styled(TdSt)`
    cursor:pointer;
    color: blue;
    text-decoration: underline;
`;

//引数の型
type propsType = {
  height: string,
  width: string,
  path: string,
}

function SettingUserTable(props: propsType) {

  console.log("SettingUserTable render");

  const {
    userInfoList,
    isLoading,
    errMessage,
    clickId,
  } = useSettingUserTable({ ...props });

  //ローディング
  if (isLoading) {
    return <Loading height='50vh' />;
  }

  //該当データが存在しない
  if (errMessage) {
    return (
      <div>{errMessage}</div>
    );
  }

  return (
    <OuterDiv
      height={props.height}
      width={props.width}
    >
      <div className="tablecomponent">
        <table className="tablecomponent-table-tag">
          <thead className="tablecomponent-thead">
            <tr>
              <th>
                ID
              </th>
              <th>
                ユーザー名
              </th>
            </tr>
          </thead>
          <tbody className="tablecomponent-tbody">
            {
              userInfoList && userInfoList.map((element) => {
                return (
                  <tr>
                    <IdTd
                      onClick={() => { clickId(element.userId) }}
                    >
                      {element.userId}
                    </IdTd>
                    <TdSt>
                      {element.userName}
                    </TdSt>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </OuterDiv>
  );
}

export default SettingUserTable;