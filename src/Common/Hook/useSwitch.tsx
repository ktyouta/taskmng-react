import React, { useEffect, useState } from 'react';

function useSwitch() {

    //フラグ
    const [flag, setFlag] = useState(false);

    //フラグオン
    function onFlag() {
        setFlag(true);
    }

    //フラグオフ
    function offFlag() {
        setFlag(false);
    }

    return { flag, onFlag, offFlag }
}

export default useSwitch;