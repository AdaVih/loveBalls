"use strict";
cc._RF.push(module, '65d8bxISd9KEbssQ1VW3bRM', 'lb_ysc_common');
// lb_ysc/Script/lb_ysc_common.js

"use strict";

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
    gm: null,
    sm: null,
    shareTip: [" 真实爱情的途径并不平坦。 —— 莎士比亚 ", "没有爱情的人生是什么？是没有黎明的长夜。——彭斯", "当你真爱一个人的时候，你是会忘记自己的苦乐得失，而只是关心对方的苦乐得失的。 ——罗兰 ", "真正的爱情能够鼓舞人，唤醒他内心沉睡着的力量和潜藏着的才能。 ——薄伽丘", "最甜美的是爱情，最苦涩的也是爱情。", "离别对于爱情，就像风对于火一样：它熄灭了火星，但却能煽起狂焰。", "爱情无需言作媒，全在心领神会。"],
    levels: [{
        id: 1, //场景ID
        star: 0, //以获得的星星，最大为3
        active: true, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 2, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 3, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 4, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 5, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 6, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 7, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 8, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 9, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 10, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 11, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 12, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 13, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 14, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 15, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 16, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 17, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 18, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 19, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 20, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 21, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 22, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 23, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 24, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 25, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 26, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 27, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }, {
        id: 28, //场景ID
        star: 0, //以获得的星星，最大为3
        active: false, //是否开启
        pass: false, //是否通过
        img: '' //图片路径
    }],
    userDate: {
        starTotal: 0, //星星总计
        levels: []
    }

};

cc._RF.pop();