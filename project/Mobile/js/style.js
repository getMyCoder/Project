var HW;
$(function () {
    HW = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        ProportionSize: document.documentElement.clientWidth / 750,
    };
    onload();
});

// load
function onload() {
    // 加载样式之前
    beforeStyle();
    // 加载样式
    setStyle();
    // 底部中间按钮
    suspensionBtn();
    // 圈子关注弹窗
    $(".qz-xz-top-title h4").click(function () {
        if ($(".qz-xz-top-title h4").attr('data-value') == 'no') {
            $(".qz-xz-top-title h4").attr('data-value', 'add');
            circleFollowPopup.followPopup(function () {
                // 圈子判断是否已加入
                if ($(".qz-xz-top-title h4").attr('data-value') == 'add') {
                    $(".qz-xz-top-title h4").html('<i>已加入</i>');
                } else {
                    $(".qz-xz-top-title h4").html('<span>+</span>加入');
                }
                setCss.setSize([
                    ['.qz-xz-top-title h4', 114, 56, 56, 24, [14, 0, 0, 0], null],
                    ['.qz-xz-top-title h4 span', null, null, null, 30, null, [0, 8, 0, 17]],
                ]);
            });
        } else {
            circleFollowPopup.delFollowPopup(function () {
                $(".qz-xz-top-title h4").attr('data-value', 'no');
                // 圈子判断是否已加入
                if ($(".qz-xz-top-title h4").attr('data-value') == 'add') {
                    $(".qz-xz-top-title h4").html('<i>已加入</i>');
                } else {
                    $(".qz-xz-top-title h4").html('<span>+</span>加入');
                }
                setCss.setSize([
                    ['.qz-xz-top-title h4', 114, 56, 56, 24, [14, 0, 0, 0], null],
                    ['.qz-xz-top-title h4 span', null, null, null, 30, null, [0, 8, 0, 17]],
                ]);
            });
        }


    });
}

// 样式方法封装
var setCss = {
    setSize: function (data, callback) {
        var style = ['id', 'width', 'height', 'lineHeight', 'fontSize', 'margin', 'padding'];
        for (var i = 0; i < data.length; i++) {
            for (var j = 1; j < data[i].length; j++) {
                if (data[i][j]) {
                    if (style[j] === 'margin' || style[j] === 'padding') {
                        var styStr = '';
                        for (var k = 0; k < data[i][j].length; k++) {
                            if (typeof data[i][j][k] == "number") {
                                styStr += data[i][j][k] * HW.ProportionSize + "px ";
                            } else {
                                styStr += data[i][j][k] + " ";
                            }
                        }
                    } else {
                        styStr = data[i][j] * HW.ProportionSize + "px";
                    }
                    $(data[i][0]).css(style[j], styStr);
                }
            }
        }
        if (callback) {
            callback();
        }
    }
};

// 加载样式之前
function beforeStyle() {
// 圈子判断是否已加入
    if ($(".qz-xz-top-title h4").attr('data-value') == 'add') {
        $(".qz-xz-top-title h4").html('<i>已加入</i>');
    } else {
        $(".qz-xz-top-title h4").html('<span>+</span>加入');
    }
}

