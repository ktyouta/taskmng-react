import '../App.css';
import ButtonComponent from '../Common/ButtonComponent';
import useHeader from './Hook/useHeader';
import styled from 'styled-components';
import { userInfoType } from '../Common/Type/CommonType';



//ヘッダーのスタイル
const HeaderDiv = styled.div`
  width: 100%;
  height: 10vh;
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
  margin-right: 4%;
  position:relative;
`;

//ナビゲーション
const NavDiv = styled.div<{ isDisplay: boolean }>`
  position: absolute;
  top: 50px;
  left: -7px;
  font-size: 13px;
  width: 140px;
  height: auto;
  min-height: 90px;
  background-color: white;
  padding-top: 8px;
  border: 1px solid #a9a9a9;
  display: ${({ isDisplay }) => (isDisplay ? "block" : "none")};
  border-radius: 6px;
  z-index:10;
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
    isDisplayNavi,
    displayNavi,
    hidDisplayNavi,
    clickUserInfo,
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
        <ButtonComponent
          styleTypeNumber="BASE"
          title={"ユーザーメニュー"}
          onMouseEnter={displayNavi}
          onMouseLeave={hidDisplayNavi}
        />
        <NavDiv
          isDisplay={isDisplayNavi}
          onMouseEnter={displayNavi}
          onMouseLeave={hidDisplayNavi}
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
