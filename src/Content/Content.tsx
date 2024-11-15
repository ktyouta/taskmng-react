import '../App.css';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import Main from '../Main/Main';
import useContentLogic from './Hook/useContentLogic';
import { resUserInfoType } from '../Common/Type/CommonType';
import React from 'react';
import Loading from '../Common/Loading';
import CenterLoading from '../Common/CenterLoading';
import styled from 'styled-components';


//アプリケーション全体のスタイル
const AppDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  align-items: left;
  justify-content: left;
  color: #282c34;
`;

//メインコンテンツエリアのスタイル
const ContentAreaDiv = styled.div<{ isOpenMenu: boolean }>`
  height: 100vh;
  width:${({ isOpenMenu }) => (isOpenMenu ? "85%" : "100%")};
  transition: 0.5s ease;
`;


function Content() {

    console.log(`Content render`);

    //Contentのビジネスロジック
    const {
        clientMenuList,
        userInfo,
        headerTitle,
        headerId,
        isOpenMenu,
        switchMenu,
        breadcrumbList } = useContentLogic();

    //データが取得できるまでローディングを表示
    if (!userInfo || !clientMenuList || clientMenuList.length < 1) {
        return <CenterLoading />;
    }

    return (
        <AppDiv>
            <Menu
                isOpenMenu={isOpenMenu}
                switchMenu={switchMenu}
                selectedMenuId={headerId}
            />
            <ContentAreaDiv
                isOpenMenu={isOpenMenu}
            >
                <Header
                    userInfo={userInfo}
                    headerTitle={headerTitle}
                    headerId={headerId}
                    isOpenMenu={isOpenMenu}
                    switchMenu={switchMenu}
                    breadcrumbList={breadcrumbList}
                />
                <Main />
            </ContentAreaDiv>
        </AppDiv>
    );
}

export default Content;
