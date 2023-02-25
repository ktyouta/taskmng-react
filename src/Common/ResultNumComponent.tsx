import '../App.css';
import '../Master/css/MasterTop.css';
import '../Master/css/MasterTableComponent.css';

//引数の型
type propsType = {
    num: number
}

function ResultNumComponent(props: propsType) {

    return (
        <div>
            表示件数：{props.num} 件
        </div>
    );
}

export default ResultNumComponent;