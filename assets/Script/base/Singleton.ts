/***
 * 泛型单例模式接口
 */
export default class Singleton {
    private static _insatnce: any = null;
    static getInstance<T>(): T {
        if (this._insatnce === null) {
            this._insatnce = new this();
        }
        return this._insatnce;
    }
}

