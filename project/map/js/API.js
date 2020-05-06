// 泰安市整体攻击态势
function holisticAttackApi() {
    // 攻击次数
    $(".title-left-i").text(500);
    $(".title-right-i").text(500 * 0.5);
    // 国外IP排名 TOP7
    var arr01 = {
        name: ['192.110.12.1', '192.110.12.1', '192.110.12.1', '192.110.12.1', '192.110.12.1', '192.110.12.1', '192.110.12.1'],
        val: [1.66, 2.86, 1.82, 1.8, 1.53, 1.47, 1.3]
    };
    ranking(arr01, '#01fff7', "left01");
    // 国内IP排名 TOP7
    var arr02 = {
        name: ['192.110.12.1', '192.110.12.1', '192.110.12.1', '192.110.12.1', '192.110.12.1', '192.110.12.1', '192.110.12.1'],
        val: [1.66, 2.86, 1.82, 1.8, 1.53, 1.47, 1.3]
    };
    ranking(arr02, '#fb815b', "right01");

    // 国外攻击手法分布
    var arr03 = [
        {value: 335, legendname: '恶意小程序'},
        {value: 310, legendname: '摆渡攻击'},
        {value: 234, legendname: '木马植入'},
        {value: 154, legendname: '登录用户爆破'},
        {value: 154, legendname: '服务器端口漏洞'}
    ];
    AttackTechnique(arr03, "left02");
    // 国内攻击手法分布
    var arr04 = [
        {value: 335, legendname: '恶意小程序'},
        {value: 310, legendname: '摆渡攻击'},
        {value: 234, legendname: '木马植入'},
        {value: 154, legendname: '登录用户爆破'},
        {value: 154, legendname: '服务器端口漏洞'}
    ];
    AttackTechnique(arr04, "right02");
    var arr05 = [
        {attackToIp: '192.168.2.3', company: "泰安市公安局1", industry: "政府", attackIp: '192.110.12.1', time: "2020-03-28"},
        {attackToIp: '192.168.2.3', company: "泰安市公安局2", industry: "政府", attackIp: '192.110.12.1', time: "2020-03-28"},
        {attackToIp: '192.168.2.3', company: "泰安市公安局3", industry: "政府", attackIp: '192.110.12.1', time: "2020-03-28"},
        {attackToIp: '192.168.2.3', company: "泰安市公安局4", industry: "政府", attackIp: '192.110.12.1', time: "2020-03-28"},
        {attackToIp: '192.168.2.3', company: "泰安市公安局5", industry: "政府", attackIp: '192.110.12.1', time: "2020-03-28"},
        {attackToIp: '192.168.2.3', company: "泰安市公安局6", industry: "政府", attackIp: '192.110.12.1', time: "2020-03-28"},
        {attackToIp: '192.168.2.3', company: "泰安市公安局7", industry: "政府", attackIp: '192.110.12.1', time: "2020-03-28"}
    ];
    scrollTable(arr05);
    var arr07 = [
        {abroad: "1", attack: {name: "纽约", data: [-73.864827, 40.844782]}, to: {name: "泰山区", data: [117.14141, 36.199443]}},
        {abroad: "1", attack: {name: "伦敦", data: [-0.127758, 51.507349]}, to: {name: "岱岳区", data: [117.048552, 36.19329]}, level: 1},
        {abroad: "1", attack: {name: "纽约", data: [-73.864827, 40.844782]}, to: {name: "新泰市", data: [117.774608, 35.914621]}},
        {abroad: "1", attack: {name: "伦敦", data: [-0.127758, 51.507349]}, to: {name: "宁阳县", data: [116.812576, 35.76454]}},
        {abroad: "0", attack: {name: "上海", data: [121.48054, 31.235929]}, to: {name: "宁阳县", data: [116.812576, 35.76454]}},
        {abroad: "0", attack: {name: "广州", data: [113.271429, 23.135336]}, to: {name: "东平县", data: [116.477598, 35.941908]}},
        {abroad: "0", attack: {name: "济南", data: [117.126399, 36.656554]}, to: {name: "新泰市", data: [117.774608, 35.914621]}, level: 1},
        {abroad: "1", attack: {name: "巴西", data: [-51.92528, -14.235004]}, to: {name: "肥城市", data: [116.775404, 36.188812]}},
        {abroad: "1", attack: {name: "巴西", data: [-51.92528, -14.235004]}, to: {name: "东平县", data: [116.477598, 35.941908]}},
        {abroad: "0", attack: {name: "北京", data: [116.413387, 39.910924]}, to: {name: "泰山区", data: [117.14141, 36.199443]}},
        {abroad: "0", attack: {name: "上海", data: [121.48054, 31.235929]}, to: {name: "岱岳区", data: [117.048552, 36.19329]}},
        {abroad: "0", attack: {name: "广州", data: [113.271429, 23.135336]}, to: {name: "肥城市", data: [116.775404, 36.188812]}}
    ];
    attackMap(arr07);


}

