// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var common = require('lb_common');
cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        common.sm = this;
        this.isGameTb = false;//是否从游戏进入
        cc.game.addPersistRootNode(this.node);
        this.ud = this.getUserDate();
        console.log(this.ud);
    },
    loadLevel(index){
        if(index > common.levels.length){
            console.log('最后一关');
            return;
        }
        this.levelIndex = index;
        cc.director.loadScene('lb_level'+index);
    },
    // update (dt) {},
    
    getUserDate:function(){//获取用户数据
        
        


        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            try {
                var data = JSON.parse(wx.getStorageSync('lb_userdate'));
            } catch (e) {
                console.log("用户数据获取出错!");    
            }
        }else{
            var data = JSON.parse(window.localStorage.getItem('lb_userdate'));
        }
        if(data == null){//如果为空返回默认数据，并保存
            data = common.userDate;
            data.levels = common.levels;
            this.setUserDate(data);
        }
        var l = data.levels.length;
        var i = common.levels.length - l;
        if(i>0){
            for(var k=0; k<i; k++){
                data.levels.push(common.levels[l+k]);
            }
        }
        console.log(data);
        return data;
    },
    setUserDate:function(data){//保存用户数据
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            try {
                wx.setStorageSync('lb_userdate', JSON.stringify(data));
            } catch (e) {
                console.log("用户数据保存出错!");    
            }
        }else{
            window.localStorage.setItem('lb_userdate',JSON.stringify(data));
        }
        
    }
    
});
