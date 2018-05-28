var common = require('lb_common');
cc.Class({
    extends: cc.Component,

    properties: {
        id:1,
        get_star3:0,
        get_star2:0,
        account_ui: {
            default: null,
            type: cc.Node,
        },
        back: {//返回
            default: null,
            type: cc.Node,
        },
        refresh: {//重来
            default: null,
            type: cc.Node,
        },
        help: {//帮助
            default: null,
            type: cc.Node,
        },
        h_center: {//墨水
            default: null,
            type: cc.Node,
        },
        level_node:{
            default: null,
            type: cc.Node,
        },
        boyRigidBody:{
            default: null,
            type: cc.Node,
        },
        grilRigidBody:{
            default: null,
            type: cc.Node,
        },
        schedule_bar:{
            default:null,
            type:cc.Node
        },
        schedule_bar_1:{
            default:null,
            type:cc.Node
        },
        schedule_bar_2:{
            default:null,
            type:cc.Node
        },
        gameTip:{
            default:null,
            type:cc.Node
        }

    },

    // use this for initialization
    onLoad: function () {
        this.score=0,//得分
        this.starCount = 1;//获得的星星
        this.level = this.id;//关卡索引
        this.isDraw = true;//绘制开关
        this.isStop = false;//是否要停止绘制
        cc.director.setDisplayStats(false);
        //.开启物理系统
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        //physicsManager.debugDrawFlags = true;
        // 设置绘制标志位为 0，即可以关闭绘制。
        // cc.director.getPhysicsManager().debugDrawFlags = 1;

        //1.显示当前页面的转发按钮
        // wx.showShareMenu({withShareTicket:true})

        var collisionManager = cc.director.getCollisionManager();
        //开启碰撞检查系统
        collisionManager.enabled = true;
        common.gm = this;
        
        //提示开关
        this.isTip = true;
        //加载资源
        
        this.loadRes();
        
    },
    start(){
        this.schedule_bar_1.x = this.schedule_bar.width*(this.get_star3/100);
        this.schedule_bar_2.x = this.schedule_bar.width*(this.get_star2/100);
        this.schedule_bar_1.active = true;
        this.schedule_bar_2.active = true;
    },
    //加载资源
    loadRes(){
        //加载星星
        cc.loader.loadRes("lb_ysc/prefab/lb_star", (err, prefab)=> {
            this.starPrefab = prefab;
        });
        //消散星星
        cc.loader.loadRes("lb_ysc/prefab/lb_star_low", (err, prefab)=> {
            this.star_lowPrefab = cc.instantiate(prefab);
        });
    },

    //下一关
    naxtLevel(){
        var index = this.level+1;
        if(index > common.sm.ud.levels.length){
            this.backLevel();
        }else{
            common.sm.loadLevel(index);
        }
        
    },
    //返回关卡
    backLevel(){
        common.sm.isGameTb = true;
        cc.director.loadScene('lb_select');
    }, 
    //重加载
    reLoad(){
        cc.director.loadScene('lb_level'+this.level);
    },

    // called every frame
    update: function (dt) {
        
    }, 


    
    //游戏胜利
    win(){
        console.log('you win!');
        common.gm.isDraw = false;
        common.gm.overUi('win');
        common.gm.ganmeCount();
        common.gm.starShow();
        //更新保存用户数据
        var i = common.gm.level -1;
        if(common.sm.ud.levels[i].star < common.gm.starCount){
            common.sm.ud.levels[i].star = common.gm.starCount;
        }
        common.sm.ud.levels[i].pass = true;
        common.sm.ud.levels[i].active = true;

        common.sm.setUserDate(common.sm.ud);
    },
    //失败
    lose(){
        common.gm.isDraw = false;
        common.gm.overUi('lose');
    },
    //结束UI
    overUi(name){
        var s_img = this.ScreenShot1();
        this.account_ui.active = true;
        this.help.active = false;//隐藏帮助按钮
        this.h_center.active = false;//隐藏墨水内容
        this.back.color = {r:'255',g:'255',b:'255',a:'255'};//返回按钮白色
        this.refresh.color = {r:'255',g:'255',b:'255',a:'255'};//重玩按钮白色
        this.win_ui = this.account_ui.getChildByName(name);
        var img_bar = this.win_ui.getChildByName('img_bar').getChildByName('img').getComponent(cc.Sprite);
        img_bar.spriteFrame = s_img;
        img_bar.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        // 翻转得到的纹理
        var action = cc.flipY(true);
        img_bar.node.runAction(action);
        this.win_ui.active = true;
        var level_index = this.win_ui.getChildByName('img_bar').getChildByName('level_index').getComponent(cc.Label);
        var level = this.level<10?('0'+this.level):this.level;
        level_index.string = 'level '+ level;

    },
    //游戏结算
    ganmeCount(){
        if(this.score >= this.get_star3){
            this.starCount = 3;
        }else if(this.score >= this.get_star2){
            this.starCount = 2;
        }else{
            this.starCount = 1;
        }
    },

    ScreenShot1(){
        console.log("========开始截屏============");
        var level = this.node.getChildByName('environment').getChildByName('level');
        //.可以把this.node从(0,0)到(width, height)截取到模拟器目录%CocosCreator%\resources\cocos2d-x\simulator\win32下的1.png。你要截全屏的话把这段代码挂在场景根节点下就可以了。
        //.RenderTexture扩展的是cc.Node，你也可以setPosition去截屏幕的不同部分。
        var render = new cc.RenderTexture.create(cc.director.getVisibleSize().width, cc.director.getVisibleSize().height);
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
        console.log(render);
        this.saveImgToWx();
        return nowFrame;
    },

    //把图保存到微信画册
    saveImgToWx(render){
        if(cc.sys.platform == cc.sys.WECHAT_GAME){
            const ctx = wx.createCanvasContext('myCanvas');
            const data = render.sprite._texture._image;
            wx.canvasPutImageData({
            canvasId: 'myCanvas',
            x: 0,
            y: 0,
            width: cc.winSize.height,
            height: cc.winSize.height,
            data: data,
            success(res) {
                console.log(res);
            }
            })
        }
    },
    ScreenShot2(){
        console.log("========开始截屏============")

        var canvas = cc.game.canvas;
        var width  = cc.winSize.width;
        var height  = cc.winSize.height;
        canvas.toTempFilePath({
            x: 0,
            y: 0,
            width: width,
            height: height,
            destWidth: width,
            destHeight: height,
            success (res) {
                //.可以保存该截屏图片
                console.log(res)
                // wx.shareAppMessage({
                //     imageUrl: res.tempFilePath
                // })
            }
        })


        // let tempFilePath = canvas.toTempFilePathSync({
        //     x: 0,
        //     y: 0,
        //     width: width,
        //     height: height,
        //     destWidth: width,
        //     destHeight: height
        // })
        // wx.shareAppMessage({
        //     imageUrl: tempFilePath
        // })
    },

    screenShoot(func){
        if (!cc.sys.isNative) return;
        let dirpath = jsb.fileUtils.getWritablePath() + 'ScreenShoot/';
        if( !jsb.fileUtils.isDirectoryExist(dirpath)){
            jsb.fileUtils.createDirectory(dirpath);
        }
        let name = 'ScreenShoot-' + (new Date()).valueOf() + '.png';
        let filepath = dirpath + name;
        let size = cc.director.getVisibleSize();
        let rt = cc.RenderTexture.create(size.width, size.height);
        console.log("========开始截屏============");
        let level = this.node.getChildByName('environment').getChildByName('level');
        level._sgNode.addChild(rt);
        rt.setVisible(false);
        rt.begin();
        level._sgNode.visit();
        rt.end();
        rt.saveToFile('ScreenShoot/' + name, cc.IMAGE_FORMAT_PNG, true, function() {
            cc.log('save succ');
            rt.removeFromParent();
            if (func) {
                func(filepath);
            }
        });
        // 获取SpriteFrame
        console.log(filepath);
        var nowFrame = rt.getSprite().getSpriteFrame();
        return nowFrame;
    },


    //星星显示
    starShow(){
        var star = cc.instantiate(this.starPrefab);
        this.win_ui.getChildByName('win_star_1').addChild(star);
        setTimeout(()=>{
                var star = cc.instantiate(this.starPrefab);
                this.win_ui.getChildByName('win_star_2').addChild(star);
                if(this.starCount == 3){
                    setTimeout(()=>{
                            var star = cc.instantiate(this.starPrefab);
                            this.win_ui.getChildByName('win_star_3').addChild(star); 
                    },300);
                }
            
        },300);
    },
    //显示圈圈
    circleShow(point,callback){
        cc.director.getPhysicsManager().enabled = false;
        cc.loader.loadRes("lb_ysc/prefab/lb_ads_quan", (err, prefab)=> {
            var ads_quan = cc.instantiate(prefab);
            ads_quan.width = cc.winSize.width*2;
            ads_quan.height = ads_quan.width;
            ads_quan.x = point.x;
            ads_quan.y = point.y;
            var abs_anim = ads_quan.getComponent(cc.Animation);
            abs_anim.on('finished',  function(){ads_quan.destroy();callback();},this);
            cc.director.getScene().addChild(ads_quan);
            
        });
    },
    //tip
    tip(){
        if(common.gm.isTip){
            common.gm.isTip = false;
            var tip = common.gm.gameTip;
            if(tip){
                tip.active = true;
                setTimeout(()=>{
                    tip.active = false;
                    common.gm.isTip = true;
                },500);
            }else{
                common.gm.isTip = true;
            }
            
        }
        
    }



});
