import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import QueryClientComponent from "../Components/QueryClientComponent";
import { render } from "@testing-library/react";



function CustomRender(children: ReactNode, initialEntries?: string[]) {

    return render(
        <QueryClientComponent
            initialEntries={initialEntries}
        >
            {children}
        </QueryClientComponent>
    );
}

export default CustomRender;