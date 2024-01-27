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
    const { clientMenuList, userInfo } = useContentLogic();

    //データが取得できるまでローディングを表示
    if (!userInfo || !clientMenuList || clientMenuList.length < 1) {
        return <CenterLoading />;
    }

    return (
        <div className="App">
            <Menu />
            <div className='App-maincontent-area'>
                <Header userName={userInfo?.userName} />
                <Main />
            </div>
        </div>
    );
}

export default Content;
