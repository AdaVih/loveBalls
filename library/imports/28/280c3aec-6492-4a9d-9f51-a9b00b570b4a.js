"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'lb_ysc_gameManager');
// lb_ysc/Script/lb_ysc_gameManager.js

"use strict";

var common = require('lb_ysc_common');
cc.Class({
    extends: cc.Component,

    properties: {
        id: 1,
        get_star3: 0,
        get_star2: 0,
        account_ui: {
            default: null,
            type: cc.Node
        },
        back: { //返回
            default: null,
            type: cc.Node
        },
        refresh: { //重来
            default: null,
            type: cc.Node
        },
        help: { //帮助
            default: null,
            type: cc.Node
        },
        h_center: { //墨水
            default: null,
            type: cc.Node
        },
        level_node: {
            default: null,
            type: cc.Node
        },

        schedule_bar: {
            default: null,
            type: cc.Node
        },
        schedule_bar_1: {
            default: null,
            type: cc.Node
        },
        schedule_bar_2: {
            default: null,
            type: cc.Node
        },
        gameTip: {
            default: null,
            type: cc.Node
        },
        expect: {
            default: null,
            type: cc.Node
        },
        winParlicle: {
            default: null,
            type: cc.Node
        },
        ScreenShotPop: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // common.sm.audio.play();
        // common.sm.audio.setCurrentTime(common.sm.audio_time||0);

        this.isWin = false;
        this.score = 100, //得分
        this.starCount = 1; //获得的星星
        this.level = common.sm.levelIndex; //关卡索引关卡索引
        this.isDraw = true; //绘制开关
        this.isStop = false; //是否要停止绘制
        this.points = []; //绘制的数组
        this.objOutP = null; //从物体出来的点
        this.one = true;
        cc.director.setDisplayStats(false);
        //.开启物理系统
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        //physicsManager.debugDrawFlags = true;
        // 设置绘制标志位为 0，即可以关闭绘制。
        // cc.director.getPhysicsManager().debugDrawFlags = 1;


        var collisionManager = cc.director.getCollisionManager();
        //开启碰撞检查系统
        collisionManager.enabled = true;
        common.gm = this;

        //提示开关
        this.isTip = true;
        //加载资源

        this.loadRes();
    },
    start: function start() {
        this.schedule_bar_1.x = this.schedule_bar.width * (this.get_star3 / 100);
        this.schedule_bar_2.x = this.schedule_bar.width * (this.get_star2 / 100);
        this.schedule_bar_1.active = true;
        this.schedule_bar_2.active = true;
    },

    //加载资源
    loadRes: function loadRes() {
        var _this = this;

        //加载星星
        cc.loader.loadRes("lb_ysc/prefab/lb_ysc_star", function (err, prefab) {
            _this.starPrefab = prefab;
        });
        //消散星星
        cc.loader.loadRes("lb_ysc/prefab/lb_ysc_star_low", function (err, prefab) {
            _this.star_lowPrefab = cc.instantiate(prefab);
        });
    },


    //下一关
    naxtLevel: function naxtLevel() {
        cc.audioEngine.playEffect(common.sm.audio_click, false);
        if (common.sm.isHelp == false) {
            var index = this.level + 1;
        } else {
            var index = 1;
            common.sm.isHelp = false;
        }
        if (index > common.sm.ud.levels.length) {
            //this.backLevel();
            this.expectPopShow();
        } else {
            console.log(index);
            common.sm.loadLevel(index);
        }
    },

    //返回关卡
    backLevel: function backLevel() {
        common.sm.isGameTb = true;
        common.sm.isHelp = false;
        cc.director.loadScene('lb_ysc_select');
        cc.audioEngine.playEffect(common.sm.audio_click, false);
    },

    //分享
    share: function share() {
        cc.audioEngine.playEffect(common.sm.audio_click, false);
        if (common.sm.isWx) {
            this.ScreenShot2('share');
        }
    },

    //重加载
    reLoad: function reLoad() {
        cc.audioEngine.playEffect(common.sm.audio_click, false);
        common.sm.loadLevel(this.level);
    },


    // called every frame
    update: function update(dt) {},

    //游戏胜利
    win: function win() {
        console.log('you win!');
        if (common.gm.isWin && common.gm.one) {
            common.gm.one = false;
            common.gm.isDraw = false;
            common.gm.ganmeCount();
            this.overUi('win');
        }
    },

    //失败
    lose: function lose() {
        common.gm.isDraw = false;
        this.overUi('lose');
        cc.audioEngine.playEffect(common.sm.audio_gameover, false);
    },

    //结束UI
    overUi: function overUi(name, tex) {

        //this.s_img = this.screenShoot();
        this.account_ui.active = true;
        this.help.active = false; //隐藏帮助按钮
        this.h_center.active = false; //隐藏墨水内容
        this.back.color = { r: '255', g: '255', b: '255', a: '255' }; //返回按钮白色
        this.refresh.color = { r: '255', g: '255', b: '255', a: '255' }; //重玩按钮白色
        this.win_ui = this.account_ui.getChildByName(name);
        var img_bar = this.win_ui.getChildByName('img_bar').getChildByName('img').getComponent(cc.Sprite);

        // if(common.sm.isWx){
        //     if(this.savedFilePath){
        //         img_bar.spriteFrame.setTexture(tex);
        //     }
        // }else{
        //     img_bar.spriteFrame = this.s_img;
        //     // 翻转得到的纹理
        //     var action = cc.flipY(true);
        //     img_bar.node.runAction(action);
        // }
        this.win_ui.active = true;
        var level_index = this.win_ui.getChildByName('img_bar').getChildByName('level_index').getComponent(cc.Label);
        var level = this.level < 10 ? '0' + this.level : this.level;
        level_index.string = level;
        if (this.isWin) {
            this.starShow();
            if (this.isWin && common.sm.isHelp == false) {
                //更新保存用户数据
                var i = common.gm.level - 1;
                if (common.sm.ud.levels[i].star < common.gm.starCount) {
                    common.sm.ud.levels[i].star = common.gm.starCount;
                }
                common.sm.ud.levels[i].pass = true;
                if (common.sm.ud.levels[i + 1]) {
                    common.sm.ud.levels[i + 1].active = true;
                }
                //common.sm.ud.levels[i].img = this.savedFilePath||'';
                common.sm.setUserDate(common.sm.ud);
            }
            // if(common.sm.isHelp){//显示炫耀按钮
            //     this.win_ui.getChildByName('next').active = false;
            //     this.win_ui.getChildByName('tell_hi').active = true;
            // }
        }
    },

    //游戏结算
    ganmeCount: function ganmeCount() {
        if (this.score >= this.get_star3) {
            this.starCount = 3;
        } else if (this.score >= this.get_star2) {
            this.starCount = 2;
        } else {
            this.starCount = 1;
        }
    },
    ScreenShot1: function ScreenShot1(name) {
        console.log("========开始截屏============");
        // var level = this.node;
        var level = this.node.getChildByName('environment').getChildByName('level');
        //.可以把this.node从(0,0)到(width, height)截取到模拟器目录%CocosCreator%\resources\cocos2d-x\simulator\win32下的1.png。你要截全屏的话把这段代码挂在场景根节点下就可以了。
        //.RenderTexture扩展的是cc.Node，你也可以setPosition去截屏幕的不同部分。
        var render = new cc.RenderTexture.create(cc.director.getVisibleSize().width, cc.director.getVisibleSize().height * 0.1);
        level._sgNode.addChild(render);
        render.setVisible(false);
        render.begin();
        level._sgNode.visit();
        render.end();
        // 获取SpriteFrame
        var nowFrame = render.getSprite().getSpriteFrame();
        // render.saveToFile("screenShot"+this.level+".png",cc.ImageFormat.PNG, true, function () {
        //     render.removeFromParent();
        //     cc.log("capture screen successfully!");
        // });
        //打印截图路径
        // cc.log(jsb.fileUtils.getWritablePath());
        //console.log(render);
        this.s_img = nowFrame;
        return nowFrame;
    },
    ScreenShot2: function ScreenShot2(name) {
        var _this2 = this;

        console.log("========开始截屏============");

        var canvas = cc.game.canvas;
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        canvas.toTempFilePath({
            x: 0,
            y: 0,
            width: width,
            height: height,
            destWidth: width,
            destHeight: height,
            complete: function complete(res) {
                console.log(res);
                if (res.tempFilePath) {
                    console.log("缓存路径：" + res.tempFilePath);
                    _this2.savedFilePath = res.tempFilePath;

                    //this.saveImg(res.tempFilePath,name);
                    // cc.loader.load(res.tempFilePath, (err, tex)=>{
                    //this.overUi(name,tex);                 
                    // });
                    if (name) {
                        var txt = Math.floor(Math.random() * common.shareTip.length);
                        wx.shareAppMessage({
                            title: common.shareTip[txt],
                            imageUrl: _this2.savedFilePath || ''
                        });
                    } else {
                        //好友求助
                        // var tex = new cc.Texture2D();
                        // tex.initWithElement(canvas);
                        // tex.handleLoadedTexture();
                        // var spriteFrame = new cc.SpriteFrame(tex);
                        // //var spriteFrame = this.ScreenShot1();
                        // this.ScreenShotPop.getChildByName("img").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        // var action = cc.flipY(true);
                        // this.ScreenShotPop.getChildByName("img").runAction(action);
                        // this.ScreenShotPop.active = true;
                        // var ani = this.ScreenShotPop.getComponent(cc.Animation);
                        // ani.play();
                        // ani.on("finished",function(){
                        //     this.ScreenShotPop.active = false;
                        //     wx.shareAppMessage({
                        //         title:'猫咪爱情大作战，第'+common.gm.level+'关，大神帮帮ta！',
                        //         imageUrl:this.savedFilePath||'',
                        //         query:"level="+this.level
                        //     });
                        // },this);
                        wx.shareAppMessage({
                            title: '猫咪爱情大作战，第' + common.gm.level + '关，大神帮帮ta！',
                            imageUrl: _this2.savedFilePath || '',
                            query: "level=" + _this2.level
                        });
                    }
                }
            }
        });
    },

    //保存截图 
    saveImg: function saveImg(url, name) {
        var _this3 = this;

        console.log(url);
        if (common.sm.isWx) {
            var fileSystemManager = wx.getFileSystemManager();
            fileSystemManager.saveFile({
                tempFilePath: url,
                complete: function complete(res) {
                    console.log(res);
                    _this3.savedFilePath = res.savedFilePath;

                    if (_this3.savedFilePath) {
                        cc.loader.load(_this3.savedFilePath, function (err, tex) {
                            _this3.overUi(name, tex);
                        });
                    } else {
                        console.log("截图保存失败！");
                        cc.loader.load(url, function (err, tex) {
                            _this3.overUi(name, tex);
                        });
                    }
                    if (_this3.isWin) {
                        //更新保存用户数据
                        var i = common.gm.level - 1;
                        if (common.sm.ud.levels[i].star < common.gm.starCount) {
                            common.sm.ud.levels[i].star = common.gm.starCount;
                        }
                        common.sm.ud.levels[i].pass = true;
                        if (common.sm.ud.levels[i + 1]) {
                            common.sm.ud.levels[i + 1].active = true;
                        }
                        if (common.sm.ud.levels[i].img.length > 5) {
                            wx.removeSavedFile({
                                filePath: common.sm.ud.levels[i].img,
                                complete: function complete(res) {}
                            });
                        };
                        common.sm.ud.levels[i].img = _this3.savedFilePath || '';
                        common.sm.setUserDate(common.sm.ud);
                    }
                }
            });
        }
    },


    //星星显示
    starShow: function starShow() {
        var _this4 = this;

        var star = cc.instantiate(this.starPrefab);
        this.win_ui.getChildByName('win_star_1').addChild(star);
        cc.audioEngine.playEffect(common.sm.audio_star, false);
        setTimeout(function () {
            if (_this4.starCount >= 2) {
                var star = cc.instantiate(_this4.starPrefab);
                _this4.win_ui.getChildByName('win_star_2').addChild(star);
                cc.audioEngine.playEffect(common.sm.audio_star, false);
                if (_this4.starCount == 3) {
                    setTimeout(function () {
                        var star = cc.instantiate(_this4.starPrefab);
                        _this4.win_ui.getChildByName('win_star_3').addChild(star);
                        cc.audioEngine.playEffect(common.sm.audio_star, false);
                    }, 500);
                }
            }
        }, 500);
    },

    //显示圈圈
    circleShow: function circleShow(point) {
        var _this5 = this;

        cc.director.getPhysicsManager().enabled = false;
        if (this.isWin) {
            var p = this.winParlicle.convertToNodeSpaceAR(point);
            this.winParlicle.x = p.x;
            this.winParlicle.y = p.y;
            this.winParlicle.active = true;
        }

        cc.loader.loadRes("lb_ysc/prefab/lb_ysc_ads_quan", function (err, prefab) {
            var ads_quan = cc.instantiate(prefab);
            ads_quan.width = cc.winSize.width * 2;
            ads_quan.height = ads_quan.width;
            ads_quan.x = point.x;
            ads_quan.y = point.y;
            var abs_anim = ads_quan.getComponent(cc.Animation);
            abs_anim.on('finished', function () {
                ads_quan.removeFromParent();
                if (this.isWin) {
                    this.win();
                } else {
                    this.lose();
                }
            }, _this5);
            cc.director.getScene().addChild(ads_quan);
        });
    },

    //tip
    tip: function tip() {
        if (common.gm.isTip) {
            cc.audioEngine.playEffect(common.sm.audio_click, false);
            common.gm.isTip = false;
            var tip = common.gm.gameTip;
            if (tip) {
                tip.active = true;
                setTimeout(function () {
                    tip.active = false;
                    common.gm.isTip = true;
                }, 500);
            } else {
                common.gm.isTip = true;
            }
        }
    },
    expectPopShow: function expectPopShow() {
        this.expect.active = true;
    },

    //求助
    helpMe: function helpMe() {
        if (common.sm.isWx) {
            this.ScreenShot2();
        }
    },

    //告诉好友
    tellHi: function tellHi() {
        wx.shareAppMessage({
            title: '猫咪爱情大作战，看看吧，这游戏应该这样玩！',
            imageUrl: common.gm.savedFilePath || ''
        });
    }
});

cc._RF.pop();