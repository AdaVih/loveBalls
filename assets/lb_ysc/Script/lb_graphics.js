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

    properties: {
        maxLenght:0,
        scor_star1:{//分数星星1
            default: null,
            type: cc.Node,
        },
        scor_star2:{//分数星星2
            default: null,
            type: cc.Node,
        },
        scor_star3:{//分数星星3
            default: null,
            type: cc.Node,
        },
        Canvas:{
            default: null,
            type: cc.Node,
        },
        pen:{
            default: null,
            type: cc.Node,
        },
        score_text:{
            default: null,
            type: cc.Node,
        },
        score_text:{
            default: null,
            type: cc.Node,
        },
        schedule_bar:{
            default: null,
            type: cc.Node,
        },
        boy:{
            default: null,
            type: cc.Node,
        },
        gril:{
            default: null,
            type: cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //common.gm.loadLevel(common.sm.levelIndex);
        this.init();
    },
    start () {

        
    },

    // update (dt) {
        
    // },
    init(){
        this.drawLenght = 0;

        this.is_scor_star1 = true;
        this.is_scor_star2 = true;
        this.is_scor_star3 = true;

        //分数
        this.score = this.score_text.getComponent(cc.Label);
        this.score_val = parseInt(this.score.string);
        //进度
        this.schedule_val = this.schedule_bar.width;
        //.绘图组件
        this.graphics = this.getComponent(cc.Graphics);

        this.boyRigidBody = this.boy.getComponent(cc.RigidBody);
        this.grilRigidBody = this.gril.getComponent(cc.RigidBody);

        //.触摸事件
        this.Canvas.on(cc.Node.EventType.TOUCH_START,this.touchStar,this);
        this.Canvas.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        this.Canvas.on(cc.Node.EventType.TOUCH_END,function(event){
            this.pen.active = false;
            
            this.touchEnd();
        },this);
        this.Canvas.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
            this.pen.active = false;
            
            this.touchEnd();
        },this);

        this.direction = 0;//方向
        //分段数组pointbox
        this.pointbox = [];
        
    },



    addPolygonCollider(points){
        if(points.length > 1){
            var p_collider = this.boxNode.addComponent(cc.PhysicsPolygonCollider);//.PhysicsChainCollider
            p_collider.points = points;
            p_collider.apply();
            var collider = this.boxNode.addComponent(cc.PolygonCollider);//.PhysicsChainCollider
            collider.points = points;
        }
        
    },

    addCollider(points){
        if(this.pointbox.length > 0){
            this.boxNode = new cc.Node();
            var rigidbody = this.boxNode.addComponent(cc.RigidBody);
            rigidbody.type = cc.RigidBodyType.Dynamic;
    
           
            // var collider = this.boxNode.addComponent(cc.PhysicsPolygonCollider);//.PhysicsChainCollider
            // collider.points = points2;
            // collider.apply();
            if(this.pointbox){
                this.pointbox.forEach((element,index) => {
                    this.addPolygonCollider(element);
                });
            }
            
            var graphics = this.boxNode.addComponent(cc.Graphics);
            graphics.lineWidth = 6;
            graphics.strokeColor = cc.hexToColor('#0000ff');
            graphics.moveTo(this.startPos.x, this.startPos.y);
            for(var i=0; i<points.length; i++){
                graphics.lineTo(points[i].x, points[i].y);
                
            }
            graphics.stroke();
            this.boxNode.group = "line";
            this.boxNode.parent = common.gm.level_node;
            this.pointbox = [];
        }


    
        
    },
    

    //绘制开始
    touchStar(event){
        
        if(common.gm.isDraw){
            common.gm.isStop = false;
            this.graphics.strokeColor = new cc.Color(0,0,0);
            this.startPos = this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(event.getLocation()));
            this.graphics.moveTo(this.startPos.x, this.startPos.y);
            this.pen.x = this.startPos.x;
            this.pen.y = this.startPos.y;
            this.pen.active = true;
            this.penState = this.pen.getComponent(cc.Animation).play();
            this.points = [];
            //临时点数组
            this.curpoint = [];
            this.curpoint.push(cc.p(this.startPos.x,this.startPos.y));
            
        }
        
    },

    //绘制中
    touchMove(event){
        
        if(common.gm.isDraw){
            
            var p1 = this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(event.getPreviousLocation()));
            var p2 = this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(event.getLocation()));

            
            
            //画笔跟随
            this.pen.x = p2.x;
            this.pen.y = p2.y;

            var cur_dir = this.GetSlideDirection(p1.x, p1.y, p2.x, p2.y);
            
            
            var d = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
            this.penState.speed = d;
            this.drawLenght += d;
            this.score_val = parseInt((1-(this.drawLenght/this.maxLenght))*100);
            if(this.score_val <= 0){
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
            this.schedule_bar.width = this.schedule_val*(this.score_val/100);
            this.starUp();

            this.graphics.lineTo(p2.x, p2.y);
            this.graphics.stroke();
            this.graphics.moveTo(p2.x, p2.y);
            if(common.gm.isStop == false){
                
                if(this.direction == 0){
                    this.direction = cur_dir;
                }
                if(cur_dir != this.direction){
                    if(this.curpoint.length > 1){
                        this.incisionLine([this.curpoint[this.curpoint.length-1],cc.p(p2)]);
                    }
                    
                    this.incisionLine(this.curpoint);
                    this.curpoint = [];
                    this.direction = cur_dir;
                }
                this.curpoint.push(cc.p(p2));
                this.points.push(cc.p(p2));
            }else{
                this.graphics.strokeColor = cc.hexToColor('#333333');
            }
        }
        
    },
    //绘制结束
    touchEnd(){
        // this.points.push(this.startPos)
        // this.addPolygonCollider(this.points)
        
        console.log(this.pointbox);
        this.incisionLine(this.curpoint);
        this.direction = 0;
        this.addCollider(this.points);
        this.pen.active = false;
        this.graphics.clear();
        this.points = [];
        this.pointbox = [];
        this.curpoint = [];
        this.boyRigidBody.type = cc.RigidBodyType.Dynamic;
        this.grilRigidBody.type = cc.RigidBodyType.Dynamic;
    },

    //星星更新
    starUp(){
        if(this.is_scor_star1){
            if(this.score_val <= common.gm.get_star3){
                this.starHide(this.scor_star1);
                this.is_scor_star1 = false;
            }
        }
        if(this.is_scor_star2){
            if(this.score_val <= common.gm.get_star2){
                this.starHide(this.scor_star2);
                this.is_scor_star2 = false;
            }
        }
        if(this.is_scor_star3){
            if(this.score_val <= common.gm.get_star1){
                this.starHide(this.scor_star1);
                this.is_scor_star3 = false;
            }
        }
        
    },
    //星星消散
    starHide(star){
        var ani = star.getComponent(cc.Animation);
        ani.on('finished',  function(){
            var star_low = cc.instantiate(common.gm.star_lowPrefab);
            star_low.x = star.x;
            star_low.y = star.y;
            star.parent.addChild(star_low);
        },this);
        ani.play();
    },


    GetSlideAngle(dx, dy) { 

        return Math.atan2(dy, dx) * 180 / Math.PI; 

    }, 

    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动 

    GetSlideDirection(startX, startY, endX, endY) { 

        var dy = endY - startY; 

        var dx = endX - startX; 

        var result = 0;   

        //如果滑动距离太短 

        // if(Math.abs(dx) < 2 && Math.abs(dy) < 2) { 

        //     return result; 

        // } 

        var angle = this.GetSlideAngle(dx, dy); 

        if(angle >= -45 && angle < 45) { 

            result = 4; 

        }else if (angle >= 45 && angle < 135) { 

            result = 1; 

        }else if (angle >= -135 && angle < -45) { 

            result = 2; 

        } 

        else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) { 

            result = 3; 

        } 

        return result; 

    },

    //分段切割并做包围盒子
    incisionLine(curpoint){
        var addx = 0;
        var addy = 0;
        var rex = 0;
        var rey = 0;
        
        if(curpoint.length > 1){
            var p1 = curpoint[0];
            var p2 = curpoint[curpoint.length-1];
            var d = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
            if(d > 5){
                //var next_p = curpoint[curpoint.length-1];
                if(this.direction == 1 || this.direction == 2){
                    addx = 6;
                    rex = -3;
                }
                if(this.direction == 3 || this.direction == 4){
                    addy = -6;
                    rey = 3;
                }
                for( var i = curpoint.length-1; i >= 0; i-- ){
                    curpoint[i].y += rey;
                    curpoint[i].x += rex;
                }
                for( var i = curpoint.length-1; i >= 0; i-- ){
                    var y = curpoint[i].y + addy;
                    var x = curpoint[i].x + addx;
                    curpoint.push(cc.p({x , y}));
                }

                this.pointbox.push(curpoint);
                //this.curpoint = [];
                //this.curpoint.push(next_p);
            }
        }
        
        
    },

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


});
