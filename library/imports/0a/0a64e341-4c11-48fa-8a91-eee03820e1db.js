"use strict";
cc._RF.push(module, '0a64eNBTBFI+oqR7uA4IOHb', 'lb_ysc_sceneManager');
// lb_ysc/Script/lb_ysc_sceneManager.js

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

    properties: {
        maxLenght: 0, //墨水值
        isSound: true,
        isSoundEffect: true,
        audio_bg: {
            url: cc.AudioClip,
            default: null
        },
        audio_enter: {
            url: cc.AudioClip,
            default: null
        },
        audio_gameover: {
            url: cc.AudioClip,
            default: null
        },
        audio_win: {
            url: cc.AudioClip,
            default: null
        },
        audio_star: {
            url: cc.AudioClip,
            default: null
        },
        audio_write: {
            url: cc.AudioClip,
            default: null
        },
        audio_popbox: {
            url: cc.AudioClip,
            default: null
        },
        audio_click: {
            url: cc.AudioClip,
            default: null
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        common.sm = this;
        //this.isGameTb = false;//是否从游戏进入
        cc.game.addPersistRootNode(this.node);
        this.isWx = this.sysWx();
        this.levelIndex = 1;
        this.isHelp = false;
        this.ud = this.getUserDate();
        this.audio_effect = this.node.getComponent(cc.AudioSource);
        this.playAudioId = null;
    },

    //小游戏启动入口
    onLaunch: function onLaunch() {
        if (this.isWx) {
            var res = wx.getLaunchOptionsSync();
            console.log(res);
            if (res.query) {

                if (res.query.level) {
                    this.isHelp = true;
                    this.loadLevel(parseInt(res.query.level));
                }
            }
        }
    },
    sysWx: function sysWx() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            //1.显示当前页面的转发按钮
            wx.showShareMenu({ withShareTicket: true });
            //2.监听:分享接口 
            var index = Math.floor(Math.random() * 3 + 1);
            var txt = Math.floor(Math.random() * common.shareTip.length);
            var url = "lb_ysc/lb_ysc_df" + index;
            cc.loader.loadRes(url, function (err, data) {
                wx.onShareAppMessage(function (res) {
                    return {
                        title: common.shareTip[txt],
                        imageUrl: data.url,
                        success: function success(res) {
                            console.log(res);
                        },
                        fail: function fail(res) {
                            console.log(res);
                        }
                    };
                });
            });
            return true;
        } else {
            return false;
        }
    },
    loadLevel: function loadLevel(index) {
        if (index > common.levels.length) {
            console.log('最后一关');
            return;
        }
        this.levelIndex = index;
        cc.director.loadScene('lb_ysc_level');
    },

    // update (dt) {},

    //音效播放
    audioEffectPlay: function audioEffectPlay(name) {
        if (this.isSoundEffect) {
            this.audio_effect.clip = name;
            this.audio_effect.play();
        }
    },


    getUserDate: function getUserDate() {
        //获取用户数据

        // if (this.isWx) {
        //     try {
        //         var data = JSON.parse(wx.getStorageSync('lb_userdate'));
        //     } catch (e) {
        //         console.log("用户数据获取出错!");    
        //     }
        // }else{
        //     var data = JSON.parse(window.localStorage.getItem('lb_userdate'));
        // }
        var data = cc.sys.localStorage.getItem("lb_ysc_userdate");
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.log(e);
        }
        console.log("data:", data);
        if (data == null || data == '') {
            //如果为空返回默认数据，并保存
            data = common.userDate;
            data.levels = common.levels;
            this.setUserDate(data);
        }
        var l = data.levels.length;
        var i = common.levels.length - l;
        if (i > 0) {
            for (var k = 0; k < i; k++) {
                data.levels.push(common.levels[l + k]);
            }
        }
        console.log(data);

        return data;
    },
    setUserDate: function setUserDate(data) {
        //保存用户数据
        cc.sys.localStorage.setItem("lb_ysc_userdate", JSON.stringify(data));
        // if (this.isWx) {
        //     try {
        //         wx.setStorageSync('lb_userdate', JSON.stringify(data));
        //     } catch (e) {
        //         console.log("用户数据保存出错!");    
        //     }
        // }else{
        //     window.localStorage.setItem('lb_userdate',JSON.stringify(data));
        // }
    },
    goToSelects: function goToSelects() {
        cc.director.loadScene('lb_ysc_select');
    },
    shareGame: function shareGame() {
        if (common.sm.isWx) {
            var index = Math.floor(Math.random() * 3 + 1);
            var txt = Math.floor(Math.random() * common.shareTip.length);
            var url = "lb_ysc/lb_ysc_df" + index;

            cc.loader.loadRes(url, function (err, data) {
                console.log(data.url);
                wx.shareAppMessage({
                    title: common.shareTip[txt],
                    imageUrl: data.url
                });
            });
        }
    },

    //双双返回
    homeBack: function homeBack() {
        cc.director.loadScene('common'); //返回
    }
});

cc._RF.pop();