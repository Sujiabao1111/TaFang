import { ToastObject } from "./ToastObject";

export class DurConfig {
    public static LONG_LARGE: number = 4;
    public static LONG: number = 2;
    public static SHORT: number = 1.5;
}

export class TextConfig {
    public static LINE_HIGHT: number = 32;         // 行高
    public static FONT_SIZE: number = 24;          // 字体大小
    public static H_PADDING: number = 30;          // 水平间距
    public static V_PADDING: number = 15;           // 垂直间距
    public static W_SPACEING: number = 120;        // 文本过长时，设置为自动换行与屏幕的间距
    public static B_SPACEING: number = 100;        // 当toast距离顶部或者底部的间距
}

export enum PosConfig {
    TOP = 0,
    CENTER = 1,
    BOTTOM = 2,
}

export class XMToast {
    private static toastObj: ToastObject = null;

    /**
     * 
     * @param text 显示的内容
     * @param duration 多久关闭，默认1.5s
     * @param pos 显示文字的位置，默认为底部
     */
    public static ShowText(text: string, duration?: number, pos?: PosConfig): void {
        this.toastObj = new ToastObject(text, duration);
        this.toastObj.setPosition(pos, 0, 0);//可以自定义Toast的位置
        this.toastObj.show();
    }
}
