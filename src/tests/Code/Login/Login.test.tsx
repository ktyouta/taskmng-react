import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../../Login/Login";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

describe(Login, () => {
    test("ログインフォームが表示されている", async () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </QueryClientProvider>
        );

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

    test("IDが入力できる", async () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const user = userEvent.setup();
        const userIdInput = screen.getByPlaceholderText('UserID');
        await user.type(userIdInput, "id");
        expect(userIdInput).toHaveValue("id");
    });

    test("パスワードが入力できる", async () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const user = userEvent.setup();
        const userIdInput = screen.getByPlaceholderText('Password');
        await user.type(userIdInput, "Password");
        expect(userIdInput).toHaveValue("Password");
    });
});