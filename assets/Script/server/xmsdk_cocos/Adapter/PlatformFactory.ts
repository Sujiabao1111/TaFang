import IPlatform from "./Base/IPlatform";
import PreviewPlatform from "./PreviewPlatform";
import InnerWebPlatform from "./InnerWebPlatform";
import AndroidNativePlatform from "./AndroidNativePlatform";

export default class PlatformFactory {

    // 单例模式
    private static _ins: IPlatform = null;

    public static get Ins(): IPlatform {
        if (PlatformFactory._ins == null) {
            if (true && !window["_dsbridge"]) {
                console.log('cocos直接点击那个预览按钮，在浏览器打开');
                //cocos直接点击那个预览按钮，在浏览器打开
                PlatformFactory._ins = new PreviewPlatform();
            } else if (cc.sys.isBrowser) {
                console.log('app内嵌网页');
                //浏览器
                PlatformFactory._ins = new InnerWebPlatform();
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                console.log('安卓原生');
                //安卓原生
                PlatformFactory._ins = new AndroidNativePlatform();
            }
        }
        return PlatformFactory._ins;
    }
}