import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';
import { taskSettingDatas, testCustormAttributeSetting } from "../Data/TestDatas";

export const CustomAttributeInputSettingHandler = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTEINPUTSETTING}`, async ({ request }) => {

        return HttpResponse.json(testCustormAttributeSetting);
    }),
];