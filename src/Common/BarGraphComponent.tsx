import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ComposedChart,
    Bar,
} from "recharts";
import styled from "styled-components";

//外側の基本スタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    height:${({ height }) => (height)};
    width:${({ width }) => (width)};
`;


//引数の型
type propsType = {
    list: object[],
    xKey: string,
    yKey: string,
    strokeColor?: string,
    barSize?: number,
    marginObj?: {
        top: number,
        right: number,
        bottom: number,
        left: number,
    },
    graphWidth: number,
    graphHeight: number,
    outerWidth: string,
    outerHeight: string,
    fillColor?: string,
    type: "number" | "category" | undefined
}


function BarGraphComponent(props: propsType) {

    console.log("BarGraphComponent render");

    return (
        <OuterDiv
            height={props.outerHeight}
            width={props.outerWidth}
        >
            <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                width={props.graphWidth}  //グラフ全体の幅を指定
                height={props.graphHeight}  //グラフ全体の高さを指定
                data={props.list} //ここにArray型のデータを指定
                margin={props.marginObj}  //marginを指定
            >
                <XAxis
                    dataKey={props.xKey}  //Array型のデータの、X軸に表示したい値のキーを指定
                    type={props.type}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid //グラフのグリッドを指定
                    stroke={props.strokeColor} //グリッド線の色を指定
                />
                <Bar //棒グラフ
                    dataKey={props.yKey}//Array型のデータの、Y軸に表示したい値のキーを指定
                    barSize={props.barSize ?? 20}  //棒の太さを指定
                    stroke={props.strokeColor ?? "rgba(34, 80, 162, 0.2)"} ////レーダーの線の色を指定 
                    fillOpacity={1}  //レーダーの中身の色の薄さを指定
                    fill={props.fillColor ?? "#2250A2"} ////レーダーの中身の色を指定
                />
            </ComposedChart>
        </OuterDiv>
    );
}

export default BarGraphComponent;