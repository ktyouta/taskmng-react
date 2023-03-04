import React, { useEffect, useState } from 'react';

/**
 * jsonデータの取得
 * @param url 
 * @returns 
 */
function useFetchJsonData(url:string) {

  //jsonファイル毎に中身は異なるため型はany
  const [jsonData,setJsonData] = useState<any>([]);

  //引数のurlからjsonを取得する
  const getData = async()=>{
    if(!url){
      setJsonData([]);
      return;
    }
    const res = await fetch(url);
    const data = await res.json();
    setJsonData(data);
  }

  useEffect(()=>{
    getData();
  },[url]);

  return (
    jsonData
  );
}

export default useFetchJsonData;