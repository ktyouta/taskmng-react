import styled from 'styled-components';
import { taskHistoryType } from '../Home/Type/HomeType';
import UserIconComponent from '../Common/UserIconComponent';
import IconComponent from '../Common/IconComponent';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import ENV from '../env.json';
import { DELETE_ON } from './Const/HeaderConst';
import useHeaderContent from './Hook/useHeaderContent';


//外側のスタイル
const OuterDiv = styled.div`
    outline: 3px solid;
    border-radius: 5px;
    min-height: 72px;
    height: auto;
    outline-color: #b0c4de;
`;

//コンテンツタイトルのスタイル
const ContentTitleDiv = styled.div`
  width: 100%;
  height: 93%;
  box-sizing: border-box;
  padding-left: 2%;
  padding-top: 1%;
  display:flex;
  position:relative;
`;

//コンテンツの日付のスタイル
const ContentDateDiv = styled.div`
  width: 100%;
  height: 93%;
  box-sizing: border-box;
  padding-left: 2%;
  padding-top: 1%;
`;

//IDのスタイル
const IdSpan = styled.span`
    cursor:pointer;
    color: blue;
    &:hover {
        text-decoration: underline;
    }
`;

//タイトル
const TitleNavDiv = styled.div<{ isDisplay: boolean }>`
    position: absolute;
    top: 33px;
    font-size: 13px;
    height: auto;
    min-height: 24px;
    background-color: white;
    outline: 1px solid #b0c4de;
    display: ${({ isDisplay }) => (isDisplay ? "block" : "none")};
    z-index: 10;
    width: auto;
    position: absolute;
    left: 180px;
    box-sizing: border-box;
    padding: 1%;
    color: black;
    border-radius: 5px;
`;


//引数の型
type propsType = {
    workHistory: taskHistoryType,
    closeModal: () => void,
}


function HeaderContent(props: propsType) {

    console.log("HeaderContent render");

    const {
        hoverId,
        clickId,
        onId,
        leaveId
    } = useHeaderContent({ ...props });

    return (
        <OuterDiv>
            <ContentTitleDiv>
                {
                    props.workHistory.iconUrl ?
                        <UserIconComponent
                            width='3%'
                            height='3%'
                            iconUrl={props.workHistory.iconUrl}
                        />
                        :
                        <IconComponent
                            icon={IoPersonCircleOutline}
                            size='3%'
                        />
                }
                {
                    `${props.workHistory.userName}さんが`
                }
                <IdSpan
                    onClick={clickId}
                    onMouseEnter={onId}
                    onMouseLeave={leaveId}
                >
                    {props.workHistory.taskId}
                </IdSpan>
                <TitleNavDiv
                    isDisplay={props.workHistory.taskId === hoverId}
                >
                    {`タイトル：${props.workHistory.taskTitle}`}
                </TitleNavDiv>
                {
                    `を${props.workHistory.editType}`
                }
            </ContentTitleDiv>
            <ContentDateDiv>
                {
                    `作業日時：${props.workHistory.time}`
                }
            </ContentDateDiv>
        </OuterDiv>
    );
}

export default HeaderContent;
