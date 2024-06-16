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
    "#8884d8",
    "#82ca9d",
    "#00bfff",
    "#ff00ff",
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
    type: "number" | "category" | undefined,
    xLabel?: string,
    yLabel?: string,
    backgroundColor?: string,
    fillColors?: { [key: string]: string },
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
                        let color = fillColorList[index % fillColorList.length];

                        if (props.fillColors && Object.keys(props.fillColors).length > 0) {
                            color = props.fillColors[element] ?? color;
                        }

                        return (
                            <React.Fragment>
                                <Line
                                    type="monotone"
                                    dataKey={element}
                                    stroke={color}
                                    strokeWidth={2}
                                />
                            </React.Fragment>

                        )
                    })
                }
                <Line
                    type="monotone"
                    dataKey={props.yKey}
                    stroke={props.strokeColor}
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default MultiLineGraphComponent;