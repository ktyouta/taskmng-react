import { vi } from "vitest";
import CustomRender from "../../Utils/Code/CustomRender";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "../../../../Header/Header";
import LoginedComponent from "../../Utils/Components/LoginedComponent";
import LoginedRender from "../../Utils/Code/LoginedRender";


//テストログインユーザー情報
const userInfo = {
    userId: "f",
    userName: "テスト管理者",
    auth: "3",
    iconUrl: "http://localhost:3000/img/standard/testimg1.png",
}

//テストログインユーザー情報(アイコン未設定)
const noIconUserInfo = {
    userId: "f",
    userName: "テスト管理者",
    auth: "3",
    iconUrl: "",
}

function TestHeader() {
    return <Header
        userInfo={userInfo}
    />
}

describe('コンポーネントのレンダリングチェック', () => {

    test('Headerコンポーネントのレンダリングが実行される', () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<TestHeader />);

        expect(logSpy).toHaveBeenCalledWith('Header render');

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });

    test('アイコン未設定ユーザーの場合にデフォルトのアイコンが表示されること', async () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Header userInfo={noIconUserInfo} />);

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith('IconComponent render');
        });

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });

    test('アイコンが設定されている場合に設定アイコンが表示されること', async () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<TestHeader />);

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith('UserIconComponent render');
        });

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });

});


describe('ヘッダの表示チェック', () => {

    test("ホームが表示されている", async () => {

        LoginedRender(
            <TestHeader />
        );

        await waitFor(() => {
            expect(screen.getByText("ホーム")).toBeInTheDocument();
        });
    });

    test("ログインユーザー名が表示されている", async () => {

        LoginedRender(
            <TestHeader />
        );

        await waitFor(() => {
            expect(screen.getByText(`ユーザー：${userInfo.userName}`)).toBeInTheDocument();
        });
    });
});