// 样式
function setStyle() {
    // ['id', 'width', 'height', 'lineHeight', 'fontSize', 'margin', 'padding']
    var styleArray = [
        ['.swiper-first-Indexes .swiper-slide', null, 354, null, null, null, null],
        ['.swiper-first-Indexes .swiper-pagination-bullet', 22, 6, null, null, null, null],
        ['.sl-nav', 708, null, null, null, [0, 'auto', 9], null],
        ['.sl-nav img', 90, 90, null, null, null, null],
        ['.sl-nav h2', null, 90, null, null, [27, 0, 0, 0], null],
        ['.sl-nav p', null, 70, 70, 32, null, null],
        ['.sl-box', 702, null, null, null, [0, 'auto', 30], null],
        ['.sl-title', null, 89, null, null, null, null],
        ['.sl-title h2', null, 89, 89, 34, [0, 0, 0, 34], null],
        ['.sl-title p', null, 89, 89, 26, [0, 30, 0, 0], null],
        ['.sl-title p i', null, 89, 89, 36, [-3, 0, 0, 16], null],
        ['.sl-box-con', 645, null, null, null, [0, 'auto'], null],
        ['.sl-box-con-title', null, null, null, null, [25, 'auto', 0], null],
        ['.sl-box-con-title h2 i', 58, 58, null, null, null, null],
        ['.sl-box-con-title h2 span', 230, null, 58, 26, [0, 0, 0, 22], null],
        ['.sl-box-con-title h3', null, null, 58, 22, null, null],
        ['.sl-box-rmht-tite', null, 62, 62, 32, null, null],
        ['.sl-box-text', null, 72, 36, 26, null, null],
        ['.sl-box-share', null, 70, null, null, [19, 0, 0, 0], null],
        ['.sl-box-share-items h2', null, 70, 70, 34, null, null],
        ['.message-i', null, null, null, 36, null, null],
        ['.sl-box-share-items h2 img', 26, 26, null, null, [22, 0, 0, 0], null],
        ['.sl-box-share-items h3', null, 70, 70, 26, null, null],
        ['.sl-box-rmht-line', null, 9, null, null, null, null],
        ['.sl-box-hd', null, null, null, null, [26, 'auto', 0], null],
        ['.swiper-second-Indexes .swiper-slide', 645, 455, null, null, [0, 106, 0, 0], null],
        ['.swiper-slideh2', null, 202, null, null, null, null],
        ['.swiper-slide-h3', null, 64, 64, null, null, null],
        ['.swiper-slide-dress', null, null, null, null, null, [10, 0, 16, 0]],
        ['.swiper-slide-h3 i', null, 64, null, 32, [0, 33, 0, 28], null],
        ['.swiper-slide-h3 span', 92, 28, 28, 22, [17, 0, 0, 0], null],
        ['.swiper-slide-dress h4', null, 42, 42, null, null, null],
        ['.swiper-slide-dress h4 p', 30, null, null, 26, [0, 12, 0, 27], null],
        ['.swiper-slide-dress h4 span', null, null, null, 26, null, null],
        ['.sl-box-xs', null, 153, null, null, null, null],
        ['.sl-box-xs h2', 94, null, null, null, null, null],
        ['.sl-box-xs h3', 360, null, null, null, [0, 0, 0, 19], null],
        ['.sl-box-xs h3 p', null, 48, 48, 32, [26, 0, 0, 0], null],
        ['.sl-box-xs h3 span', null, 43, 43, 26, null, null],
        ['.sl-box-xs h4', null, 48, 48, 24, [26, 0, 0, 0], null],
        ['.sl-box-rmcmt-con', null, 175, null, null, null, null],
        ['.sl-box-rmcmt-con h2', 94, null, null, null, null, null],
        ['.sl-box-rmcmt-con h3', 480, null, null, null, [0, 0, 0, 20], null],
        ['.sl-box-rmcmt-con h3 p', null, 62, 62, 32, [21, 0, 0, 0], null],
        ['.sl-box-rmcmt-con h3 i', null, 30, 30, 24, null, null],
        ['.sl-box-rmcmt-con h3 span', null, 55, 55, 26, null, null],
        ['.sl-box-rmcmt-con h4', null, 175, 175, 36, null, null],
        ['.sl-box-wk-con', null, 218, null, null, null, null],
        ['.sl-box-wk-con h2', 220, null, null, null, null, null],
        ['.sl-box-wk-con h2 img', 220, 150, null, null, [35, 0, 0, 0], null],
        ['.sl-box-wk-con h3', 425, 218, null, null, null, null],
        ['.sl-box-wk-con h3 span', null, 66, 66, 32, [35, 0, 0, 0], [0, 0, 0, 25]],
        ['.sl-box-wk-con h3 p', null, 72, 36, 28, null, [0, 0, 0, 25]],
        ['.last-sl-box', null, null, null, null, [0, 'auto', 140], null],
        ['.bottom', null, 90, null, null, null, null],
        ['.bottom-box', 702, 90, null, null, [0, 'auto'], null],
        ['.botnav-items h2 img', 48, 42, null, null, null, null],
        ['.botnav-items h2', null, 42, null, null, [8, 0, 0, 0], null],
        ['.botnav-items p', null, 40, 40, 24, null, null],
        ['.botnav-items-max h2', 114, 103, null, null, [-26, 'auto', 0], null],
        // ['.navSuspension', 826, 826, null, null,null, null],
        // ['.navSuspensionInsert', 500, 500, null, null, null, null],
        ['.navSuspensionItems', 100, 95, null, null, null, null],
        ['.navSuspensionItems h2', 59, 59, null, null, null, null],
        ['.navSuspensionItems p', null, 32, 32, 24, [4, 0, 0, 0], null],
        // 话题列表
        ['.ht-list', null, null, null, null, [6, 'auto', 30], null],
        ['.ht-list .sl-box-con-title', null, null, null, null, null, [27, 0, 0, 0]],
        ['.ht-list-box', null, null, null, null, [0, 'auto', 150], null],
        // 话题详情
        ['.ht-list-xq', null, null, null, null, [21, 0, 0, 0], null],
        ['.ht-list-xq-con', 686, null, null, null, [0, 'auto'], null],
        ['.htxq-title', null, null, 48, 36, null, [35, 0, 0, 0]],
        ['.htxq-user', null, 60, 60, null, [42, 0, 0, 0], null],
        ['.htxq-user h2 i img', 60, 60, null, null, null, null],
        ['.htxq-user h2 span', 300, 60, null, 26, [0, 0, 0, 24], null],
        ['.htxq-user h3', null, null, null, 22, null, null],
        ['.ht-xq-con', null, null, 60, 32, [47, 0, 0, 0], null],
        ['.ht-xq-con img', null, null, null, null, [58, 0], null],
        ['.ht-xq-commt-title', null, 89, 89, null, null, [0, 32, 0, 32]],
        ['.ht-xq-commt-title ul li', null, null, null, null, null, [0, 0, 0, 26]],
        ['.ht-xq-commt-title ul li h2', null, null, null, 30, null, null],
        ['.ht-xq-commt-title ul li h3', null, null, null, 24, null, [0, 78, 0, 12]],
        ['.ht-list-xq-commt', null, null, null, null, null, [25, 0, 18, 0]],
        ['.ht-list-xq-commt h2', 58, null, null, null, [0, 22, 0, 0], null],
        ['.ht-list-xq-commt h2 img', 58, 58, null, null, [4, 0, 0, 0], null],
        ['.ht-list-xq-box', null, null, null, null, [21, 0, 120, 0], null],
        ['.ht-list-xq-commt-con', 600, null, null, null, null, null],
        ['.ht-list-xq-commt-con h3', null, 51, 51, null, null, null],
        ['.ht-list-xq-commt-con h3 span', null, null, null, 26, null, null],
        ['.ht-list-xq-commt-con h3 i', null, null, null, 22, null, null],
        ['.ht-list-xq-commt-con h4', null, null, 55, 30, null, null],
        ['.ht-comment-con p input', null, null, null, null, null, [0, 0, 0, 40]],
        // 评论框
        ['.ht-comment', null, 96, null, null, null, null],
        ['.ht-comment-con p', 570, 66, null, null, [16, 0, 0, 0], null],
        ['.ht-comment-con span', null, null, 96, 30, null, null],
        ['.ht-list-xq-dz-con h3', null, 66, 66, null, null, null],
        // 话题编辑
        ['.pen', 103, 103, null, null, null, null],
        ['.ht-edit', null, null, null, null, [30, 0, 0, 0], null],
        ['.ht-edit-title', null, 114, null, null, null, [8, 0, 0, 0]],
        ['.hteditTitle', null, null, null, 36, null, null],
        ['.ht-edit-text', null, null, null, null, [40, 0, 0, 0], null],
        ['.hteditText', null, null, 55, 36, null, null],
        ['.ht-edit-addImg', 198, 146, null, null, null, null],
        ['.ht-edit-addImg h2', null, 82, null, null, null, null],
        ['.ht-edit-addImg h2 img', null, 58, null, null, [24, 0, 0, 0], null],
        ['.ht-edit-addImg p', null, 39, 39, null, [10, 0, 64, 0], null],
        ['.ht-edit-con', null, null, null, null, null, [0, 0, 50, 0]],
        ['.ht-edit-btn', null, 86, null, null, [65, 0, 0, 0], null],
        ['.ht-edit-btn button', null, null, null, 30, null, null],
        // 活动
        ['.hd-list-main', null, null, null, null, [0, 0, 120, 0], null],
        ['.hd-list', null, null, null, null, [0, 30], [25, 0, 15, 0]],
        ['.hd-list-box', 705, null, null, null, [25, 'auto', 0], null],
        // 活动详情
        ['.hd-xq-box', null, null, null, null, [0, 0, 25, 0], null],
        ['.hd-xq-img', null, 355, null, null, null, null],
        ['.hd-xq-box-con', 690, null, null, null, [0, 'auto'], null],
        ['.hd-xq-dress h2', 680, 80, 80, 34, null, [20, 0, 0, 10]],
        ['.hd-xq-dress h3', 680, 80, 80, 30, null, [0, 0, 0, 10]],
        ['.hd-xq-dress h3 i', null, 80, 80, null, [0, 23, 0, 0], null],
        ['.i-hd-xq', null, null, null, 36, null, null],
        ['.hd-xq-box-con-title', null, 89, 89, 34, null, [0, 0, 0, 20]],
        ['.hd-xq-box-con-text', null, null, 60, 32, [0, 0, 150, 0], [35, 20, 50, 20]],
        // 圈子
        ['.qz-box', 705, null, null, null, [27, 'auto', 0], null],
        ['.qz-box-titleTop', null, 103, null, null, null, null],
        ['.qz-box-titleTop h2', null, 103, 103, 34, [0, 0, 0, 40], null],
        ['.qz-box-titleTop h3', 100, 48, 48, 24, [27, 37, 0, 0], null],
        ['.qz-box-titleTop h3 span', null, null, null, null, [0, 9, 0, 18], null],
        ['.qz-box-titleTop h3 i', null, null, null, 42, [2, 0, 0, 0], null],
        ['.qz-box-titleTop-con', null, null, null, null, [9, 0, 0, 0], null],
        ['.qz-box-titleTop-con h3', null, 107, 107, null, [0, 5], null],
        ['.qz-box-titleTop-con h3 i', 69, null, null, null, [0, 0, 0, 34], [19, 0, 0, 0]],
        ['.qz-box-titleTop-con h3 em', 350, null, null, 30, [0, 0, 0, 22], null],
        ['.qz-box-titleTop-con h3 span', null, null, null, 24, [0, 30, 0, 0], null],
        ['.qz-box-title', null, 89, 89, null, null, null],
        ['.qz-box-title h2', null, null, null, 34, [0, 0, 0, 37], null],
        ['.qz-box-title h3', null, null, null, null, [0, 29, 0, 0], null],
        ['.qz-box-title h3 span', null, null, null, 24, null, [0, 16, 0, 0]],
        ['.qz-box-title h3 i', null, null, 89, 40, null, null],
        ['.qz-box-myCreat', null, 260, null, null, null, null],
        ['.qz-box-myCreat ul li', 166, null, null, null, null, null],
        ['.qz-box-myCreat ul', null, 203, null, null, null, null],
        ['.qz-box-myCreatUl', null, 260, null, null, null, [37, 0, 0, 0]],
        ['.qz-box-myCreat ul li h2', 125, 125, null, null, [0, 'auto'], null],
        ['.qz-box-myCreat ul li p', null, 78, 78, 30, null, null],
        ['.qz-xztr', null, null, null, null, [0, 0, 150, 0], null],
        ['.qz-box-tr ul', null, null, null, null, [5, 0, 0, 0], null],
        ['.qz-box-tr ul li', null, null, null, null, [0, 6], [24, 30, 3, 30]],
        ['.qz-box-tr ul li h2', 30, null, null, null, null, null],
        ['.qz-box-tr ul li h2 img', 30, 29, null, null, [10, 0, 0, 0], null],
        ['.qz-box-tr ul li h3', 600, null, null, null, null, null],
        ['.qz-box-tr ul li h3 p', null, null, 47, 30, [0, 0, 0, 24], null],
        ['.qz-box-tr-con', null, 92, null, null, [0, 0, 0, 24], null],
        ['.qz-box-tr-con i', 40, 40, null, null, [26, 0, 0, 0], null],
        ['.qz-box-tr-con em', null, null, 92, 24, [0, 0, 0, 17], null],
        ['.qz-box-tr-con span', null, null, 92, 22, [0, 0, 0, 32], null],
        // 圈子小组
        ['.qz-xz-top-title', null, 125, null, null, [0, 36], [53, 0, 0, 0]],
        ['.qz-xz-top-title h2', 125, 125, null, null, [0, 0, 0, 3], null],
        ['.qz-xz-top-title h3', null, null, null, null, [0, 0, 0, 30], null],
        ['.qz-xz-top-title h3 span', 350, 60, 60, 36, null, null],
        ['.qz-xz-top-title h3 p', null, 64, 64, 28, null, null],
        ['.qz-xz-top-title h4', 114, 56, 56, 24, [14, 0, 0, 0], null],
        ['.qz-xz-top-title h4 span', null, null, null, 30, null, [0, 8, 0, 17]],
        ['.qz-xz-top-text', null, null, null, null, [22, 36, 0, 36], [0, 0, 45, 0]],
        ['.qz-xz-top-text h2', 620, null, 41, 28, null, null],
        ['.qz-xz-top-text h3', null, 81, 81, null, null, null],
        ['.qz-xz-list-box', null, null, null, null, [27, 0, 50, 0], null],
        ['.qz-xz-list-text', null, null, null, null, [0, 24], null],
        // 小组推荐
        ['.xztj-top', null, 90, null, null, null, null],
        ['.xztj-top h2', 552, 56, null, null, [16, 0, 0, 28], null],
        ['.xztj-top h2 span', 67, null, null, null, null, null],
        ['.xztj-top h2 span img', 28, 28, null, null, [16, 0, 0, 0], null],
        ['.xztj-top h2 p', 470, 56, null, null, null, null],
        ['.xztj-top h2 p input', null, 54, null, 26, null, null],
        ['.xztj-top h3', 134, 55, 55, 26, [19, 17, 0, 0], null],
        ['.xztj-con', null, null, null, null, [0, 30], [12, 0, 15, 0]],
        ['.xztj-main-con', null, null, null, null, [0, 0, 150, 0], null],
        ['.xzjj-box', null, null, null, null, [0, 40], [60, 0, 0, 0]],
        ['.xzjj-box h2', null, null, 47, 28, [0, 0, 34, 0], null],
        // 我的
        ['.my-top', null, 345, null, null, null, null],
        ['.my-top-user', null, 111, null, null, null, [66, 0, 0, 38]],
        ['.my-top-user h2', 110, 110, null, null, [0, 26, 0, 0], null],
        ['.my-top-user h3', null, 103, 103, 36, null, null],
        ['.my-top-user h4', 72, 34, 34, 24, [32, 0, 0, 24], null],
        ['.my-top-title', 702, 150, null, null, [32, 'auto', 0], null],
        ['.my-top-title ul li', 230, 95, null, null, [28, 0, 0, 0], null],
        ['.my-top-title ul li h2', null, null, 42, 36, null, null],
        ['.my-top-title ul li p', null, null, 53, 28, null, null],
        ['.my-con', null, null, null, null, [40, 0, 0, 0], null],
        ['.my-con ul', null, null, null, null, [0, 32], [10, 0, 10, 0]],
        ['.my-con ul li', null, 100, 100, null, null, null],
        ['.my-con ul li h2', 41, 41, null, null, [30, 24, 0, 30], null],
        ['.my-con ul li h3', 380, null, null, 30, null, null],
        ['.my-con ul li h4', null, null, 100, 28, null, null],
        ['.my-con ul li h4 i', null, null, 100, 40, [-2, 32, 0, 20], null],
        // 我的话题
        ['.my-ht-top', null, 118, null, null, [0, 20], null],
        ['.my-ht-top ul li h2', null, 85, 85, 30, [16, 0, 0, 0], null],
        ['.my-ht-top ul li p', 93, 5, null, null, null, null],
        // 未实名
        ['.wsm-box-top', null, 300, null, null, null, null],
        ['.wsm-box-con', null, null, null, null, [30, 0, 0, 0], null],
        ['.wsm-box-form', null, null, null, null, [0, 40], [10, 0]],
        ['.wsm-box-form ul li', null, 105, null, null, null, null],
        ['.wsm-box-form ul li h2', 105, 105, 105, 30, [0, 0, 0, 10], null],
        ['.wsm-box-form ul li h3', 545, 105, null, null, null, null],
        ['.wsm-box-form ul li h3 p input', null, null, null, 28, null, null],
        ['.wsm-input', null, null, null, 28, null, null],
        ['.wsm-input-yzm', 375, null, null, null, [0, 28, 0, 0], null],
        ['.wsm-box-form ul li h3 span', 140, 40, 40, 24, [32, 0, 0, 0], null],
        ['.wsm-box-btn', null, 86, null, null, [95, 20], null],
        ['.wsm-box-btn button', null, null, null, 30, null, null],
        ['.yrz-box', null, null, null, null, [0, 40], null],
        ['.yrz-box ul li', null, 106, 106, null, null, null],
        ['.yrz-box ul li h2', null, null, null, 30, [0, 0, 0, 12], null],
        ['.yrz-box ul li h3', null, null, null, null, [0, 9, 0, 0], null],
        ['.yrz-box ul li h3 span', null, null, 106, 28, null, null],
        ['.yrz-box ul li h3 i', null, null, 106, 40, [-4, 0, 0, 25], null],
        ['.yrz-xg', null, 107, null, null, [0, 10], null],
        ['.yrz-xg h2 input', null, null, null, 28, null, null],
        ['.yrz-xg h3', 26, 26, 26, 24, null, null],
        ['.yrz-xg-box-btn', null, null, null, null, [68, 20], null],
        // 系统设置
        ['.xtsz', null, 112, 112, null, [0, 52], null],
        ['.xtsz h2', null, null, null, 30, null, null],
        ['.xtsz h3', null, null, null, 28, null, null],
        // 暂未开启
        ['.wait', null, null, null, null, null, null],
        ['.wait h2', 581, 394, null, null, [192, 'auto', 0], null],
        ['.wait h3', null, 64, 64, 36, [77, 0, 0, 0], null],
        // 悬赏
        ['.xs-box-list', null, null, null, null, [26, 24], null],
        ['.xs-box-list-items', null, null, null, null, [0, 0, 30, 0], null],
        // 悬赏内容
        ['.xsnr-top', null, 148, null, null, [30, 24, 0, 24], null],
        ['.xsnr-top h2', 92, 95, null, null, [30, 0, 0, 30], null],
        ['.xsnr-top h3', null, null, null, null, [0, 0, 0, 26], null],
        ['.xsnr-top h3 span', 500, 59, 59, 30, [20, 0, 0, 0], null],
        ['.xsnr-top h3 p', 500, 47, 47, 24, null, null],
        ['.xsnr-top h3 p i', null, null, null, 26, [0, 10, 0, 0], null],
        ['.xsnr-box-title', null, null, null, null, [31, 0, 0, 0], [12, 26, 6, 26]],
        ['.xsnr-box-title h2', null, 77, 77, 34, null, [0, 16]],
        ['.xsnr-box-title h3', null, null, 58, 30, [18, 0], [0, 16]],
        ['.xsnr-box-title h4', 202, 202, null, null, [23, 'auto', 80], null],
        ['.xsnr-boxh3-text', null, null, null, null, [25, 0, 40, 0], null],
        // 悬赏发布
        ['.xsfb-box', null, null, null, null, null, [0, 39]],
        ['.xsfb-box01', null, null, null, null, [32, 0, 0, 0], null],
        ['.xsfb-box-title01', null, null, 104, null, null, null],
        ['.xsfb-box-title01 h2', null, 104, 104, 30, null, null],
        ['.xsfb-box-title01 h3', 440, 104, null, null, null, null],
        ['.xsfb-box-title02', null, null, null, null, [7, 0, 0, 0], null],
        ['.xsfb-box-title02 h4 span', 56, 46, null, null, [29, 4, 0, 4], null],
        ['.xsfb-box-title02 h4 i', null, null, 104, 36, [0, 8, 0, 8], null],
        ['.xsfb-box-title03 h5', null, 250, null, null, null, [0, 0, 35, 0]],
        ['.xsfb-box-title03 h5 textarea', null, null, null, 28, null, [0, 0, 0, 14]],
        ['.xsfb-box-title03 h5 i', 4, 30, null, null, [0, 0, 0, 0], null],
        ['.xsfb-box-title02 h6', null, null, null, null, null, null],
        ['.xsfb-box-title02 h6 i', null, 104, 104, 28, null, null],
        ['.xsfb-box-title02 h6 p', 70, 104, 104, null, [0, 5], null],
        ['.xsfb-box-title02 h6 p input', null, 100, null, 28, null, null],
        ['.xsfb-box-title02 h6 i span', null, 104, 104, 28, null, null],
        ['.xsfb-box-title02 strong', null, 104, null, null, null, null],
        ['.xsfb-box-title02 strong i', null, 104, 104, 36, [2, 0, 0, 11], null],
        ['.xsfb-submit', null, null, null, null, [54, 24, 37, 24], null]
    ];
    setCss.setSize(styleArray, function () {
        $(".sl-box .sl-box-rmht").eq(0).find('.sl-box-rmht-line').hide();
        $(".swiper-slide-h3 i").css('maxWidth', 480 * HW.ProportionSize + "px");
        $(".hideBox").show();
        $(".ht-xq-con img").each(function () {
            var _this = this;
            if ($(_this).width() > $(".ht-xq-con").width()) {
                $(_this).width($(".ht-xq-con").width());
            }
        });
        $(".ht-list-xq-box .ht-pl-dz").eq(0).show();
        $(".ht-xq-commt-title ul li").each(function (index) {
            $(this).click(function () {
                $(".ht-xq-commt-title ul li").find('h2').removeClass('commt-htActive');
                $(this).find('h2').addClass('commt-htActive');
                $(".ht-list-xq-box .ht-pl-dz").eq(index).show().siblings('.ht-pl-dz').hide();
                if (index === 0) {
                    $(".ht-comment").show();
                } else {
                    $(".ht-comment").hide();
                }
            });
        });
        $(".ht-comment-con p").css({
            'borderRadius': $(".ht-comment-con p").height() * 0.45 + "px"
        });
        $(".ht-edit-btn").css({
            'borderRadius': $(".ht-edit-btn").height() * 0.46 + "px"
        });
        $(".qz-create-ul ul").width($(".qz-create-ul ul li").width() * $(".qz-create-ul ul li").length);
        $(".qz-add-ul ul").width($(".qz-add-ul ul li").width() * $(".qz-add-ul ul li").length);
        $(".navSuspensionHd").css('top', 95 * HW.ProportionSize + "px");
        $(".navSuspensionXs").css('top', 34 * HW.ProportionSize + "px");
        $(".navSuspensionCmt").css('top', 34 * HW.ProportionSize + "px");
        $(".navSuspensionWk").css('top', 95 * HW.ProportionSize + "px");
        $(".xztj-top h3").css({
            'borderRadius': $(".xztj-top h3").height() * 0.5 + "px"
        });
        $(".my-top-user h3").css('maxWidth', 450 * HW.ProportionSize + "px");
        // 我的话题
        $(".my-ht-con .my-ht-con-items").eq(0).show();
        $(".my-ht-top ul li").each(function (index) {
            $(this).click(function () {
                $(this).addClass('my-ht-topActive').siblings().removeClass('my-ht-topActive');
                $(".my-ht-con .my-ht-con-items").eq(index).show().siblings().hide();
            });
        });
        $(".wsm-box-btn").css({
            'borderRadius': $(".wsm-box-btn").height() * 0.5 + "px"
        });
        $(".yrz-xg h3").css('top', ($(".yrz-xg").height() - $(".yrz-xg h3").height()) * 0.5 + "px");
        $(".yrz-xg h3").click(function () {
            $(".yrz-xg h2 input").val('');
            $(".yrz-xg h2 input").focus();

        });
        var crateInputLength = $(".xsfb-box-title02 h6 p").width();
        $(".xsfb-box-title02 h6 p input").on('input onpropertychange', function () {
            if (crateInputLength < 370 * HW.ProportionSize) {
                $(this).parent('p').width($(this).val().length * 16 * HW.ProportionSize);
                crateInputLength = $(this).val().length * 15 * HW.ProportionSize;
            }
        });
    });
}

