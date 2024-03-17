import '../App.css';
import './css/Header.css';
import ButtonComponent from '../Common/ButtonComponent';
import useHeader from './Hook/useHeader';
import styled from 'styled-components';
import { userInfoType } from '../Common/Type/CommonType';


//ナビゲーション
const NavDiv = styled.div<{ isDisplay: boolean }>`
    position: absolute;
    top: 8%;
    left: 87%;
    font-size:13px;
    width: 11%;
    height: auto;
    min-height:9%;
    background-color: white;
    padding-top: 1%;
    border:1px solid #a9a9a9;
    display: ${({ isDisplay }) => (isDisplay ? "block" : "none")};
    border-radius:6px;
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
    <div className="header">
      <span>
        {headerTile}
      </span>
      <div className="username-area">
        ユーザー：{props.userInfo?.userName ?? ""}
      </div>
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
    </div>
  );
}

export default Header;
