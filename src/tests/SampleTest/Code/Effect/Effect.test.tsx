import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../../Component/Login/LoginForm";
import { EffectComponent } from "../../Component/Effect/EffectComponent";

describe(EffectComponent, () => {

    test("useEffectからAPIが呼び出される", async () => {
        render(<EffectComponent />);

        await waitFor(() => {
            expect(screen.getByText("effectcomponent")).toBeInTheDocument();
        });

    });

});