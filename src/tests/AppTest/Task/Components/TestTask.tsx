import Menu from "../../../../Menu/Menu";
import Task from "../../../../Task/Task";
import { getCategoryComponent } from "../../Utils/Function/UtilsFunction";
import { CATEGORY_ID_TASK } from "../../Common/Const/Const";

export function TestTask() {

    return getCategoryComponent(CATEGORY_ID_TASK);
}