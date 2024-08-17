import React, { useEffect, useState } from "react";


export function EffectComponent() {

    const [data, setData] = useState("");

    const submit = async () => {
        console.log("testsubmit is called");
        const response = await fetch("https://XXXXXXX/effectcomponent", {
            method: "POST",
            body: JSON.stringify({ data }),
        });
        const body = await response.json();
        console.log("EffectComponent body:" + body);
        Object.keys(body).forEach((element) => {
            console.log(`body[${element}]:${body[element]}`);
        });
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