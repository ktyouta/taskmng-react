import { HttpResponse, http } from "msw";

export const LoginFormHandlers = [
    http.post("https://XXXXXXX/signin", async ({ request }) => {

        console.log("LoginFormHandlers is called");

        const { mail, password } = (await request.json()) as {
            mail?: string;
            password?: string;
        };
        if (mail === "test@example.com" && password === "userTest1234") {
            return HttpResponse.json(
                {
                    id: "1",
                    name: "testUser",
                    mail: "test@example.com",
                },
                { status: 200 }
            );
        } else {
            return HttpResponse.json(null, { status: 404 });
        }
    }),
];