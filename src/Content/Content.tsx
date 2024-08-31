import '../App.css';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import Main from '../Main/Main';
import useContentLogic from './Hook/useContentLogic';
import { resUserInfoType } from '../Common/Type/CommonType';
import React from 'react';
import Loading from '../Common/Loading';
import CenterLoading from '../Common/CenterLoading';


function Content() {

    console.log(`Content render`);

    //Contentのビジネスロジック
    const {
        clientMenuList,
        userInfo,
        headerTitle,
        headerId } = useContentLogic();

    //データが取得できるまでローディングを表示
    if (!userInfo || !clientMenuList || clientMenuList.length < 1) {
        return <CenterLoading />;
    }

    return (
        <div className="App">
            <Menu
                selectedMenu={headerTitle}
            />
            <div className='App-maincontent-area'>
                <Header
                    userInfo={userInfo}
                    headerTitle={headerTitle}
                    headerId={headerId}
                />
                <Main />
            </div>
        </div>
    );
}

export default Content;
