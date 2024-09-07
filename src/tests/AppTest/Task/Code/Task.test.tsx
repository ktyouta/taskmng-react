import { vi } from "vitest";
import CustomRender from "../../Common/Code/CustomRender";
import { TestTask } from "../Components/TestTask";


/**
 * タスク画面のテストコード
 */
describe('コンポーネントのレンダリングチェック', () => {

    test('Taskコンポーネントのレンダリングが実行される', () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<TestTask />);

        expect(logSpy).toHaveBeenCalledWith('Task render');

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });

});