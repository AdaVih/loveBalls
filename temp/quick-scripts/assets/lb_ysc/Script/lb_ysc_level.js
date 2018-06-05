(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lb_ysc/Script/lb_ysc_level.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6d289+2tJxKzodr6lz8kOm+', 'lb_ysc_level', __filename);
// lb_ysc/Script/lb_ysc_level.js

'use strict';

var common = require('lb_ysc_common');
cc.Class({
    extends: cc.Component,

    properties: {
        select_level_bar: { //场景分类选择面板
            default: null,
            type: cc.Node
        },
        level_bar: { //场景关卡
            default: null,
            type: cc.Node
        },
        total_star: { //总星星
            default: null,
            type: cc.Node
        },
        selectLevels: {
            default: null,
            type: cc.Node
        },
        levels: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {},
    start: function start() {
        // common.sm.audio.play();
        // common.sm.audio.setCurrentTime(common.sm.audio_time||0);
        //加载资源
        this.loadRes();
    },
    loadRes: function loadRes() {
        var _this = this;

        cc.loader.loadRes('lb_ysc/prefab/lb_ysc_item', function (err, prefab) {
            _this.itemPrefab = prefab;
            cc.loader.loadRes('lb_ysc/prefab/lb_ysc_item2', function (err, prefab) {
                _this.item2Prefab = prefab;
                cc.loader.loadRes('lb_ysc/prefab/lb_ysc_list', function (err, prefab) {
                    _this.listPrefab = prefab;
                    _this.loadSceneDate();
                });
            });
        });
    },


    //读取场景数据
    loadSceneDate: function loadSceneDate() {

        this.level_page = [];
        this.levelPack();
    },


    //levels打包
    levelPack: function levelPack() {
        var _this2 = this;

        this.pageCount = Math.ceil(common.levels.length / 12); //计算有多少item
        var bar_width = Math.ceil(this.pageCount / 2) * cc.winSize.width; //计算bar长度
        this.select_level_bar.width = bar_width;
        cc.loader.loadRes('lb_ysc/prefab/lb_ysc_list2', function (err, prefab) {
            var list2 = cc.instantiate(prefab);
            list2.width = bar_width;
            _this2.select_level_bar.addChild(list2);

            _this2.load_item_count = 0;
            _this2.createLevelBarItem(list2);
            _this2.levelDate();
        });
    },


    //levelDate读取
    levelDate: function levelDate() {
        this.page_all = Math.ceil(common.levels.length / 6); //计算有多少item
        //this.level_bar.width = this.page_all * cc.winSize.width;
        this.page_load_index = 0;
        this.load_count = 0; //已经加载统计
        this.createLevelVessel();
    },


    //创建场景节点
    createItem: function createItem(bar) {
        this.load_count++;
        var item = cc.instantiate(this.itemPrefab);
        bar.addChild(item);
        item.on(cc.Node.EventType.TOUCH_START, function () {
            this.touch_star = 0;
            this.isTouch = true;
        }, this);
        item.on(cc.Node.EventType.TOUCH_END, function (e) {
            cc.audioEngine.playEffect(common.sm.audio_click, false);
            var par = e.target.parent.getSiblingIndex() * 6;
            var index = e.target.getSiblingIndex() + 1 + par;
            if (common.sm.ud.levels[index - 1].active) {
                common.sm.pageIndex = e.target.parent.getSiblingIndex();
                common.sm.loadLevel(index);
            }
        }, this);
        if (this.load_count == common.levels.length) {
            //表示加载完毕
            this.loadUserData();
        }
    },
    update: function update(dt) {
        if (this.isTouch) {
            this.touch_star++;
        }
    },


    //创建levels打包
    createLevelBarItem: function createLevelBarItem(bar, itemdate) {
        this.load_item_count++;

        if (this.load_item_count == this.pageCount) {
            var start = (this.load_item_count - 1) * 12 + 1;
            var end = common.levels.length;
        } else {
            var end = this.load_item_count * 12;
            var start = end - 12 + 1;
        }
        var star_count = (end - start + 1) * 3;
        var item = cc.instantiate(this.item2Prefab);
        var star = item.getChildByName('star').getChildByName('star_count').getComponent(cc.Label);
        var Skinpop_BG = item.getChildByName('Skinpop_BG');
        var img = Skinpop_BG.getChildByName('level_img'); //图片
        var mask = img.getChildByName('mask'); //遮罩
        var id = img.getChildByName('id').getComponent(cc.Label);
        star.string = 0 + '/' + star_count;
        id.string = start + '-' + end;
        bar.addChild(item);
        item.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.touch_star = 0;
            this.isTouch = true;
        }, this);
        item.on(cc.Node.EventType.TOUCH_END, this.goToLevels, this);
        if (this.pageCount == this.load_item_count) {
            return;
        } else {
            this.createLevelBarItem(bar);
        }
    },


    //创建level容器
    createLevelVessel: function createLevelVessel() {
        var list = cc.instantiate(this.listPrefab);
        list.width = cc.winSize.width;
        // list.x = this.page_load_index*cc.winSize.width;
        this.level_page.push(list);
        this.level_bar.addChild(list);

        this.page_load_index++;
        if (this.page_all == this.page_load_index) {
            var count = common.levels.length - this.load_count;
        } else {
            var count = 6;
        }
        for (var i = 0; i < count; i++) {
            this.createItem(list);
        }
        if (this.page_all == this.page_load_index) {
            return;
        } else {
            this.selectLevels.getComponent(cc.ScrollView).scrollToLeft(0.01);
            this.createLevelVessel();
        }
    },

    //读取用户数据
    loadUserData: function loadUserData() {
        var _this3 = this;

        var data = common.sm.ud;
        this.allLevelCombine();
        if (common.sm.isGameTb) {
            this.selectLevels.active = false;
            this.levels.active = true;
            if (common.sm.pageIndex != undefined) {
                console.log(common.sm.pageIndex);
                this.levels.getComponent(cc.PageView).setCurrentPageIndex(common.sm.pageIndex);
            }
        }

        if (data) {
            this.total_star.getComponent(cc.Label).string = this.getStarCount();
            if (this.alllevels) {
                data.levels.forEach(function (element, index) {
                    _this3.loadItem(_this3.alllevels[index], element);
                });
                //遍历集合
                var bar = this.select_level_bar.children[0].children;
                if (bar) {
                    bar.forEach(function (e, index) {
                        var i = index + 1;
                        if (i == bar.length) {
                            var start = (i - 1) * 12;
                            var end = common.levels.length;
                        } else {
                            var end = i * 12;
                            var start = end - 12;
                        }
                        var cur = data.levels.slice(start, end);
                        var Skinpop_BG = e.getChildByName('Skinpop_BG');
                        var img = Skinpop_BG.getChildByName('level_img'); //图片
                        var mask = img.getChildByName('mask'); //遮罩
                        var pass = img.getChildByName('pass'); //通过
                        var star = e.getChildByName('star').getChildByName('star_count').getComponent(cc.Label); //星星数量
                        var star_count = 0;
                        var all_star_count = 0;
                        var isPass = false;
                        var isMsak = false;
                        var count = 0;
                        cur.forEach(function (k, j) {
                            star_count += k.star;
                            if (k.active) {
                                isMsak = true;
                            }
                            if (k.pass) {
                                count++;
                            }
                            if (count == cur.length) {
                                isPass = true;
                            }
                            all_star_count += 3;
                        });
                        star.string = star_count + '/' + all_star_count;
                        mask.active = !isMsak;
                        pass.active = isPass;
                        var img_url = "lb_ysc/levels_img/lb_ysc_level" + cur[0].id;
                        cc.loader.loadRes(img_url, cc.SpriteFrame, function (err, tex) {
                            //var spriteFrame = new cc.SpriteFrame(tex);
                            if (tex) {
                                img.getComponent(cc.Sprite).spriteFrame = tex;
                                cc.loader.release(tex);
                            }
                        });
                    });
                }
            }
        }
        //添加敬请期待item
        this.addExpectation();
    },

    //添加敬请期待item
    addExpectation: function addExpectation() {
        var page = cc.instantiate(this.item2Prefab);
        this.select_level_bar.getChildByName('list2').addChild(page);
        var level = cc.instantiate(this.itemPrefab);
        if (common.sm.ud.levels.length % 12 == 0) {
            var level = cc.instantiate(this.listPrefab);
            this.level_bar.addChild(list);
            list.addChild(level);
        } else {
            var list = this.level_bar.children;
            if (list) {
                list[list.length - 1].addChild(level);
            }
        }
    },

    //把所有LEVEL合并为一个数组
    allLevelCombine: function allLevelCombine() {
        var _this4 = this;

        this.alllevels = [];
        var bars = this.level_bar.children;
        bars.forEach(function (element) {
            var list = element.children;
            list.forEach(function (element) {
                _this4.alllevels.push(element);
            });
        });
    },

    //为每个item读取数据
    loadItem: function loadItem(item, data) {
        var Skinpop_BG = item.getChildByName('Skinpop_BG');
        var img = Skinpop_BG.getChildByName('level_img'); //图片
        var mask = img.getChildByName('mask'); //遮罩
        var pass = img.getChildByName('pass'); //通过
        var id = img.getChildByName('id').getComponent(cc.Label); //id
        var star1 = item.getChildByName('star_bg1').getChildByName('star'); //星星
        var star2 = item.getChildByName('star_bg2').getChildByName('star'); //星星
        var star3 = item.getChildByName('star_bg3').getChildByName('star'); //星星
        mask.active = !data.active;
        pass.active = data.pass;
        id.string = data.id < 10 ? '0' + data.id : data.id;
        if (data.star >= 1) {
            star1.active = true;
        }
        if (data.star >= 2) {
            star2.active = true;
        }
        if (data.star >= 3) {
            star3.active = true;
        }
        var img_url = "lb_ysc/levels_img/lb_ysc_level" + data.id;
        cc.loader.loadRes(img_url, cc.SpriteFrame, function (err, tex) {
            //var spriteFrame = new cc.SpriteFrame(tex);
            if (tex) {
                img.getComponent(cc.Sprite).spriteFrame = tex;
                cc.loader.release(tex);
            }
        });
    },


    //计算获得的总星星数
    getStarCount: function getStarCount() {
        var star = 0;
        common.sm.ud.levels.forEach(function (e) {
            star += e.star;
        });
        return star;
    },

    //调到当前集合下
    goToLevels: function goToLevels(e) {
        cc.audioEngine.playEffect(common.sm.audio_click, false);
        console.log(e);
        this.isTouch = false;
        if (this.touch_star < 30) {
            this.selectLevels.active = false;
            this.levels.active = true;
            var index = e.target.getSiblingIndex();

            this.levels.getComponent(cc.PageView).setCurrentPageIndex(2 * index);
            //调到当前页
            // this.level_bar.x = page*cc.winSize.width;
        }
    },

    //返回关卡分组
    back: function back(e) {

        cc.audioEngine.playEffect(common.sm.audio_click, false);
        if (this.selectLevels.active) {
            cc.director.loadScene('lb_ysc_Opening');
        } else {
            common.sm.isGameTb = false;
            cc.director.loadScene('lb_ysc_select');
        }
    },
    share: function share() {
        common.sm.shareGame();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=lb_ysc_level.js.map
        