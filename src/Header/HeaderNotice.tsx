import styled from 'styled-components';
import { taskHistoryType } from '../Home/Type/HomeType';
import HeaderContentArea from './HeaderContentArea';
import { RxCross1 } from "react-icons/rx";
import IconComponent from '../Common/IconComponent';

//外側のスタイル
const OuterDiv = styled.div`
  width: 100%;
  height: 100%;
`;

//タイトルのスタイル
const TitleDiv = styled.div`
  width: 100%;
  height: 7%;
  background: linear-gradient(to right, #3f86ed, #4481eb, #04befe, #3f86ed);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  padding-left: 1%;
  border-radius: 9px;
`;

//コンテンツエリアのスタイル
const ContentAreaDiv = styled.div`
  width: 100%;
  height: 93%;
  box-sizing: border-box;
  padding-left: 2%;
  padding-top: 2%;
`;

//引数の型
type propsType = {
    closeModal: () => void,
    workHistoryList: taskHistoryType[],
}


function HeaderNotice(props: propsType) {

    console.log("HeaderNotice render");

    return (
        <OuterDiv>
            <TitleDiv>
                お知らせ
                <IconComponent
                    icon={RxCross1}
                    onclick={props.closeModal}
                    style={{
                        "margin-left": "auto",
                        "text-align": "right",
                        "width": "10%",
                        "height": "40%",
                    }}
                />
            </TitleDiv>
            <ContentAreaDiv>
                {
                    props.workHistoryList.length > 0
                        ?
                        <HeaderContentArea
                            workHistoryList={props.workHistoryList}
                            closeModal={props.closeModal}
                        />
                        :
                        "お知らせが存在しません。"
                }
            </ContentAreaDiv>
        </OuterDiv>
    );
}

export default HeaderNotice;