// 活动详情弹窗
function actPopup(callback) {
    var createPopUpHtml = '<div class="activityPopup">\n' +
        '    <div class="activityPopupCon">\n' +
        '        <div class="activityPopupTitle"><img src="images/hdpop.png" alt=""></div>\n' +
        '        <div class="activityPopupTitletext">温馨提示</div>\n' +
        '        <div class="activityPopupConText">\n' +
        '            <h2>您确认“<span>要参加</span>”此次活动吗？若确认请点击“<span>确定</span>”按钮，稍后云天管理员会与您取得联系，请保持电话畅通。</h2>\n' +
        '            <h3>\n' +
        '                <button class="activeNo">取消</button>\n' +
        '                <button class="activeYes">确定</button>\n' +
        '            </h3>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';
    $("body").append(createPopUpHtml);
    $(".activityPopup").height(document.documentElement.clientHeight);
    var styleArray = [
        ['.activityPopupCon', 600, 660, null, null, null, null],
        ['.activityPopupTitle', 600, 220, null, null, null, null],
        ['.activityPopupTitletext', null, 105, 108, 48, null, [8, 0, 0, 0]],
        ['.activityPopupConText h2', null, null, 60, 30, null, [0, 40]],
        ['.activityPopupConText h3', null, null, null, null, null, [30, 0, 45, 0]],
        ['.activityPopupConText h3 button', 230, 68, null, 30, null, null],
        ['.activeNo', null, null, null, null, [0, 0, 0, 45], null],
        ['.activeYes', null, null, null, 30, [0, 45, 0, 0], null],
    ];
    setCss.setSize(styleArray);
    $(".activityPopupCon").css({
        'top': (document.documentElement.clientHeight - $(".activityPopupCon").height()) * 0.45 + "px",
        'left': (document.documentElement.clientWidth - $(".activityPopupCon").width()) * 0.5 + "px",
    });
    $(".activityPopupConText h3 button").css({
        'borderRadius': $(".activityPopupConText h3 button").height() * 0.55 + "px"
    });
    $(".activityPopup").fadeIn(150);
    $(".activeNo").click(function () {
        $(".activityPopup").fadeOut(150,function () {
            $(".activityPopup").remove();
        });
    });
    $(".activeYes").click(function () {
        if (callback) {
            callback();
        }
        $(".activityPopup").fadeOut(150,function () {
            $(".activityPopup").remove();
        });
    });
}

