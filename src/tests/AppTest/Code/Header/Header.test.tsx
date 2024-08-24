import { vi } from "vitest";
import CustomRender from "../../Utils/Code/CustomRender";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "../../../../Header/Header";
import LoginedComponent from "../../Utils/Components/LoginedComponent";
import LoginedRender from "../../Utils/Code/LoginedRender";
import { TestHeader } from "../../Utils/Components/TestHeader";
import { noIconUserInfo, userInfo } from "../../Mocks/TestDatas";
import { HeadNaviTestId, IconComponentDataTestId, UserIconComponentDataTestId } from "../../Utils/DataTestId";
import userEvent from "@testing-library/user-event";


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

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Header userInfo={noIconUserInfo} />);

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith('IconComponent render');
        });

        logSpy.mockRestore();
    });

    test('アイコンが設定されている場合にユーザーの設定アイコンが表示されること', async () => {

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<TestHeader />);

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith('UserIconComponent render');
        });

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


describe("アイコン押下チェック", () => {

    test('デフォルトアイコン押下時にナビゲーションが表示されること', async () => {

        LoginedRender(
            <Header userInfo={noIconUserInfo} />
        );

        //デフォルトアイコン要素を取得
        const defultIconElement = screen.getByTestId(IconComponentDataTestId);

        //ナビゲーション要素を取得
        const naviElement = screen.getByTestId(HeadNaviTestId);

        //初期状態では非表示であることを確認
        expect(naviElement).toHaveStyle({ display: 'none' });

        //デフォルトアイコンをクリック
        await userEvent.click(defultIconElement);

        //クリック後に表示されることを確認
        expect(naviElement).toHaveStyle({ display: 'block' });
    });

    test('ユーザー設定アイコン押下時にナビゲーションが表示されること', async () => {

        LoginedRender(
            <TestHeader />
        );

        //ユーザーアイコン要素を取得
        const userIconElement = screen.getByTestId(UserIconComponentDataTestId);

        //ナビゲーション要素を取得
        const naviElement = screen.getByTestId(HeadNaviTestId);

        //初期状態では非表示であることを確認
        expect(naviElement).toHaveStyle({ display: 'none' });

        //ユーザーアイコンをクリック
        await userEvent.click(userIconElement);

        //クリック後に表示されることを確認
        expect(naviElement).toHaveStyle({ display: 'block' });
    });
})