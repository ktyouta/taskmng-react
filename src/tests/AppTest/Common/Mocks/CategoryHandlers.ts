import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import CATEGORY_INFO from '../../../../../public/json/setting/menu.json';

export const CategoryHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}`, async ({ request }) => {

        return HttpResponse.json(CATEGORY_INFO);
    }),
];