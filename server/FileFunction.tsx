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
export function createData(filePath: string, stream: string) {
    try {
        fs.appendFileSync(filePath, stream);
        return "";
    } catch (err) {
        return "エラーが発生しました。";
    }
}
