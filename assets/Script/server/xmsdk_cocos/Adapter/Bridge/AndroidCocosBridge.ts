export default class AndroidCocosBridge {
    //安卓端调用的名字
    private static CLASS_NAME: string = "org/cocos2dx/javascript/bridge/CocosBridgeHandle";
    private static METHOD_NAME: string = "call";
    private static COCOS_CALLBACK_PREFIX = "CocosBridgeCallbacks";
    private static sCurCallbackFunCount : number = 0;

    private static checkAndInit(): void {
        if (!window[AndroidCocosBridge.COCOS_CALLBACK_PREFIX]) {
            window[AndroidCocosBridge.COCOS_CALLBACK_PREFIX] = {};
        }
    }

    public static call(methodName: string, arg ?: object, callBackFun ?: Function): null {
        if (!methodName || !methodName.trim()) {
            return;
        }

        AndroidCocosBridge.checkAndInit();

        let nativeArg : string = JSON.stringify(arg || {});
        let cocosCallbackFunName = "";

        if (callBackFun) {
            let name = "call" + (++AndroidCocosBridge.sCurCallbackFunCount);
            cocosCallbackFunName = AndroidCocosBridge.COCOS_CALLBACK_PREFIX + "." + name;
            window[AndroidCocosBridge.COCOS_CALLBACK_PREFIX][name] = (res) => {
                callBackFun(res);
            };
        }

        return jsb.reflection.callStaticMethod(AndroidCocosBridge.CLASS_NAME, AndroidCocosBridge.METHOD_NAME,
            "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;",
            methodName, nativeArg, cocosCallbackFunName);
    }
}