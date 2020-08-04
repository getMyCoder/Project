var HW = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    initSize: document.documentElement.clientHeight / 1080
};
$(function () {
    defense.init();
    $(window).resize(function () {
        window.location.reload();
    });
});
var defense = {
    init: function () {
        // 样式
        this.style();
    },
    style: function () {
        $(".hide").fadeIn(100);
        $(".left-main").height($(".left").height() - 30);
        $(".right-main").height($(".left").height() - 30);
        $(".title h2").css({
            'fontSize': 36 * HW.initSize + "px",
            'lineHeight': $(".title h2").height() + "px"
        });
        $(".title-all").css({
            'height': 82 * HW.initSize + "px"
        });
        $(".title-all h2").css({
            'paddingTop': 12 * HW.initSize + "px",
            'fontSize': 32 * HW.initSize + "px",
            'lineHeight': 70 * HW.initSize + "px"
        });
        $(".items-title").css({
            'height': 70 * HW.initSize + "px"
        });
        $(".items-title h2").css({
            'paddingTop': 10 * HW.initSize + "px",
            'fontSize': 28 * HW.initSize + "px",
            'lineHeight': 60 * HW.initSize + "px"
        });
        $(".items01").css({
            'height': 385 * HW.initSize + "px"
        });
        $(".items02").css({
            'height': 420 * HW.initSize + "px"
        });
        $(".items03").css({
            'height': 314 * HW.initSize + "px",
            'width': ($(".left-main-right-main-top").width() * 0.5 - 10) + "px"
        });
        $(".items04").css({
            'height': 314 * HW.initSize + "px",
            'width': ($(".left-main-right-main-top").width() * 0.5 - 10) + "px"
        });
        $(".items05").css({
            'height': $(".title-all").height() + $(".left-main-left-main").height() - $(".left-main-right-main-top").height() - 35 + "px",
        });
        $(".container .items").each(function () {
            if ($(this).find('.items-title').length > 0) {
                $(this).find('.items-con').height($(this).height() - $(".items-title").height());
            } else if ($(this).find('.title-all').length > 0) {
                $(this).find('.items-con').height($(this).height() - $(".title-all").height());
            } else {
                $(this).find('.items-con').height($(this).height());
            }
        });
    },
    // 当前对象参数
    parameter: {
        fractionFlage: 0,
        teamData: null,
        teamDataFlage: false
    },
    // 队伍排名样式
    teamStyle: function (valueMax) {
        if (this.parameter.fractionFlage === 0) {
            $(".items-ul-team li").css({
                'width': 100 / $(".items-ul-team li").length + "%"
            });
            $(".teamName-title").css({
                'height': 32 * HW.initSize + "px",
                'borderRadius': 16 * HW.initSize + "px",
            });
            $(".teamName-name").css({
                'height': 60 * HW.initSize + "px",
                'lineHeight': 60 * HW.initSize + "px",
                'fontSize': 28 * HW.initSize * 3 / $(".items-ul-team li").length + "px",
            });
            $(".teamName").css({
                'bottom': 50 * HW.initSize + "px",
            });
            $(".teamLattice").css({
                'bottom': 142 * HW.initSize + "px",
            });
            $(".teamHeadCon").css({
                'height': $(".teamHeadCon").width() * 0.85 + "px"
            });
            $(".teamFraction").css({
                'height': 40 * HW.initSize + "px",
                'lineHeight': 40 * HW.initSize + "px",
                'fontSize': 20 * HW.initSize + "px",
            });
            $(".teamHead").css({
                'bottom': 142 * HW.initSize + "px",
            });
            $(".teamFraction").css({
                'bottom': (142 * HW.initSize + $(".teamHead").height()) + "px",
            });
        }
        var teamHeight = ($(".items-ul-team li").height() - parseInt($(".teamLattice").css('bottom')) - $(".teamFraction").height() - $(".teamHead").height() - 10);
        $(".teamLatticeCon").css({
            'maxHeight': teamHeight + "px"
        });

        var teamLatticeSize = {
            items: null,
            all: null,
            size: null,
            html: ''
        }, iSize = 12, teamFractionH = null;
        $(".items-ul-team li").each(function (index) {
            // $(this).css({
            //     'left': $(".items-ul-team li").width() * index + "px"
            // });
            teamFractionH = parseInt($(this).find(".teamFraction").text()) / valueMax * parseInt(teamHeight);
            $(this).find('.teamLatticeCon').animate({
                'height': teamFractionH + "px"
            });
            $(this).find(".teamHead").animate({
                'bottom': (parseInt($(this).find(".teamLattice").css('bottom')) + teamFractionH + 10) + "px"
            });
            $(this).find(".teamFraction").animate({
                'bottom': (142 * HW.initSize + $(".teamHead").height() + teamFractionH + 10) + "px",
            });
            teamLatticeSize = {};
            teamLatticeSize.items = iSize * HW.initSize + 3;
            teamLatticeSize.all = parseInt($(this).find(".teamFraction").text()) / valueMax * parseInt(teamHeight);
            teamLatticeSize.size = teamLatticeSize.all % teamLatticeSize.items > 0
                ? parseInt(teamLatticeSize.all / teamLatticeSize.items) + 1
                : parseInt(teamLatticeSize.all / teamLatticeSize.items);
            for (var k = 0; k < teamLatticeSize.size; k++) {
                $(this).find(".teamLatticeCon").append('<i style="bottom:' + ($(this).find(".teamLatticeCon i").length * teamLatticeSize.items) + 'px"></i>');
            }
            $(this).find(".teamLatticeCon i").each(function (index) {
                if (index >= teamLatticeSize.size) {
                    $(this).remove();
                }
            });
        });
        $(".teamLatticeCon i").css({
            'height': iSize * HW.initSize + "px",
            'borderRadius': iSize * HW.initSize * 0.5 + "px"
        });
    },
    //队伍排名
    teamRank: function (data) {
        // 队伍排名数据处理
        this.teamRankData(data);
        // 队伍排名内部处理
        this.teamRankHandle(this.parameter.teamData);
    },
    // 队伍排名数据处理
    teamRankData: function (data) {
        this.parameter.teamData = {
            data: Array.prototype.slice.call(data.data),
            maxVal: data.maxVal ? data.maxVal : null
        };
        for (var p = 0; p < this.parameter.teamData.data.length; p++) {
            this.parameter.teamData.data[p].index = p;
        }

        this.parameter.teamData.data.sort(function (n1, n2) {
            if (n1.value >= n2.value) {
                return 1;
            } else {
                return -1;
            }
        });

        for (var u = 0; u < this.parameter.teamData.data.length; u++) {
            this.parameter.teamData.data[u].originalIndex = u;
        }
    },
    // 队伍排名内部处理
    teamRankHandle: function (data) {
        // 初次加载，初始化标签
        if (this.parameter.fractionFlage === 0) {
            var liHtml = '';
            for (var j = 0; j < data.data.length; j++) {
                liHtml += '<li>' +
                    '<div class="items-ul-team-con">\n' +
                    '    <div class="teamFraction">' + data.data[j].value + '</div>\n' +
                    '    <div class="teamHead">\n' +
                    '        <div class="teamHeadCon">\n' +
                    '            <img src="images/' + data.data[j].src + '" alt="">\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div class="teamLattice">\n' +
                    '        <div class="teamLatticeCon"></div>\n' +
                    '    </div>\n' +
                    '    <div class="teamName">\n' +
                    '        <div class="teamName-con">\n' +
                    '            <div class="teamName-title"></div>\n' +
                    '            <div class="teamName-name">' + data.data[j].name + '</div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>' +
                    '</li>';
            }
            $(".teamItems05").empty().append('<ul class="items-ul-team">' + liHtml + '</ul>');
        }
        // 数据更新
        for (var m = 0; m < data.data.length; m++) {
            $(".items-ul-team li").eq(data.data[m].index).find('.teamFraction').text(data.data[m].value);
            $(".items-ul-team li").eq(data.data[m].index).find('.teamHeadCon img').attr('src', 'images/' + data.data[m].src);
            $(".items-ul-team li").eq(data.data[m].index).find('.teamName-name').text(data.data[m].name);
        }
        // 判断最高值
        var maxVal = null;
        if (data.maxVal && data.maxVal > 0) {
            maxVal = data.maxVal;
        } else {
            maxVal = 0;
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].value > maxVal) {
                    maxVal = data.data[i].value;
                }
            }
        }
        // 队伍排名样式
        this.teamStyle(maxVal);
        // 交换
        for (var z = 0; z < data.data.length; z++) {
            if (this.parameter.fractionFlage === 0) {
                $(".items-ul-team li").eq(data.data[z].index).css({
                    'left': data.data[z].originalIndex * $(".items-ul-team li").width() + "px"
                });
            }else{
                $(".items-ul-team li").eq(data.data[z].index).animate({
                    'left': data.data[z].originalIndex * $(".items-ul-team li").width() + "px"
                });
            }
        }
        this.parameter.fractionFlage += 1;
    },
    // 漏洞分布情况
    distributionEchart: function (id, data) {
        var select = {
            title: [],
            data: []
        };
        for (var i = 0; i < data.length; i++) {
            select.title.push(data[i].name);
            select.data.push([data[i].name, data[i].value]);
        }
        var myChart = echarts.init(document.getElementById(id));
        var option = {
            color: ["#88abda", "#88abda"],
            grid: {
                left: '10%',
                top: '10%',
                right: '10%',
                bottom: '25%',
            },
            xAxis: {
                axisLine: { //  改变x轴颜色
                    lineStyle: {
                        color: '#cac9e6',
                    }
                },
                axisLabel: { //  改变x轴字体颜色和大小
                    rotate: 45,
                    textStyle: {
                        color: "#e3e9ef",
                        fontSize: 12
                    },
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "rgba(255,255,255,0.2)"
                    }
                },
                data: select.title,

            },
            yAxis: {
                axisLine: { //  改变y轴颜色
                    show: false,
                    lineStyle: {
                        color: '#cac9e6'
                    }
                },
                axisLabel: { //  改变y轴字体颜色和大小
                    //formatter: '{value} m³ ', //  给y轴添加单位
                    textStyle: {
                        color: "#e3e9ef",
                        fontSize: 12
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "#cac9e6"
                    }
                },
            },
            series: [{
                itemStyle: {
                    // borderColor: "#0FC5F3",
                    // borderWidth: 2,
                    // shadowColor: "#0FC5F3",
                    // shadowBlur: 10
                },
                symbolSize: 12,
                data: select.data,
                type: 'scatter'
            }]
        };
        myChart.setOption(option, true);
    },
    // 战队提交漏洞数
    submissionsEchart: function (id, data) {
        var xData = [], sData = [];
        for (var i = 0; i < data.length; i++) {
            xData.push(data[i].name);
            sData.push(data[i].value);
        }
        var myChart = echarts.init(document.getElementById(id));
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '15%',
                top: '10%',
                right: '10%',
                bottom: '25%',
            },
            xAxis: {
                type: 'category',
                data: xData,
                axisLine: {
                    lineStyle: {
                        color: '#cac9e6',
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    rotate: 45,
                    color: '#e5eaf0',
                    textStyle: {
                        fontSize: 12
                    },
                },
            },
            yAxis: {
                axisLabel: {
                    formatter: '{value}',
                    color: '#e5eaf0',
                },
                axisTick: {
                    show: false
                },
                axisLine: {

                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: '#cac9e6',
                    }
                }
            },
            series: [{
                type: 'bar',
                data: sData,
                barWidth: '20px',
                itemStyle: {
                    normal: {
                        color: '#88abda'
                    }
                }
            }]
        };
        myChart.setOption(option, true);
    },
    // 防守方漏洞排名
    rankingEchart: function (id, data) {
        var allData = {
            name: [],
            value: []
        };
        for (var i = 0; i < data.length; i++) {
            allData.name.push(data[i].name);
            allData.value.push(data[i].value);
        }
        var myChart = echarts.init(document.getElementById(id));
        var option = {
            tooltip: {
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: '{b0}: {c0}<br />{b1}: {c1}'
            },
            grid: {
                left: '20%',
                top: '10%',
                right: '10%',
                bottom: '20%',
            },
            title: {
                text: '特性示例：渐变色 阴影 点击缩放',
                subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom',
                show: false
            },
            yAxis: {
                data: allData.name,
                axisLabel: {
                    fontSize: 12,
                    textStyle: {
                        color: '#cac9e6'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                }
            },
            xAxis: {
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#cac9e6',
                    }
                },
                axisTick: {
                    show: true
                },
                axisLabel: {
                    fontSize: 12,
                    textStyle: {
                        color: '#cac9e6'
                    }
                }
            },
            series: [{ // For shadow
                type: 'bar',
                barGap: '-100%',
                barCategoryGap: '40%',
            },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#88abda'
                        },
                    },
                    data: allData.value
                }
            ]
        };
        myChart.setOption(option, true);
    },
    // 专家工作量
    expertWorkEchart: function (id, data) {
        var seriesData = data;
        var legendData = [];
        for (var i = 0; i < data.length; i++) {
            legendData.push(data[i].name);
        }
        var myChart = echarts.init(document.getElementById(id));
        var option = {
            color: ['#1ae4e2', '#88abda', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'],
            title: {
                text: '',
                x: 'center',
                y: '40%',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                borderColor: 'rgba(255,255,255,.3)',
                backgroundColor: 'rgba(13,5,30,.6)',
                borderWidth: 1,
                padding: 5,
                formatter: function (parms) {
                    var str = parms.marker + "" + parms.data.name + "</br>" +
                        "数量：" + parms.data.value + "</br>" +
                        "占比：" + parms.percent + "%";
                    return str;
                }
            },
            legend: {
                type: "scroll",
                icon: "circle",
                orient: 'horizontal',
                bottom: '12%',
                textStyle: {
                    color: '#fff'
                },
                data: legendData
            },
            series: [{
                type: 'pie',
                center: ['50%', '40%'],
                radius: ['35%', '55%'],
                clockwise: true,
                avoidLabelOverlap: true,
                hoverOffset: 5,
                itemStyle: {
                    normal: {
                        // color: function(params) {
                        //     return colorList[params.dataIndex]
                        // },
                        // borderColor: 'rgba(0,0,0,0.5)',
                        // borderWidth: 5
                    }
                },
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{a|{b}：{d}%}\n{hr|}',
                    rich: {
                        hr: {
                            backgroundColor: 't',
                            borderRadius: 3,
                            width: 3,
                            height: 3,
                            padding: [3, 3, 0, -12]
                        },
                        a: {
                            padding: [-30, 5, -20, 5]
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 10,
                        length2: 15,
                        lineStyle: {
                            width: 1
                        }
                    }
                },
                data: seriesData
            }]
        };
        myChart.setOption(option, true);
    }
};

