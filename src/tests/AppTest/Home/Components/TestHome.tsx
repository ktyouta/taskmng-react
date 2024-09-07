import Home from "../../../../Home/Home";
import { CATEGORY_ID_HOME } from "../../Common/Const/Const";
import { getCategoryComponent } from "../../Utils/Function/UtilsFunction";


export function TestHome() {

    return getCategoryComponent(CATEGORY_ID_HOME);
}