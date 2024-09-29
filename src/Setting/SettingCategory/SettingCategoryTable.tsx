import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import Loading from '../../Common/Loading';
import MessageComponent, { labelType } from '../../Common/MessageComponent';
import useSettingCategoryTable from '../SettingCategory/Hook/useSettingCategoryTable';
import NumberPickerComponent from '../../Common/NumberPickerComponent';
import { refCategoryInfoType } from './Type/SettingCategoryType';

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

//td(numberpicker部分)のスタイル
const NmTd = styled(TdSt)`
    width:20%;
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
  refInfoArray: refCategoryInfoType[] | undefined,
  isLoading: boolean,
}

function SettingCategoryTable(props: propsType) {

  console.log("SettingCategoryTable render");

  const {
    errMessage,
    clickPath,
  } = useSettingCategoryTable({ ...props });

  //ローディング
  if (props.isLoading) {
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
                パス
              </th>
              <th>
                名称
              </th>
              <th>
                表示順
              </th>
              <th>
                表示/非表示
              </th>
            </tr>
          </thead>
          <tbody className="tablecomponent-tbody">
            {
              props.refInfoArray && props.refInfoArray.map((element) => {
                return (
                  <tr>
                    <IdTd
                      onClick={() => { clickPath(element.id) }}
                    >
                      {element.path}
                    </IdTd>
                    <TdSt>
                      {element.name}
                    </TdSt>
                    <NmTd>
                      {
                        <NumberPickerComponent
                          value={parseInt(element.order)}
                          ref={element.ref}
                        />
                      }
                    </NmTd>
                    <TdSt>
                      {
                        (() => {
                          switch (element.isHidden) {
                            case "0":
                              return "表示"
                            case "1":
                              return "非表示"
                          }
                        })()
                      }
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

export default SettingCategoryTable;