import { vi } from "vitest";
import CustomRender from "../../Utils/Code/CustomRender";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "../../../../Header/Header";
import LoginedComponent from "../../Utils/Components/LoginedComponent";
import LoginedRender from "../../Utils/Code/LoginedRender";
import { TestHeader } from "../../Utils/Components/TestHeader";
import { noIconUserInfo, userInfo } from "../../Mocks/TestDatas";
import { HeadNaviTestId, IconComponentDataTestId, NaviBackgroundDivTestId, NaviLogoutTestId, NaviUserInfoTestId, UserIconComponentDataTestId } from "../../Utils/DataTestId";
import userEvent from "@testing-library/user-event";
import QueryApp from "../../../../QueryApp";
import { APP_TITLE } from "../../../../Title";


/**
 * ヘッダーのテストコード
 */
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


describe("ナビゲーション表示チェック", () => {

    test("ユーザー情報が表示されていること", async () => {

        LoginedRender(<TestHeader />);

        await waitFor(() => {
            expect(screen.getByText("ユーザー情報")).toBeInTheDocument();
        });
    });

    test("ログアウトが表示されていること", async () => {

        LoginedRender(<TestHeader />);

        await waitFor(() => {
            expect(screen.getByText("ログアウト")).toBeInTheDocument();
        });
    });

});


describe("ナビゲーションの開閉チェック", () => {

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

    test('ナビゲーション表示後に背景をクリックでナビゲーションが閉じること', async () => {

        LoginedRender(<TestHeader />);

        //アイコン要素を取得
        const userIconElement = screen.getByTestId(UserIconComponentDataTestId);
        //ナビゲーション要素を取得
        const naviElement = screen.getByTestId(HeadNaviTestId);

        //初期状態では非表示であることを確認
        expect(naviElement).toHaveStyle({ display: 'none' });

        //アイコンをクリック
        await userEvent.click(userIconElement);

        //クリック後に表示されることを確認
        expect(naviElement).toHaveStyle({ display: 'block' });

        //ナビゲーション表示後に背景要素を取得
        const backgroundElement = screen.getByTestId(NaviBackgroundDivTestId);

        //背景要素をクリック後にナビゲーションが閉じることを確認
        await userEvent.click(backgroundElement);
        expect(naviElement).toHaveStyle({ display: 'none' });
    });
});


describe("ナビゲーションメニューの選択チェック", () => {

    test("ユーザー情報をクリックでユーザー情報画面に遷移すること", async () => {

        //ヘッダコンポーネント単体ではテスト不可のためQueryAppをレンダリング
        LoginedRender(<QueryApp />);

        //アイコン要素を取得
        const userIconElement = screen.getByTestId(UserIconComponentDataTestId);
        //ナビゲーション要素を取得
        const naviElement = screen.getByTestId(HeadNaviTestId);
        //ナビゲーションのユーザー情報を取得
        const userInfoElement = screen.getByTestId(NaviUserInfoTestId);

        //初期状態では非表示であることを確認
        expect(naviElement).toHaveStyle({ display: 'none' });

        //アイコンをクリック
        await userEvent.click(userIconElement);

        //クリック後に表示されることを確認
        expect(naviElement).toHaveStyle({ display: 'block' });

        //ユーザー情報をクリック
        await userEvent.click(userInfoElement);

        //ユーザー情報画面が表示されることを確認
        expect(screen.getByText("ユーザーID")).toBeInTheDocument();

    });

    test("ログアウトをクリックでログイン画面に遷移すること", async () => {

        //ヘッダコンポーネント単体ではテスト不可のためQueryAppをレンダリング
        LoginedRender(<QueryApp />);

        //アイコン要素を取得
        const userIconElement = screen.getByTestId(UserIconComponentDataTestId);
        //ナビゲーション要素を取得
        const naviElement = screen.getByTestId(HeadNaviTestId);
        //ナビゲーションのログアウトを取得
        const logoutElement = screen.getByTestId(NaviLogoutTestId);

        //初期状態では非表示であることを確認
        expect(naviElement).toHaveStyle({ display: 'none' });

        //アイコンをクリック
        await userEvent.click(userIconElement);

        //クリック後に表示されることを確認
        expect(naviElement).toHaveStyle({ display: 'block' });
        //ログアウトをクリック
        await userEvent.click(logoutElement);

        //ログイン画面が表示されることを確認
        expect(screen.getByText(APP_TITLE)).toBeInTheDocument();

    });
});