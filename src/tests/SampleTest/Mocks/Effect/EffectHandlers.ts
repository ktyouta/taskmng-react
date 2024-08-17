import { HttpResponse, http } from "msw";

export const EffectHandlers = [
    http.post("https://XXXXXXX/effectcomponent", async ({ request }) => {

        return HttpResponse.json(
            {
                id: "effectcomponent"
            },
            { status: 200 }
        );
    }),
];