// 圈子关注弹窗
var circleFollowPopup = {
    followPopup: function (callback) {
        var createPopUpHtml = '<div class="qzGzPopup">\n' +
            '    <div class="qzGzPopupCon">\n' +
            '        <div class="qzGzPopupConTitle">加入成功</div>\n' +
            '        <div class="qzGzPopupH2"><img src="images/qzPop.png" alt=""></div>\n' +
            '        <div class="qzGzPopup-box-con">\n' +
            '            <div class="qzGzPopup-edit-btn">\n' +
            '                <button class="qz-select-btn">确定</button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';
        $("body").append(createPopUpHtml);
        $(".qzGzPopup").height(document.documentElement.clientHeight);
        var styleArray = [
            ['.qzGzPopupCon', 600, 568, null, null, null, null],
            ['.qzGzPopupConTitle', null, 160, 160, 36, [28, 0, 0, 0], null],
            ['.qzGzPopupH2', 334, 201, null, null, null, null],
            ['.qzGzPopup-box-con', null, null, null, null, [0, 32], null],
            ['.qzGzPopup-edit-btn', null, 75, null, null, [55, 0, 0, 0], null],
            ['.qzGzPopup-edit-btn button', null, 75, null, 30, null, null]
        ];
        setCss.setSize(styleArray);
        $(".qzGzPopup-edit-btn").css({
            'borderRadius': $(".qzGzPopup-edit-btn").height() * 0.45 + "px"
        });
        $(".qzGzPopupCon").css({
            'top': (document.documentElement.clientHeight - $(".qzGzPopupCon").height()) * 0.45 + "px",
            'left': (document.documentElement.clientWidth - $(".qzGzPopupCon").width()) * 0.5 + "px",
        });
        $(".qzGzPopup").hide();
        $(".qzGzPopup").fadeIn(150);
        $(".qz-select-btn").click(function () {
            $(".qzGzPopup").fadeOut(150,function () {
                $(".qzGzPopup").remove();
                if (callback) {
                    callback();
                }
            });
        });
    },
    delFollowPopup: function (callback) {
        var createPopUpHtml = '<div class="qzGzPopup">\n' +
            '    <div class="qzGzPopupCon">\n' +
            '        <div class="qzGzPopupConTitle">退出小组</div>\n' +
            '        <div class="qzdelGzPopupH2"><img src="images/qzdelPop.png" alt=""></div>\n' +
            '        <div class="qzGzPopup-box-con">\n' +
            '            <div class="qzdelGzPopup-edit-btn">\n' +
            '                <button class="qz-gz-btn">取消</button>\n' +
            '                <button class="qz-del-gz-btn">确定</button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';
        $("body").append(createPopUpHtml);
        $(".qzGzPopup").height(document.documentElement.clientHeight);
        var styleArray = [
            ['.qzGzPopupCon', 600, 568, null, null, null, null],
            ['.qzGzPopupConTitle', null, 160, 160, 36, [28, 0, 0, 0], null],
            ['.qzdelGzPopupH2', 291, 243, null, null, null, null],
            ['.qzGzPopup-box-con', null, null, null, null, [0, 32], null],
            ['.qzdelGzPopup-edit-btn', null, null, null, null, [29, 0, 0, 0], null],
            ['.qzdelGzPopup-edit-btn button', 230, 68, null, 30, null, null],
            ['.qz-gz-btn', null, null, null, null, [0, 0, 0, 16], null],
            ['.qz-del-gz-btn', null, null, null, null, [0, 16, 0, 0], null],
        ];
        setCss.setSize(styleArray);
        $(".qzdelGzPopup-edit-btn button").css({
            'borderRadius': $(".qzdelGzPopup-edit-btn button").height() * 0.6 + "px"
        });
        $(".qzGzPopupCon").css({
            'top': (document.documentElement.clientHeight - $(".qzGzPopupCon").height()) * 0.45 + "px",
            'left': (document.documentElement.clientWidth - $(".qzGzPopupCon").width()) * 0.5 + "px",
        });
        $(".qzGzPopup").hide();
        $(".qzGzPopup").fadeIn(150);
        $(".qz-gz-btn").click(function () {
            $(".qzGzPopup").fadeOut(150,function () {
                $(".qzGzPopup").remove();
            });
        });
        $(".qz-del-gz-btn").click(function () {
            $(".qzGzPopup").fadeOut(150,function () {
                $(".qzGzPopup").remove();
                if (callback) {
                    callback();
                }
            });
        });
    }
};

