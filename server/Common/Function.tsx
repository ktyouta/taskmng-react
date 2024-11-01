
/**
 * 現在日時を取得
 */
export function getNowDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const date = (now.getDate()).toString().padStart(2, "0");
    return `${year}/${month}/${date}`;
}


/**
 * yyyymmddをyyyy/mm/ddに変換する
 */
export function getFormatDate(dateStr: string) {
    if (dateStr.includes("/")) {
        return dateStr;
    }
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);

    return `${year}/${month}/${day}`;
}


/**
 * 現在日時(yyyy/MM/dd HH:mm)を取得
 */
export function getNowDatetime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const date = (now.getDate()).toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${date} ${hours}:${minutes}`;
}