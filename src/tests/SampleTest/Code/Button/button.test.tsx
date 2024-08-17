import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import TestButton from "../../Component/Button/TestButton";


describe("Buttonコンポーネントテスト", () => {
    test("Buttonに文字が表示されること", async () => {
        render(<TestButton>Button</TestButton>);

        expect(screen.getByText("Button")).toBeTruthy();
    });

    test("Buttonロールであること", async () => {
        render(<TestButton>Button</TestButton>);

        expect(screen.getByRole("button").textContent).toBe("Button");
    });

    test("クリックするとonClick()が実行されること", async () => {
        const onClickMock = vi.fn(() => { });

        render(<TestButton onClick={onClickMock}>Button</TestButton>);
        expect(onClickMock).toHaveBeenCalledTimes(0);

        const button = screen.getByRole("button");
        await fireEvent.click(button);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        await fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalledTimes(2);
    });

    test("ボタンの背景色がしろであること", async () => {
        render(<TestButton>Button</TestButton>);
        const button = screen.getByRole("button");

        expect(button).toHaveStyle("background-color: rgb(255, 255, 255)");
    });

    test("disabledをtureにするとボタンがクリック出来なくなること", async () => {
        const onClickMock = vi.fn(() => { });

        render(
            <TestButton disabled={true} onClick={onClickMock}>
                Button
            </TestButton>
        );

        const button = screen.getByRole("button");
        await fireEvent.click(button);

        expect(onClickMock).toHaveBeenCalledTimes(0);
    });
});
