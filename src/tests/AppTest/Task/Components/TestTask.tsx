import Menu from "../../../../Menu/Menu";
import Task from "../../../../Task/Task";
import { getCategoryComponent } from "../../Utils/Function/UtilsFunction";
import { CATEGORY_ID_TASK } from "../../Common/Const/Const";

export function TestTask() {

    //タスクのカテゴリIDからタスクコンポーネントを取得
    return getCategoryComponent(CATEGORY_ID_TASK);
}