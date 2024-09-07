import Header from "../../../../Header/Header";
import { noIconUserInfo, userInfo } from "../../TestDatas";

export function TestHeader() {
    return <Header
        userInfo={userInfo}
        headerTitle="ホーム"
        headerId="headerTestId"
        isOpenMenu={true}
        switchMenu={() => { }}
    />
}

export function NoIconTestHeader() {
    return <Header
        userInfo={noIconUserInfo}
        headerTitle="ホーム"
        headerId="headerTestId"
        isOpenMenu={true}
        switchMenu={() => { }}
    />
}