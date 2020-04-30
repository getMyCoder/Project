var HW = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    screen: {
        w: 1920,
        h: 1080
    }
};
$(function () {
    loading();
    $(window).resize(function () {
        window.location.reload();
    });

});
var size = {
    h: function (val) {
        return val / HW.screen.h * HW.height;
    },
    w: function (val) {
        return val / HW.screen.w * HW.width;
    }
};

function loading() {
    // 样式
    style();
    // 事件
    evt();
}

function style() {
    $("#body").height(HW.height);
    $(".title").css({
        // 'height': size.h(58) + 'px',
        // 'width': size.w(1252) + 'px',
        // 'lineHeight': size.h(48) + 'px',
        // 'fontSize': size.w(16) + 'px',
        'paddingTop': size.h(15) + 'px',
        'left': (HW.width - 1252) * 0.5 + "px"
    });
    $(".title-val").css({
        'top': size.h(45) + 'px'
    });
    $(".title-left").css({
        'right': HW.width * 0.5 + $(".title").width() * 0.5 - 290 + "px"
    });
    $(".title-right").css({
        'left': HW.width * 0.5 + $(".title").width() * 0.5 - 290 + "px"
    });

    $(".left-world").css({
        'height': size.w(700) * 0.7583 + "px"
    });
    $(".left").css({
        'width': size.w(700) + "px",
        'top': size.h(88) + "px"
    });
    $(".right-china").css({
        'height': size.w(700) * 0.7583 + "px"
    });
    $(".right").css({
        'width': size.w(700) + "px",
        'top': size.h(88) + "px"
    });

    // $(".items-box").css({
    //     'width': size.w(455) + "px",
    // });
    $(".items-box-title").css({
        'width': size.w(455) + "px",
        'height': size.w(455) * 0.0879 + "px",
        'lineHeight': size.w(455) * 0.0879 + "px"
    });
    $(".items-toggle-title").css({
        'width': size.w(455) + "px",
        'height': size.w(455) * 0.0879 + "px",
        'lineHeight': size.w(455) * 0.0879 + "px"
    });
    $(".items-box-con").css({
        'height': size.w(455) * 0.5868 + "px"
    });
    $(".items-box-con-w-con").css({
        'height': size.w(455) * 0.5868 - 40 + "px",
    });
    $(".items-box-con-w table tr").css({
        'height': (size.w(455) * 0.5868 - 40) / 6 + "px"
    });
    $(".table-con").css({
        'height': (size.w(455) * 0.5868 - 40) / 6 * 5 + "px"
    });
    $(".table-title ul li").css({
        'height': (size.w(455) * 0.5868 - 40) / 6 + "px",
        'lineHeight': (size.w(455) * 0.5868 - 40) / 6 + "px",
    });
    // ------------------------
    $(".statistics-title").css({
        'height': size.h(140) + "px",
        'fontsize': size.w(32) + "px",
        'lineHeight': size.h(64) + "px"
    });
    $(".statistics-left").css({
        'width': size.w(332) + "px",
        'height': size.h(960) + "px",
        'left': size.w(29) + "px",
        'top': size.h(80) + "px",
    });
    $(".statistics-left-box-con").css({
        'top': '2px',
        'left': '2px',
        'width': size.w(332) - 6 + "px",
        'height': size.h(960) - 6 + "px",
    });
    $(".statistics-right").css({
        'width': size.w(332) + "px",
        'height': size.h(960) + "px",
        'right': size.w(29) + "px",
        'top': size.h(80) + "px",
    });
    $(".statistics-right-title ul li h3 span").css({
        'fontSize': size.h(24) + "px",
    });
    $(".statistics-right-title ul li h3 p").css({
        'fontSize': size.h(16) + "px",
    });
    $(".statistics-right-items01").css({
        'height': size.h(300) + "px",
        'marginTop': size.h(25) + "px"
    });
    $(".statistics-right-items02").css({
        'height': size.h(260) + "px",
        'marginTop': size.h(25) + "px"
    });
    $(".statistics-right-items03").css({
        'height': size.h(245) + "px",
        'marginTop': size.h(25) + "px"
    });
    $("#statistics-right-box01").css({
        'height': size.h(265) + "px"
    });
    $("#statistics-right-box02").css({
        'height': size.h(225) + "px"
    });
    $("#statistics-right-box03").css({
        'height': size.h(210) + "px"
    });
    $(".statistics-box-title").css({
        'width': size.w(228) + "px",
        'height': size.h(35) + "px",
        'lineHeight': size.h(35) + "px",
        'fontSize': size.h(20) + "px"
    });

}

function evt() {
    $(".items-box-i").each(function () {
        var _this = this;
        $(this).find('.items-toggle-title h2').each(function (index) {
            $(this).click(function () {
                $(this).addClass('title-active').siblings().removeClass('title-active');
                $(_this).find('.items-box-con .items-box-con-i').eq(index).show().siblings().hide();
            });
        });
    });
}

