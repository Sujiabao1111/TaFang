import { LoadObject } from "./LoadObject";

export class Configs {
    public static LINE_HIGHT: number = 32;         // 行高
    public static FONT_SIZE: number = 24;          // 字体大小
    public static H_PADDING: number = 12;          // 水平间距
    public static V_PADDING: number = 6;           // 垂直间距
    public static W_SPACEING: number = 120;        // 文本过长时，设置为自动换行与屏幕的间距
    public static B_SPACEING: number = 100;        // 当toast距离顶部或者底部的间距
    public static PADDING: number = 20;            // 间距
    public static WIDTH: number = 240;             // load内容层节点宽度
}

export class XMLoad {
    private static LoadObj: LoadObject = null;

    /**
     * @param text 显示的内容
     */
    public static ShowLoading(text: string = ''): void {
        this.LoadObj = new LoadObject(text);
        this.LoadObj.show();
    }

    /**
     * @msg: 隐藏load
     */
    public static HideLoading() {
        this.LoadObj.hide();
    }
}
