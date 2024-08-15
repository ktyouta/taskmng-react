import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../../Login/Login";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import QueryClientComponent from "../../Utils/Components/QueryClientComponent";
import Content from "../../../Content/Content";
import { LOGIN_PATH } from "../../../Header/Const/HeaderConst";
import QueryApp from "../../../QueryApp";
import ENV from '../../../env.json';
import { LoginAPIServer } from "./mocks/servers";
import CustomRender from "../../Utils/Code/CustomRender";

describe(Login, () => {

    test("ログインフォームが表示されている", async () => {

        CustomRender(<QueryApp />);

        expect(screen.getByText("RLMNT")).toBeInTheDocument();

        expect(screen.getByRole("textbox")).toBeTruthy();
        expect(screen.getByRole("button")).toBeTruthy();

        // 最初の入力フィールド（UserID）が表示されているか確認
        const userIdInput = screen.getByPlaceholderText('UserID');
        expect(userIdInput).toBeInTheDocument();
        expect(userIdInput).toHaveAttribute('maxlength', '100');
        expect(userIdInput).not.toBeDisabled();

        // 2番目の入力フィールド（Password）が表示されているか確認
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('maxlength', '100');
        expect(passwordInput).not.toBeDisabled();
    });

    test("タイトルがLoginのボタンが存在する", async () => {

        CustomRender(<QueryApp />);

        const loginButton = screen.getByRole('button', { name: 'Login' });
        expect(loginButton).toBeInTheDocument();
    })

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

    test("ログインができる", async () => {

        CustomRender(<QueryApp />);

        const user = userEvent.setup();

        const userIdInput = screen.getByPlaceholderText('UserID');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        await user.type(userIdInput, "test");
        await user.type(passwordInput, "test");
        await user.click(loginButton);


        //expect(screen.queryByText("Login")).toBeInTheDocument();
        // 実際のレスポンスを取得
        // const actualResponse = await waitFor(() =>
        //     LoginAPIServer.events.response('POST', `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.LOGIN}`)
        // );

        // APIレスポンスの確認
        // await waitFor(() => {
        //     // ここでモックしたレスポンスを確認
        //     document.cookie = `path=/`;
        //     //expect(expectedResponse).toEqual(actualResponse);
        //     expect(screen.queryByText("ユーザー")).toBeInTheDocument();
        // });
    });

    // test("ログインに失敗する", async () => {

    //     render(
    //         <QueryClientComponent>
    //             <Login />
    //         </QueryClientComponent>
    //     );
    //     const user = userEvent.setup();

    //     const mailForm = screen.getByLabelText("メールアドレス");
    //     const passwordForm = screen.getByLabelText("パスワード");
    //     const sendButton = screen.getByRole("button");

    //     await user.type(mailForm, "fail@example.com");
    //     await user.type(passwordForm, "userTest1234");
    //     await user.click(sendButton);

    //     expect(screen.queryByText("Welcome testUser !")).not.toBeInTheDocument();
    // });
});