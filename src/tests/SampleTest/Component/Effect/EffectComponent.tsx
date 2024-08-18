import React, { useEffect, useState } from "react";


export function EffectComponent() {

    const [data, setData] = useState("");

    const submit = async () => {
        const response = await fetch("https://XXXXXXX/effectcomponent", {
            method: "POST",
            body: JSON.stringify({ data }),
        });
        const body = await response.json();
        body && setData(body.id);
    };

    useEffect(() => {
        submit();
    }, []);

    return (
        <React.Fragment>
            {data}
        </React.Fragment>
    );
}