import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../../Component/Login/LoginForm";

describe(LoginForm, () => {
    test("ログインフォームが表示されている", async () => {
        render(<LoginForm />);
        expect(screen.getByText("ログイン")).toBeInTheDocument();
        expect(screen.getByText("メールアドレス")).toBeInTheDocument();
        expect(screen.getByText("パスワード")).toBeInTheDocument();
        expect(screen.getByText("ログインする")).toBeInTheDocument();

        expect(screen.getByRole("textbox")).toBeTruthy();
        expect(screen.getByRole("button")).toBeTruthy();

        expect(screen.getByLabelText("メールアドレス")).toBeTruthy();
        expect(screen.getByLabelText("パスワード")).toBeTruthy();
    });

    test("メールアドレスが入力できる", async () => {
        render(<LoginForm />);
        const user = userEvent.setup();
        const mailForm = screen.getByLabelText("メールアドレス");
        await user.type(mailForm, "test@example.com");
        expect(mailForm).toHaveValue("test@example.com");
    });

    test("パスワードが入力できる", async () => {
        render(<LoginForm />);
        const user = userEvent.setup();
        const passwordForm = screen.getByLabelText("パスワード");
        await user.type(passwordForm, "userTest1234");
        expect(passwordForm).toHaveValue("userTest1234");
    });

    test("ログインができる", async () => {
        render(<LoginForm />);
        const user = userEvent.setup();

        const mailForm = screen.getByLabelText("メールアドレス");
        const passwordForm = screen.getByLabelText("パスワード");
        const sendButton = screen.getByRole("button");

        await user.type(mailForm, "test@example.com");
        await user.type(passwordForm, "userTest1234");
        await user.click(sendButton);

        expect(screen.getByText("Welcome testUser !")).toBeInTheDocument();
    });

    test("ログインに失敗する", async () => {
        render(<LoginForm />);
        const user = userEvent.setup();

        const mailForm = screen.getByLabelText("メールアドレス");
        const passwordForm = screen.getByLabelText("パスワード");
        const sendButton = screen.getByRole("button");

        await user.type(mailForm, "fail@example.com");
        await user.type(passwordForm, "userTest1234");
        await user.click(sendButton);

        expect(screen.queryByText("Welcome testUser !")).not.toBeInTheDocument();
    });
});