// 底部table滚动
function scrollTable(data) {
    // 当数据大于6条的时候开始滚动
    var createTr = '', sizeH = parseInt((size.w(455) * 0.5868 - 30) / 6), flageIndex = 0, oddFlage = data.length % 2;
    for (var i = 0; i < data.length; i++) {
        createTr += '<tr style="height:' + sizeH + 'px">\n' +
            '    <td>' + data[i].attackToIp + '</td>\n' +
            '    <td>' + data[i].company + '</td>\n' +
            '    <td>' + data[i].industry + '</td>\n' +
            '    <td>' + data[i].attackIp + '</td>\n' +
            '    <td>' + data[i].time + '</td>\n' +
            '</tr>';
    }
    $(".table-con").append('<table border="0" cellpadding="0" cellspacing="0">' +
        '<tbody class="' + setChildBackground(flageIndex, oddFlage) + '">' + createTr + '</tbody>' +
        '</table>');
    if (data.length > 5) {
        flageIndex++;
        $(".table-con").append('<table border="0" cellpadding="0" cellspacing="0">' +
            '<tbody class="' + setChildBackground(flageIndex, oddFlage) + '">' + createTr + '</tbody>' +
            '</table>');
        var indexI = 0;
        setInterval(function () {
            indexI++;
            $(".table-con table").eq(0).css({
                'marginTop': -indexI + "px"
            });
            if (sizeH * data.length < indexI) {
                flageIndex++;
                indexI = 0;
                $(".table-con table").eq(0).remove();
                $(".table-con").append('<table border="0" cellpadding="0" cellspacing="0">' +
                    '<tbody class="' + setChildBackground(flageIndex, oddFlage) + '">' + createTr + '</tbody>' +
                    '</table>');
            }
        }, 50);
    }

    // 设置单双行样式
    function setChildBackground(val, oddFlage) {
        var createClass = '';
        if (oddFlage === 0) {
            createClass = 'evenActive';
        } else {
            if (val % 2 === 0) {
                createClass = 'evenActive';
            } else {
                createClass = 'cardinalityActive';
            }
        }
        return createClass;
    }
}

// 排名
function ranking(data, dataColor, id) {
    var myChart = echarts.init(document.getElementById(id));

    var indexLength = data.name.length;
    var index = 0;
    var colorList = ['#da9077', '#67bfc3', '#635a87', '#7a797e'];
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show: false
        },
        grid: {
            left: '150',
            top: '5%',
            right: '10%',
            bottom: '5%'
        },
        xAxis: {
            type: 'value',

            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }

        },
        yAxis: {
            type: 'category',
            inverse: true,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisPointer: {
                label: {
                    show: true,
                    margin: 30
                }
            },
            data: data.name,
            axisLabel: {
                margin: 120,
                fontSize: 12,
                align: 'left',
                color: dataColor,
                rich: {
                    a1: {
                        color: '#fff',
                        backgroundColor: colorList[0],
                        width: 30,
                        height: 18,
                        align: 'center',
                        borderRadius: 2
                    },
                    a2: {
                        color: '#fff',
                        backgroundColor: colorList[1],
                        width: 30,
                        height: 18,
                        align: 'center',
                        borderRadius: 2
                    },
                    a3: {
                        color: '#fff',
                        backgroundColor: colorList[2],
                        width: 30,
                        height: 18,
                        align: 'center',
                        borderRadius: 2
                    },
                    b: {
                        color: '#fff',
                        backgroundColor: colorList[3],
                        width: 30,
                        height: 18,
                        align: 'center',
                        borderRadius: 2
                    }
                },
                formatter: function (params) {
                    if (index == indexLength) {
                        index = 0;
                    }
                    index++;
                    if (index - 1 < 3) {
                        return [
                            '{a' + index + '|' + index + '}' + '  ' + params
                        ].join('\n');
                    } else {
                        return [
                            '{b|' + index + '}' + '  ' + params
                        ].join('\n');
                    }
                }
            }
        },
        series: [{
            z: 2,
            name: 'value',
            type: 'bar',
            barWidth: 10,
            data: data.val.map((item, i) => {
                itemStyle = {
                    color: dataColor
                };
                return {
                    value: item,
                    itemStyle: itemStyle
                };
            }),
            label: {
                show: false,
                position: 'right',
                color: '#fff',
                fontSize: 14,
                offset: [10, 0]
            }
        }

        ]
    };

    myChart.setOption(option, true);
}

