import React from "react";
import { useMemo } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";


//グラフカラーのリスト
const fillColorList = [
    "#00bfff",
    "#00ff00",
    "#ff00ff",
    "#8884d8",
    "#dcdcdc",
]

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
    type?: "number" | "category",
    xLabel?: string,
    yLabel?: string,
    backgroundColor?: string,
    fillColors?: { [key: string]: string },
    strokeSizeList?: { [key: string]: number },
}


function MultiLineGraphComponent(props: propsType) {

    console.log("MultiLineGraphComponent render");

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
        <ResponsiveContainer
            width={props.outerWidth}
            height={props.outerHeight}

        >
            <LineChart
                width={props.graphWidth}
                height={props.graphHeight}
                data={props.list}
                margin={props.marginObj}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    fill={props.backgroundColor ?? ""}
                />
                <XAxis
                    dataKey={props.xKey}
                    type={props.type}
                    label={{
                        value: props.xLabel, offset: -5, position: "insideBottomRight"
                    }}
                />
                <YAxis
                    tickCount={8}
                    label={{ value: props.yLabel, angle: -90, position: "insideLeft" }}
                />
                <Tooltip />
                <Legend />
                {
                    dataKey.map((element, index) => {
                        //折れ線の色
                        let color = fillColorList[index % fillColorList.length];

                        if (props.fillColors && Object.keys(props.fillColors).length > 0) {
                            color = props.fillColors[element] ?? color;
                        }

                        //折れ線の太さ
                        let strokeSize = props.strokeSizeList && props.strokeSizeList[element] ? props.strokeSizeList[element] : 2;

                        return (
                            <Line
                                type="monotone"
                                dataKey={element}
                                stroke={color}
                                strokeWidth={strokeSize}
                            />
                        )
                    })
                }
            </LineChart>
        </ResponsiveContainer>
    );
}

export default MultiLineGraphComponent;