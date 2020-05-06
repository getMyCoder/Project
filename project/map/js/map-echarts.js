window.onload = function () {
    document.getElementById("map-container").style.height = document.documentElement.clientHeight + "px";
};
var timerOver = null,setOutTime=null;

function attackMap(data, callback) {
    // $('#world-map').empty()
    // $('#china-map').empty()
    // $('#taian-map').empty()
    // data.world = world_map(data.world);
    $(".removeItems").remove();

    $(".svg").remove();
    $(".left-world").find("i").remove();
    $(".right-china").find("i").remove();
    $(".attack-h4").remove();
    $(".mapCover").remove();


    var newDataW = world_map(data);
    // data.china = china_map(data.china);
    var newDataC = china_map(newDataW);

    taian_world(newDataC, callback);
}

function world_map(data) {
    var world_data = data;
    var myChart = echarts.init(document.getElementById("world-map"));
    var chinaGeoCoordMap = {
        "": [116.4551, 40.2539]
    };
    var chinaDatas = [];
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = chinaGeoCoordMap[dataItem[0].name];
            var toCoord = [116.4551, 40.2539];
            if (fromCoord && toCoord) {
                res.push([{
                    coord: toCoord
                }, {
                    coord: fromCoord,
                    value: dataItem[0].value
                }]);
            }
        }
        return res;
    };
    var series = [];
    [["", chinaDatas]].forEach(function (item, i) {
        series.push({
                type: "lines",
                zlevel: 2,
                effect: {
                    show: true,
                    period: 4, //箭头指向速度，值越小速度越快
                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    // symbol: 'image://http://localhost:63342/company/echarts/images/log03.png',
                    symbolSize: [10, 25], //图标大小
                    symbolRotate: 10
                },
                lineStyle: {
                    normal: {
                        width: 1, //尾迹线条宽度
                        opacity: 1, //尾迹线条透明度
                        curveness: .3 //尾迹线条曲直度
                    }
                },
                data: convertData(item[1])
            }, {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: { //涟漪特效
                    period: 4, //动画时间，值越小速度越快
                    brushType: "stroke", //波纹绘制方式 stroke, fill
                    scale: 4 //波纹圆环最大限制，值越大波纹越大
                },
                label: {
                    normal: {
                        show: true,
                        position: "right", //显示位置
                        offset: [5, 0], //偏移设置
                        formatter: function (params) {//圆环显示文字
                            return params.data.name;
                        },
                        fontSize: 13
                    },
                    emphasis: {
                        show: true
                    }
                },
                symbol: "circle",
                symbolSize: function (val) {
                    return 5 + val[2] * 5; //圆环大小
                },
                itemStyle: {
                    normal: {
                        show: false,
                        color: "red"
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[0].name,
                        value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                    };
                })
            },
            //被攻击点
            {
                type: "scatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: "stroke",
                    scale: 4
                },
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        //offset:[5, 0],
                        color: "red",
                        formatter: "{b}",
                        textStyle: {
                            color: "rgba(244,235,41,0.2)"
                        }
                    },
                    emphasis: {
                        show: true,
                        color: "#f60"
                    }
                },
                symbol: "pin",
                symbolSize: 1,
                data: [{
                    name: item[0],
                    value: chinaGeoCoordMap[item[0]].concat([1])
                }]
            }
        );
    });
    option = {
        tooltip: {
            trigger: "item",
            backgroundColor: "rgba(166, 200, 76, 0.82)",
            borderColor: "#FFFFCC",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: "z-index:100",
            formatter: function (params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value[params.seriesIndex + 1];
                res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                return res;
            }
        },
        // backgroundColor: "#013954",
        visualMap: { //图例值控制
            min: 0,
            max: 1,
            calculable: true,
            show: false,
            color: ["rgba(244,235,41,0.2)"],
            textStyle: {
                color: "#fff"
            }
        },
        geo: {
            map: "world",
            zoom: 1,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false, //是否允许缩放
            itemStyle: {
                normal: {
                    color: "rgba(0,0,0, .3)", //地图背景色
                    borderColor: "#516a89", //省市边界线00fcff 516a89
                    borderWidth: 1
                },
                emphasis: {
                    color: "rgba(37, 43, 61, .5)" //悬浮背景
                }
            }
        },
        series: series
    };
    myChart.setOption(option, true);
    // 获取系列
    var seriesModel = myChart.getModel().getSeriesByIndex(option.series.length - 1);
// 获取地理坐标系实例
    var coordSys = seriesModel.coordinateSystem;

    var getDomWorld = {
        attack: {
            top: $("#world-map").offset().top,
            left: $("#world-map").offset().left
        }
    }, getDomChina = {
        attack: {
            top: $("#china-map").offset().top,
            left: $("#china-map").offset().left
        }
    }, attackChange = null, attackPos = null;


    for (var c = 0; c < world_data.length; c++) {
        attackPos = coordSys.dataToPoint([world_data[c].attack.data[0], world_data[c].attack.data[1]]);

        if (world_data[c].abroad == 1 || world_data[c].abroad == "1") {
            world_data[c].attack.data = [
                attackPos[0] + getDomWorld.attack.left,
                attackPos[1] + getDomWorld.attack.top
            ];
        }
    }

    return world_data;


    // for (var i = 0; i < world_data.length; i++) {
    //     attackChange = coordSys.dataToPoint([world_data[i].attack.data[0], world_data[i].attack.data[1]]);
    //     world_data[i].attack.data[0] = attackChange[0] + getDom.attack.left;
    //     world_data[i].attack.data[1] = attackChange[1] + getDom.attack.top;
    // }
    // return world_data;

}

