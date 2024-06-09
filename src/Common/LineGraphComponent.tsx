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
}


function LineGraphComponent(props: propsType) {

    console.log("LineGraphComponent render");

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

export default LineGraphComponent;