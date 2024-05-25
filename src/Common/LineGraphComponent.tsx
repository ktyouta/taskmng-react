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
    type: "number" | "category" | undefined
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey={props.xKey}
                    type={props.type}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey={props.yKey}
                    stroke={props.strokeColor}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default LineGraphComponent;