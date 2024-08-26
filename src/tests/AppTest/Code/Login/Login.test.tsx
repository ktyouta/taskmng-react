import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../../../Login/Login";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import QueryClientComponent from "../../Utils/Components/QueryClientComponent";
import Content from "../../../../Content/Content";
import { LOGIN_PATH } from "../../../../Header/Const/HeaderConst";
import QueryApp from "../../../../QueryApp";
import ENV from '../../../../env.json';
import CustomRender from "../../Utils/Code/CustomRender";
import { vi } from "vitest";
import { clearCookies } from "../../Utils/Function/UtilsFunction";


/**
 * ログイン画面のテストコード
 */
describe('コンポーネントのレンダリングチェック', () => {

    test('Loginコンポーネントのレンダリングが実行される', () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<QueryApp />);

        expect(logSpy).toHaveBeenCalledWith('Login render');

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();

    });

});


describe('ログイン画面の表示チェック', () => {

    test("RLMNTが表示されている", async () => {

        CustomRender(<QueryApp />);

        expect(screen.getByText("RLMNT")).toBeInTheDocument();
    });

    test("ユーザーIDの入力欄が存在する", async () => {

        CustomRender(<QueryApp />);

        // 最初の入力フィールド（UserID）が表示されているか確認
        const userIdInput = screen.getByPlaceholderText('UserID');

        expect(userIdInput).toBeInTheDocument();
    });

    test("パスワードの入力欄が存在する", async () => {

        CustomRender(<QueryApp />);

        // 最初の入力フィールド（Password）が表示されているか確認
        const userIdInput = screen.getByPlaceholderText('Password');

        expect(userIdInput).toBeInTheDocument();
    });

    test("タイトルがLoginのボタンが存在する", async () => {

        CustomRender(<QueryApp />);

        const loginButton = screen.getByRole('button', { name: 'Login' });
        expect(loginButton).toBeInTheDocument();
    });

    test('ユーザーIDの入力欄にmaxlength:100が設定されていること', () => {

        CustomRender(<QueryApp />);

        const userIdInput = screen.getByPlaceholderText('UserID');
        expect(userIdInput).toHaveAttribute('maxlength', '100');
        expect(userIdInput).not.toBeDisabled();
    });

    test('パスワードの入力欄にmaxlength:100が設定されていること', () => {

        CustomRender(<QueryApp />);

        const userIdInput = screen.getByPlaceholderText('Password');
        expect(userIdInput).toHaveAttribute('maxlength', '100');
        expect(userIdInput).not.toBeDisabled();
    });
});


describe('ログイン画面のフォームチェック', () => {

    test("IDが入力できる", async () => {

        CustomRender(<QueryApp />);

        const user = userEvent.setup();
        const userIdInput = screen.getByPlaceholderText('UserID');
        await user.type(userIdInput, "id");
        expect(userIdInput).toHaveValue("id");
    });

    test("パスワードが入力できる", async () => {

        CustomRender(<QueryApp />);

        const user = userEvent.setup();
        const userIdInput = screen.getByPlaceholderText('Password');
        await user.type(userIdInput, "Password");
        expect(userIdInput).toHaveValue("Password");
    });
});


describe('ログインチェック', () => {
    test("ログイン成功時にホーム画面に遷移すること", async () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<QueryApp />);

        const user = userEvent.setup();

        const userIdInput = screen.getByPlaceholderText('UserID');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        await user.type(userIdInput, "test");
        await user.type(passwordInput, "test");
        await user.click(loginButton);

        // console.logが特定のメッセージで呼び出されたことを確認
        expect(logSpy).toHaveBeenCalledWith('Home render');

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });

    test("ログイン失敗時にホーム画面に遷移しないこと", async () => {

        // クッキーをリセット
        clearCookies();

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<QueryApp />);

        const user = userEvent.setup();

        const userIdInput = screen.getByPlaceholderText('UserID');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        await user.type(userIdInput, "testfail");
        await user.type(passwordInput, "testfail");
        await user.click(loginButton);

        // console.logが特定のメッセージで呼び出されたことを確認
        expect(logSpy).not.toHaveBeenCalledWith('Home render');

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });
});