function china_map(data) {
    var china_data = data;
    var myChart = echarts.init(document.getElementById("china-map"));
    var chinaGeoCoordMap = {
        "": [116.4551, 40.2539]
    };
    var chinaDatas = [];
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = chinaGeoCoordMap[dataItem[0].name];
            var toCoord = [116.4551, 40.2539];
            if (fromCoord && toCoord) {
                res.push([{
                    coord: toCoord
                }, {
                    coord: fromCoord,
                    value: dataItem[0].value
                }]);
            }
        }
        return res;
    };
    var series = [];
    [["", chinaDatas]].forEach(function (item, i) {
        series.push({
                type: "lines",
                zlevel: 2,
                effect: {
                    show: true,
                    period: 4, //箭头指向速度，值越小速度越快
                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    // symbol: 'image://http://localhost:63342/company/echarts/images/log03.png',
                    symbolSize: [10, 25], //图标大小
                    symbolRotate: 10
                },
                lineStyle: {
                    normal: {
                        width: 1, //尾迹线条宽度
                        opacity: 1, //尾迹线条透明度
                        curveness: .3 //尾迹线条曲直度
                    }
                },
                data: convertData(item[1])
            }, {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: { //涟漪特效
                    period: 4, //动画时间，值越小速度越快
                    brushType: "stroke", //波纹绘制方式 stroke, fill
                    scale: 4 //波纹圆环最大限制，值越大波纹越大
                },
                label: {
                    normal: {
                        show: true,
                        position: "right", //显示位置
                        offset: [5, 0], //偏移设置
                        formatter: function (params) {//圆环显示文字
                            return params.data.name;
                        },
                        fontSize: 13
                    },
                    emphasis: {
                        show: true
                    }
                },
                symbol: "circle",
                symbolSize: function (val) {
                    return 5 + val[2] * 5; //圆环大小
                },
                itemStyle: {
                    normal: {
                        show: false,
                        color: "red"
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[0].name,
                        value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                    };
                })
            },
            //被攻击点
            {
                type: "scatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: "stroke",
                    scale: 4
                },
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        //offset:[5, 0],
                        color: "red",
                        formatter: "{b}",
                        textStyle: {
                            color: "rgba(244,235,41,0.2)"
                        }
                    },
                    emphasis: {
                        show: true,
                        color: "#f60"
                    }
                },
                symbol: "pin",
                symbolSize: 1,
                data: [{
                    name: item[0],
                    value: chinaGeoCoordMap[item[0]].concat([1])
                }]
            }
        );
    });
    option = {
        tooltip: {
            trigger: "item",
            backgroundColor: "rgba(166, 200, 76, 0.82)",
            borderColor: "#FFFFCC",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: "z-index:100",
            formatter: function (params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value[params.seriesIndex + 1];
                res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                return res;
            }
        },
        // backgroundColor: "#013954",
        visualMap: { //图例值控制
            min: 0,
            max: 1,
            calculable: true,
            show: false,
            color: ["rgba(244,235,41,0.2)"],
            textStyle: {
                color: "#fff"
            }
        },
        geo: {
            map: "china",
            zoom: 1,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false, //是否允许缩放
            itemStyle: {
                normal: {
                    color: "rgba(0,0,0, .3)", //地图背景色
                    borderColor: "#516a89", //省市边界线00fcff 516a89
                    borderWidth: 1
                },
                emphasis: {
                    color: "rgba(37, 43, 61, .5)" //悬浮背景
                }
            }
        },
        series: series
    };

    myChart.setOption(option, true);
    // 获取系列
    var seriesModel = myChart.getModel().getSeriesByIndex(option.series.length - 1);
// 获取地理坐标系实例
    var coordSys = seriesModel.coordinateSystem;

    var getDom = {
        attack: {
            top: $("#china-map").offset().top,
            left: $("#china-map").offset().left
        }
    }, attackChange = null, attackPos;

    for (var c = 0; c < china_data.length; c++) {
        attackPos = coordSys.dataToPoint([china_data[c].attack.data[0], china_data[c].attack.data[1]]);
        if (china_data[c].abroad == 0 || china_data[c].abroad == "0") {
            china_data[c].attack.data = [
                attackPos[0] + getDom.attack.left,
                attackPos[1] + getDom.attack.top
            ];
        }
    }
    return china_data;
}

