import { useMemo } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Bar,
    BarChart,
} from "recharts";
import styled from "styled-components";

//外側の基本スタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    height:${({ height }) => (height)};
    width:${({ width }) => (width)};
`;

//グラフカラーのリスト
const fillColorList = [
    "#8884d8",
    "#82ca9d",
    "#00bfff",
    "#ff00ff",
    "#dcdcdc",
]

//リストオブジェクトの型
type listObjType = {
    name: string,
}

//引数の型
type propsType<T> = {
    list: T[],
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
    fillColors?: { [key: string]: string },
    type: "number" | "category" | undefined
}


function StackBarGraphComponent<T extends listObjType>(props: propsType<T>) {

    console.log("StackBarGraphComponent render");

    //グラフキーのリスト
    let dataKey = useMemo(() => {
        return props.list.reduce((prev: string[], current) => {
            let keyList = Object.keys(current);

            keyList = keyList.filter((element) => {
                return element !== "name";
            });

            keyList.forEach((element) => {
                if (!prev.includes(element)) {
                    prev.push(element);
                }
            });
            return prev;
        }, []);
    }, [props.list]);

    return (
        <OuterDiv
            height={props.outerHeight}
            width={props.outerWidth}
        >
            <BarChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
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
                {
                    dataKey.map((element, index) => {
                        let color = fillColorList[index % fillColorList.length];

                        if (props.fillColors && Object.keys(props.fillColors).length > 0) {
                            color = props.fillColors[element] ?? color;
                        }

                        return (
                            <Bar //棒グラフ
                                dataKey={element}//Array型のデータの、Y軸に表示したい値のキーを指定
                                barSize={props.barSize ?? 20}  //棒の太さを指定
                                stroke={props.strokeColor ?? "rgba(34, 80, 162, 0.2)"} ////レーダーの線の色を指定 
                                fillOpacity={1}  //レーダーの中身の色の薄さを指定
                                fill={color} ////レーダーの中身の色を指定
                                stackId="id"
                            />
                        )
                    })
                }
            </BarChart>
        </OuterDiv>
    );
}

export default StackBarGraphComponent;