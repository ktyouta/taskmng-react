import '../App.css';
import ButtonComponent from '../Common/ButtonComponent';
import useHeader from './Hook/useHeader';
import styled from 'styled-components';
import { userInfoType } from '../Common/Type/CommonType';
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import IconComponent from '../Common/IconComponent';
import { IoPersonCircleOutline } from "react-icons/io5";
import UserIconComponent from '../Common/UserIconComponent';


//ヘッダーのスタイル
const HeaderDiv = styled.div`
  width: 100%;
  height: 9vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  font-size: 30px;
  border-bottom: 1px solid #a9a9a9;
  box-sizing: border-box;
`;

//タイトルのスタイル
const TitleSpan = styled.span`
  margin-left: 2%;
`;

//ユーザー名のスタイル
const UserNameDiv = styled.div`
  margin-right: 2%;
  margin-left: 61%;
  font-size: 15px;
`;

//ボタンのスタイル
const BtnDiv = styled.div`
  margin-right: 5%;
  position:relative;
`;

//ナビゲーション
const NavDiv = styled.div<{ isDisplay: boolean }>`
  position: absolute;
  top: 34px;
  left: -55px;
  font-size: 13px;
  width: 140px;
  height: auto;
  min-height: 95px;
  background-color: white;
  padding-top: 8px;
  border: 1px solid #a9a9a9;
  display: ${({ isDisplay }) => (isDisplay ? "block" : "none")};
  border-radius: 6px;
  z-index:10;
  box-sizing: border-box;
`;

//コンテンツのスタイル
const ContentDiv = styled.div`
    cursor:pointer;
    &:hover {
        color: blue;
        text-decoration: underline;
    }
`;

//アイコンクリック時の背景のスタイル
const OverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  background-color: rgba(0, 0, 0, 0);
  z-index: 9; 
`;

//引数の型
type propsType = {
  userInfo?: userInfoType,
}

function Header(props: propsType) {

  //ヘッダのビジネスロジック
  const {
    headerTile,
    logout,
    flag,
    clickUserInfo,
    onFlag,
    offFlag
  } = useHeader({ ...props });

  return (
    <HeaderDiv>
      <TitleSpan>
        {headerTile}
      </TitleSpan>
      <UserNameDiv>
        {props.userInfo?.userName ? `ユーザー：${props.userInfo?.userName}` : ""}
      </UserNameDiv>
      <BtnDiv>
        {
          props.userInfo?.iconUrl ?
            <UserIconComponent
              width='7%'
              height='20%'
              iconUrl={props.userInfo.iconUrl ?? ""}
              clickIcon={flag ? offFlag : onFlag}
              outerStyle={{ "margin-right": "5%" }}
            />
            :
            <IconComponent
              icon={IoPersonCircleOutline}
              onclick={flag ? offFlag : onFlag}
            />
        }
        <NavDiv
          isDisplay={flag}
        >
          <ContentDiv
            onClick={clickUserInfo}
          >
            ユーザー情報
          </ContentDiv>
          <ContentDiv
            onClick={logout}
          >
            ログアウト
          </ContentDiv>
        </NavDiv>
      </BtnDiv>
      {
        flag &&
        <OverlayDiv
          onClick={offFlag}
        >
        </OverlayDiv>
      }
    </HeaderDiv>
  );
}

export default Header;