// 攻击手法
function AttackTechnique(data, id) {
    var myChart = echarts.init(document.getElementById(id));
    var m2R2Data = data;
    option = {
        color: ["#e88a6a", "#49dbdb", "#715cb9", "#46d67f", "#56addf"],
        title: [
            {
                text: '',
                textStyle: {
                    fontSize: 16,
                    color: "black"
                },
                left: "2%"
            },
            {
                text: ' ',
                subtext: '',
                textStyle: {
                    fontSize: 20,
                    color: "black"
                },
                subtextStyle: {
                    fontSize: 20,
                    color: 'black'
                },
                textAlign: "center",
                x: '34.5%',
                y: '44%',
            }],
        tooltip: {
            trigger: 'item',
            formatter: function (parms) {
                var str = parms.seriesName + "</br>" +
                    parms.marker + "" + parms.data.legendname + "</br>" +
                    "数量：" + parms.data.value + "</br>" +
                    "占比：" + parms.percent + "%";
                return str;
            }
        },
        series: [
            {
                name: '国外攻击手法分布',
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['45%', '65%'],
                clockwise: false, //饼图的扇区是否是顺时针排布
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'outter',
                        formatter: function (parms) {
                            return parms.data.legendname + "\n" + parms.percent;
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        length2: 10,
                        // smooth:true,
                    }
                },
                data: m2R2Data
            }
        ]
    };
    myChart.setOption(option, true);
}

// 选择框
function createCheck(data, flage) {
    var checkLable = '', allLable = '', title = '<div class="statistics-box-title statistics-box-title-M">' + data.title + '</div>';
    for (var i = 0; i < data.data.length; i++) {
        checkLable += '<h5 style="width:' + (100 / data.column) + '%"><p><span><i><img src="images/check.png" alt=""></i></span>\n' +
            '<em>' + data.data[i] + '</em>\n' +
            '</p>\n' +
            '</h5>';
    }
    allLable = '<div class="statistics-left-box-items">' + title + '<div class="statistics-left-box-items-con">' + checkLable + '</div></div>';
    $(".statistics-left-box-con").append(allLable);

    if (flage) {
        $(".statistics-box-title").css({
            'width': size.h(228) + "px",
            'height': size.h(35) + "px",
            'lineHeight': size.h(35) + "px",
            'fontSize': size.h(20) + "px"
        });
        $(".statistics-box-title-M").css({
            'marginTop': size.h(20) + "px"
        });
        $(".statistics-left-box-items-con").css({
            'marginTop': size.h(16) + "px"
        });
        $(".statistics-left-box-items-con h5").css({
            'marginTop': size.h(18) + "px"
        });
        $(".statistics-left-box-items-con h5 p").css({
            'marginLeft': size.w(20) + "px"
        });
        $(".statistics-left-box-items-con h5").each(function () {
            $(this).click(function () {
                $(this).toggleClass('check-h5Active');
            });
        });
    }

}

// 重保单位行业统计
function echart_right01(data) {
    var myChart = echarts.init(document.getElementById('statistics-right-box01'));
    option = {
        color: '#01e4ff',
        tooltip: {
            trigger: "item"
        },
        grid: {
            top: '10%',
            right: '5%',
            left: '15%',
            bottom: '25%'
        },
        xAxis: [{
            type: 'category',
            data: data.name,
            color: '#59588D',
            axisLabel: {
                rotate: 90,
                margin: 3,
                color: '#5092c1',
                textStyle: {
                    fontSize: 12
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#1b4972',
                }
            },
            axisTick: {
                show: false
            },
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                color: '#5092c1',
                textStyle: {
                    fontSize: 12
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#1b4972',
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(131,101,101,0.2)',
                    type: 'dashed',
                }
            }
        }],
        series: [{
            data: data.data,
            type: 'bar',
            barWidth: '10px',
            showBackground: true,
            backgroundStyle: {
                color: '#182881'
            }
        }]
    };
    myChart.setOption(option, true);
}

// 重保单位风险等级
function echart_ritht02(data) {
    var createData = {
        name: [],
        data: []
    };
    for (var i = 0; i < data.length; i++) {
        createData.name.push(data[i].name);
        createData.data.push(data[i].value);
    }
    var myChart = echarts.init(document.getElementById('statistics-right-box02'));
    option = {
        color: ['#cb181c', '#ff6200', '#ffb400', '#93c52b'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} <br/>({d}%)'
        },
        legend: {
            orient: 'horizontal',
            bottom: '5%',
            textStyle: {
                color: "#fff"
            },
            data: createData.name,
        },
        series: [
            {
                name: '重保单位风险等级',
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['30%', '50%'],
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: function (params) {
                                return params.percent + "%";
                            },
                        }
                    }
                },
            }
        ]
    };
    myChart.setOption(option, true);
}

// 单位等级
function echart_right03(data) {
    var myChart = echarts.init(document.getElementById('statistics-right-box03'));
    option = {
        color: ['#2080f6', '#77e60a', '#898af6', '#f46903', '#20fcd6'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '面积模式',
                type: 'pie',
                radius: [0, 80],
                center: ['50%', '50%'],
                roseType: 'area',
                label: {
                    normal: {
                        show: true,
                        position: 'outter',
                        formatter: function (parms) {
                            return parms.name + parms.percent + "%";
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 5,
                        length2: 5,
                        // smooth:true,
                    }
                },
                data: data
            }
        ]
    };

    myChart.setOption(option, true);
}