var DW;
$(function () {
    DW = {
        width: $(".mainOBody").width(),
        height: document.documentElement.clientHeight
    };
});

// 集群网络IO
function ClusterNetwork(array) {
    $("#jqjkjmzs1").width($(".title").width());
    $("#jqjkjmzs1").height(DW.width * 0.16);
    var myChart = echarts.init(document.getElementById('jqjkjmzs1'));

    var option = {
        title: {
            text: '',
            left: '50%',
            textAlign: 'center'
        },
        grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            backgroundColor: 'rgba(255,255,255,1)',
            padding: [5, 10],
            textStyle: {
                color: '#7588E4',
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        // legend: {
        //     right: 20,
        //     orient: 'vertical',
        //     data: ['今日','昨日']
        // },
        xAxis: {
            type: 'category',
            data: array.time,
            boundaryGap: false,
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: ['#D4DFF5']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#666'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: ['#D4DFF5']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#666'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            }
        },
        series: [
            {
                name: '',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: array.data,
                areaStyle: { //区域填充样式
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(241,159,84, 0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(241,159,84, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f19e53'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                }
            }
        ]
    };

    myChart.setOption(option);
}

// 内存、CPU、文件
function MemoryCpuFile(ID, dataList, colorArr) {
    $(".mainItemsItemC").css({
        "width": $(".mainItemsItemCon").width(),
        "height": $(".mainItemsItemCon").width() * 0.5
    });
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        title: {
            text: dataList.title,
            subtext: dataList.value + '%',
            x: 'center',
            y: '30%',
            textStyle: {
                fontWeight: 'normal',
                color: '#000000',
                fontSize: '16'
            },
            subtextStyle: {
                fontWeight: 'normal',
                color: colorArr[0],
                fontSize: '24'
            }
        },
        tooltip: {},
        color: ['#0696ff', '#ccc', 'transparent'],
        series: [
            {
                type: 'pie',
                radius: ['55%', '80%'],
                avoidLabelOverlap: false,
                startAngle: 140,
                center: ['50%', '50%'],
                label: {
                    normal: {
                        position: 'inner',
                        textStyle: {
                            color: '#fff',
                            fontSize: 20
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: dataList.value,
                        tooltip: {
                            formatter: function (a) {
                                return `${a.marker} value: ${a.value}`
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: { // 完成的圆环的颜色
                                    colorStops: [{
                                        offset: 0,
                                        color: colorArr[0] // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: colorArr[1] // 100% 处的颜色
                                    }]
                                },
                            }
                        }
                    },
                    {
                        value: 100 - dataList.value,
                        tooltip: {
                            formatter: function (a) {
                                return ''
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: colorArr[2]
                            }
                        }
                    },
                    {
                        value: 260,
                        name: '',
                        tooltip: {
                            formatter: function (a) {
                                return ''
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,0,0,0)'
                            }
                        }
                    }
                ]
            },

        ]
    };

    myChart.setOption(option);
    $("#" + ID + "").append('<i class="startI"></i><i class="endI"></i>');
    var addStrs = '<div class="ncfile">\n' +
        '    <h2><p>已使用</p><span><em>' + dataList.used + '</em></span></h2>\n' +
        '    <h2><p>已使用</p><span><em>' + dataList.all + '</em></span></h2>\n' +
        '</div>';
    $("#" + ID + "").append(addStrs);
    $('.ncfile h2 p').css({
        'lineHeight': $(".mainItemsItemC").height() * 0.15 + "px"
    });
    $("#" + ID + " h2 span").css({
        'lineHeight': $(".mainItemsItemC").height() * 0.1 + "px"
    });
    $("#" + ID + " h2 span em").css({
        'color': colorArr[0]
    })

}

// 主机管理
function HostManagement(dataList) {
    var Obj = dataList;
    var DWS = $(".mainConC").width();
    var newDw = DWS * 0.96;
    var size = {
        w: newDw * 0.15,
        h: newDw * 0.15 * 1.73,
        itemsX: newDw * 0.2,
        itemsY: newDw * 0.2,
    };
    var DHS = DWS * 0.07 + (parseInt((Obj.length-1) / 5)+1) * (size.h + DWS * 0.04);
    $("#zjgl").append('<canvas id="zjglC" width="' + $(".mainConC").width() + '" height="' + DHS + '"></canvas>');
    var canvas = document.getElementById('zjglC');
    var ctx = canvas.getContext('2d');
    for (var i = 0; i < Obj.length; i++) {
        Obj[i].attributeData = {
            postion: {
                x: DWS * 0.02 + size.itemsX * (i % 5) + (size.itemsX - size.w) * 0.5,
                y: DWS * 0.05 + parseInt(i / 5) * (size.h + DWS * 0.04)
            },
            flage: -1
        };
        Obj[i].setImage = function () {
            var _this = this;
            _this.attributeData.img = new Image();
            _this.attributeData.img.src = 'images/state.png';
            _this.attributeData.img.onload = function () {
                ctx.drawImage(_this.attributeData.img, _this.attributeData.postion.x, _this.attributeData.postion.y, size.w, size.h);
                setText(_this.title, 0.08, '#297cf6', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.06);
                setText(_this.title, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.233);
                setText(_this.ip, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.365);
                setText('状态    ' + _this.state.text, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.497);
                setState(_this.state.data, _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.485);
                setText(_this.memory, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.629);
                setText(_this.kernel, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.761);
                setText(_this.harddisk, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.893)
            };
        };
        Obj[i].setImage();
    }

    $(document).mousemove(function (evtM) {
        setInfo(evtM)
    });

    // 弹窗
    function setInfo(evtM) {
        var getEvtM = {
            x: evtM.clientX - $("#zjgl").offset().left,
            y: evtM.clientY - $("#zjgl").offset().top + $(window).scrollTop()
        };
        for (var j = 0; j < Obj.length; j++) {
            if (
                (getEvtM.x > Obj[j].attributeData.postion.x && getEvtM.x < Obj[j].attributeData.postion.x + size.w) &&
                (getEvtM.y > Obj[j].attributeData.postion.y && getEvtM.y < Obj[j].attributeData.postion.y + size.h)
            ) {

                if (Obj[j].attributeData.postion.x + size.w + 450 > document.documentElement.clientWidth) {
                    $(".zjglPop").css({
                        "top": Obj[j].attributeData.postion.y + size.h * 0.1,
                        "left": Obj[j].attributeData.postion.x - 400 + "px"
                    });
                    $(".zjglPop i").addClass('positionI')
                } else {
                    $(".zjglPop").css({
                        "top": Obj[j].attributeData.postion.y + size.h * 0.1,
                        "left": Obj[j].attributeData.postion.x + size.w
                    });
                    $(".zjglPop i").removeClass('positionI')
                }
                $(".zjglPop").show();

                if (Obj[j].attributeData.flage != j) {
                    setBg(Obj[j], 'images/state_active.png', '#f18e31');
                    Obj[j].attributeData.flage = j
                }
                $(".zjglPopTitle").html("IP:" + Obj[j].title);
                $(".zjglPopText h2").html("IP:" + Obj[j].ip);
                var stateColor = '';
                if (Obj[j].state.data == 'default') {
                    stateColor = '#42c9f8'
                } else if (Obj[j].state.data == 'danger') {
                    stateColor = '#ff2851'
                } else if (Obj[j].state.data == 'warning') {
                    stateColor = '#ffb30f'
                }
                $(".zjglPopText p").html("状态:<em style='background: " + stateColor + "'></em>" + Obj[j].state.text);
                setHostEchart('zjglPopCon1', Obj[j].echartData[0]);
                setHostEchart('zjglPopCon2', Obj[j].echartData[1]);
                setHostEchart('zjglPopCon3', Obj[j].echartData[2]);
                return false;
            } else {
                $(".zjglPop").hide();
                if (Obj[j].attributeData.flage == j) {
                    setBg(Obj[j], 'images/state.png', '#297cf6');
                    Obj[j].attributeData.flage = -1
                }
            }
        }
    }

    function setBg(DIV, DivSrc, titleColor) {
        ctx.clearRect(DIV.attributeData.postion.x, DIV.attributeData.postion.y, size.w, size.h);
        DIV.setImage = function () {
            var _this = this;
            _this.attributeData.img = new Image();
            _this.attributeData.img.src = DivSrc;
            _this.attributeData.img.onload = function () {
                ctx.drawImage(_this.attributeData.img, _this.attributeData.postion.x, _this.attributeData.postion.y, size.w, size.h);
                setText(_this.title, 0.08, titleColor, _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.06);
                setText(_this.title, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.233);
                setText(_this.ip, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.365);
                setText('状态    ' + _this.state.text, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.497);
                setState(_this.state.data, _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.485);
                setText(_this.memory, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.629);
                setText(_this.kernel, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.761);
                setText(_this.harddisk, 0.07, '#fff', _this.attributeData.postion.x + size.w * 0.5, _this.attributeData.postion.y + size.h * 0.893)
            };
        };
        DIV.setImage();
    }

    // 字符串
    function setText(Text, TextSize, TextColor, Xsize, Ysize) {
        ctx.beginPath();
        ctx.textAlign = 'center';
        ctx.font = size.w * TextSize + 'px Arial';
        ctx.fillStyle = TextColor;
        ctx.fillText(Text, Xsize, Ysize);
        ctx.fill();
    }

    //状态
    function setState(Text, Xsize, Ysize) {
        var stateColor = '';
        if (Text == 'default') {
            stateColor = '#42c9f8'
        } else if (Text == 'danger') {
            stateColor = '#ff2851'
        } else if (Text == 'warning') {
            stateColor = '#ffb30f'
        }
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(Xsize, Ysize, 4.5, Math.PI * 2, false);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = stateColor;
        ctx.arc(Xsize, Ysize, 3.5, Math.PI * 2, false);
        ctx.fill()
    }

}

// 主机管理echart
function setHostEchart(ID, EchartData) {
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        title: {
            text: EchartData.value + '%',
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                color: '#0580f2',
                fontSize: '20'
            }
        },
        color: ['rgba(176, 212, 251, 1)'],
        // legend: {
        //     show: true,
        //     itemGap: 12,
        //     data: ['01', '02']
        // },

        series: [{
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['60%', '85%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            hoverAnimation: false,
            data: [{
                value: EchartData.value,
                name: '01',
                itemStyle: {
                    normal: {
                        color: '#297cf6',
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                }
            }, {
                name: '02',
                value: 100 - EchartData.value,
                itemStyle: {
                    normal: {
                        color: '#7890b4'
                    }
                }
            }]
        }]
    }
    myChart.setOption(option);
    $("#" + ID).parent().find('h6').html(EchartData.title)
}

// --------------------------------------------------------
// 运维监控界面展示

// 任务节点失败排名
function setPoint(DataList) {
    $(".itemsTimeSide").height(DW.height * 0.25);
    $(".itemsTimeSide").append('<canvas id="itemsTimeSide" width=' + $(".itemsTimeSide").width() + ' height=' + $(".itemsTimeSide").height() + '></canvas>');
    var canvas = document.getElementById('itemsTimeSide');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000000";
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('个数', DW.width * 0.2, 20);

    var setColor = '';
    for (var j = 0; j < DataList.length; j++) {
        if (j % 2 == 1) {
            setColor = '#f2953e'
        } else {
            setColor = '#297cf6'
        }
        setAllLine(DataList[j].title, 20, DW.height * (0.05 + j * 0.04), DataList[j].index, setColor);
    }

    function setAllLine(text, textX, textY, index, color) {
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(text, textX, textY);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(65, textY - 4);
        ctx.lineTo(65 + 9 * 0.016 * DW.width, textY - 4);
        ctx.stroke();
        var setR = 0;
        for (var i = 0; i < 10; i++) {
            if (i > index - 1) {
                setR = 0
            } else {
                setR = 2.5
            }
            setLine(65 + i * 0.016 * DW.width, textY - 4, setR, color)
        }
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.font = '12px Arial';
        ctx.fillText(index, DW.width * 0.205, textY);
    }

    function setLine(X, Y, R, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(X, Y, 4.5, Math.PI * 2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(X, Y, 3.5, Math.PI * 2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(X, Y, R, Math.PI * 2, false);
        ctx.fill()
    }
}

// 任务执行走势图
function setTrend(ID, dataList) {
    $("#itemsTimeRank").css({
        'width': $(".ywjkItems").width(),
        'height': DW.height * 0.25
    });
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        color: ['#5b9bd5', '#ed7d31'],
        backgroundColor: '#FFF',
        grid: {
            top: 20,
            bottom: 60,
            left: '12%',
            right: '5%'
        },
        legend: {
            bottom: '10',
            itemWidth: 30,
            itemHeight: 6,
            data: ['任务1', '任务2']
        },
        xAxis: [{
            name: '',
            nameLocation: 'center',
            nameGap: 50,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                rotate: 0
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#CCC'
                }
            },
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        }],
        yAxis: [{

            name: '',
            nameLocation: 'center',
            nameGap: 40,
            nameTextStyle: {
                color: '#000'
            },
            axisLine: {
                lineStyle: {
                    color: '#CCC'
                },
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#CCC'
                }
            },
            axisLabel: {
                color: '#000'
            }
        }],
        series: [{
            name: '',
            type: 'line',
            itemStyle: {
                color: '#5b9bd5',
                borderColor: '#5b9bd5',
                borderWidth: 2
            },
            lineStyle: {
                width: 2
            },
            data: []
        },
            {
                name: '',
                type: 'line',
                itemStyle: {
                    color: '#ed7d31',
                    borderColor: '#ed7d31',
                    borderWidth: 2
                },
                lineStyle: {
                    width: 2
                },
                data: []
            }
        ]
    };

    for (var i = 0; i < dataList.length; i++) {
        option.legend.data.push(dataList[i].title);
        option.series[i].name = dataList[i].title;
        option.series[i].data = dataList[i].data;
    }
    myChart.setOption(option);
}

// 安全大数据中心
function safeData(DataList) {
    var getRW = $(".mainItemsLeft .ywjkItems").eq(0).height() + $(".mainItemsLeft .ywjkItems").eq(1).height() + 20
    $(".mainItemsMnC").height(getRW);
    FreeSafeData(DataList)
}

// 安全大数据中心自定义canvas
function FreeSafeData(DataList) {
    var FDW = {
        width: $("#mainItemsMnC").width(),
        height: $("#mainItemsMnC").height()
    };
    $("#mainItemsMnC").append('<canvas id="mainItemsMnCC" width="' + FDW.width + '" height="' + FDW.height + '"></canvas>');
    var canvas = document.getElementById('mainItemsMnCC');
    var ctx = canvas.getContext('2d');
    var setPosXY = [];
    var Img = new Image();
    Img.src = 'images/moddle.png';
    Img.onload = function () {
        ctx.drawImage(Img, FDW.width * (1 - 0.514) / 2, FDW.height * (1 - 0.359) - 20, FDW.width * 0.514, FDW.height * 0.359);
        setPosSwitch();
        for (var i = 0; i < DataList.length; i++) {
            setBranch(DataList[i], i)
        }
    };

    // 各个分支
    function setBranch(ObjS, index) {
        ObjS.FreeEvt = {};
        var Obj = ObjS.FreeEvt;
        Obj.position = setPosXY[index];
        // 虚线
        ctx.beginPath();
        ctx.moveTo(Obj.position.x, Obj.position.y);
        ctx.fillStyle = 'rgba(243,157,81,0.3)';
        ctx.arc(Obj.position.x, Obj.position.y, 7.5, Math.PI * 2, false);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = 'rgba(243,157,81,1)';
        ctx.arc(Obj.position.x, Obj.position.y, 5, Math.PI * 2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = '#f3a35c';
        ctx.setLineDash([4, 2]);
        ctx.moveTo(Obj.position.x, Obj.position.y);
        for (var j = 0; j < Obj.position.direction.length; j++) {
            ctx.lineTo(
                Obj.position.x - Obj.position.direction[j][0],
                Obj.position.y - Obj.position.direction[j][1]
            );
            if (j == Obj.position.direction.length - 1) {
                Obj.position.lastPos = {
                    x: Obj.position.x - Obj.position.direction[j][0],
                    y: Obj.position.y - Obj.position.direction[j][1]
                }
            }
        }
        ctx.stroke();
        ctx.setLineDash([0]);
        // 创建images背景图片
        Obj.img = function () {
            var _this = this;
            this.position.setImg = new Image();
            this.position.setImg.src = 'images/moddletitle.png';
            this.position.setImg.onload = function () {
                ctx.drawImage(
                    _this.position.setImg,
                    Obj.position.lastPos.x - FDW.width * 0.237 * 0.5,
                    Obj.position.lastPos.y - FDW.height * 0.147,
                    FDW.width * 0.237,
                    FDW.height * 0.147
                );

                ctx.beginPath();
                ctx.fillStyle = "#f18e32";
                ctx.font = "bold 14px Arial";
                ctx.fillText(
                    ObjS.title,
                    Obj.position.lastPos.x - FDW.width * 0.237 * 0.5 + FDW.width * 0.02,
                    Obj.position.lastPos.y - FDW.height * 0.147 + FDW.height * 0.04
                );
                ctx.fill();
                var setTranslate = {
                    x: Obj.position.lastPos.x - FDW.width * 0.237 * 0.5 + FDW.width * 0.02,
                    y: Obj.position.lastPos.y - FDW.height * 0.147 + FDW.height * 0.04 + 18
                };
                ctx.translate(setTranslate.x, setTranslate.y);
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = "#000033";
                ctx.font = "12px Arial";
                for (var k = 0; k < ObjS.text.length; k++) {
                    ctx.fillText(ObjS.text[k], 0, FDW.height * 0.03 * k);
                }
                ctx.fill();
                ctx.restore();
                ctx.translate(-setTranslate.x, -setTranslate.y)
            }
        };
        Obj.img()
    }

    // 设置起始点坐标
    function setPosSwitch() {
        setPosXY[0] = {
            x: FDW.width * 0.244,
            y: FDW.height * 0.795,
            direction: [
                [0, FDW.height * 0.105],
                [FDW.width * 0.099, FDW.height * 0.161],
                [FDW.width * 0.099, FDW.height * 0.258],
            ]
        };
        setPosXY[1] = {
            x: FDW.width * 0.339,
            y: FDW.height * 0.71,
            direction: [
                [0, FDW.height * 0.208],
                [FDW.width * 0.066, FDW.height * 0.36],
                [FDW.width * 0.066, FDW.height * 0.443],
            ]
        };
        setPosXY[2] = {
            x: FDW.width * 0.668,
            y: FDW.height * 0.710,
            direction: [
                [-FDW.width * 0.084, FDW.height * 0.06],
                [-FDW.width * 0.084, FDW.height * 0.18]
            ]
        };
        setPosXY[3] = {
            x: FDW.width * 0.755,
            y: FDW.height * 0.789,
            direction: [
                [-FDW.width * 0.1, FDW.height * 0.053],
                [-FDW.width * 0.1, FDW.height * 0.596]
            ]
        };
        setPosXY[4] = {
            x: FDW.width * 0.698,
            y: FDW.height * 0.865,
            direction: [
                [0, FDW.height * 0.192],
                [FDW.width * 0.168, FDW.height * 0.222],
                [FDW.width * 0.168, FDW.height * 0.52],
            ]
        };
    }
}


// 集群使用情况
function colonyUse() {
    var getRW = $(".mainItemsLeft .ywjkItems").eq(0).height() + $(".mainItemsLeft .ywjkItems").eq(1).height() + 20
    $(".mainItemsRight .ywjkItems").eq(0).height(getRW);
    $(".mainItemsRI").css({
        'padding': (getRW - $(".title").height() - $(".mainItemsRI").height() * 3) / 6 + "px 0"
    })
}

function colonyEchart(ID, EchartData, EchartColor) {
    var myChart = echarts.init(document.getElementById(ID));
    var option = {
        title: {
            text: EchartData + '%',
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                color: '#0580f2',
                fontSize: '20'
            }
        },
        color: ['rgba(176, 212, 251, 1)'],
        // legend: {
        //     show: true,
        //     itemGap: 12,
        //     data: ['01', '02']
        // },

        series: [{
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['55%', '75%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            hoverAnimation: false,
            data: [{
                value: EchartData,
                name: '01',
                itemStyle: {
                    normal: {
                        color: EchartColor,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                }
            }, {
                name: '02',
                value: 100 - EchartData,
                itemStyle: {
                    normal: {
                        color: '#3cb9c3'
                    }
                }
            }]
        }]
    }
    myChart.setOption(option);
}

// 数据中心调用应用排名
function DataRank(dataList, AllData) {
    $("#itemsTimeDRank").height(DW.height * 0.2);
    var myChart = echarts.init(document.getElementById('itemsTimeDRank'));
    var maxData = AllData;
    var option = {
        backgroundColor: '#fff',
        tooltip: {},
        xAxis: {
            max: maxData,
            splitLine: {
                show: false
            },
            offset: 10,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            }
        },
        yAxis: {
            data: dataList.title,
            inverse: true,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    color: '#999',
                    fontSize: 16
                }
            }
        },
        grid: {
            top: '5%',
            bottom: "5%",
            left: '20%',
            right: '10%'
        },
        series: [{ // 外边框
            name: '',
            type: 'pictorialBar',
            symbol: 'reat',
            //barWidth: '10%',
            symbolOffset: ['-1%', 0], //位置
            symbolSize: ['102%', 10],
            itemStyle: {
                normal: {
                    color: 'rgba(0,0,0,0)'
                }
            },
            z: -180, //图层
            symbolRepeat: null,
            symbolBoundingData: maxData,
            data: dataList.data,
            animationEasing: 'elasticOut',

        },
            { // 内边框
                name: '',
                type: 'pictorialBar',
                symbol: 'reat',
                //barWidth: '9%',
                //barMaxWidth: '20%',
                symbolOffset: ['-0.5%', 0],
                symbolSize: ['101%', 22],
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)'
                    }
                },
                z: -20,
                symbolRepeat: null,
                symbolBoundingData: maxData,
                data: dataList.data,
                animationEasing: 'elasticOut',

            },
            {
                // current data
                type: 'pictorialBar',
                symbol: 'rect',
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: '#2c80f6',

                    }
                },
                symbolRepeat: 'fixed',
                symbolMargin: '30%',
                symbolClip: true,
                symbolSize: [10, 20],
                symbolBoundingData: maxData,
                data: dataList.data,
                z: 99999999,
                animationEasing: 'elasticOut',
                animationDelay: function (dataIndex, params) {
                    return params.index * 30;
                }
            },
            {
                // full data
                type: 'pictorialBar',
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)'
                    }
                },
                label: {
                    normal: {
                        show: false,
                        formatter: function (params) {
                            return (params.value);
                        },
                        position: 'right',
                        offset: [10, 0],
                        textStyle: {
                            color: 'darkorange',
                            fontSize: 18
                        }
                    }
                },
                animationDuration: 0,
                symbolRepeat: 'fixed',
                symbolMargin: '5%',
                symbol: 'rect',
                symbolSize: 20,
                symbolBoundingData: maxData,
                data: dataList.data,
                z: 99999,
                animationEasing: 'elasticOut',
                animationDelay: function (dataIndex, params) {
                    return params.index * 30;
                }
            }
        ]
    };
    myChart.setOption(option);
}

