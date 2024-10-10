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
import { Z_INDEX_PARAM } from '../Common/Const/CommonConst';
import { HeadNaviTestId, NaviBackgroundDivTestId, NaviLogoutTestId, NaviUserInfoTestId, MenuOpenIconTestId } from '../tests/AppTest/DataTestId';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa";
import React from 'react';
import ModalComponent from '../Common/ModalComponent';
import HeaderNotice from './HeaderNotice';

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
  justify-content: space-between;
`;

//タイトルのスタイル
const TitleSpan = styled.span`
  margin-left: 2%;
`;

//ユーザー名のスタイル
const UserInfoMainDiv = styled.div`
  font-size: 15px;
  margin-right: 1%;
  display: flex;
  white-space: nowrap;
  align-items: center;
  width: 85%;
`;

//ボタンのスタイル
const BtnDiv = styled.div<{ width: string }>`
  margin-left: 2%;
  margin-right: 5%;
  position:relative;
  align-items: center;
  width:${({ width }) => (width)};
`;

//ナビゲーション
const NavDiv = styled.div<{ isDisplay: boolean }>`
  position: absolute;
  top: 38px;
  left: -235px;
  font-size: 15px;
  width: 240px;
  height: auto;
  min-height: 169px;
  background-color: white;
  padding-top: 14px;
  border: 1px solid #a9a9a9;
  display: ${({ isDisplay }) => (isDisplay ? "block" : "none")};
  border-radius: 6px;
  z-index:${Z_INDEX_PARAM.HEADNAV};
  box-sizing: border-box;
`;

//コンテンツのスタイル
const ContentDiv = styled.div`
    cursor:pointer;
    &:hover {
        color: blue;
        text-decoration: underline;
    }
    min-height: 29px;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`;

//アイコンクリック時の背景のスタイル
const OverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  background-color: rgba(0, 0, 0, 0);
  z-index: ${Z_INDEX_PARAM.HEADOVERLAY}; 
`;

//ユーザー情報エリアのスタイル
const UserInfoOuterDiv = styled.div`
  width:21%;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

//ユーザー名のスタイル
const UserNameDiv = styled.div`
  width:80%;
  text-align: right;
`;

//メニュー展開用のスタイル
const BurgerIconDiv = styled.div`
  margin-right: 8%;
`;

//タイトルエリアのスタイル
const TitleAreaDiv = styled.div`
  padding-left: 2%;
  width: auto;
  display:flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

//通知アイコンエリアのスタイル
const NotificationAreaDiv = styled.div`
  position: relative;
  width:12%;
`;

//通知バッジのスタイル
const NotificationBadgeSpan = styled.span`
  position: absolute;
  top: -9px;
  right: -8px;
  background-color: #FF0066;
  color: white;
  padding: 4px 8px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
`;

//引数の型
type propsType = {
  userInfo: userInfoType,
  headerTitle: string,
  headerId: string,
  isOpenMenu: boolean,
  switchMenu: () => void
}

function Header(props: propsType) {

  console.log("Header render");

  //ヘッダのビジネスロジック
  const {
    logout,
    flag,
    clickUserInfo,
    onFlag,
    offFlag,
    workHistoryObj,
    isOpenModal,
    openNoticeModal,
    closeNoticeModal,
  } = useHeader({ ...props });

  return (
    <HeaderDiv>
      <TitleAreaDiv>
        {
          !props.isOpenMenu &&
          <BurgerIconDiv>
            <IconComponent
              icon={RxHamburgerMenu}
              onclick={props.switchMenu}
              dataTestId={MenuOpenIconTestId}
              style={{
                "width": "0.7em", "height": "0.9em"
              }}
            />
          </BurgerIconDiv>
        }
        <TitleSpan
          data-testid={props.headerId}
        >
          {props.headerTitle}
        </TitleSpan>
      </TitleAreaDiv>
      <UserInfoOuterDiv>
        {
          workHistoryObj &&
          //通知アイコン
          <NotificationAreaDiv>
            <IconComponent
              icon={FaRegBell}
              onclick={isOpenModal ? closeNoticeModal : openNoticeModal}
              size='60%'
            />
            {
              //未読件数
              workHistoryObj.historyListPreDiffLen > 0 &&
              <NotificationBadgeSpan>
                {workHistoryObj.historyListPreDiffLen}
              </NotificationBadgeSpan>
            }
          </NotificationAreaDiv>
        }
        <UserInfoMainDiv>
          <UserNameDiv>
            {props.userInfo?.userName ? `ユーザー：${props.userInfo?.userName}` : ""}
          </UserNameDiv>
          <BtnDiv
            width={props.userInfo?.iconUrl ? '13%' : '11%'}
          >
            {
              props.userInfo?.iconUrl ?
                // ユーザーの設定アイコン
                <UserIconComponent
                  width='86%'
                  height='20%'
                  iconUrl={props.userInfo.iconUrl ?? ""}
                  clickIcon={flag ? offFlag : onFlag}
                  outerStyle={{ "marginRight": "5%" }}
                />
                :
                // デフォルトアイコン
                <IconComponent
                  icon={IoPersonCircleOutline}
                  onclick={flag ? offFlag : onFlag}
                  size='100%'
                />
            }
            <NavDiv
              isDisplay={flag}
              data-testid={HeadNaviTestId}
            >
              <ContentDiv
                onClick={clickUserInfo}
                data-testid={NaviUserInfoTestId}
              >
                ユーザー情報
              </ContentDiv>
              <ContentDiv
                onClick={logout}
                data-testid={NaviLogoutTestId}
              >
                ログアウト
              </ContentDiv>
            </NavDiv>
          </BtnDiv>
        </UserInfoMainDiv>
      </UserInfoOuterDiv>
      {
        flag &&
        <OverlayDiv
          onClick={offFlag}
          data-testid={NaviBackgroundDivTestId}
        >
        </OverlayDiv>
      }
      {/* 通知用モーダル */}
      {
        workHistoryObj &&
        <ModalComponent
          modalIsOpen={isOpenModal}
          closeModal={closeNoticeModal}
          width='50%'
          positionLeft='24%'
        >
          <HeaderNotice
            closeModal={closeNoticeModal}
            workHistoryList={workHistoryObj.workHistoryList}
          />
        </ModalComponent>
      }

    </HeaderDiv>
  );
}

export default Header;