// 泰安市重保单位统计中心
function reinsuranceStatistical() {
    // 重保单位
    $(".statistics-right-title ul li").eq(0).find("h3 span").text(10);
    $(".statistics-right-title ul li").eq(1).find("h3 span").text(20);
    // 重保单位行业统计
    var arr01 = {
        name: ['综合行业', '电信运营', '电力运营', '交运物流', '民航机场', '软件服务', '电子元件', '文教休闲', '医疗行业', '文化传媒', '公用事业', '其他'],
        data: [20, 60, 92, 55, 60, 98, 22, 89, 95, 150, 110, 150]
    };
    echart_right01(arr01);
    // 重保单位风险等级
    var arr02 = [
        {value: 335, name: '高危'},
        {value: 310, name: '中危'},
        {value: 234, name: '低危'},
        {value: 154, name: '安全'}
    ];
    echart_ritht02(arr02);
    // 单位等级
    var arr03 = [
        {value: 38, name: '一级'},
        {value: 5, name: '二级'},
        {value: 9, name: '三级'},
        {value: 22, name: '四级'},
        {value: 26, name: '五级'}
    ];
    echart_right03(arr03);


    // 百度地图API功能
    baidu_map(function (setMapImages, map) {
        // 选择框
        var arr = [
            {
                title: "单位等级",
                column: 3,
                data: ["一级", "二级", "三级", "四级", "五级"],
                value: [1, 2, 3, 6, 4]
            },
            {
                title: "行业类别",
                column: 2,
                data: ["综合行业", "电信运营", "电力行业", "交运物流", "民航机场", "软件服务", "电子元件", "文教休闲", "医疗行业", "文化传媒", "软件服务", "公用事业", "其他等"],
                value: [1, 2, 3, 6, 4, 1, 2, 3, 6, 4, 1, 2, 3]
            },
            {
                title: "风险等级",
                column: 3,
                data: ["高危", "中危", "低危", "安全"],
                value: [1, 2, 3, 6]
            },
            {
                title: "服务类型",
                column: 2,
                data: ["Web服务", "文件服务", "DNS服务", "中间件服务", "FTP服务", "邮件服务", "流媒体服务", "域控服务", "其他"],
                value: [1, 2, 3, 6, 4, 1, 2, 3, 6]
            }
        ];
        createCheck(arr);

        var dataList = [
            {name: "泰山区", data: [117.14141, 36.199443], img: "01.png"},
            {name: "岱岳区", data: [117.048552, 36.19329], img: "02.png"},
            {name: "肥城市", data: [116.775404, 36.188812], img: "03.png"},
            {name: "新泰市", data: [117.774608, 35.914621], img: "04.png"},
            {name: "宁阳县", data: [116.812576, 35.76454], img: "05.png"},
            {name: "东平县", data: [116.477598, 35.914621], img: "01.png"}
        ];
        for (var j = 0; j < dataList.length; j++) {
            setMapImages(
                dataList[j].data,
                "ico/" + dataList[j].img,
                "",
                {w: 40, h: 40}
            );
        }

    });


}

