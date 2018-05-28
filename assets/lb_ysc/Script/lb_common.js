// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
module.exports = {
    gm:null,
    sm:null,
    levels:[
        {
            id:1,//场景ID
            star:0,//以获得的星星，最大为3
            active:true,//是否开启
            pass:false,//是否通过
            img:''//图片路径
        },
        {
            id:2,//场景ID
            star:0,//以获得的星星，最大为3
            active:true,//是否开启
            pass:false,//是否通过
            img:''//图片路径
        },
        {
            id:3,//场景ID
            star:0,//以获得的星星，最大为3
            active:false,//是否开启
            pass:false,//是否通过
            img:''//图片路径
        }
    ],
    userDate:{
        starTotal:0,//星星总计
        levels:[],
    },
    getUserDate:function(){//获取用户数据
        // var data = JSON.parse(window.localStorage.getItem('userdate'));
        // if(data == null){//如果为空返回默认数据，并保存
        //     this.userDate.levels = this.levels;
        //     data = this.userDate;
        //     this.setUserDate(data);
        // }
        this.userDate.levels = this.levels;
        var data = this.userDate;
        return data;
    },
    setUserDate:function(data){//保存用户数据
        this.userDate = data;
        
        //window.localStorage.setItem('userdate',JSON.stringify(date));
    }
    
    
};
 