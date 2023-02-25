import '../App.css';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import Main from '../Main/Main';
import useContentLogic from './Hook/useContentLogic';
import { resUserInfoType } from '../Common/Type/CommonType';
import React from 'react';

export const userInfoContext = React.createContext({} as {
    userInfo: resUserInfoType | null,
});

function Content() {

    //Contentのビジネスロジック
    const { sideMenu, userInfo } = useContentLogic();

    return (
        <div className="App">
            <Menu menu={sideMenu} />
            <div className='App-maincontent-area'>
                <Header menu={sideMenu} userName={userInfo?.userName} />
                <userInfoContext.Provider value={{ userInfo }}>
                    <Main menu={sideMenu} userInfo={userInfo}/>
                </userInfoContext.Provider>
            </div>
        </div>
    );
}

export default Content;
