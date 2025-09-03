import { Loading } from "./Loading";

export class XMLoad2 {
    private static LoadingObj: Loading = null;
    private static Loadtimer = null;
    private static LoadOpenTimer = null;

    /**
     * @param text 显示的内容
     */
    public static openLoading(text: string = '', disableClick: boolean = false): void {        
        if (!this.LoadOpenTimer && !this.LoadingObj) {
            this.LoadOpenTimer = setTimeout(() => {
                this.LoadingObj = new Loading(text, disableClick);
                this.LoadingObj.openLoading();
            }, 1000);
        }
    }
    public static closeLoading(): void {        
        if (this.LoadOpenTimer != null) {            
            clearTimeout(this.LoadOpenTimer);
            this.LoadOpenTimer = null;
        }

        if (this.LoadingObj) {
            this.LoadingObj.closeLoading();
            this.LoadingObj = null;
        }
    }

}
