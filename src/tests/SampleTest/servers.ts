import { setupServer } from "msw/node";
import { LoginFormHandlers } from "./Mocks/LoginForm/LoginFormHandlers";
import { EffectHandlers } from "./Mocks/Effect/EffectHandlers";


export const SampleTestAPIServerList = [
    LoginFormHandlers,
    EffectHandlers,
];