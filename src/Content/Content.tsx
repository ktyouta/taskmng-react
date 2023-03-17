import '../App.css';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import Main from '../Main/Main';
import useContentLogic from './Hook/useContentLogic';
import { resUserInfoType } from '../Common/Type/CommonType';
import React from 'react';
import Loading from '../Common/Loading';

export const userInfoContext = React.createContext({} as {
    userInfo: resUserInfoType | undefined,
});

function Content() {

    //Contentのビジネスロジック
    const { sideMenu, userInfo } = useContentLogic();

    if (!userInfo || !sideMenu) {
        return <React.Fragment><Loading height="80vh" isLoading={true} /></React.Fragment>;
    }

    return (
        <div className="App">
            <Menu />
            <div className='App-maincontent-area'>
                <Header userName={userInfo?.userName} />
                <userInfoContext.Provider value={{ userInfo }}>
                    <Main userInfo={userInfo} />
                </userInfoContext.Provider>
            </div>
        </div>
    );
}

export default Content;
