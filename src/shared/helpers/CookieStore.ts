import * as cookies from 'browser-cookies';

export class CookieStore {

    // static saveBearerToken(token: string): void {
    //     // this.clearBearerToken();
    //     if (localStorage) {
    //         localStorage.setItem('access_token', token);
    //     } else {
    //         cookies.set('access_token', token);
    //     }
    // }

    // static getBearerToken(): string | null {
    //     if (localStorage && localStorage.getItem('access_token')) {
    //         return 'Bearer ' + localStorage.getItem('access_token');
    //     } else {
    //         const cookie = cookies.get('access_token');
    //         if (cookie) {
    //             return 'Bearer ' + cookie;
    //         }
    //         return null;
    //     }
    // }

    static getToken(): any {
        if (localStorage && localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            const cookie = cookies.get('token');
            if (cookie) {
                return cookie;
            }
            return null;
        }

    }

    // static saveData(key: string, value: string): void {
    //     if (localStorage) {
    //         localStorage.setItem(key, value);
    //     } else {
    //         cookies.set(key, value);
    //     }
    // }

    // static removeData(key: string): void {
    //     if (localStorage) {
    //         localStorage.removeItem(key);
    //     } else {
    //         cookies.erase(key);
    //     }
    // }

    // static getData(key: string): string | null {
    //     if (localStorage && localStorage.getItem(key)) {
    //         return localStorage.getItem(key);
    //     } else {
    //         const cookie = cookies.get(key);
    //         if (cookie) {
    //             return cookie;
    //         }
    //         return null;
    //     }
    // }

    // static clearBearerToken(): void {
    //     if (localStorage) {
    //         localStorage.removeItem('access_token');
    //     } else {
    //         cookies.set('access_token', null);
    //     }
    // }


}
