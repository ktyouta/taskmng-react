import Header from "../../../../Header/Header";
import { noIconUserInfo, userInfo } from "../../Mocks/TestDatas";

export function TestHeader() {
    return <Header
        userInfo={userInfo}
        headerTitle="ホーム"
        headerId="headerTestId"
    />
}

export function NoIconTestHeader() {
    return <Header userInfo={noIconUserInfo}
        headerTitle="ホーム"
        headerId="headerTestId"
    />
}