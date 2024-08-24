import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { categoryInfo } from "../TestDatas";

export const CategoryHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}`, async ({ request }) => {

        return HttpResponse.json(categoryInfo);
    }),
];