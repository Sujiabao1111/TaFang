import {FeedAdStatus, VideoAdStatus} from "./AdStatus";

type AdConfigType = {
    position: number,
    status: FeedAdStatus | VideoAdStatus,
    showAdTips?:boolean, 
    adTips?:string
}

export default AdConfigType;