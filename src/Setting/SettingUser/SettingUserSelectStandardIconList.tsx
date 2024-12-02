import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingUserSelectStandardMessage from './Hook/useSettingUserSelectStandardMessage';
import ModalComponent from '../../Common/ModalComponent';
import useSettingUserSelectStandardIcon from './Hook/useSettingUserSelectStandardIconList';
import useSettingUserSelectStandardIconList from './Hook/useSettingUserSelectStandardIconList';
import { imageListResType } from './Type/SettingUserType';
import Loading from '../../Common/Loading';
import UserIconComponent from '../../Common/UserIconComponent';
import IconComponent from '../../Common/IconComponent';
import { RxCross1 } from 'react-icons/rx';


//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined, width: string | undefined }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
`;

//タイトルのスタイル
const TitleDiv = styled.div`
    background-color: blue;
    height: 6%;
    background: linear-gradient(to right, #3f86ed, #4481eb, #04befe, #3f86ed);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: white;
    font-weight: bold;
    padding-left: 1%;
    border-radius: 9px;
    position:relative;
`;

//アイコンリストの外側のスタイル
const IconOuterDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2%;
    padding-top: 3%;
    padding-left: 1%;
    box-sizing: border-box;
`;

//アイコンリストの外側のスタイル
const NoIconOuterDiv = styled.div`
    margin-left: 2%;
    margin-top: 2%;
`;

//引数の型
type propsType = {
    width: string,
    height: string,
    iconUrl: string | undefined,
    setIconUrl: (e: string) => void,
    closeModal: () => void,
}

function SettingUserSelectStandardIconList(props: propsType) {

    console.log("SettingUserSelectStandardIconList render");

    const {
        iconList,
        clickIcon
    } = useSettingUserSelectStandardIconList({ ...props });

    //ローディング
    if (!iconList) {
        return <Loading height='50vh' />;
    }

    return (
        <OuterDiv
            width={props.width}
            height={props.height}
        >
            <TitleDiv>
                標準アイコン一覧
                <IconComponent
                    icon={RxCross1}
                    onclick={props.closeModal}
                    style={{
                        "text-align": "right",
                        "position": "absolute",
                        "right": "2%",
                    }}
                />
            </TitleDiv>
            {
                iconList && iconList.length > 0 ?
                    <IconOuterDiv>
                        {
                            iconList && iconList.length > 0 &&
                            iconList.map((element: imageListResType) => {
                                return <UserIconComponent
                                    width='12%'
                                    height='20%'
                                    iconUrl={element.iconUrl}
                                    selectedIconUrl={props.iconUrl ?? ""}
                                    clickIcon={clickIcon}
                                    isHoverLine={true}
                                />
                            })
                        }
                    </IconOuterDiv>
                    :
                    <NoIconOuterDiv>
                        標準アイコンがありません
                    </NoIconOuterDiv>
            }

        </OuterDiv>
    );
}
export default SettingUserSelectStandardIconList;