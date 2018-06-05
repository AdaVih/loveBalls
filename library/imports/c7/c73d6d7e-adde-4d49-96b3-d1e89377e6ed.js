"use strict";
cc._RF.push(module, 'c73d61+rd5NSZaz0eiTd+bt', 'lb_ysc_pen');
// lb_ysc/Script/lb_ysc_pen.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var common = require('lb_ysc_common');
cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        var collisionManager = cc.director.getCollisionManager();
        //开启碰撞检查系统
        collisionManager.enabled = true;
    },


    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('on collision enter');
        common.gm.isStop = true;
    },
    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function onCollisionExit(other, self) {
        console.log('on collision exit');
        if (common.gm.points.length == 0) {
            var world = self.world;
            var p = world.position;
            console.log('p:', p);
            common.gm.objOutP = cc.p(p.x, p.y);
            common.gm.isStop = false;
        }
    }
});

cc._RF.pop();