function taian_world(data, callback) {
    var myChart = echarts.init(document.getElementById("taian-map"));
    var chinaGeoCoordMap = {
        "": [116.4551, 40.2539]
    };
    var chinaDatas = [];
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = chinaGeoCoordMap[dataItem[0].name];
            var toCoord = [116.4551, 40.2539];
            if (fromCoord && toCoord) {
                res.push([{
                    coord: toCoord
                }, {
                    coord: fromCoord,
                    value: dataItem[0].value
                }]);
            }
        }
        return res;
    };
    var series = [];
    [["", chinaDatas]].forEach(function (item, i) {
        series.push({
                type: "lines",
                zlevel: 2,
                effect: {
                    show: true,
                    period: 4, //箭头指向速度，值越小速度越快
                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    // symbol: 'image://http://localhost:63342/company/echarts/images/log03.png',
                    symbolSize: [10, 25], //图标大小
                    symbolRotate: 10
                },
                lineStyle: {
                    normal: {
                        width: 1, //尾迹线条宽度
                        opacity: 1, //尾迹线条透明度
                        curveness: .3 //尾迹线条曲直度
                    }
                },
                data: convertData(item[1])
            }, {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: { //涟漪特效
                    period: 4, //动画时间，值越小速度越快
                    brushType: "stroke", //波纹绘制方式 stroke, fill
                    scale: 4 //波纹圆环最大限制，值越大波纹越大
                },
                label: {
                    normal: {
                        show: true,
                        position: "right", //显示位置
                        offset: [5, 0], //偏移设置
                        formatter: function (params) {//圆环显示文字
                            return params.data.name;
                        },
                        fontSize: 13
                    },
                    emphasis: {
                        show: true
                    }
                },
                symbol: "circle",
                symbolSize: function (val) {
                    return 5 + val[2] * 5; //圆环大小
                },
                itemStyle: {
                    normal: {
                        show: false,
                        color: "red"
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[0].name,
                        value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                    };
                })
            },
            //被攻击点
            {
                type: "scatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: "stroke",
                    scale: 4
                },
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        //offset:[5, 0],
                        color: "red",
                        formatter: "{b}",
                        textStyle: {
                            color: "rgba(244,235,41,0.2)"
                        }
                    },
                    emphasis: {
                        show: true,
                        color: "#f60"
                    }
                },
                symbol: "pin",
                symbolSize: 1,
                data: [{
                    name: item[0],
                    value: chinaGeoCoordMap[item[0]].concat([1])
                }]
            }
        );
    });
    option = {
        tooltip: {
            trigger: "item",
            backgroundColor: "rgba(166, 200, 76, 0.82)",
            borderColor: "#FFFFCC",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: "z-index:100",
            formatter: function (params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                var res = "";
                var name = params.name;
                var value = params.value[params.seriesIndex + 1];
                res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                return res;
            }
        },
        // backgroundColor: "#013954",
        visualMap: { //图例值控制
            min: 0,
            max: 1,
            calculable: true,
            show: false,
            color: ["rgba(244,235,41,0.2)"],
            textStyle: {
                color: "#fff"
            }
        },
        geo: {
            map: "taian",
            zoom: 1,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false, //是否允许缩放
            itemStyle: {
                normal: {
                    color: "rgba(0,0,0, .3)", //地图背景色
                    borderColor: "#516a89", //省市边界线00fcff 516a89
                    borderWidth: 1
                },
                emphasis: {
                    color: "rgba(37, 43, 61, .5)" //悬浮背景
                }
            }
        },
        series: series
    };
    myChart.setOption(option, true);

    // $.ajax({
    //     type:"GET",
    //     url:"map/taian.json",
    //     async: false,
    //     success:function (chinaJson ) {
    //         option.geo.map = "CD";
    //         echarts.registerMap("CD", chinaJson);
    //         myChart.setOption(option,true);

    var taian_data = data;
    // 获取系列
    var seriesModel = myChart.getModel().getSeriesByIndex(option.series.length - 1);
    // 获取地理坐标系实例
    var coordSys = seriesModel.coordinateSystem;

    var toPos = null;

    var getDomTaian = {
        to: {
            top: $("#taian-map").offset().top,
            left: $("#taian-map").offset().left
        }
    };
    for (var c = 0; c < taian_data.length; c++) {
        toPos = coordSys.dataToPoint([taian_data[c].to.data[0], taian_data[c].to.data[1]]);
        taian_data[c].to.data = [
            toPos[0] + getDomTaian.to.left,
            toPos[1] + getDomTaian.to.top
        ];
    }

    var createStyle = null,
        attackSize = 5,//每次(世界地图三条，中国地图三条)攻击数据
        attackStyle = {
            color: "red",
            toColor: "red",
            ico: "point.png",
            arrow: ["attack_arrow01.png", "attack_arrow02.png"],
            animateTime: 0
        },
        normalStyle = {
            color: "#e5df51",
            toColor: "#92b04a",
            ico: "point.png",
            arrow: ["world_arrow01.png", "world_arrow02.png"],
            animateTime: 0
        };

    function setAnimateTime() {
        return 5
    }


    var startFlage = null, endFlage = null, endPos = attackSize;

    if (taian_data.length>0){
        attackLoop(0, attackSize);

        timerOver = setInterval(function () {
            if (taian_data[endPos + attackSize]) {
                startFlage = endPos;
                endFlage = endPos + attackSize;
            } else if (taian_data[endPos + 1] && !taian_data[endPos + attackSize]) {
                startFlage = endPos;
                endFlage = taian_data.length;
            } else {
                startFlage = 0;
                endFlage = attackSize;
            }
            attackLoop(startFlage, endFlage);
            endPos = endFlage;
        }, createStyle.animateTime * 1000);
    }

    function attackLoop(startPos, endPos) {
        $(".get-world-data ul").empty();
        $(".get-china-data ul").empty();
        for (var k = startPos; k < endPos; k++) {
            // 流量和攻击样式
            createStyle = (taian_data[k].level && taian_data[k].level !== 0 && taian_data[k].level !== '0') ? attackStyle : normalStyle;
            createStyle.animateTime = setAnimateTime();
            if (taian_data[k].abroad == "1" || taian_data[k].abroad == 1) {
                var idEm = "world_em" + new Date().getTime() * 10 + "_" + k;
                var toStronge = "world_strong" + new Date().getTime() * 10 + "_" + k;
                svgCreate(taian_data[k], "world", k, createStyle, function (newData, src,svgDon,iDom) {
                    var org_data = newData.original;
                    var imgSize = {
                        w: 10,
                        h: 10,
                        fontW: 100,
                        fontH: 25
                    };
                    $("body").append("<em class=\"filexBox toEm removeItems\" id=\"" + idEm + "\" style=\"" +
                        "background:" + createStyle.toColor + ";" +
                        "top:" + (org_data[1] - imgSize.h * 0.5) + "px;" +
                        "left:" + (org_data[0] - imgSize.w * 0.5) + "px;" +
                        "width: " + imgSize.w + "px;" +
                        "height: " + imgSize.h + "px;\"></em>");
                    $("body").append("<stronge class=\"filexBox toStronge removeItems\" id=\"" + toStronge + "\" style=\"" +
                        "top:" + (org_data[1] - imgSize.fontH) + "px;" +
                        "left:" + (org_data[0] - imgSize.fontW * 0.5) + "px;width: " + imgSize.fontW + "px\">" + newData.name.to + "</stronge>");
                    $(".get-world-data ul").append("<li>" + newData.name.attack + "</li>");
                    (function (idEm, toStronge, time,svgDon,iDom) {
                        var time0=setTimeout(function () {
                            $("#" + idEm).remove();
                            $("#" + toStronge).remove();
                            svgDon.remove()
                            iDom.remove()
                            clearTimeout(time0)
                        }, time);
                    })(idEm, toStronge, createStyle.animateTime * 1000,svgDon,iDom);
                });
            } else {
                var idEm = "china_em" + new Date().getTime() * 10 + "_" + k;
                var toStronge = "china_strong" + new Date().getTime() * 10 + "_" + k;
                svgCreate(taian_data[k], "china", k, createStyle, function (newData, src,svgDon,iDom) {
                    var org_data = newData.original;
                    var imgSize = {
                        w: 10,
                        h: 10,
                        fontW: 100,
                        fontH: 25
                    };
                    $("body").append("<em class=\"filexBox toEm removeItems\" id=\"" + idEm + "\" style=\"" +
                        "background:" + createStyle.toColor + ";" +
                        "top:" + (org_data[1] - imgSize.h * 0.5) + "px;" +
                        "left:" + (org_data[0] - imgSize.w * 0.5) + "px;" +
                        "width: " + imgSize.w + "px;" +
                        "height: " + imgSize.h + "px;\"></em>");
                    $("body").append("<stronge class=\"filexBox toStronge removeItems\" id=\"" + toStronge + "\" style=\"" +
                        "top:" + (org_data[1] - imgSize.fontH) + "px;" +
                        "left:" + (org_data[0] - imgSize.fontW * 0.5) + "px;width: " + imgSize.fontW + "px\">" + newData.name.to + "</stronge>");
                    $(".get-china-data ul").append("<li>" + newData.name.attack + "</li>");
                    (function (idEm, toStronge, time,svgDon,iDom) {
                        var time1=setTimeout(function () {
                            $("#" + idEm).remove();
                            $("#" + toStronge).remove();
                            svgDon.remove()
                            iDom.remove()
                            clearTimeout(time1)
                        }, time);
                    })(idEm, toStronge, createStyle.animateTime * 1000,svgDon,iDom);
                });
            }
        }
        // var timer=setInterval(function () {
        //     var startFlage=null,endFlage=null;
        //     if (taian_data[endPos+attackSize]){
        //         startFlage=endPos;
        //         endFlage=endPos+attackSize
        //     }else if (taian_data[endPos+1] && !taian_data[endPos+attackSize]){
        //         startFlage=endPos;
        //         endFlage=taian_data.length
        //     }else{
        //         startFlage=0;
        //         endFlage=attackSize
        //     }
        //
        //     clearInterval(timer)
        //
        //     attackLoop(startFlage,endFlage)
        //
        // },createStyle.animateTime*1000)
    }

    // }
    // })

}

