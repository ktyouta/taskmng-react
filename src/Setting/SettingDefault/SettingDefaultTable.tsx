import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingDefaultTable from './Hook/useSettingDefaultTable';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import './css/SettingDefaultTable.css'
import Loading from '../../Common/Loading';
import MessageComponent, { labelType } from '../../Common/MessageComponent';
import { checkAuthAction } from '../../Common/Function/Function';
import { USER_AUTH } from '../../Common/Const/CommonConst';

//外側のスタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
    overflow: auto;
    overflow-x: hidden;
    margin-left: auto;
    margin-right: auto;
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
  path: string
}

function SettingDefaultTable(props: propsType) {

  console.log("SettingDefaultTop render");

  const {
    taskSettingList,
    isLoading,
    errMessage,
    clickId,
    settingDefalutAuth,
  } = useSettingDefaultTable({ ...props });

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
                名称
              </th>
            </tr>
          </thead>
          <tbody className="tablecomponent-tbody">
            {
              taskSettingList && taskSettingList.map((element) => {
                return (
                  <tr>
                    {
                      checkAuthAction(settingDefalutAuth, USER_AUTH.MASTER)
                        ?
                        <IdTd
                          onClick={() => { clickId(element.id) }}
                        >
                          {element.id}
                        </IdTd>
                        :
                        <TdSt>
                          {element.id}
                        </TdSt>
                    }
                    <TdSt>
                      {element.name}
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

export default SettingDefaultTable;