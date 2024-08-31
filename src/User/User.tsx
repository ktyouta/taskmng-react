import styled from 'styled-components';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import { Routes, Route, Navigate } from "react-router-dom";
import SettingUserEdit from '../Setting/SettingUser/SettingUserEdit';
import useUser from './Hook/useUser';
import { userInfoType } from '../Common/Type/CommonType';
import UserTop from './UserTop';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;


//引数の型
type propsType = {
    path: string,
    testId: string,
}


function User(props: propsType) {

    console.log("User render");

    useUser();

    return (
        <OuterDiv
            data-testid={props.testId}
        >
            <Routes>
                <Route
                    path="/"
                    element={
                        <UserTop
                            path={props.path}
                        />}
                />
            </Routes>
        </OuterDiv>
    );
}

export default User;