(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lb_ysc/Script/lb_ysc_graphics.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1dc3bK/2cRMgYfNGviOv13Z', 'lb_ysc_graphics', __filename);
// lb_ysc/Script/lb_ysc_graphics.js

'use strict';

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    properties: (_properties = {
        maxLenght: 0,
        scor_star1: { //分数星星1
            default: null,
            type: cc.Node
        },
        scor_star2: { //分数星星2
            default: null,
            type: cc.Node
        },
        scor_star3: { //分数星星3
            default: null,
            type: cc.Node
        },
        Canvas: {
            default: null,
            type: cc.Node
        },
        pen: {
            default: null,
            type: cc.Node
        },
        score_text: {
            default: null,
            type: cc.Node
        }
    }, _defineProperty(_properties, 'score_text', {
        default: null,
        type: cc.Node
    }), _defineProperty(_properties, 'schedule_bar', {
        default: null,
        type: cc.Node
    }), _properties),

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //common.gm.loadLevel(common.sm.levelIndex);
        this.maxLenght = common.sm.maxLenght;
    },
    start: function start() {
        var _this = this;

        //加载关卡
        var index = common.gm.level;
        if (index == 1) {
            this.pen.active = true;
        }
        var url = "lb_ysc/levels/lb_ysc_level" + index;
        cc.loader.loadRes(url, function (err, prefab) {
            if (prefab) {
                var level = cc.instantiate(prefab);
                common.gm.level_node.addChild(level);
                common.gm.boyRigidBody = level.getChildByName('boy');
                common.gm.grilRigidBody = level.getChildByName('gril');
                common.gm.gameTip = level.getChildByName('tip');
                _this.init();
            }
        });
    },
    update: function update(dt) {

        if (this.pen_speed > 0) {

            this.pen_speed--;
            if (this.pen_speed < 0) {
                this.pen_speed = 0;
            }
            if (this.penState) this.penState.speed = this.pen_speed;
        }
    },
    init: function init() {
        this.drawLenght = 0;

        this.event_id = null;
        this.is_scor_star1 = true;
        this.is_scor_star2 = true;
        this.is_scor_star3 = true;
        //画笔速度
        this.pen_speed = 0;
        //分数
        this.score = this.score_text.getComponent(cc.Label);
        this.score_val = parseInt(this.score.string);
        //进度
        this.schedule_val = this.schedule_bar.width;
        //.绘图组件
        this.graphics = this.getComponent(cc.Graphics);

        this.boyRigidBody = common.gm.boyRigidBody.getComponent(cc.RigidBody);
        this.grilRigidBody = common.gm.grilRigidBody.getComponent(cc.RigidBody);
        this.boyRigidBody.gravityScale = 5;
        this.grilRigidBody.gravityScale = 5;

        //.触摸事件
        this.event_id = common.sm.event_id;
        this.Canvas.on(cc.Node.EventType.TOUCH_START, this.touchStar, this);
        this.Canvas.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.Canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.pen.active = false;
            // if(common.gm.isStop == false){
            //     var p2 = this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(event.getLocation()));
            //     this.curpoint.push(cc.p(p2));
            // }
            //if(this.event_id != event.getID()){return;}
            if (this.event_id != event.getID()) {
                return;
            }
            this.event_id = null;
            this.touchEnd();
        }, this);
        this.Canvas.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.pen.active = false;
            // if(common.gm.isStop == false){
            //     var p2 = this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(event.getLocation()));
            //     this.curpoint.push(cc.p(p2));
            // }
            //if(this.event_id != event.getID()){return;}
            if (this.event_id != event.getID()) {
                return;
            }
            this.event_id = null;
            this.touchEnd();
        }, this);

        this.direction = 0; //方向
        //分段数组pointbox
        this.pointbox = [];
    },
    addPolygonCollider: function addPolygonCollider(points) {
        if (points.length > 1) {
            try {
                var p1 = points[0];
                var p2 = points[points.length - 1];
                var d = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
                if (d > 4) {
                    var p_collider = this.boxNode.addComponent(cc.PhysicsPolygonCollider); //.PhysicsChainCollider
                    p_collider.points = points;
                    p_collider.apply();
                }
            } catch (e) {}
        }
    },
    addCollider: function addCollider(points) {
        var _this2 = this;

        if (this.pointbox.length > 0) {
            this.boxNode = new cc.Node();
            var rigidbody = this.boxNode.addComponent(cc.RigidBody);
            rigidbody.type = cc.RigidBodyType.Dynamic;
            rigidbody.gravityScale = 10;

            // var collider = this.boxNode.addComponent(cc.PhysicsPolygonCollider);//.PhysicsChainCollider
            // collider.points = points2;
            // collider.apply();
            if (this.pointbox) {
                this.pointbox.forEach(function (element, index) {
                    _this2.addPolygonCollider(element);
                });
            }

            var graphics = this.boxNode.addComponent(cc.Graphics);
            graphics.lineWidth = 6;
            graphics.strokeColor = cc.hexToColor('#0000ff');

            for (var i = 0; i < points.length; i++) {
                if (i == 0) {
                    graphics.moveTo(this.startPos.x, this.startPos.y);
                }
                graphics.lineTo(points[i].x, points[i].y);
            }
            graphics.stroke();
            this.boxNode.group = "lb_ysc_line";
            common.gm.level_node.addChild(this.boxNode);
            this.pointbox = [];
        }
    },


    //绘制开始
    touchStar: function touchStar(event) {
        console.log("touchStar:", event.getID());
        if (this.event_id == null) {
            this.event_id = event.getID();
        } else {
            if (this.event_id != event.getID()) {
                return;
            }
        }
        //if(this.event_id != event.getID()){return;}

        if (common.gm.isDraw) {
            common.gm.isStop = false;
            this.graphics.strokeColor = new cc.Color(0, 0, 0);
            this.startPos = this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(event.getLocation()));

            this.pen.x = this.startPos.x;
            this.pen.y = this.startPos.y;
            this.pen.active = true;
            common.gm.gameTip.active = false;
            this.pen.getComponent(cc.Animation).stop();
            this.penState = this.pen.getComponent(cc.Animation).play("lb_ysc_penAnim");
            common.gm.points = [];
            //临时点数组
            this.curpoint = [];
            this.curpoint.push(cc.p(this.startPos.x, this.startPos.y));
            this.graphics.moveTo(this.startPos.x, this.startPos.y);
        }
    },


    //绘制中
    touchMove: function touchMove(event) {
        //if(this.event_id != event.getID()){return;}
        //if(event._touches.length>1){return;}
        if (this.event_id != event.getID()) {
            return;
        }
        if (common.gm.isDraw) {
            var p1 = this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(event.getPreviousLocation()));
            var p2 = this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(event.getLocation()));

            //画笔跟随
            this.pen.x = p2.x;
            this.pen.y = p2.y;

            if (this.pen_speed < 2) {
                this.pen_speed += 2;
            }

            if (common.gm.isStop == false) {
                var rayresults = cc.director.getPhysicsManager().rayCast(cc.p(this.Canvas.parent.convertToWorldSpaceAR(event.getPreviousLocation())), cc.p(this.Canvas.parent.convertToWorldSpaceAR(event.getLocation())), cc.RayCastType.Any);
                //var cur_dir = this.GetSlideDirection(p1.x, p1.y, p2.x, p2.y);
                if (rayresults.length > 0) {
                    common.gm.isStop = true;
                } else {
                    if (common.gm.objOutP) {
                        var p = this.node.convertToNodeSpaceAR(common.gm.objOutP);
                        this.curpoint = [];
                        this.curpoint.push(cc.p(p.x, p.y));
                        common.gm.points.push(cc.p(p));
                        this.startPos = p;
                        common.gm.objOutP = null;
                    }
                }
                if (common.gm.isStop) {
                    var ray = rayresults[0].point;
                    var cur_p = this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(ray));
                } else {
                    var cur_p = p2;
                }
                // if(this.direction == 0){
                //     this.direction = cur_dir;
                // }
                var d = Math.sqrt((p1.x - cur_p.x) * (p1.x - cur_p.x) + (p1.y - cur_p.y) * (p1.y - cur_p.y));
                this.drawLenght += d;
                this.score_val = parseInt((1 - this.drawLenght / this.maxLenght) * 100);
                if (this.score_val <= 0) {
                    this.score_val = 0;
                    //游戏结束
                    // cc.director.getPhysicsManager().enabled = false;
                    // common.gm.lose();
                    common.gm.isDraw = false;
                    this.pen.active = false;
                    this.touchEnd();
                }
                this.score.string = this.score_val + "%";
                common.gm.score = this.score_val;
                this.schedule_bar.width = this.schedule_val * (this.score_val / 100);
                this.starUp();
                if (this.curpoint.length > 1) {
                    this.incisionLine([cc.p({ x: p1.x + 1, y: p1.y + 1 }), cc.p({ x: cur_p.x + 1, y: cur_p.y + 1 })]);
                    this.incisionLine(this.curpoint);
                    this.curpoint = [];
                }
                if (common.sm.audio_effect.isPlaying == false) {
                    common.sm.audioEffectPlay(common.sm.audio_write);
                }
                if (this.curpoint.length == 1) {
                    var cur_p1 = this.curpoint[0];
                    var cur_d = Math.sqrt((cur_p1.x - cur_p.x) * (cur_p1.x - cur_p.x) + (cur_p1.y - cur_p.y) * (cur_p1.y - cur_p.y));
                    if (cur_d > 3) {
                        this.curpoint.push(cc.p(cur_p));
                    }
                } else {
                    this.curpoint.push(cc.p(cur_p));
                }
                common.gm.points.push(cc.p(cur_p));
                this.graphics.strokeColor = cc.hexToColor('#000000');
                this.graphics.lineTo(cur_p.x, cur_p.y);
                this.graphics.stroke();
                this.graphics.moveTo(cur_p.x, cur_p.y);
            } else {
                this.graphics.strokeColor = cc.hexToColor('#ff0000');
                this.graphics.lineTo(p2.x, p2.y);
                this.graphics.stroke();
                this.graphics.moveTo(p2.x, p2.y);
            }
        }
    },

    //绘制结束
    touchEnd: function touchEnd() {
        // this.points.push(this.startPos)
        // this.addPolygonCollider(this.points)

        this.incisionLine(this.curpoint);
        this.addCollider(common.gm.points);
        this.pen.active = false;
        this.graphics.clear();
        common.gm.points = [];
        this.pointbox = [];
        this.curpoint = [];
        this.boyRigidBody.type = cc.RigidBodyType.Dynamic;
        this.grilRigidBody.type = cc.RigidBodyType.Dynamic;
    },


    //星星更新
    starUp: function starUp() {
        if (this.is_scor_star1) {
            if (this.score_val <= common.gm.get_star3) {
                this.starHide(this.scor_star1);
                this.is_scor_star1 = false;
            }
        }
        if (this.is_scor_star2) {
            if (this.score_val <= common.gm.get_star2) {
                this.starHide(this.scor_star2);
                this.is_scor_star2 = false;
            }
        }
        if (this.is_scor_star3) {
            if (this.score_val <= common.gm.get_star1) {
                this.starHide(this.scor_star1);
                this.is_scor_star3 = false;
            }
        }
    },

    //星星消散
    starHide: function starHide(star) {
        var ani = star.getComponent(cc.Animation);
        ani.on('finished', function () {
            var star_low = cc.instantiate(common.gm.star_lowPrefab);
            star_low.x = star.x;
            star_low.y = star.y;
            star.parent.addChild(star_low);
        }, this);
        ani.play();
    },
    GetSlideAngle: function GetSlideAngle(dx, dy) {

        return Math.atan2(dy, dx) * 180 / Math.PI;
    },


    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动 

    GetSlideDirection: function GetSlideDirection(startX, startY, endX, endY) {

        var dy = endY - startY;

        var dx = endX - startX;

        var result = 0;

        //如果滑动距离太短 

        // if(Math.abs(dx) < 1 && Math.abs(dy) < 1) { 

        //     return this.direction; 

        // } 

        var angle = this.GetSlideAngle(dx, dy);

        if (angle >= -45 && angle < 45) {

            result = 4;
        } else if (angle >= 45 && angle < 135) {

            result = 1;
        } else if (angle >= -135 && angle < -45) {

            result = 2;
        } else if (angle >= 135 && angle <= 180 || angle >= -180 && angle < -135) {

            result = 3;
        }

        return result;
    },


    //分段切割并做包围盒子
    incisionLine: function incisionLine(curpoint) {
        var addx = 0;
        var addy = 0;
        var rex = 0;
        var rey = 0;

        if (curpoint.length > 1) {
            var p1 = curpoint[0];
            var p2 = curpoint[curpoint.length - 1];
            var d = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
            if (d > 2) {
                //var next_p = curpoint[curpoint.length-1];
                this.direction = this.GetSlideDirection(p1.x, p1.y, p2.x, p2.y);
                if (this.direction == 1 || this.direction == 2) {
                    //竖线
                    addx = 6;
                    rex = -3;
                }
                if (this.direction == 3 || this.direction == 4) {
                    //横线
                    addy = -6;
                    rey = 3;
                }

                for (var i = curpoint.length - 1; i >= 0; i--) {
                    curpoint[i].y += rey;
                    curpoint[i].x += rex;
                }
                //点的剔除

                // for(var i=0; i<curpoint.length; i++){
                //     if(i != 0 && i!=curpoint.length){
                //         var n_p = curpoint[i-1];
                //         var t_p = curpoint[i];
                //         var d = Math.sqrt((n_p.x-t_p.x)*(n_p.x-t_p.x) + (n_p.y-t_p.y)*(n_p.y-t_p.y));
                //         if(d < 0.5){
                //             curpoint.splice(i,1);
                //         }
                //     }
                // }
                //封边操作
                for (var i = curpoint.length - 1; i >= 0; i--) {
                    var y = curpoint[i].y + addy;
                    var x = curpoint[i].x + addx;
                    curpoint.push(cc.p({ x: x, y: y }));
                }
                // for(var i=0; i<curpoint.length; i++){
                //     if(i != 0){
                //         var n_p = curpoint[i-1];
                //         var t_p = curpoint[i];

                //         if(t_p == t_p){
                //             curpoint.splice(i,1);
                //         } 
                //     }
                // }
                this.pointbox.push(curpoint);
                //this.curpoint = [];
                //this.curpoint.push(next_p);
            }
        }
    }
}

//中间补点
// additional(){
//     if(this.pointbox.length>2){
//         var newAttr = this.pointbox.slice(0,this.pointbox.length);
//         for(var i=0; i<this.pointbox.length; i++){
//             if(i != this.pointbox.length-1){
//                 var t = this.pointbox[i];
//                 var n = this.pointbox[i+1];
//                 if(t.length > 2 && n.length >2){
//                     var star = t[t.length];
//                     var end = n[0];
//                     newAttr.splice(i,0,[star,end]);
//                 }
//             }
//         }
//         this.pointbox = newAttr;
//     }

// },


);

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
        //# sourceMappingURL=lb_ysc_graphics.js.map
        