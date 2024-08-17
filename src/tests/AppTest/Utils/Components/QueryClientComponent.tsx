import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

//引数の型
type propsType = {
    children: ReactNode,
    initialEntries?: string[]
}

function QueryClientComponent(props: propsType) {
    const queryClient = new QueryClient();

    return (

        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={props.initialEntries}>
                {props.children}
            </MemoryRouter>
        </QueryClientProvider>
    );
}

export default QueryClientComponent;