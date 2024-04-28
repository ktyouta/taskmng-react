import '../App.css';
import ButtonComponent from '../Common/ButtonComponent';
import useHeader from './Hook/useHeader';
import styled from 'styled-components';
import { userInfoType } from '../Common/Type/CommonType';
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import IconComponent from '../Common/IconComponent';



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
  margin: 0 2% 0 auto;
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

//引数の型
type propsType = {
  userInfo: userInfoType | undefined,
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
          flag ?
            <IconComponent
              icon={IoMdClose}
              onclick={offFlag}
            />
            :
            <IconComponent
              icon={AiOutlineMenu}
              onclick={onFlag}
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
    </HeaderDiv>
  );
}

export default Header;
