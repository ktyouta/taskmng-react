const fs = require('fs');

/**
 * ファイルの存在チェック
 * @param filePath 
 * @returns 
 */
export function checkFile(filePath: string) {
    let isExist = false;
    try {
        fs.statSync(filePath);
        isExist = true;
    } catch (err) {
        isExist = false;
    }
    return isExist;
}

/**
 * ファイル読み込み
 * @param filePath 
 * @returns 
 */
export function readFile(filePath: string) {
    let content: string = "";
    if (checkFile(filePath)) {
        content = fs.readFileSync(filePath, 'utf8');
    }
    return content;
};

/**
 * ファイル書き込み
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function overWriteData(filePath: string, stream: string) {
    try {
        fs.writeFileSync(filePath, stream);
        return "";
    } catch (err) {
        return "ファイルの書き込みに失敗しました。";
    }
}


/**
 * ファイル書き込み
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function overWriteFileData<T>(filePath: string, data: T) {

    try {

        //json文字列に変換
        let stream: string = JSON.stringify(data, null, '\t');
        fs.writeFileSync(filePath, stream);

        return "";
    } catch (err) {
        return "ファイルの書き込みに失敗しました。";
    }
}

/**
 * 文字列をjsonオブジェクトに変換
 */
export function decodeStr(str: string) {
    return JSON.parse(str);
}

/**
 * ファイルデータを取得
 * @param filePath 
 */
export function getFileJsonData<T>(filePath: string): T {
    let content = readFile(filePath);
    return decodeStr(content);
}

/**
 * 指定したディレクトリ内のファイル名を取得する
 */
export function getFileName(dirPath: string,) {
    const files: string[] = fs.readdirSync(dirPath);

    return files;
}