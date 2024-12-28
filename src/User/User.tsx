import styled from 'styled-components';
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
    menuId: string,
}


function User(props: propsType) {

    console.log("User render");

    useUser({ ...props });

    return (
        <OuterDiv
            data-testid={props.testId}
        >
            <Routes>
                <Route
                    path="/"
                    element={
                        <UserTop />}
                />
            </Routes>
        </OuterDiv>
    );
}

export default User;