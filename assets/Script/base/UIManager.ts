
import Singleton from "./Singleton";



export class UIManager extends Singleton {
    static get ins() {
        return super.getInstance<UIManager>();
    }









    /**
   * 播放spine动画
   * @param {*} sp_Skeleton 动画文件
   * @param {*} animName 动作名称
   * @param {*} loop 是否循环
   * @param {*} callback 播放完毕回调
   */
    public playSpine = (sp_Skeleton, animName, loop, callback = null) => {
        // sp_Skeleton.premultipliedAlpha=false;//这样设置在cocos creator中才能有半透明效果

        // let spine = this.node.getComponent(sp.Skeleton);
        let track = sp_Skeleton.setAnimation(0, animName, loop);
        if (track) {
            // 注册动画的结束回调
            sp_Skeleton.setCompleteListener((trackEntry, loopCount) => {
                let name = trackEntry.animation ? trackEntry.animation.name : '';
                if (name === animName && callback) {
                    callback(); // 动画结束后执行自己的逻辑
                }
            });
        }
    };


}