import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingCustomTable from './Hook/useSettingCustomTable';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import './css/SettingCustomTable.css'
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
    box-sizing: border-box;
    padding-top: 1%;
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

function SettingCustomTable(props: propsType) {

  console.log("SettingCustomTop render");

  const {
    customAttributeList,
    isLoading,
    errMessage,
    clickId,
    settingCustomAttributeAuth,
  } = useSettingCustomTable({ ...props });

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
              customAttributeList && customAttributeList.map((element) => {
                return (
                  <tr>
                    {
                      checkAuthAction(settingCustomAttributeAuth, USER_AUTH.MASTER)
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

export default SettingCustomTable;