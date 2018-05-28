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
        this.ud = common.getUserDate();
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
    
    
});
