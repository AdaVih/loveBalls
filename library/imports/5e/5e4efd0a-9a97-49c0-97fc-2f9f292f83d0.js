"use strict";
cc._RF.push(module, '5e4ef0KmpdJwJf8L58pL4PQ', 'lb_ysc_opening');
// lb_ysc/Script/lb_ysc_opening.js

'use strict';

var common = require('lb_ysc_common');
cc.Class({
    extends: cc.Component,

    properties: {
        laya: {
            default: null,
            type: cc.Node
        },
        audio_enter: {
            url: cc.AudioClip,
            default: null
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        if (common.sm) {
            if (common.sm.playAudioId != null) {
                cc.audioEngine.stop(common.sm.playAudioId);
            }
        }

        var laya_box = this.node.getChildByName('laya');
        var OpenAnimation = laya_box.getComponent(cc.Animation);

        var start_box = this.node.getChildByName('start-btn').getChildByName("Label");
        var startAnimation = start_box.getComponent(cc.Animation);

        var top_box = this.node.getChildByName('top');
        var topAnimation = top_box.getComponent(cc.Animation);

        var share_box = this.node.getChildByName('share-btn');
        var shareAnimation = share_box.getComponent(cc.Animation);

        cc.audioEngine.playEffect(this.audio_enter, false);
        OpenAnimation.play('lb_ysc_one');
        OpenAnimation.on('finished', function () {

            topAnimation.play('lb_ysc_top');
            start_box.active = share_box.active = true;
            startAnimation.play('lb_ysc_fade');
            shareAnimation.play('lb_ysc_fade2');
            common.sm.playAudioId = cc.audioEngine.playEffect(common.sm.audio_bg, true);
            if (common.gm == null) {
                common.sm.onLaunch();
            }
        });
    },
    toSelect: function toSelect() {
        cc.director.loadScene('lb_ysc_select');
    },
    share: function share() {
        common.sm.shareGame();
    }

    // update (dt) {},

});

cc._RF.pop();