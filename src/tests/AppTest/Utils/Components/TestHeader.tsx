import Header from "../../../../Header/Header";
import { userInfo } from "../../Mocks/TestDatas";

export function TestHeader() {
    return <Header
        userInfo={userInfo}
    />
}