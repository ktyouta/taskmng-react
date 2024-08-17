import { HttpResponse, http } from "msw";
import ENV from '../../../../env.json';

export const MastertableHandlers = [
    http.get(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MASTERTABLE}`, async ({ request }) => {

        return HttpResponse.json(
            {
                mastertable: [
                    {
                        value: "sample",
                        label: "サンプルマスタ",
                        remarks: "備考"
                    },
                    {
                        value: "sample2",
                        label: "サンプルマスタ2",
                        remarks: "備考2"
                    },
                    {
                        value: "sample3",
                        label: "サンプルマスタ3",
                        remarks: "備考3"
                    },
                    {
                        value: "test",
                        label: "登録テスト用",
                        remarks: "登録テスト用ファイル"
                    },
                    {
                        value: "test1",
                        label: "新規追加テストファイル",
                        remarks: "テストファイル"
                    },
                    {
                        value: "test2",
                        label: "新規追加テストファイル2",
                        remarks: "test2"
                    }
                ]
            }
        );
    }),
];