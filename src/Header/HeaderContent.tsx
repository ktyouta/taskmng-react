import styled from 'styled-components';
import { taskHistoryType } from '../Home/Type/HomeType';
import UserIconComponent from '../Common/UserIconComponent';
import IconComponent from '../Common/IconComponent';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import ENV from '../env.json';


//外側のスタイル
const OuterDiv = styled.div`
    outline: 3px solid;
    border-radius: 5px;
    min-height: 80px;
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

//引数の型
type propsType = {
    workHistory: taskHistoryType,
}


function HeaderContent(props: propsType) {

    console.log("HeaderContent render");

    //ルーティング用
    const navigate = useNavigate();

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
                    onClick={() => {
                        navigate(`${props.workHistory.url}`.replace(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.LOCALPORT}/`, ""));
                    }}
                >
                    {props.workHistory.taskId}
                </IdSpan>
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
