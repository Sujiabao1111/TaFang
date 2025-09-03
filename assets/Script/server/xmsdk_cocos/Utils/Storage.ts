export type Dataobj = {
    operateTime: any,
    expires?: string | number,
    data: any,
    resetData?: any
}

export module Storage {
    /**
     * 判断是否符合执行条件
     * @param {*} key 缓存key
     * @param {*} needKey 是否必须传key
     */
    export function isEnabled(key?: string, needKey?: boolean) {
        if (typeof window === 'object' && localStorage && (!needKey || key && typeof key === 'string')) {
            return true
        }
    }

    /**
     * 过期时间格式话
     * @param {*} expires 过期时间 "2019-1-14 21:38:00"【具体时间】 || (1 | "1" | "1d")【天】 || "1h"【小时】 || "1m"【分钟】 || "1s"【秒】 || "0n"【自然日】
     */
    export function formatExpires(expires: string | number) {
        let date = new Date(),
            unit = 86400000; //天

        if (typeof expires === 'string') {
            const time = parseFloat(expires);
            if (expires.includes('n') && time != null && time >= 0) {
                //自然日
                date.setTime(date.getTime() + unit * time);
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
                expires = date.getTime();
            } else if (/^\w+$/.test(expires) && time != null && time > 0) {
                //天/时/分/秒
                if (expires.includes('h')) {
                    unit = 3600000; //时
                } else if (expires.includes('m')) {
                    unit = 60000; //分
                } else if (expires.includes('s')) {
                    unit = 1000; //秒
                }
                date.setTime(date.getTime() + unit * parseFloat(expires));
                expires = date.getTime();
            } else {
                //时间格式字符串
                let arr: any = expires.trim().split(/\D+/g);
                if (arr.length >= 3 && !isNaN(arr[0]) && !isNaN(arr[1]) && !isNaN(arr[2])) {
                    date = new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]), parseInt(arr[3]) || 23, parseInt(arr[4]) || 59, parseInt(arr[5]) || 59);
                    expires = date.getTime()
                } else {
                    expires = 0
                }
            }
        } else if (typeof expires === 'number' && expires > 0) {
            expires = date.getTime() + expires;
        } else {
            expires = 0;
        }

        return expires;
    }

    /**
     * 设置缓存，可设置过期时间
     * @param {*} key 缓存key
     * @param {*} data 缓存数据
     * @param {expires, success, fail} extra
     *  expires "2019-1-14 21:38:00"【具体时间】 || (1 | "1" | "1d")【天】 || "1h"【小时】 || "1m"【分钟】 || "1s"【秒】 || "0n"【自然日】
     */
    export function set(key: string, data: any, extra?: { expires?: number | string; resetData?: any; }) {
        if (typeof extra !== 'object') {
            extra = {}
        }

        let { expires, resetData } = extra;

        if (!Storage.isEnabled(key, true) && data !== undefined) {
            return false
        }

        if (expires) {
            expires = Storage.formatExpires(expires);

            if (expires) {
                const dataobj: Dataobj = {
                    operateTime: Date.now(),
                    expires,
                    data,
                };

                resetData && (dataobj.resetData = resetData);
                localStorage.setItem(key, JSON.stringify(dataobj));
                // Log.log('设置，过期时间:', new Date(expires));
            } else {
                return false
            }
        } else {
            const dataobj: Dataobj = {
                operateTime: Date.now(),
                data
            };

            localStorage.setItem(key, JSON.stringify(dataobj));
        }

        return true;
    }

    /**
     * 获取缓存
     * @param {*} key 缓存key
     */
    export function get(key: string) {
        if (!Storage.isEnabled(key, true)) {
            return
        }

        let data: Dataobj, storageData = localStorage.getItem(key);

        if (typeof storageData === 'string') {
            try {
                data = JSON.parse(storageData);
            } catch (err) {

            }
        }

        if (data && data.expires && Date.now() > data.expires) {
            if (data.resetData) {
                data = data.resetData;
                Storage.set(key, data, {});
                // Log.log('获取，已过期时间:', new Date(data.expires));
            } else {
                Storage.remove(key);
                // Log.log('获取，已过期时间:', new Date(data.expires));
                data = undefined;
            }
        } else if (data && data.operateTime) {
            data = data.data;
        } else {
            data = typeof storageData === 'string' ? JSON.parse(storageData) : storageData; 
        }

        return data;
    }

    /**
     * 获取所有缓存
     */
    export function getAll() {
        let results = [];
        const keys = Storage.getkeys();
        if(keys){
            keys.forEach((key: any) => {
                results.push({
                    key,
                    data: Storage.get(key)
                })
            });    
        }
        return results;
    }

    /**
     * 获取所有缓存key
     */
    export function getkeys() {
        let i = 0,
            keys = [];

        while (localStorage.key(i)) {
            keys.push(localStorage.key(i));
            i++;
        }

        return keys;
    }

    /**
     * 移除缓存
     * @param {*} key 缓存key
     */
    export function remove(key: any) {
        if (!Storage.isEnabled(key, true)) {
            return
        }

        const Key = localStorage.key;
        localStorage.removeItem(key);
        localStorage.key = Key;
    }

    /**
     * 清除过期缓存
     * @param {*} isExpires 执行清除过期缓存
     */
    export function clear(isExpires: any) {
        if (!Storage.isEnabled()) {
            return
        }

        if (isExpires) {
            const keys = Storage.getkeys();
            if(keys){
                keys.forEach((key: any) => {
                    Storage.get(key)
                });
            }
        } else {
            localStorage.clear();
        }
    }

    // 获取缓存（适用用于记录当日次数的缓存）
    export function getStorageTimes(keyName: string) {
        // Storage.clear(true);
        const times = Storage.get(keyName);
        if (times === null || !times) {
            return 0;
        } else {
            return times;
        }
    }

    // 设置次数（适用用于记录当日次数的缓存）
    export function setStorageTimes(keyName: string, value = 1, extra?) {
        let times = +Storage.getStorageTimes(keyName) + value;
        Storage.set(keyName, times, extra);
    }
}