import { ServerConfig } from "../UrlConst";
import util from "../../util/util";
import { UrlConst } from "../UrlConst";
import { AppInfo, getPhead, WebVersionCode } from "../xmsdk_cocos/Config/AppInfo";
import { md5 } from "../xmsdk_cocos/Utils/md5";

export default class Ajax {
    static send(config: ServerConfig) {
			tenurl =  config.url;
			if (!/^http/.test(config.url)) {
				config.url = AppInfo.appHost + config.url;
			}
			let data = config.data || {}
		  let listener = {
            onSuccess: config.onSuccess || function (res) { },
            onFail: config.onFail || function (res) { },
            onComplete: config.onComplete || function (res) { }
        };
        
     
		
		
		
			console.log("('----------------:", config.url)
			let xhr = new XMLHttpRequest();
			//设置xhr请求的超时时间
			//console.log('##############:' +config.url)
			xhr.timeout = config.timeout || 20 * 1000;
			xhr.open(config.method, config.url, true);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.setRequestHeader('Accept-Encoding', 'gzip')
			let header = config.header;
			if (header) {
				for (let key in header) {
					xhr.setRequestHeader(key, header[key]);
				}
			}
			if (!data.phead) {
				let now = Date.now();
				data.phead = getPhead();
				data.phead.wversion = WebVersionCode
				data.sign = md5.md5(`prdId=${data.phead.prdid}&phoneId=${data.phead.phoneid}&timestamp=${now}&key=xkX2Ab1P3KuI214V`);
				data.timestamp = now;
			}
			/*let listener = {
				onSuccess: config.onSuccess || function (res) { },
				onFail: config.onFail || function (res) { },
				onComplete: config.onComplete || function (res) { }
			};*/
			//注册相关事件回调处理函数
			xhr.onload = function (e) {
				if (xhr.readyState == 4) {
				   
					let responseData = {};
					try {
						responseData = JSON.parse(xhr.response);
					} catch (e) { }

					if (xhr.status == 200) {
						 console.log( config.url + "  ---请求成功````````````````"+xhr.response);
						listener.onSuccess(responseData);
					} else {
						//listener.onFail({ statusCode: xhr.status, data: responseData, message: responseData.message });
						//console.log("请求成功" + config.url + "信息" + xhr.status);
						listener.onFail(e);
					}
					
					listener.onComplete();
				}
			};
			xhr.ontimeout = function (e) {
				listener.onComplete();

				console.log("失败链接33" + config.url + "超时信息");
				listener.onFail(e);
				console.log("请求超时");
				// listener.onFail({ statusCode: 408, data: null, message: '' });            
				// console.log("请求超时",xhr.timeout,new Date().getTime()-start_time,new Date().getTime())
			};
	 
			xhr.onerror = function (e) {
				listener.onComplete();

				console.log("失败链接44" + config.url + "请求失败");
				listener.onFail(e);

				console.log("请求失败`````````````````", config.url, JSON.stringify(e))
			};
			xhr.send(JSON.stringify(data));
		
		
		
		
        
    }
    static post(config: ServerConfig) {
        
		
        
			 config["method"] = 'POST'
			 this.send(config);
    }
    static get(config: ServerConfig) {
		
        config["method"] = 'GET'
        this.send(config);
    }
    static getdata(config: ServerConfig)
    {
		console.log("\n----getdata-------"+config.url)
        let data  = []
        if( config.url == UrlConst.onPrizeGetRewardMain )
        {
            data  = {"code":0,"message":"success","data":{"onPrizeRedData":[{"state":0,"waitTime":60,"amount":100,"doubleAmount":400},{"state":0,"waitTime":120,"amount":200,"doubleAmount":1000},{"state":0,"waitTime":300,"amount":300,"doubleAmount":1500},{"state":0,"waitTime":600,"amount":500,"doubleAmount":2000}]}}
          
            
        }else if( config.url == UrlConst.btnRandomRedCount )
		{
			data  = {"code":0,"message":"success","data":{"remainingTimes":97}}
		}else if( config.url == UrlConst.earnProgressIndex )
		{
			data  = {"code":0,"message":"success","data":{"point":171428,"nextGear":175000,"reward":500,"canReceiveTimes":7}}
		}else if( config.url == UrlConst.goldWheel_index )
		{
			data  = {"code":0,"message":"success","data":{"times":19,"state":1,"rewardList":[{"id":"101","value":1000,"type":2},{"id":"105","value":5,"type":1},{"id":"102","value":500,"type":2},{"id":"106","value":10,"type":1},{"id":"103","value":300,"type":2},{"id":"107","value":15,"type":1},{"id":"104","value":100,"type":2},{"id":"108","value":20,"type":1}],"userTurntableStageReward":{"current":8,"rewardDetailDtoList":[{"status":0,"node":3,"reward":3000},{"status":0,"node":6,"reward":6000},{"status":0,"node":10,"reward":10000}]}}}
		}else if( config.url == UrlConst.sign_main )
		{
			//签到
			let state = util.canSinge();
			let lengsig = util.singlen();
			console.log("签到长度 ： " + lengsig)
			
			data  = {"code":0,"message":"success","data":{"signDays":lengsig,"userPeriod":0,"todayChecked":state,"list":[{"state":2,"rewardList":[{"type":2,"keyId":2,"rewardValue":500,"rewardPlusValue":1000}]},{"state":2,"rewardList":[{"type":2,"keyId":2,"rewardValue":1000,"rewardPlusValue":2000}]},{"state":2,"rewardList":[{"type":2,"keyId":2,"rewardValue":1250,"rewardPlusValue":2500}]},{"state":2,"rewardList":[{"type":2,"keyId":2,"rewardValue":2000,"rewardPlusValue":4000}]},{"state":2,"rewardList":[{"type":2,"keyId":2,"rewardValue":2500,"rewardPlusValue":5000}]},{"state":2,"rewardList":[{"type":2,"keyId":2,"rewardValue":3750,"rewardPlusValue":7500}]},{"state":2,"rewardList":[{"type":2,"keyId":2,"rewardValue":5000,"rewardPlusValue":10000}]}]}}
			
			
			
			
			
		}else if( config.url == UrlConst.newPlayerTaskData )
		{
			data  = {"code":0,"message":"success","data":{"userCurrentProgress":5,"totalProgress":100,"withdrawTaskItemVoMap":{"1":[{"id":"1","taskTitle":"炮塔等级达到10级","buttonType":3,"taskValue":10,"userTaskValue":21,"progress":5,"day":1,"type":1},{"id":"2","taskTitle":"观看视频5次","buttonType":1,"taskValue":5,"userTaskValue":0,"progress":5,"day":1,"type":2},{"id":"3","taskTitle":"完成日常任务1个","buttonType":2,"taskValue":1,"userTaskValue":6,"progress":5,"day":1,"type":3},{"id":"4","taskTitle":"累计红包获得2000","buttonType":2,"taskValue":2000,"userTaskValue":171428,"progress":10,"day":1,"type":4}],"2":[{"id":"5","taskTitle":"炮塔等级达到20级","buttonType":2,"taskValue":20,"userTaskValue":21,"progress":5,"day":2,"type":1},{"id":"6","taskTitle":"观看视频10次","buttonType":1,"taskValue":10,"userTaskValue":0,"progress":5,"day":2,"type":2},{"id":"7","taskTitle":"完成日常任务5个","buttonType":2,"taskValue":5,"userTaskValue":6,"progress":5,"day":2,"type":3},{"id":"8","taskTitle":"累计红包获得5000","buttonType":2,"taskValue":5000,"userTaskValue":171428,"progress":10,"day":2,"type":4}],"3":[{"id":"9","taskTitle":"炮塔等级达到25级","buttonType":1,"taskValue":25,"userTaskValue":21,"progress":2,"day":3,"type":1},{"id":"10","taskTitle":"观看视频20次","buttonType":1,"taskValue":20,"userTaskValue":0,"progress":2,"day":3,"type":2},{"id":"11","taskTitle":"完成日常任务15个","buttonType":1,"taskValue":15,"userTaskValue":6,"progress":2,"day":3,"type":3},{"id":"12","taskTitle":"累计红包获得10000","buttonType":2,"taskValue":10000,"userTaskValue":171428,"progress":10,"day":3,"type":4}],"4":[{"id":"13","taskTitle":"炮塔等级达到30级","buttonType":1,"taskValue":30,"userTaskValue":21,"progress":2,"day":4,"type":1},{"id":"14","taskTitle":"观看视频30次","buttonType":1,"taskValue":30,"userTaskValue":0,"progress":2,"day":4,"type":2},{"id":"15","taskTitle":"完成日常任务20个","buttonType":1,"taskValue":20,"userTaskValue":6,"progress":2,"day":4,"type":3},{"id":"16","taskTitle":"累计红包获得20000","buttonType":2,"taskValue":20000,"userTaskValue":171428,"progress":5,"day":4,"type":4}],"5":[{"id":"17","taskTitle":"炮塔等级达到35级","buttonType":1,"taskValue":35,"userTaskValue":21,"progress":2,"day":5,"type":1},{"id":"18","taskTitle":"观看视频50次","buttonType":1,"taskValue":50,"userTaskValue":0,"progress":1,"day":5,"type":2},{"id":"19","taskTitle":"完成日常任务30个","buttonType":1,"taskValue":30,"userTaskValue":6,"progress":1,"day":5,"type":3},{"id":"20","taskTitle":"累计红包获得30000","buttonType":2,"taskValue":30000,"userTaskValue":171428,"progress":5,"day":5,"type":4}],"6":[{"id":"21","taskTitle":"炮塔等级达到40级","buttonType":1,"taskValue":40,"userTaskValue":21,"progress":2,"day":6,"type":1},{"id":"22","taskTitle":"观看视频100次","buttonType":1,"taskValue":100,"userTaskValue":0,"progress":1,"day":6,"type":2},{"id":"23","taskTitle":"完成日常任务40个","buttonType":1,"taskValue":40,"userTaskValue":6,"progress":1,"day":6,"type":3},{"id":"24","taskTitle":"累计红包获得50000","buttonType":2,"taskValue":50000,"userTaskValue":171428,"progress":5,"day":6,"type":4}],"7":[{"id":"26","taskTitle":"观看视频300次","buttonType":1,"taskValue":300,"userTaskValue":0,"progress":1,"day":7,"type":2},{"id":"27","taskTitle":"完成日常任务80个","buttonType":1,"taskValue":80,"userTaskValue":6,"progress":2,"day":7,"type":3},{"id":"28","taskTitle":"累计红包获得200000","buttonType":1,"taskValue":200000,"userTaskValue":171428,"progress":2,"day":7,"type":4}]},"weChat":null,"withdrawItemVo":{"id":"6","amount":"5","point":50000},"currentDay":133}}
		}else if( config.url == UrlConst.wallet_main2 )
		{
			data  = {"code":0,"message":"success","data":{"gold":{"exchangeRate":10000,"goldPoint":171428,"exchangeAmount":"17.14"},"weChat":null,"cashOutMap":{"1":[{"id":"1","amount":"0.3","point":3000,"type":1,"sortNo":1,"mark":"今日可领","markResource":"texture/walletMark/mark1","rules":{"1":[{"userCurrentProgress":171428,"type":2,"demand":3000,"groupId":"1"}]},"grouping":1,"hasWithdraw":2},{"id":"12","amount":"0.3","point":3000,"type":2,"sortNo":2,"mark":"新人专享","markResource":"texture/walletMark/mark1","rules":{"1":[{"userCurrentProgress":171428,"type":2,"demand":3000,"groupId":"2"},{"userCurrentProgress":0,"type":3,"demand":2,"groupId":"2"}],"2":[{"userCurrentProgress":0,"type":5,"demand":1,"groupId":"3"},{"userCurrentProgress":0,"type":4,"demand":2,"groupId":"3"}]},"grouping":1,"hasWithdraw":2,"clockInToday":1},{"id":"13","amount":"0.5","point":5000,"type":3,"sortNo":3,"mark":"新人专享","markResource":"texture/walletMark/mark1","rules":{"1":[{"userCurrentProgress":171428,"type":2,"demand":5000,"groupId":"4"},{"userCurrentProgress":0,"type":3,"demand":5,"groupId":"4"}],"2":[{"userCurrentProgress":0,"type":5,"demand":1,"groupId":"5"},{"userCurrentProgress":0,"type":5,"demand":2,"groupId":"5"},{"userCurrentProgress":0,"type":4,"demand":80,"groupId":"5"}]},"grouping":1,"hasWithdraw":2,"clockInToday":1},{"id":"14","amount":"10","point":100000,"type":4,"sortNo":4,"mark":"可打卡","markResource":"texture/walletMark/mark2","rules":{"1":[{"userCurrentProgress":171428,"type":2,"demand":100000,"groupId":"6"},{"userCurrentProgress":1,"type":3,"demand":15,"groupId":"6"}],"2":[{"userCurrentProgress":0,"type":5,"demand":1,"groupId":"7"},{"userCurrentProgress":0,"type":5,"demand":2,"groupId":"7"},{"userCurrentProgress":0,"type":5,"demand":3,"groupId":"7"},{"userCurrentProgress":0,"type":4,"demand":500,"groupId":"7"}]},"grouping":1,"hasWithdraw":2,"clockInToday":1}],"2":[{"id":"15","amount":"20","point":200000,"type":5,"sortNo":5,"rules":{"1":[{"userCurrentProgress":171428,"type":2,"demand":200000,"groupId":"8"}],"2":[{"userCurrentProgress":0,"type":5,"demand":1,"groupId":"9"},{"userCurrentProgress":0,"type":5,"demand":2,"groupId":"9"},{"userCurrentProgress":0,"type":4,"demand":1000,"groupId":"9"},{"userCurrentProgress":0,"type":5,"demand":3,"groupId":"9"},{"userCurrentProgress":0,"type":5,"demand":4,"groupId":"9"}]},"grouping":2,"hasWithdraw":2},{"id":"17","amount":"50","point":500000,"type":7,"sortNo":6,"rules":{"1":[{"userCurrentProgress":171428,"type":2,"demand":500000,"groupId":"10"}],"2":[{"userCurrentProgress":0,"type":5,"demand":1,"groupId":"11"},{"userCurrentProgress":0,"type":5,"demand":2,"groupId":"11"},{"userCurrentProgress":0,"type":4,"demand":2500,"groupId":"11"},{"userCurrentProgress":0,"type":5,"demand":3,"groupId":"11"},{"userCurrentProgress":0,"type":5,"demand":4,"groupId":"11"},{"userCurrentProgress":0,"type":5,"demand":5,"groupId":"11"}]},"grouping":2,"hasWithdraw":2},{"id":"18","amount":"100","point":1000000,"type":8,"sortNo":7,"mark":"","rules":{"1":[{"userCurrentProgress":171428,"type":2,"demand":1000000,"groupId":"12"}],"2":[{"userCurrentProgress":0,"type":5,"demand":1,"groupId":"13"},{"userCurrentProgress":0,"type":5,"demand":2,"groupId":"13"},{"userCurrentProgress":0,"type":4,"demand":5000,"groupId":"13"},{"userCurrentProgress":0,"type":5,"demand":3,"groupId":"13"},{"userCurrentProgress":0,"type":5,"demand":4,"groupId":"13"},{"userCurrentProgress":0,"type":5,"demand":5,"groupId":"13"},{"userCurrentProgress":0,"type":5,"demand":7,"groupId":"13"}]},"grouping":2,"hasWithdraw":2}]},"rule":"1、同一设备只能绑定1个微信账号，绑定后不能重复绑定其他账号；\n2、提现申请将于1-7个工作日审核，审核通过即可到账，请耐心等待；\n3、同一用户（同一设备、同一微信账号）每日仅限申请提现成功一次，若当日限额已满，请次日申请；\n4、对于平台判定存在作弊等违规行为的用户，平台有权采取适当行为规范用户操作。"}}
			
		}else if( config.url == UrlConst.heavenCoin_main )
		{
			data  = {"code":0,"message":"success","data":{"list":[],"remainingTimes":85}}
		}else if( config.url == UrlConst.treasureBox_residual )
		{
			data  = {"code":0,"message":"success","data":{"times":17,"coin":841}}
		}else if( config.url == UrlConst.treasureBox_get2 )
		{
			data  = {"code":0,"message":"success","data":{"point":253}}
		}else if( config.url == UrlConst.earnProgressReceive )
		{
			data  = {"code":0,"message":"success","data":null}
		}else if( config.url == UrlConst.gameLevelReport )
		{
			data  = {"code":0,"message":"success","data":null}
		}else if( config.url == UrlConst.task_day_main )
		{
			//每日任务
			
			
			
			
			
			data  = {"code":0,"message":"success","data":{"list":[
			{"id":"1414613064778649601","taskTitle":"拾取空地红包10次","taskValue":10,"userTaskValue":0,"buttonType":3,"type":2,"keyId":2,"rewardValue":1500,"rewardFactor":2,"taskType":10},
			{"id":"1414613064766066694","taskTitle":"领取福利红包3次","taskValue":3,"userTaskValue":0,"buttonType":2,"type":2,"keyId":2,"rewardValue":1200,"rewardFactor":2,"taskType":9},
			{"id":"1414613064766066693","taskTitle":"转盘抽奖6次","taskValue":6,"userTaskValue":0,"buttonType":2,"type":2,"keyId":2,"rewardValue":1000,"rewardFactor":2,"taskType":3},
			{"id":"1414613064766066692","taskTitle":"视频补充炮塔2次","taskValue":2,"userTaskValue":0,"buttonType":2,"type":2,"keyId":2,"rewardValue":1500,"rewardFactor":2,"taskType":8},
			{"id":"1414613064766066691","taskTitle":"累计观看15次视频","taskValue":15,"userTaskValue":0,"buttonType":2,"type":2,"keyId":2,"rewardValue":2000,"rewardFactor":2,"taskType":4},
			{"id":"1414613064766066690","taskTitle":"每日登录","taskValue":0,"userTaskValue":0,"buttonType":4,"type":2,"keyId":2,"rewardValue":200,"rewardFactor":2,"taskType":1},
			{"id":"1414613064778649602","taskTitle":"累计获得10000红包","taskValue":10000,"userTaskValue":0,"buttonType":4,"type":2,"keyId":2,"rewardValue":1000,"rewardFactor":2,"taskType":11}
			
			]}}
			
			
			//util.getInt("",2);
			//console.log('###########---89--------'+JSON.stringify( data.data.list ) )
			let sts = [2,2,2,2,2,2,4,4];
			for (let i =0;i<data.data.list.length;i++)
			{
				let isd = data.data.list[i].id
				console.log('###########'+JSON.stringify(data.data.list[i].id))
				let state = util.getInt(isd,sts[i]);
				data.data.list[i].buttonType = state
			}
			
			
		}else if( config.url == UrlConst.achievement_main )
		{
			data  = {"code":0,"message":"success","data":{"list":[{"id":"2","taskTitle":"解锁10级炮塔","buttonType":3,"taskValue":10,"userTaskValue":0,"reward":{"type":2,"keyId":2,"rewardValue":1000,"rewardFactor":1},"taskType":1},{"id":"25","taskTitle":"领取漂浮宝箱1次","buttonType":3,"taskValue":1,"userTaskValue":0,"reward":{"type":2,"keyId":2,"rewardValue":800,"rewardFactor":1},"taskType":5},{"id":"10","taskTitle":"累计合成炮塔30次","buttonType":3,"taskValue":30,"userTaskValue":0,"reward":{"type":2,"keyId":2,"rewardValue":900,"rewardFactor":1},"taskType":3},{"id":"33","taskTitle":"累计观看5次视频","buttonType":2,"taskValue":5,"userTaskValue":0,"reward":{"type":2,"keyId":2,"rewardValue":2000,"rewardFactor":1},"taskType":6}]}}
			
			
			let sts = [2,2,2,2];
			for (let i =0;i<data.data.list.length;i++)
			{
				let isd = data.data.list[i].id+"cj"
				//console.log('###########'+JSON.stringify(data.data.list[i].id))
				let state = util.getInt(isd,sts[i]);
				data.data.list[i].buttonType = state
			}
			
			
		}else if( config.url == UrlConst.newBigWheel_index )
		{
			data  = {"code":0,"message":"success","data":{"currentPhoneFragments":0.50,"phoneFragmentsExchangeTotal":50,"beginDate":"2021-07-12","endDate":"2021-07-18","prevPeriodList":["任** 15******615","石** 18******226","石*  13******193","朱*  15******883","潘** 17******119","赖** 13******283","陈** 18******874","雷** 15******387","曾** 13******185","吕** 13******374","任*  18******810","卢*  18******914"],"itemListV2":[{"id":"101","type":4,"keyId":0,"rewardValue":0.5},{"id":"102","type":2,"keyId":2},{"id":"103","type":4,"keyId":0,"rewardValue":1.0},{"id":"104","type":6,"keyId":0},{"id":"105","type":4,"keyId":0,"rewardValue":1.0},{"id":"106","type":2,"keyId":2},{"id":"107","type":4,"keyId":0,"rewardValue":2.0},{"id":"108","type":5,"keyId":0}],"taskList":[{"id":"1","taskType":4,"taskTitle":"观看广告视频","taskValue":5,"userTaskValue":0,"rewardValue":1,"buttonType":2},{"id":"2","taskType":7,"taskTitle":"成功抵御6波攻击","taskValue":6,"userTaskValue":6,"rewardValue":1,"buttonType":3},{"id":"3","taskType":2,"taskTitle":"合成炮塔50次","taskValue":50,"userTaskValue":0,"rewardValue":1,"buttonType":2},{"id":"4","taskType":7,"taskTitle":"成功抵御18波攻击","taskValue":18,"userTaskValue":18,"rewardValue":1,"buttonType":3},{"id":"5","taskType":2,"taskTitle":"合成炮塔100次","taskValue":100,"userTaskValue":0,"rewardValue":1,"buttonType":2},{"id":"6","taskType":7,"taskTitle":"成功抵御30波攻击","taskValue":30,"userTaskValue":30,"rewardValue":1,"buttonType":3}],"watchCountLimit":10,"watchCount":0,"times":2,"buttonType":1,"signList":[0.5,1.0,1.5,2.0,2.5,3.0,5.0],"signTimes":1,"todayChecked":false}}
		}else if( config.url == UrlConst.heavenCoin_get )
		{
			data  = {"code":0,"message":"success","data":{"id":"1414875119070871553","point":23,"distanceTime":"0"}}
		}else if( config.url == UrlConst.heavenCoin_receive )
		{
			data  = {"code":0,"message":"已领取该空降金币","data":null}
		}else if( config.url == UrlConst.watchVideoAddBattery )
		{
			data  = {"code":0,"message":"success","data":null}
		}else if( config.url == UrlConst.getOnLinePrize )
		{
			data  = {"code":0,"message":"success","data":{"point":90,"leftTime":"0"}}
		}else if( config.url == UrlConst.btnRandomRedGet )
		{
			data  = {"code":0,"message":"success","data":null}
		}else if( config.url == UrlConst.goldWheel_action )
		{
			//转盘结果
			data  = {"code":0,"message":"success","data":{"id":"1414895542793797633","reward":{"id":"105","value":5,"type":1}}}
		}else if( config.url == UrlConst.goldWheel_checkIn )
		{
			
			data  = {"code":0,"message":"success","data":null}
		}else if( config.url == UrlConst.task_day_commonGet )
		{
			
			data  = {"code":0,"message":"success","data":null}
			//xiu
			//
			
			util.setInt(config.data.id,4);
			//console.log("--00000000000--------############# : " + JSON.stringify(config) )
			
		}else if( config.url == UrlConst.newPlayerTaskGet )
		{
			
			data  = {"code":0,"message":"success","data":null}
		}else if( config.url == UrlConst.kingPaoTaskData )
		{
			
			data  = {"code":0,"message":"success","data":{"taskList":[{"id":"1382657561626546178","type":0,"process":0.00,"processTarget":100.00,"achieve":0,"status":1,"title":"炮王进度"},{"id":"1382657561664294913","type":1,"process":21,"processTarget":72.00,"achieve":0,"status":0,"title":"72级炮王合成进度"},{"id":"1382657561681072130","type":2,"process":173428,"processTarget":2000000.00,"achieve":0,"status":0,"title":"200元红包换炮王"}],"turretKingRedEnvelopeDetailDTO":{"bonusPerCapita":127.75,"yesterdayRedEnvelope":40624.50,"total":318,"todayReceive":2},"marquee":[{"msg":"恭喜ID7850715成功提现127.75元","time":"03:20:58"},{"msg":"恭喜ID5587956成功提现127.75元","time":"07:21:41"}]}}
		}else if( config.url == UrlConst.kingPaoProgress )
		{
			
			data  = {"code":0,"message":"success","data":{"percent":10,"process":0,"processTarget":3,"status":1,"sign":false}}
		}else if( config.url == UrlConst.videoCardOk )
		{
			
			data  = {"code":0,"message":"success","data":null}
		}else if( config.url == UrlConst.wallet_record )
		{
			
			data  = {"code":0,"message":"success","data":{"list":[]}}
		}else if( config.url == UrlConst.onPrizeGetRewardGet )
		{
			//在线奖励领取
			data  = {"code":0,"message":"success","data":null}
		}else if( config.url == UrlConst.newBigWheel_checkIn )
		{
			
			data  = {"code":0,"message":"success","data":{"rewardPhoneFragments":1.0}}
		}else if( config.url == UrlConst.newBigWheel_action )
		{
			
			data  = {"code":0,"message":"success","data":{"id":"107","rewardValue":3.0,"doubleId":"1414901818462437378","doubleValue":0}}
		}else if( config.url == UrlConst.gameLevelIndex )
		{
			
			data  = {"code":0,"message":"success","data":{"rewardList":[]}}
		}else if( config.url == UrlConst.sign_videoGet )
		{
			//签到回调
			data  = {"code":0,"message":"已签到","data":null}
			util.singtoday();
		}else if( config.url == UrlConst.gameLevelCompleted )
		{
			data  = {"code":0,"message":"success","data":{"rewardList":[]}}
		}else if( config.url == UrlConst.achievement_commonGet )
		{
			data  = {"code":0,"message":"领取成功","data":null}
			
			let isd = config.data.id+"cj"
				//console.log('###########'+JSON.stringify(data.data.list[i].id))
			util.setInt(isd,sts[i],4);
			
		}
		
		
		
		
		
		  let listener = {
            onSuccess: config.onSuccess || function (res) { },
            onFail: config.onFail || function (res) { },
            onComplete: config.onComplete || function (res) { }
        };
        
        if( listener.onSuccess )
        {
		
            listener.onSuccess(data)
            
        }
        if( listener.onComplete )
        {
            listener.onComplete()
        }
		
    }
    
    
    
    
}
//更-多-源-码-联-系-Q:30-387-459-55