// 底部的悬浮按钮
function suspensionBtn() {
    $(".botnav-items-max").click(function () {
        if ($(this).attr('data-select') == 'no') {
            $(this).addClass('botnavMiddleActive');
            $(".navSuspension").show();
            $(".navSuspension").animate({
                'width': 820 * HW.ProportionSize + "px",
                'height': 820 * HW.ProportionSize * 0.35 + "px",
                'bottom': 0 + "px",
                'left': -(820 * HW.ProportionSize - HW.width) * 0.5 + "px",
            }, 150, function () {
                $(".navSuspensionInsert").show();
            });
            $(this).attr('data-select', 'yes');
        } else {
            $(this).removeClass('botnavMiddleActive');
            $(".navSuspension").show();
            $(".navSuspensionInsert").hide();
            $(".navSuspension").animate({
                'width': 0 + "px",
                'height': 0 + "px",
                'bottom': 0 + "%",
                'left': 50 + "%",
            }, 150);
            $(this).attr('data-select', 'no');
        }
    });
    $(document).click(function () {
        if ($(".navSuspension").attr('data-blur') == 'blur' && $(".botnav-items-max").attr('data-blur') == 'blur') {
            $(".botnav-items-max").removeClass('botnavMiddleActive');
            $(".navSuspension").show();
            $(".navSuspensionInsert").hide();
            $(".navSuspension").animate({
                'width': 0 + "px",
                'height': 0 + "px",
                'bottom': 0 + "%",
                'left': 50 + "%",
            }, 150);
            $(".botnav-items-max").attr('data-select', 'no');
        }
    });
    $(".navSuspension").blur(function () {
        $(".navSuspension").attr('data-blur', 'blur');
    });
    $(".navSuspension").focus(function () {
        $(".navSuspension").attr('data-blur', 'focus');
    });
    $(".botnav-items-max").blur(function () {
        $(".botnav-items-max").attr('data-blur', 'blur');
    });
    $(".botnav-items-max").focus(function () {
        $(".botnav-items-max").attr('data-blur', 'focus');
    });
}