// 接口调用失败率走势图
function InterFail(dataList) {
    $("#InterFail").height(DW.height * 0.2);
    var myChart = echarts.init(document.getElementById('InterFail'));
    var option = {
        backgroundColor: "#fff",
        color: ['#7dc67d', '#297cf6'],

        title: [{
            text: '',
            left: '1%',
            top: '6%',
            textStyle: {
                color: '#333'
            }
        }
        ],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            right: '5%',
            top: '3%',
            textStyle: {
                color: '#ffd285',
            },
            data: []

        },
        grid: {
            left: '5%',
            right: '8%',
            top: '16%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            "show": false,
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#d8d8d8'
                }
            },
            axisTick: {
                "show": false
            },
            axisLabel: {
                textStyle: {
                    color: '#000'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#d8d8d8'
                }
            },
            boundaryGap: false,
            data: dataList.title
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: '#d8d8d8'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#d8d8d8'
                }
            },
            axisTick: {
                "show": false
            },
            axisLabel: {
                textStyle: {
                    color: '#000'
                }
            },
            type: 'value'
        },
        series: [
            {
                name: '',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: []
            },
            {
                name: '',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: []
            }
        ]
    };

    for (var i = 0; i < dataList.data.length; i++) {
        option.legend.data.push({
            name: dataList.data[i].name,
            textStyle: {
                fontSize: 12,
                fontWeight: 'bolder',
                color: '#333'
            },
            icon: 'stack'
        });
        option.series.push({
            name: dataList.data[i].name,
            smooth: true,
            type: 'line',
            symbolSize: 8,
            symbol: 'circle',
            data: dataList.data[i].data
        })
    }
    myChart.setOption(option);
}

// 数据中心接口调用走势图
function DataInter(array) {
    $("#dataCall").height(DW.height * 0.2);
    var myChart = echarts.init(document.getElementById('dataCall'));
    var option = {
        title: {
            text: '',
            left: '50%',
            textAlign: 'center'
        },
        grid: {
            top: '10%',
            left: '5%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            backgroundColor: 'rgba(255,255,255,1)',
            padding: [5, 10],
            textStyle: {
                color: '#7588E4',
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        // legend: {
        //     right: 20,
        //     orient: 'vertical',
        //     data: ['今日','昨日']
        // },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            boundaryGap: false,
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: ['#D4DFF5']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#666'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: ['#D4DFF5']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#666'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            }
        },
        series: [
            {
                name: '',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: array[0],
                areaStyle: { //区域填充样式
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(241,159,84, 0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(241,159,84, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f19e53'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                }
            },
            {
                name: '',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: array[1],
                areaStyle: { //区域填充样式
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(130,232,231, 0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(130,232,231, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#39dfdc'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}