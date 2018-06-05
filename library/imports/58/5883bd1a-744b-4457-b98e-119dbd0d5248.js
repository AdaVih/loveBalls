"use strict";
cc._RF.push(module, '5883b0adEtEV7mOEZ29DVJI', 'lb_ysc_boy');
// lb_ysc/Script/lb_ysc_boy.js

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

    onLoad: function onLoad() {},
    start: function start() {},


    // update (dt) {},


    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {

        if (otherCollider.node.name == 'gril') {
            if (common.gm.isWin == false) {
                common.gm.isWin = true;
                cc.audioEngine.playEffect(common.sm.audio_win, false);
                var points = contact.getWorldManifold().points[0];
                common.gm.circleShow(points);
            }
        }
    }

});

cc._RF.pop();