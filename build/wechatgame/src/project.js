require=function a(o,n,l){function r(t,e){if(!n[t]){if(!o[t]){var i="function"==typeof require&&require;if(!e&&i)return i(t,!0);if(d)return d(t,!0);var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}var c=n[t]={exports:{}};o[t][0].call(c.exports,function(e){return r(o[t][1][e]||e)},c,c.exports,a,o,n,l)}return n[t].exports}for(var d="function"==typeof require&&require,e=0;e<l.length;e++)r(l[e]);return r}({lb_ysc_boy:[function(e,t,i){"use strict";cc._RF.push(t,"5883b0adEtEV7mOEZ29DVJI","lb_ysc_boy");var c=e("lb_ysc_common");cc.Class({extends:cc.Component,properties:{},onLoad:function(){},start:function(){},onBeginContact:function(e,t,i){if("gril"==i.node.name&&0==c.gm.isWin){c.gm.isWin=!0,cc.audioEngine.playEffect(c.sm.audio_win,!1);var s=e.getWorldManifold().points[0];c.gm.circleShow(s)}}}),cc._RF.pop()},{lb_ysc_common:"lb_ysc_common"}],lb_ysc_common:[function(e,t,i){"use strict";cc._RF.push(t,"65d8bxISd9KEbssQ1VW3bRM","lb_ysc_common"),t.exports={gm:null,sm:null,shareTip:[" 真实爱情的途径并不平坦。 —— 莎士比亚 ","没有爱情的人生是什么？是没有黎明的长夜。——彭斯","当你真爱一个人的时候，你是会忘记自己的苦乐得失，而只是关心对方的苦乐得失的。 ——罗兰 ","真正的爱情能够鼓舞人，唤醒他内心沉睡着的力量和潜藏着的才能。 ——薄伽丘","最甜美的是爱情，最苦涩的也是爱情。","离别对于爱情，就像风对于火一样：它熄灭了火星，但却能煽起狂焰。","爱情无需言作媒，全在心领神会。"],levels:[{id:1,star:0,active:!0,pass:!1,img:""},{id:2,star:0,active:!1,pass:!1,img:""},{id:3,star:0,active:!1,pass:!1,img:""},{id:4,star:0,active:!1,pass:!1,img:""},{id:5,star:0,active:!1,pass:!1,img:""},{id:6,star:0,active:!1,pass:!1,img:""},{id:7,star:0,active:!1,pass:!1,img:""},{id:8,star:0,active:!1,pass:!1,img:""},{id:9,star:0,active:!1,pass:!1,img:""},{id:10,star:0,active:!1,pass:!1,img:""},{id:11,star:0,active:!1,pass:!1,img:""},{id:12,star:0,active:!1,pass:!1,img:""},{id:13,star:0,active:!1,pass:!1,img:""},{id:14,star:0,active:!1,pass:!1,img:""},{id:15,star:0,active:!1,pass:!1,img:""},{id:16,star:0,active:!1,pass:!1,img:""},{id:17,star:0,active:!1,pass:!1,img:""},{id:18,star:0,active:!1,pass:!1,img:""},{id:19,star:0,active:!1,pass:!1,img:""},{id:20,star:0,active:!1,pass:!1,img:""},{id:21,star:0,active:!1,pass:!1,img:""},{id:22,star:0,active:!1,pass:!1,img:""},{id:23,star:0,active:!1,pass:!1,img:""},{id:24,star:0,active:!1,pass:!1,img:""},{id:25,star:0,active:!1,pass:!1,img:""},{id:26,star:0,active:!1,pass:!1,img:""},{id:27,star:0,active:!1,pass:!1,img:""},{id:28,star:0,active:!1,pass:!1,img:""}],userDate:{starTotal:0,levels:[]}},cc._RF.pop()},{}],lb_ysc_dieLine:[function(e,t,i){"use strict";cc._RF.push(t,"1f0debNB+5PWZ8d9S6/ASMt","lb_ysc_dieLine");var c=e("lb_ysc_common");cc.Class({extends:cc.Component,properties:{},start:function(){},onBeginContact:function(e,t,i){if("gril"==i.node.name||"boy"==i.node.name){console.log("game over");var s=e.getWorldManifold().points[0];c.gm.circleShow(s)}}}),cc._RF.pop()},{lb_ysc_common:"lb_ysc_common"}],lb_ysc_gameManager:[function(e,t,i){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","lb_ysc_gameManager");var r=e("lb_ysc_common");cc.Class({extends:cc.Component,properties:{id:1,get_star3:0,get_star2:0,account_ui:{default:null,type:cc.Node},back:{default:null,type:cc.Node},refresh:{default:null,type:cc.Node},help:{default:null,type:cc.Node},h_center:{default:null,type:cc.Node},level_node:{default:null,type:cc.Node},schedule_bar:{default:null,type:cc.Node},schedule_bar_1:{default:null,type:cc.Node},schedule_bar_2:{default:null,type:cc.Node},gameTip:{default:null,type:cc.Node},expect:{default:null,type:cc.Node},winParlicle:{default:null,type:cc.Node},ScreenShotPop:{default:null,type:cc.Node}},onLoad:function(){this.isWin=!1,this.score=100,this.starCount=1,this.level=r.sm.levelIndex,this.isDraw=!0,this.isStop=!1,this.points=[],this.objOutP=null,this.one=!0,cc.director.setDisplayStats(!1),cc.director.getPhysicsManager().enabled=!0,cc.director.getCollisionManager().enabled=!0,(r.gm=this).isTip=!0,this.loadRes()},start:function(){this.schedule_bar_1.x=this.schedule_bar.width*(this.get_star3/100),this.schedule_bar_2.x=this.schedule_bar.width*(this.get_star2/100),this.schedule_bar_1.active=!0,this.schedule_bar_2.active=!0},loadRes:function(){var i=this;cc.loader.loadRes("lb_ysc/prefab/lb_ysc_star",function(e,t){i.starPrefab=t}),cc.loader.loadRes("lb_ysc/prefab/lb_ysc_star_low",function(e,t){i.star_lowPrefab=cc.instantiate(t)})},naxtLevel:function(){if(cc.audioEngine.playEffect(r.sm.audio_click,!1),0==r.sm.isHelp)var e=this.level+1;else{e=1;r.sm.isHelp=!1}e>r.sm.ud.levels.length?this.expectPopShow():(console.log(e),r.sm.loadLevel(e))},backLevel:function(){r.sm.isGameTb=!0,r.sm.isHelp=!1,cc.director.loadScene("lb_ysc_select"),cc.audioEngine.playEffect(r.sm.audio_click,!1)},share:function(){cc.audioEngine.playEffect(r.sm.audio_click,!1),r.sm.isWx&&this.ScreenShot2("share")},reLoad:function(){cc.audioEngine.playEffect(r.sm.audio_click,!1),r.sm.loadLevel(this.level)},update:function(e){},win:function(){console.log("you win!"),r.gm.isWin&&r.gm.one&&(r.gm.one=!1,r.gm.isDraw=!1,r.gm.ganmeCount(),this.overUi("win"))},lose:function(){r.gm.isDraw=!1,this.overUi("lose"),cc.audioEngine.playEffect(r.sm.audio_gameover,!1)},overUi:function(e,t){this.account_ui.active=!0,this.help.active=!1,this.h_center.active=!1,this.back.color={r:"255",g:"255",b:"255",a:"255"},this.refresh.color={r:"255",g:"255",b:"255",a:"255"},this.win_ui=this.account_ui.getChildByName(e);this.win_ui.getChildByName("img_bar").getChildByName("img").getComponent(cc.Sprite);this.win_ui.active=!0;var i=this.win_ui.getChildByName("img_bar").getChildByName("level_index").getComponent(cc.Label),s=this.level<10?"0"+this.level:this.level;if(i.string=s,this.isWin&&(this.starShow(),this.isWin&&0==r.sm.isHelp)){var c=r.gm.level-1;r.sm.ud.levels[c].star<r.gm.starCount&&(r.sm.ud.levels[c].star=r.gm.starCount),r.sm.ud.levels[c].pass=!0,r.sm.ud.levels[c+1]&&(r.sm.ud.levels[c+1].active=!0),r.sm.setUserDate(r.sm.ud)}},ganmeCount:function(){this.score>=this.get_star3?this.starCount=3:this.score>=this.get_star2?this.starCount=2:this.starCount=1},ScreenShot1:function(e){console.log("========开始截屏============");var t=this.node.getChildByName("environment").getChildByName("level"),i=new cc.RenderTexture.create(cc.director.getVisibleSize().width,.1*cc.director.getVisibleSize().height);t._sgNode.addChild(i),i.setVisible(!1),i.begin(),t._sgNode.visit(),i.end();var s=i.getSprite().getSpriteFrame();return this.s_img=s},ScreenShot2:function(o){var n=this;console.log("========开始截屏============");var l=cc.game.canvas,e=cc.winSize.width,t=cc.winSize.height;l.toTempFilePath({x:0,y:0,width:e,height:t,destWidth:e,destHeight:t,complete:function(e){if(console.log(e),e.tempFilePath)if(console.log("缓存路径："+e.tempFilePath),n.savedFilePath=e.tempFilePath,o){var t=Math.floor(Math.random()*r.shareTip.length);wx.shareAppMessage({title:r.shareTip[t],imageUrl:n.savedFilePath||""})}else{var i=new cc.Texture2D;i.initWithElement(l),i.handleLoadedTexture();var s=new cc.SpriteFrame(i);n.ScreenShotPop.getChildByName("img").getComponent(cc.Sprite).spriteFrame=s;var c=cc.flipY(!0);n.ScreenShotPop.getChildByName("img").runAction(c),n.ScreenShotPop.active=!0;var a=n.ScreenShotPop.getComponent(cc.Animation);a.play(),a.on("finished",function(){this.ScreenShotPop.active=!1,wx.shareAppMessage({title:"猫咪爱情大作战，第"+r.gm.level+"关，大神帮帮ta！",imageUrl:this.savedFilePath||"",query:"level="+this.level})},n)}}})},saveImg:function(i,s){var c=this;(console.log(i),r.sm.isWx)&&wx.getFileSystemManager().saveFile({tempFilePath:i,complete:function(e){if(console.log(e),c.savedFilePath=e.savedFilePath,c.savedFilePath?cc.loader.load(c.savedFilePath,function(e,t){c.overUi(s,t)}):(console.log("截图保存失败！"),cc.loader.load(i,function(e,t){c.overUi(s,t)})),c.isWin){var t=r.gm.level-1;r.sm.ud.levels[t].star<r.gm.starCount&&(r.sm.ud.levels[t].star=r.gm.starCount),r.sm.ud.levels[t].pass=!0,r.sm.ud.levels[t+1]&&(r.sm.ud.levels[t+1].active=!0),5<r.sm.ud.levels[t].img.length&&wx.removeSavedFile({filePath:r.sm.ud.levels[t].img,complete:function(e){}}),r.sm.ud.levels[t].img=c.savedFilePath||"",r.sm.setUserDate(r.sm.ud)}}})},starShow:function(){var t=this,e=cc.instantiate(this.starPrefab);this.win_ui.getChildByName("win_star_1").addChild(e),cc.audioEngine.playEffect(r.sm.audio_star,!1),setTimeout(function(){if(2<=t.starCount){var e=cc.instantiate(t.starPrefab);t.win_ui.getChildByName("win_star_2").addChild(e),cc.audioEngine.playEffect(r.sm.audio_star,!1),3==t.starCount&&setTimeout(function(){var e=cc.instantiate(t.starPrefab);t.win_ui.getChildByName("win_star_3").addChild(e),cc.audioEngine.playEffect(r.sm.audio_star,!1)},500)}},500)},circleShow:function(s){var c=this;if(cc.director.getPhysicsManager().enabled=!1,this.isWin){var e=this.winParlicle.convertToNodeSpaceAR(s);this.winParlicle.x=e.x,this.winParlicle.y=e.y,this.winParlicle.active=!0}cc.loader.loadRes("lb_ysc/prefab/lb_ysc_ads_quan",function(e,t){var i=cc.instantiate(t);i.width=2*cc.winSize.width,i.height=i.width,i.x=s.x,i.y=s.y,i.getComponent(cc.Animation).on("finished",function(){i.removeFromParent(),this.isWin?this.win():this.lose()},c),cc.director.getScene().addChild(i)})},tip:function(){if(r.gm.isTip){cc.audioEngine.playEffect(r.sm.audio_click,!1),r.gm.isTip=!1;var e=r.gm.gameTip;e?(e.active=!0,setTimeout(function(){e.active=!1,r.gm.isTip=!0},500)):r.gm.isTip=!0}},expectPopShow:function(){this.expect.active=!0},helpMe:function(){r.sm.isWx&&this.ScreenShot2()},tellHi:function(){wx.shareAppMessage({title:"猫咪爱情大作战，看看吧，这游戏应该这样玩！",imageUrl:r.gm.savedFilePath||""})}}),cc._RF.pop()},{lb_ysc_common:"lb_ysc_common"}],lb_ysc_graphics:[function(e,t,i){"use strict";var s;function c(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}cc._RF.push(t,"1dc3bK/2cRMgYfNGviOv13Z","lb_ysc_graphics");var r=e("lb_ysc_common");cc.Class({extends:cc.Component,properties:(s={maxLenght:0,scor_star1:{default:null,type:cc.Node},scor_star2:{default:null,type:cc.Node},scor_star3:{default:null,type:cc.Node},Canvas:{default:null,type:cc.Node},pen:{default:null,type:cc.Node},score_text:{default:null,type:cc.Node}},c(s,"score_text",{default:null,type:cc.Node}),c(s,"schedule_bar",{default:null,type:cc.Node}),s),onLoad:function(){this.maxLenght=r.sm.maxLenght},start:function(){var s=this,e=r.gm.level;1==e&&(this.pen.active=!0);var t="lb_ysc/levels/lb_ysc_level"+e;cc.loader.loadRes(t,function(e,t){if(t){var i=cc.instantiate(t);r.gm.level_node.addChild(i),r.gm.boyRigidBody=i.getChildByName("boy"),r.gm.grilRigidBody=i.getChildByName("gril"),r.gm.gameTip=i.getChildByName("tip"),s.init()}})},update:function(e){0<this.pen_speed&&(this.pen_speed--,this.pen_speed<0&&(this.pen_speed=0),this.penState&&(this.penState.speed=this.pen_speed))},init:function(){this.drawLenght=0,this.event_id=null,this.is_scor_star1=!0,this.is_scor_star2=!0,this.is_scor_star3=!0,this.pen_speed=0,this.score=this.score_text.getComponent(cc.Label),this.score_val=parseInt(this.score.string),this.schedule_val=this.schedule_bar.width,this.graphics=this.getComponent(cc.Graphics),this.boyRigidBody=r.gm.boyRigidBody.getComponent(cc.RigidBody),this.grilRigidBody=r.gm.grilRigidBody.getComponent(cc.RigidBody),this.boyRigidBody.gravityScale=5,this.grilRigidBody.gravityScale=5,this.event_id=r.sm.event_id,this.Canvas.on(cc.Node.EventType.TOUCH_START,this.touchStar,this),this.Canvas.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this),this.Canvas.on(cc.Node.EventType.TOUCH_END,function(e){this.pen.active=!1,this.event_id==e.getID()&&(this.event_id=null,this.touchEnd())},this),this.Canvas.on(cc.Node.EventType.TOUCH_CANCEL,function(e){this.pen.active=!1,this.event_id==e.getID()&&(this.event_id=null,this.touchEnd())},this),this.direction=0,this.pointbox=[]},addPolygonCollider:function(e){if(1<e.length)try{var t=e[0],i=e[e.length-1];if(4<Math.sqrt((t.x-i.x)*(t.x-i.x)+(t.y-i.y)*(t.y-i.y))){var s=this.boxNode.addComponent(cc.PhysicsPolygonCollider);s.points=e,s.apply()}}catch(e){}},addCollider:function(e){var i=this;if(0<this.pointbox.length){this.boxNode=new cc.Node;var t=this.boxNode.addComponent(cc.RigidBody);t.type=cc.RigidBodyType.Dynamic,t.gravityScale=10,this.pointbox&&this.pointbox.forEach(function(e,t){i.addPolygonCollider(e)});var s=this.boxNode.addComponent(cc.Graphics);s.lineWidth=6,s.strokeColor=cc.hexToColor("#0000ff");for(var c=0;c<e.length;c++)0==c&&s.moveTo(this.startPos.x,this.startPos.y),s.lineTo(e[c].x,e[c].y);s.stroke(),this.boxNode.group="lb_ysc_line",r.gm.level_node.addChild(this.boxNode),this.pointbox=[]}},touchStar:function(e){if(console.log("touchStar:",e.getID()),null==this.event_id)this.event_id=e.getID();else if(this.event_id!=e.getID())return;r.gm.isDraw&&(r.gm.isStop=!1,this.graphics.strokeColor=new cc.Color(0,0,0),this.startPos=this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(e.getLocation())),this.pen.x=this.startPos.x,this.pen.y=this.startPos.y,this.pen.active=!0,r.gm.gameTip.active=!1,this.pen.getComponent(cc.Animation).stop(),this.penState=this.pen.getComponent(cc.Animation).play("lb_ysc_penAnim"),r.gm.points=[],this.curpoint=[],this.curpoint.push(cc.p(this.startPos.x,this.startPos.y)),this.graphics.moveTo(this.startPos.x,this.startPos.y))},touchMove:function(e){if(this.event_id==e.getID()&&r.gm.isDraw){var t=this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(e.getPreviousLocation())),i=this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(e.getLocation()));if(this.pen.x=i.x,this.pen.y=i.y,this.pen_speed<2&&(this.pen_speed+=2),0==r.gm.isStop){var s=cc.director.getPhysicsManager().rayCast(cc.p(this.Canvas.parent.convertToWorldSpaceAR(e.getPreviousLocation())),cc.p(this.Canvas.parent.convertToWorldSpaceAR(e.getLocation())),cc.RayCastType.Any);if(0<s.length)r.gm.isStop=!0;else if(r.gm.objOutP){var c=this.node.convertToNodeSpaceAR(r.gm.objOutP);this.curpoint=[],this.curpoint.push(cc.p(c.x,c.y)),r.gm.points.push(cc.p(c)),this.startPos=c,r.gm.objOutP=null}if(r.gm.isStop)var a=s[0].point,o=this.node.convertToNodeSpaceAR(this.Canvas.parent.convertToWorldSpaceAR(a));else o=i;var n=Math.sqrt((t.x-o.x)*(t.x-o.x)+(t.y-o.y)*(t.y-o.y));if(this.drawLenght+=n,this.score_val=parseInt(100*(1-this.drawLenght/this.maxLenght)),this.score_val<=0&&(this.score_val=0,r.gm.isDraw=!1,this.pen.active=!1,this.touchEnd()),this.score.string=this.score_val+"%",r.gm.score=this.score_val,this.schedule_bar.width=this.schedule_val*(this.score_val/100),this.starUp(),1<this.curpoint.length&&(this.incisionLine([cc.p({x:t.x+1,y:t.y+1}),cc.p({x:o.x+1,y:o.y+1})]),this.incisionLine(this.curpoint),this.curpoint=[]),0==r.sm.audio_effect.isPlaying&&r.sm.audioEffectPlay(r.sm.audio_write),1==this.curpoint.length){var l=this.curpoint[0];3<Math.sqrt((l.x-o.x)*(l.x-o.x)+(l.y-o.y)*(l.y-o.y))&&this.curpoint.push(cc.p(o))}else this.curpoint.push(cc.p(o));r.gm.points.push(cc.p(o)),this.graphics.strokeColor=cc.hexToColor("#000000"),this.graphics.lineTo(o.x,o.y),this.graphics.stroke(),this.graphics.moveTo(o.x,o.y)}else this.graphics.strokeColor=cc.hexToColor("#ff0000"),this.graphics.lineTo(i.x,i.y),this.graphics.stroke(),this.graphics.moveTo(i.x,i.y)}},touchEnd:function(){this.incisionLine(this.curpoint),this.addCollider(r.gm.points),this.pen.active=!1,this.graphics.clear(),r.gm.points=[],this.pointbox=[],this.curpoint=[],this.boyRigidBody.type=cc.RigidBodyType.Dynamic,this.grilRigidBody.type=cc.RigidBodyType.Dynamic},starUp:function(){this.is_scor_star1&&this.score_val<=r.gm.get_star3&&(this.starHide(this.scor_star1),this.is_scor_star1=!1),this.is_scor_star2&&this.score_val<=r.gm.get_star2&&(this.starHide(this.scor_star2),this.is_scor_star2=!1),this.is_scor_star3&&this.score_val<=r.gm.get_star1&&(this.starHide(this.scor_star1),this.is_scor_star3=!1)},starHide:function(t){var e=t.getComponent(cc.Animation);e.on("finished",function(){var e=cc.instantiate(r.gm.star_lowPrefab);e.x=t.x,e.y=t.y,t.parent.addChild(e)},this),e.play()},GetSlideAngle:function(e,t){return 180*Math.atan2(t,e)/Math.PI},GetSlideDirection:function(e,t,i,s){var c=s-t,a=i-e,o=0,n=this.GetSlideAngle(a,c);return-45<=n&&n<45?o=4:45<=n&&n<135?o=1:-135<=n&&n<-45?o=2:(135<=n&&n<=180||-180<=n&&n<-135)&&(o=3),o},incisionLine:function(e){var t=0,i=0,s=0,c=0;if(1<e.length){var a=e[0],o=e[e.length-1];if(2<Math.sqrt((a.x-o.x)*(a.x-o.x)+(a.y-o.y)*(a.y-o.y))){this.direction=this.GetSlideDirection(a.x,a.y,o.x,o.y),1!=this.direction&&2!=this.direction||(t=6,s=-3),3!=this.direction&&4!=this.direction||(i=-6,c=3);for(var n=e.length-1;0<=n;n--)e[n].y+=c,e[n].x+=s;for(n=e.length-1;0<=n;n--){var l=e[n].y+i,r=e[n].x+t;e.push(cc.p({x:r,y:l}))}this.pointbox.push(e)}}}}),cc._RF.pop()},{lb_ysc_common:"lb_ysc_common"}],lb_ysc_level:[function(e,t,i){"use strict";cc._RF.push(t,"6d289+2tJxKzodr6lz8kOm+","lb_ysc_level");var f=e("lb_ysc_common");cc.Class({extends:cc.Component,properties:{select_level_bar:{default:null,type:cc.Node},level_bar:{default:null,type:cc.Node},total_star:{default:null,type:cc.Node},selectLevels:{default:null,type:cc.Node},levels:{default:null,type:cc.Node}},onLoad:function(){},start:function(){this.loadRes()},loadRes:function(){var i=this;cc.loader.loadRes("lb_ysc/prefab/lb_ysc_item",function(e,t){i.itemPrefab=t,cc.loader.loadRes("lb_ysc/prefab/lb_ysc_item2",function(e,t){i.item2Prefab=t,cc.loader.loadRes("lb_ysc/prefab/lb_ysc_list",function(e,t){i.listPrefab=t,i.loadSceneDate()})})})},loadSceneDate:function(){this.level_page=[],this.levelPack()},levelPack:function(){var s=this;this.pageCount=Math.ceil(f.levels.length/12);var c=Math.ceil(this.pageCount/2)*cc.winSize.width;this.select_level_bar.width=c,cc.loader.loadRes("lb_ysc/prefab/lb_ysc_list2",function(e,t){var i=cc.instantiate(t);i.width=c,s.select_level_bar.addChild(i),s.load_item_count=0,s.createLevelBarItem(i),s.levelDate()})},levelDate:function(){this.page_all=Math.ceil(f.levels.length/6),this.page_load_index=0,this.load_count=0,this.createLevelVessel()},createItem:function(e){this.load_count++;var t=cc.instantiate(this.itemPrefab);e.addChild(t),t.on(cc.Node.EventType.TOUCH_START,function(){this.touch_star=0,this.isTouch=!0},this),t.on(cc.Node.EventType.TOUCH_END,function(e){cc.audioEngine.playEffect(f.sm.audio_click,!1);var t=6*e.target.parent.getSiblingIndex(),i=e.target.getSiblingIndex()+1+t;f.sm.ud.levels[i-1].active&&(f.sm.pageIndex=e.target.parent.getSiblingIndex(),f.sm.loadLevel(i))},this),this.load_count==f.levels.length&&this.loadUserData()},update:function(e){this.isTouch&&this.touch_star++},createLevelBarItem:function(e,t){if(this.load_item_count++,this.load_item_count==this.pageCount)var i=12*(this.load_item_count-1)+1,s=f.levels.length;else i=(s=12*this.load_item_count)-12+1;var c=3*(s-i+1),a=cc.instantiate(this.item2Prefab),o=a.getChildByName("star").getChildByName("star_count").getComponent(cc.Label),n=a.getChildByName("Skinpop_BG").getChildByName("level_img"),l=(n.getChildByName("mask"),n.getChildByName("id").getComponent(cc.Label));o.string="0/"+c,l.string=i+"-"+s,e.addChild(a),a.on(cc.Node.EventType.TOUCH_START,function(e){this.touch_star=0,this.isTouch=!0},this),a.on(cc.Node.EventType.TOUCH_END,this.goToLevels,this),this.pageCount!=this.load_item_count&&this.createLevelBarItem(e)},createLevelVessel:function(){var e=cc.instantiate(this.listPrefab);if(e.width=cc.winSize.width,this.level_page.push(e),this.level_bar.addChild(e),this.page_load_index++,this.page_all==this.page_load_index)var t=f.levels.length-this.load_count;else t=6;for(var i=0;i<t;i++)this.createItem(e);this.page_all!=this.page_load_index&&(this.selectLevels.getComponent(cc.ScrollView).scrollToLeft(.01),this.createLevelVessel())},loadUserData:function(){var i=this,_=f.sm.ud;if(this.allLevelCombine(),f.sm.isGameTb&&(this.selectLevels.active=!1,this.levels.active=!0,null!=f.sm.pageIndex&&(console.log(f.sm.pageIndex),this.levels.getComponent(cc.PageView).setCurrentPageIndex(f.sm.pageIndex))),_&&(this.total_star.getComponent(cc.Label).string=this.getStarCount(),this.alllevels)){_.levels.forEach(function(e,t){i.loadItem(i.alllevels[t],e)});var v=this.select_level_bar.children[0].children;v&&v.forEach(function(e,t){var i=t+1;if(i==v.length)var s=12*(i-1),c=f.levels.length;else s=(c=12*i)-12;var a=_.levels.slice(s,c),o=e.getChildByName("Skinpop_BG").getChildByName("level_img"),n=o.getChildByName("mask"),l=o.getChildByName("pass"),r=e.getChildByName("star").getChildByName("star_count").getComponent(cc.Label),d=0,h=0,u=!1,p=!1,g=0;a.forEach(function(e,t){d+=e.star,e.active&&(p=!0),e.pass&&g++,g==a.length&&(u=!0),h+=3}),r.string=d+"/"+h,n.active=!p,l.active=u;var m="lb_ysc/levels_img/lb_ysc_level"+a[0].id;cc.loader.loadRes(m,cc.SpriteFrame,function(e,t){t&&(o.getComponent(cc.Sprite).spriteFrame=t,cc.loader.release(t))})})}this.addExpectation()},addExpectation:function(){var e=cc.instantiate(this.item2Prefab);this.select_level_bar.getChildByName("list2").addChild(e);var t=cc.instantiate(this.itemPrefab);if(f.sm.ud.levels.length%12==0){t=cc.instantiate(this.listPrefab);this.level_bar.addChild(i),i.addChild(t)}else{var i=this.level_bar.children;i&&i[i.length-1].addChild(t)}},allLevelCombine:function(){var t=this;this.alllevels=[],this.level_bar.children.forEach(function(e){e.children.forEach(function(e){t.alllevels.push(e)})})},loadItem:function(e,t){var i=e.getChildByName("Skinpop_BG").getChildByName("level_img"),s=i.getChildByName("mask"),c=i.getChildByName("pass"),a=i.getChildByName("id").getComponent(cc.Label),o=e.getChildByName("star_bg1").getChildByName("star"),n=e.getChildByName("star_bg2").getChildByName("star"),l=e.getChildByName("star_bg3").getChildByName("star");s.active=!t.active,c.active=t.pass,a.string=t.id<10?"0"+t.id:t.id,1<=t.star&&(o.active=!0),2<=t.star&&(n.active=!0),3<=t.star&&(l.active=!0);var r="lb_ysc/levels_img/lb_ysc_level"+t.id;cc.loader.loadRes(r,cc.SpriteFrame,function(e,t){t&&(i.getComponent(cc.Sprite).spriteFrame=t,cc.loader.release(t))})},getStarCount:function(){var t=0;return f.sm.ud.levels.forEach(function(e){t+=e.star}),t},goToLevels:function(e){if(cc.audioEngine.playEffect(f.sm.audio_click,!1),console.log(e),this.isTouch=!1,this.touch_star<30){this.selectLevels.active=!1,this.levels.active=!0;var t=e.target.getSiblingIndex();this.levels.getComponent(cc.PageView).setCurrentPageIndex(2*t)}},back:function(e){cc.audioEngine.playEffect(f.sm.audio_click,!1),this.selectLevels.active?cc.director.loadScene("lb_ysc_Opening"):(f.sm.isGameTb=!1,cc.director.loadScene("lb_ysc_select"))},share:function(){f.sm.shareGame()}}),cc._RF.pop()},{lb_ysc_common:"lb_ysc_common"}],lb_ysc_opening:[function(e,t,i){"use strict";cc._RF.push(t,"5e4ef0KmpdJwJf8L58pL4PQ","lb_ysc_opening");var o=e("lb_ysc_common");cc.Class({extends:cc.Component,properties:{laya:{default:null,type:cc.Node},audio_enter:{url:cc.AudioClip,default:null}},onLoad:function(){},start:function(){o.sm&&null!=o.sm.playAudioId&&cc.audioEngine.stop(o.sm.playAudioId);var e=this.node.getChildByName("laya").getComponent(cc.Animation),t=this.node.getChildByName("start-btn").getChildByName("Label"),i=t.getComponent(cc.Animation),s=this.node.getChildByName("top").getComponent(cc.Animation),c=this.node.getChildByName("share-btn"),a=c.getComponent(cc.Animation);cc.audioEngine.playEffect(this.audio_enter,!1),e.play("lb_ysc_one"),e.on("finished",function(){s.play("lb_ysc_top"),t.active=c.active=!0,i.play("lb_ysc_fade"),a.play("lb_ysc_fade2"),o.sm.playAudioId=cc.audioEngine.playEffect(o.sm.audio_bg,!0),null==o.gm&&o.sm.onLaunch()})},toSelect:function(){cc.director.loadScene("lb_ysc_select")},share:function(){o.sm.shareGame()}}),cc._RF.pop()},{lb_ysc_common:"lb_ysc_common"}],lb_ysc_pen:[function(e,t,i){"use strict";cc._RF.push(t,"c73d61+rd5NSZaz0eiTd+bt","lb_ysc_pen");var s=e("lb_ysc_common");cc.Class({extends:cc.Component,properties:{},start:function(){cc.director.getCollisionManager().enabled=!0},onCollisionEnter:function(e,t){console.log("on collision enter"),s.gm.isStop=!0},onCollisionExit:function(e,t){if(console.log("on collision exit"),0==s.gm.points.length){var i=t.world.position;console.log("p:",i),s.gm.objOutP=cc.p(i.x,i.y),s.gm.isStop=!1}}}),cc._RF.pop()},{lb_ysc_common:"lb_ysc_common"}],lb_ysc_sceneManager:[function(e,t,i){"use strict";cc._RF.push(t,"0a64eNBTBFI+oqR7uA4IOHb","lb_ysc_sceneManager");var c=e("lb_ysc_common");cc.Class({extends:cc.Component,properties:{maxLenght:0,isSound:!0,isSoundEffect:!0,audio_bg:{url:cc.AudioClip,default:null},audio_enter:{url:cc.AudioClip,default:null},audio_gameover:{url:cc.AudioClip,default:null},audio_win:{url:cc.AudioClip,default:null},audio_star:{url:cc.AudioClip,default:null},audio_write:{url:cc.AudioClip,default:null},audio_popbox:{url:cc.AudioClip,default:null},audio_click:{url:cc.AudioClip,default:null}},onLoad:function(){c.sm=this,cc.game.addPersistRootNode(this.node),this.isWx=this.sysWx(),this.levelIndex=1,this.isHelp=!1,this.ud=this.getUserDate(),this.audio_effect=this.node.getComponent(cc.AudioSource),this.playAudioId=null},onLaunch:function(){if(this.isWx){var e=wx.getLaunchOptionsSync();console.log(e),e.query&&e.query.level&&(this.isHelp=!0,this.loadLevel(parseInt(e.query.level)))}},sysWx:function(){if(cc.sys.platform==cc.sys.WECHAT_GAME){wx.showShareMenu({withShareTicket:!0});var e=Math.floor(3*Math.random()+1),i=Math.floor(Math.random()*c.shareTip.length),t="lb_ysc/lb_ysc_df"+e;return cc.loader.loadRes(t,function(e,t){wx.onShareAppMessage(function(e){return{title:c.shareTip[i],imageUrl:t.url,success:function(e){console.log(e)},fail:function(e){console.log(e)}}})}),!0}return!1},loadLevel:function(e){e>c.levels.length?console.log("最后一关"):(this.levelIndex=e,cc.director.loadScene("lb_ysc_level"))},audioEffectPlay:function(e){this.isSoundEffect&&(this.audio_effect.clip=e,this.audio_effect.play())},getUserDate:function(){var e=cc.sys.localStorage.getItem("lb_ysc_userdate");try{e=JSON.parse(e)}catch(e){console.log(e)}console.log("data:",e),null!=e&&""!=e||((e=c.userDate).levels=c.levels,this.setUserDate(e));var t=e.levels.length,i=c.levels.length-t;if(0<i)for(var s=0;s<i;s++)e.levels.push(c.levels[t+s]);return console.log(e),e},setUserDate:function(e){cc.sys.localStorage.setItem("lb_ysc_userdate",JSON.stringify(e))},goToSelects:function(){cc.director.loadScene("lb_ysc_select")},shareGame:function(){if(c.sm.isWx){var e=Math.floor(3*Math.random()+1),i=Math.floor(Math.random()*c.shareTip.length),t="lb_ysc/lb_ysc_df"+e;cc.loader.loadRes(t,function(e,t){console.log(t.url),wx.shareAppMessage({title:c.shareTip[i],imageUrl:t.url})})}}}),cc._RF.pop()},{lb_ysc_common:"lb_ysc_common"}]},{},["lb_ysc_boy","lb_ysc_common","lb_ysc_dieLine","lb_ysc_gameManager","lb_ysc_graphics","lb_ysc_level","lb_ysc_opening","lb_ysc_pen","lb_ysc_sceneManager"]);