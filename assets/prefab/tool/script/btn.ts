const {ccclass, property} = cc._decorator;

@ccclass
export default class btn extends cc.Component {

    @property
    doubleTime:number = 2;

    clickEvents;

    start () {
        let button = this.getComponent(cc.Button);
        if (!button){
            return;
        }

        this.clickEvents = button.clickEvents;

        this.node.on('click', ()=>{
            if(button.clickEvents && button.clickEvents.length != 0){                
                button.clickEvents = [];
                setTimeout((dt)=>{
                    if(button){
                        button.clickEvents = this.clickEvents;
                    }                    
                }, this.doubleTime * 1000);
            }
        }, this);
    }    
}
