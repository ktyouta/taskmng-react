
/**
 * クッキーのリセット
 */
export function clearCookies() {
    // 現在のクッキーを取得
    const cookies = document.cookie.split(';');

    // 各クッキーを削除するための設定
    cookies.forEach((cookie) => {
        const [name] = cookie.split('=');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
}