// 百度地图
function baidu_map(callback) {

    document.getElementById("map-container").style.height = document.documentElement.clientHeight + "px";
    var map = new BMap.Map("map-container", {minZoom: 5, maxZoom: 14});    // 创建Map实例
    map.centerAndZoom(new BMap.Point(117.094492, 36.205857), 12);  // 初始化地图,设置中心点坐标和地图级别
    // map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("泰安");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    var jsonArray = [
        {
            "featureType": "land",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#0e3257ff"
            }
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1b6288ff"
            }
        }, {
            "featureType": "green",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1c497aff"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry.topfill",
            "stylers": {
                "color": "#1b6288ff"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry.sidefill",
            "stylers": {
                "color": "#143e56ff"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#dadada00"
            }
        }, {
            "featureType": "subwaystation",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1b6288B2"
            }
        }, {
            "featureType": "education",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1c497aff"
            }
        }, {
            "featureType": "medical",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1c497aff"
            }
        }, {
            "featureType": "scenicspots",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#1c497aff"
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": "4"
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#fed66900"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": "2"
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffeebb00"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "local",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": "1"
            }
        }, {
            "featureType": "local",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "local",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "local",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "local",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#979c9aff"
            }
        }, {
            "featureType": "local",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "railway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "weight": "1"
            }
        }, {
            "featureType": "railway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#123c52ff"
            }
        }, {
            "featureType": "railway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "subway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "weight": "1"
            }
        }, {
            "featureType": "subway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#d8d8d8ff"
            }
        }, {
            "featureType": "subway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "subway",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "subway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#979c9aff"
            }
        }, {
            "featureType": "subway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "city",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "city",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "city",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "city",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "town",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "town",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "town",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#454d50ff"
            }
        }, {
            "featureType": "town",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "districtlabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "district",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "manmade",
            "elementType": "geometry",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "districtlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "entertainment",
            "elementType": "geometry",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "shopping",
            "elementType": "geometry",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "nationalway",
            "stylers": {
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "stylers": {
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "stylers": {
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "stylers": {
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "stylers": {
                "level": "10",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "10",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "10",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-10"
            }
        }, {
            "featureType": "cityhighway",
            "stylers": {
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "stylers": {
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "stylers": {
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "stylers": {
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off",
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "6",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "7",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "8",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels",
            "stylers": {
                "visibility": "off",
                "level": "9",
                "curZoomRegionId": "0",
                "curZoomRegion": "6-9"
            }
        }, {
            "featureType": "subwaylabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "subwaylabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "tertiarywaysign",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "tertiarywaysign",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "provincialwaysign",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "provincialwaysign",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "nationalwaysign",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "nationalwaysign",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "highwaysign",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "highwaysign",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "village",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "district",
            "elementType": "labels.text",
            "stylers": {
                "fontsize": "20"
            }
        }, {
            "featureType": "district",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "district",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "country",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "country",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "tertiaryway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "tertiaryway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff10"
            }
        }, {
            "featureType": "provincialway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "provincialway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.text",
            "stylers": {
                "fontsize": "20"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "nationalway",
            "elementType": "labels.text",
            "stylers": {
                "fontsize": "20"
            }
        }, {
            "featureType": "provincialway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "provincialway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "provincialway",
            "elementType": "labels.text",
            "stylers": {
                "fontsize": "20"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels.text",
            "stylers": {
                "fontsize": "20"
            }
        }, {
            "featureType": "cityhighway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "estate",
            "elementType": "geometry",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "tertiaryway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "tertiaryway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "scenicspotsway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "scenicspotsway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "universityway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "universityway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "vacationway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "vacationway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#1c497aff"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "transportationlabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "transportationlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "transportationlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "transportationlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "educationlabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "educationlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "educationlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "educationlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "transportation",
            "elementType": "geometry",
            "stylers": {
                "color": "#1b6288ff"
            }
        }, {
            "featureType": "airportlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "airportlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "scenicspotslabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "scenicspotslabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "medicallabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "medicallabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "medicallabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "scenicspotslabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "airportlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "entertainmentlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "entertainmentlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "entertainmentlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "estatelabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "estatelabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "estatelabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "businesstowerlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "businesstowerlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "businesstowerlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "companylabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "companylabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "companylabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "governmentlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "governmentlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "governmentlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "restaurantlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "restaurantlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "restaurantlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "hotellabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "hotellabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "hotellabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "shoppinglabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "shoppinglabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "shoppinglabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "lifeservicelabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "lifeservicelabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "lifeservicelabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "carservicelabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "carservicelabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "carservicelabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "financelabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "financelabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "financelabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "otherlabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "otherlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "otherlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "manmade",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "manmade",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "transportation",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "transportation",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "education",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "education",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "medical",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "medical",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "scenicspots",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#47e5e2ff"
            }
        }, {
            "featureType": "scenicspots",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }
    ];
    map.setMapStyleV2({styleJson: jsonArray});
    map.enableScrollWheelZoom(true);
    // 覆盖物
    // 定义自定义覆盖物的构造函数
    function SquareOverlay(center, length, width, color,text, className) {
        this._center = center;
        this._length = length;
        this._width = width;
        this._color = color;
        this._color = color;
        this._text = text;
        this._className = className;
    }

    // 继承API的BMap.Overlay
    SquareOverlay.prototype = new BMap.Overlay();
    // 实现初始化方法
    SquareOverlay.prototype.initialize = function (map) {
        // 保存map对象实例
        this._map = map;
        // 创建div元素，作为自定义覆盖物的容器
        var div = document.createElement("div");
        div.setAttribute("class", this._className);
        div.style.position = "absolute";
        // 可以根据参数设置元素外观
        div.style.width = this._width + "px";
        div.style.height = this._length + "px";
        div.style.background = this._color;
        div.innerText = this._text;
        div.style.textAlign='center';
        div.style.fontSize='20px';
        div.style.lineHeight=this._length + "px";
        div.style.color='#fff';
        // 将div添加到覆盖物容器中
        map.getPanes().markerPane.appendChild(div);
        // 保存div实例
        this._div = div;
        // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
        // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
        return div;
    };
    // 实现绘制方法
    SquareOverlay.prototype.draw = function () {
        // 根据地理坐标转换为像素坐标，并设置给容器
        var position = this._map.pointToOverlayPixel(this._center);
        this._div.style.left = position.x - this._length / 2 + "px";
        this._div.style.top = position.y - this._length / 2 + "px";
    };

    function createCoverings(coordinate, img,text, size) {
        map.addOverlay(new SquareOverlay({
            lng: coordinate[0],
            lat: coordinate[1]
        }, size.w, size.h, "url(\"images/" + img + "\") no-repeat",text, "mapCover"));

    }

    // 地图事件
    // var dataAr = dataList;
    // var dataAr = [
    //     {name: "泰山区", data: [117.14141, 36.199443], img: "01.png"},
    //     {name: "岱岳区", data: [117.048552, 36.19329], img: "02.png"},
    //     {name: "肥城市", data: [116.775404, 36.188812], img: "03.png"},
    //     {name: "新泰市", data: [117.774608, 35.914621], img: "04.png"},
    //     {name: "宁阳县", data: [116.812576, 35.76454], img: "05.png"},
    //     {name: "东平县", data: [116.477598, 35.914621], img: "01.png"}
    // ];

    // for (var i = 0; i < dataAr.length; i++) {
    //     // createCoverings(dataAr[i].data, "ico/" + dataAr[i].img, {w: 40, h: 40});
    // }
    if (callback){
        callback(createCoverings,map)
    }

}
// 百度地图覆盖物
function mapCoverings(map,dataList) {
    // // 覆盖物
    // // 定义自定义覆盖物的构造函数
    // function SquareOverlay(center, length, width, color, className) {
    //     this._center = center;
    //     this._length = length;
    //     this._width = width;
    //     this._color = color;
    //     this._className = className;
    // }
    //
    // // 继承API的BMap.Overlay
    // SquareOverlay.prototype = new BMap.Overlay();
    // // 实现初始化方法
    // SquareOverlay.prototype.initialize = function (map) {
    //     // 保存map对象实例
    //     this._map = map;
    //     // 创建div元素，作为自定义覆盖物的容器
    //     var div = document.createElement("div");
    //     div.setAttribute("class", this._className);
    //     div.style.position = "absolute";
    //     // 可以根据参数设置元素外观
    //     div.style.width = this._width + "px";
    //     div.style.height = this._length + "px";
    //     div.style.background = this._color;
    //     // 将div添加到覆盖物容器中
    //     map.getPanes().markerPane.appendChild(div);
    //     // 保存div实例
    //     this._div = div;
    //     // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
    //     // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
    //     return div;
    // };
    // // 实现绘制方法
    // SquareOverlay.prototype.draw = function () {
    //     // 根据地理坐标转换为像素坐标，并设置给容器
    //     var position = this._map.pointToOverlayPixel(this._center);
    //     this._div.style.left = position.x - this._length / 2 + "px";
    //     this._div.style.top = position.y - this._length / 2 + "px";
    // };
    //
    // function createCoverings(coordinate, img, size) {
    //     var createSize = {
    //         w: 52,
    //         h: 52
    //     };
    //     if (size) {
    //         createSize.w = size.w ? size.w : 52;
    //         createSize.h = size.h ? size.h : 52;
    //     }
    //     // map.clearOverlays()
    //     map.addOverlay(new SquareOverlay({
    //         lng: coordinate[0],
    //         lat: coordinate[1]
    //     }, createSize.w, createSize.h, "url(\"images/" + img + "\") no-repeat", "mapCover"));
    //
    // }
    //
    // // 地图事件
    // var dataAr = dataList;
    // // var dataAr = [
    // //     {name: "泰山区", data: [117.14141, 36.199443], img: "01.png"},
    // //     {name: "岱岳区", data: [117.048552, 36.19329], img: "02.png"},
    // //     {name: "肥城市", data: [116.775404, 36.188812], img: "03.png"},
    // //     {name: "新泰市", data: [117.774608, 35.914621], img: "04.png"},
    // //     {name: "宁阳县", data: [116.812576, 35.76454], img: "05.png"},
    // //     {name: "东平县", data: [116.477598, 35.914621], img: "01.png"}
    // // ];
    //
    // for (var i = 0; i < dataAr.length; i++) {
    //     createCoverings(dataAr[i].data, "ico/" + dataAr[i].img, {w: 40, h: 40});
    // }
}

// 地图事件
function eventListener(map, worldMap, chinaMap, callback) {
    // 开始拖拽
    map.addEventListener("dragstart", function () {
            $(".svg").remove();
        }
    );
    // // 拖拽结束
    // map.addEventListener("dragend", function () {
    //         svgCreate(map, createMapArr);
    //     }
    // );
    //
    // // 中心点的经纬度-缩放
    // // 缩放开始
    map.addEventListener("zoomstart", function () {
            $(".svg").remove();
        }
    );
    // // 缩放结束
    map.addEventListener("zoomend", function () {
            removeIco();
            svgCreate(map, worldMap, "world", callback);
            svgCreate(map, chinaMap, "china", callback);
        }
    );

    map.addEventListener("moving", function () {
            removeIco();
            svgCreate(map, worldMap, "world", callback);
            svgCreate(map, chinaMap, "china", callback);
        }
    );

    function removeIco() {
        $(".svg").remove();
        $(".left-world").find("i").remove();
        $(".right-china").find("i").remove();
        $(".attack-h4").remove();
        $(".mapCover").remove();
    }

    //地图加载完毕
    map.addEventListener("tilesloaded", function () {
            removeIco();
            svgCreate(map, worldMap, "world", callback);
            svgCreate(map, chinaMap, "china", callback);
        }
    );
    // 初次加载
    // svgCreate(map, worldMap, 'world');
    // svgCreate(map, chinaMap, 'china');

}

// 工具路径的渲染
function svgCreate(createMapArr, type, index, level, callback) {
    // for (var i = 0; i < createMapArr.length; i++) {
    // {attack:{name:'美国',data: [210, 175]},to:{name:'东平县',data:[116.477598, 35.941908]}}
    (function (data, index, type, level, callback) {
        createSvg(data, index, type, level, callback);
    })({
        start: {
            x: createMapArr.attack.data[0],
            y: createMapArr.attack.data[1]
        },
        end: {
            x: createMapArr.to.data[0],
            y: createMapArr.to.data[1]
        },
        name: {
            attack: createMapArr.attack.name,
            to: createMapArr.to.name
        },
        original: [createMapArr.to.data[0], createMapArr.to.data[1]]
    }, index, type, level, callback);
    // }
}

// 创建攻击路径
function createSvg(sizeWH, index, type, level, callback) {
    var temporaryPos = {
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: 0
        },
        degD: {
            flage: true,
            deg: 0,
            allDeg: 0,
            speedDeg: 0,
            start: 0,
            end: 0,
            imgHeight: 12,
            imgWidth: 16
        },
        time: 5
    };

    // tan-->对角线夹角
    var svgH = 80,
        setId = type + "_svg_" + index,
        setTextId = type + "_text_" + index,
        arrow = type + "_svg_arrow_" + index,
        degVal = 0,
        topStart = 0,
        icoDiv = null,
        quadrant = null,
        offset = 1.6;
    // 第一象限
    if (sizeWH.end.x > sizeWH.start.x && sizeWH.end.y <= sizeWH.start.y) {
        temporaryPos.start.x = sizeWH.start.x;
        temporaryPos.end.x = sizeWH.end.x;
        temporaryPos.start.y = sizeWH.start.y;
        temporaryPos.end.y = sizeWH.end.y;
        // 象限判断
        quadrant = 1;
    }
    // 第二象限
    if (sizeWH.end.x <= sizeWH.start.x && sizeWH.end.y < sizeWH.start.y) {
        temporaryPos.start.x = sizeWH.end.x;
        temporaryPos.end.x = sizeWH.start.x;
        temporaryPos.start.y = sizeWH.end.y;
        temporaryPos.end.y = sizeWH.start.y;
        // 象限判断
        quadrant = 2;
    }
    // 第三象限
    if (sizeWH.end.x < sizeWH.start.x && sizeWH.end.y >= sizeWH.start.y) {
        temporaryPos.start.x = sizeWH.end.x;
        temporaryPos.end.x = sizeWH.start.x;
        temporaryPos.start.y = sizeWH.end.y;
        temporaryPos.end.y = sizeWH.start.y;
        // 象限判断
        quadrant = 3;
    }
    // 第四象限
    if (sizeWH.end.x >= sizeWH.start.x && sizeWH.end.y > sizeWH.start.y) {
        temporaryPos.start.x = sizeWH.start.x;
        temporaryPos.end.x = sizeWH.end.x;
        temporaryPos.start.y = sizeWH.start.y;
        temporaryPos.end.y = sizeWH.end.y;
        // 象限判断
        quadrant = 4;
    }

    // 旋转角度
    degVal = Math.atan((temporaryPos.end.y - temporaryPos.start.y) / (temporaryPos.end.x - temporaryPos.start.x)) / Math.PI * 180;
    var diagonal = Math.pow(Math.pow(Math.abs(sizeWH.end.x - sizeWH.start.x), 2) + Math.pow(Math.abs(sizeWH.end.y - sizeWH.start.y), 2), 0.5);
    if (diagonal * 0.1 < svgH) {
        svgH = diagonal * 0.1;
    }
    // 初始位置
    topStart = temporaryPos.start.y - svgH;
    var main = document.getElementById("body");
    // 创建svg
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = setId;
    main.appendChild(svg);
    // 创建path
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 0 " + svgH + " q " + diagonal * 0.5 + " " + (-svgH) * offset + " " + diagonal + " 0");
    path.setAttribute("stroke", level.color);

    path.setAttribute("fill", "none");
    path.setAttribute("stroke-dasharray", "4 2");
    document.getElementById(setId).appendChild(path);

    // 创建文本
    // var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // var textChildren = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text.id = setTextId;
    // text.setAttribute('x', pos.end.x);
    // text.setAttribute('y', svgH);
    // text.setAttribute('fill', 'red');
    // text.setAttribute('font-size', '12');
    // document.getElementById(setId).appendChild(text);
    // var getTextId = document.getElementById(setTextId);
    // getTextId.appendChild(textChildren);
    // var newText = document.createTextNode(pos.name);
    // getTextId.replaceChild(newText, getTextId.firstChild);

    // 创建运动路径
    var img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    img.setAttribute("id", arrow);
    // img.setAttribute('href', 'images/svg_arrow02.png');
    img.setAttribute("width", temporaryPos.degD.imgWidth);
    img.setAttribute("height", temporaryPos.degD.imgHeight);
    img.setAttribute("x", "0");
    // img.setAttribute('y', (svgH*0.5-temporaryPos.degD.imgHeight*0.25));
    img.setAttribute("y", (svgH - temporaryPos.degD.imgHeight * 0.5));
    // 移动的动画
    var animate = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
    animate.setAttribute("dur", level.animateTime + "s");
    animate.setAttribute("repeatCount", "indefinite");
    // 角度计算
    temporaryPos.degD.allDeg = Math.atan(svgH / (diagonal * 0.5)) / Math.PI * 180;
    // 旋转的动画
    var animate01 = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
    animate01.setAttribute("attributeName", "transform");
    animate01.setAttribute("begin", "0s");
    animate01.setAttribute("dur", level.animateTime + "s");
    animate01.setAttribute("type", "rotate");
    animate01.setAttribute("repeatCount", "indefinite");

    // 判断象限
    if (quadrant === 1 || quadrant === 4) {
        temporaryPos.degD.start = -(90 - (Math.atan(diagonal * 0.5 / svgH) / Math.PI * 180 - Math.atan(svgH / diagonal * 0.5) / Math.PI * 180));
        temporaryPos.degD.end = 90 - (Math.atan(diagonal * 0.5 / svgH) / Math.PI * 180 - Math.atan(svgH / diagonal * 0.5) / Math.PI * 180);
        // 图片
        // if (type == "world") {
        //     img.setAttribute("href", "images/world_arrow01.png");
        // } else {
        //     img.setAttribute("href", "images/china_arrow01.png");
        // }


        img.setAttribute("href", "images/" + level.arrow[0]);
        // 运动
        animate.setAttribute(
            "path",
            "M 0 " + 0 +
            " q " + diagonal * 0.5 + " " + (-svgH) * offset + " " + diagonal + " " + 0
        );
        // 旋转
        animate01.setAttribute("from", temporaryPos.degD.start + " " + (-temporaryPos.degD.imgWidth) + " " + (-temporaryPos.degD.imgHeight * 0.5));
        animate01.setAttribute("to", temporaryPos.degD.end + " " + temporaryPos.degD.imgWidth + " " + temporaryPos.degD.imgHeight * 0.5);
    } else {
        temporaryPos.degD.start = 90 - (Math.atan(diagonal * 0.5 / svgH) / Math.PI * 180 - Math.atan(svgH / diagonal * 0.5) / Math.PI * 180);
        temporaryPos.degD.end = -(90 - (Math.atan(diagonal * 0.5 / svgH) / Math.PI * 180 - Math.atan(svgH / diagonal * 0.5) / Math.PI * 180));
        // 图片
        // if (type == "world") {
        //     img.setAttribute("href", "images/world_arrow02.png");
        // } else {
        //     img.setAttribute("href", "images/china_arrow02.png");
        // }
        img.setAttribute("href", "images/" + level.arrow[1]);
        // 运动
        animate.setAttribute(
            "path",
            "M " + diagonal + " " + 0 +
            " q " + (-diagonal * 0.5) + " " + (-svgH) * offset + " " + (-diagonal) + " " + 0
        );
        // 旋转
        animate01.setAttribute("from", temporaryPos.degD.start + " " + temporaryPos.degD.imgWidth + " " + temporaryPos.degD.imgHeight * 0.5);
        animate01.setAttribute("to", temporaryPos.degD.end + " " + (-temporaryPos.degD.imgWidth) + " " + (-temporaryPos.degD.imgHeight * 0.5));
    }
    // 添加svg
    document.getElementById(setId).appendChild(img);
    document.getElementById(arrow).appendChild(animate);
    document.getElementById(arrow).appendChild(animate01);

    icoDiv=type == "world"?$(".left-world"):$(".right-china")
    // 添加攻击点图标
    var icoS = {
        x: sizeWH.start.x - icoDiv.offset().left,
        y: sizeWH.start.y - icoDiv.offset().top
    };
    icoDiv.append("<i style=\"top:" + (icoS.y - 8) + "px;left:" + (icoS.x - 8) + "px\"><img src=\"images/" + level.ico + "\" alt=\"\"></i>");


    if (type == "world") {
        if (callback) {
            callback(sizeWH, "world-to.png",$("#" + setId),icoDiv.find("i"));
        }
    } else {
        if (callback) {
            callback(sizeWH, "china-to.png",$("#" + setId),icoDiv.find("i"));
        }
    }



    // icoDiv.append("<h4 class=\"attack-h4\" style=\"top:" + (icoS.y - 100) + "px;left:" + (icoS.x - 30) + "px\">" +
    //     "<span>" + sizeWH.name.attack + "</span>" +
    //     "<p><img src=\"images/ico-point.png\" alt=\"\"></p>" +
    //     "</h4>");
    // 设置svg
    $("#" + setId).addClass("svg");
    $("#" + setId).css({
        "top": topStart + "px",
        "left": temporaryPos.start.x,
        "width": diagonal + "px",
        "height": svgH + "px",
        "transform": "rotate(" + degVal + "deg)",
        "transformOrigin": " 0 " + svgH + "px"
    });
    // setOutTime=setTimeout(function () {
    //     $("#" + setId).remove();
    //     icoDiv.find("i").remove();
    //     clearTimeout(setOutTime)
    // }, level.animateTime * 1000);
    // if (flageTime){
    //     clearTimeout(setOutTime)
    //     flageTime=false
    // }

}

//将像素转换成坐标，返回包含坐标经度和纬度的数组
function pixel2Zuobiao(map, x, y) {
    var p = new BMap.Pixel(x, y);
    var point1 = map.pixelToPoint(p);
//返回一个数组
    var positionArray = new Array(point1.lng, point1.lat);
    return positionArray;
}

//将坐标转换成坐标，返回包含像素的数组
function zuobiao2Pixel(map, x, y) {
    var point = new BMap.Point(x, y);
    var pixel = map.pointToPixel(point);
    var pixelArray = new Array(pixel.x, pixel.y);
    return pixelArray;
}