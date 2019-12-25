// 列表数据生成标签
function treeDom(dataList) {
    setLsit(dataList.data);

    // 重新加载数据，添加标签
    function setLsit(domData) {
        $("#left").append('<ul></ul>');
        var flage = true, index = 0, createArray = [], childrenFlage = 0;
        for (var k = 0; k < domData.length; k++) {
            if (domData[k].subId == -1) {
                domData[k].index = 0;
                createArray.push(domData[k]);
                childrenFlage = domData[k].drapFlage ? 1 : 0;
                $("#left ul").append('<li>' +
                    '<h2 data-id="' + domData[k].id + '" data-children="' + childrenFlage + '">' +
                    '<span>' + domData[k].text + "|id:" + domData[k].id + '</span>' +
                    '</h2>' +
                    '</li>');
            }
        }
        while (flage) {
            flage = false;
            for (var j = 0; j < createArray.length; j++) {
                if (createArray[j].index >= 0 && createArray[j].index == index) {
                    for (var i = 0; i < domData.length; i++) {
                        if (createArray[j].id == domData[i].subId) {
                            domData[i].index = index + 1;
                            createArray.push(domData[i]);
                            $("#left ul li").find('h2').each(function () {
                                if ($(this).attr('data-id') == domData[i].subId) {
                                    if (!$(this).attr('data-select')) {
                                        $(this).attr('data-select', 'no');
                                    }
                                    if ($(this).find('i').length == 0) {
                                        $(this).append('<i class="fa fa-caret-right"></i>');
                                    }
                                    if ($(this).siblings('ul').length == 0) {
                                        $(this).after('<ul></ul>');
                                    }
                                    childrenFlage = domData[i].drapFlage ? 1 : 0;
                                    $(this).siblings('ul').append('<li>' +
                                        '<h2 data-id="' + domData[i].id + '" data-children="' + childrenFlage + '">' +
                                        '<span>' + domData[i].text + "|id:" + domData[i].id + '</span></h2>' +
                                        '</li>');
                                }
                            });
                            flage = true;
                        }
                    }
                }
            }
            index++;
        }
    }

    // 列表样式
    $("#left ul li").each(function () {
        var _this = this;
        // 事件返回数据
        if ($(this).children('h2').attr('data-children') == 1) {
            var _this_ = $(this).children('h2');
            for (var i = 0; i < dataList.data.length; i++) {
                if (dataList.data[i].id == _this_.attr('data-id')) {
                    if (dataList.callback) {
                        // 点击事件
                        if (dataList.callback.click) {
                            (function (data_this, obj_this) {
                                _this_.click(function (evt) {
                                    dataList.callback.click(data_this, obj_this, evt);
                                });
                            })(dataList.data[i], _this_);
                        }
                        // 鼠标按下
                        if (dataList.callback.mousedown) {
                            (function (data_this, obj_this) {
                                _this_.mousedown(function (evt) {
                                    dataList.callback.mousedown(data_this, obj_this, evt);
                                });
                            })(dataList.data[i], _this_);
                        }
                        // 鼠标抬起
                        if (dataList.callback.mouseup) {
                            (function (data_this, obj_this) {
                                _this_.mouseup(function (evt) {
                                    dataList.callback.mouseup(data_this, obj_this, evt);
                                });
                            })(dataList.data[i], _this_);
                        }
                    }
                }
            }
        }
        // 列表的显示、隐藏
        $(this).children('h2').click(function () {
            if ($(this).attr('data-select') == 'no') {
                // 当前
                $(this).attr('data-select', 'select');
                $(this).find('i').addClass('iActiveO');
                $(this).find('i').removeClass('iActiveI');
                // 展开ul
                $(this).siblings('ul').slideDown(100);
                $(_this).siblings().find('ul').slideUp(100);
                $(_this).siblings().find('h2').attr('data-select', 'no');
                $(_this).siblings().find('h2 i').removeClass('iActiveO');
            } else {
                // 当前
                $(this).attr('data-select', 'no');
                $(this).find('i').addClass('iActiveI');
                $(this).find('i').removeClass('iActiveO');
                // 收起ul
                $(this).siblings('ul').slideUp(100);
                $(_this).siblings().find('ul').hide();
            }
        });
    });
}

// 存放节点参数数据(load加载的时候如果存在节点判断赋值)
var saveData = {};
// 拖拽
var flageIndex = 0;
var createPos = null;
var drapEvt = {
    // Items二拖拽及其事件
    itemsDrap: function (callback) {
        $("#right .items").each(function () {
            var _this = this;
            $(this).unbind('mousedown').mousedown(function (evD) {
                var craeteEvD = {
                    x: evD.clientX,
                    y: evD.clientY,
                    this_x: $(_this).position().left,
                    this_y: $(_this).position().top,
                    thisWidth: $(_this).find('.itemsBottom').height() * 0.5
                };

                $(document).mousemove(function (evM) {
                    $(_this).css({
                        'left': craeteEvD.this_x + (evM.clientX - craeteEvD.x) + "px",
                        'top': craeteEvD.this_y + (evM.clientY - craeteEvD.y) + "px",
                    });
                    // 二次拖动判断位置
                    drapEvt.posItems({
                        x_start: 0,
                        x_end: $("#right").width() - $(_this).width(),
                        y_start: 0,
                        y_end: $("#right").height() - $(_this).height(),
                        obj: $(_this)
                    });

                    if (saveData[$(_this).attr('id')]) {
                        // 当前dom作为线的出发点
                        if (saveData[$(_this).attr('id')].original.id) {
                            // 连接到
                            if (saveData[$(_this).attr('id')].connectedTo && saveData[$(_this).attr('id')].connectedTo.length > 0) {
                                for (var i = 0; i < saveData[$(_this).attr('id')].connectedTo.length; i++) {
                                    svgDom.pathRoute({
                                        svgId: saveData[$(_this).attr('id')].connectedTo[i].line.svgId,
                                        pathId: saveData[$(_this).attr('id')].connectedTo[i].line.pathId,
                                        path: {
                                            start: {
                                                x: $(_this).find('.itemsBottom').offset().left - $("#right").offset().left + craeteEvD.thisWidth,
                                                y: $(_this).find('.itemsBottom').offset().top - $("#right").offset().top + craeteEvD.thisWidth
                                            },
                                            end: {
                                                x: $("#" + saveData[$(_this).attr('id')].connectedTo[i].id).find('.itemsTop').offset().left
                                                    - $("#right").offset().left + craeteEvD.thisWidth,
                                                y: $("#" + saveData[$(_this).attr('id')].connectedTo[i].id).find('.itemsTop').offset().top
                                                    - $("#right").offset().top + craeteEvD.thisWidth,
                                            }
                                        }
                                    });
                                }
                            }
                            // 连接来自
                            if (saveData[$(_this).attr('id')].connectedFrom && saveData[$(_this).attr('id')].connectedFrom.length > 0) {
                                for (var j = 0; j < saveData[$(_this).attr('id')].connectedFrom.length; j++) {
                                    svgDom.pathRoute({
                                        svgId: saveData[$(_this).attr('id')].connectedFrom[j].line.svgId,
                                        pathId: saveData[$(_this).attr('id')].connectedFrom[j].line.pathId,
                                        path: {
                                            start: {
                                                x: $(_this).find('.itemsTop').offset().left
                                                    - $("#right").offset().left + $(_this).find('.itemsBottom').width() * 0.5,
                                                y: $(_this).find('.itemsTop').offset().top
                                                    - $("#right").offset().top + $(_this).find('.itemsBottom').height() * 0.5
                                            },
                                            end: {
                                                x: $("#" + saveData[$(_this).attr('id')].connectedFrom[j].id).find('.itemsBottom').offset().left
                                                    - $("#right").offset().left + $(_this).find('.itemsBottom').width() * 0.5,
                                                y: $("#" + saveData[$(_this).attr('id')].connectedFrom[j].id).find('.itemsBottom').offset().top
                                                    - $("#right").offset().top + $(_this).find('.itemsBottom').height() * 0.5,
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                });
                $(document).mouseup(function () {
                    $(document).unbind('mousemove');
                });
            });
            // 删除节点
            drapEvt.removeItems($(this));
            // 拖拽线条
            nodeLine($(_this));
            // 节点的双击返回当前节点的数据
            $(this).unbind('dblclick').dblclick(function () {
                if (callback) {
                    callback($(_this)[0].parameter_data);
                }
            });
        });
    },
    // 节点删除
    removeItems: function (obj) {
        var creatDel = {
            from: {//删除的当前节点的from线
                data: null,
                dataFrom: null,
                index: null
            },
            to: {//删除的当前节点的to线
                data: null,
                dataTo: null,
                index: null
            }
        };
        obj.find('i').unbind('click').click(function () {
            removePop({
                title: '温馨提示',
                text: '确定要删除吗？',
            }, function () {
                obj.remove();
                tip('该节点成功删除！');
                // 删除obj的被连接线
                if (saveData[obj.attr('id')].connectedFrom && saveData[obj.attr('id')].connectedFrom.length > 0) {
                    for (var i = 0; i < saveData[obj.attr('id')].connectedFrom.length; i++) {
                        $("#" + saveData[obj.attr('id')].connectedFrom[i].line.svgId).remove();
                        for (var k = 0; k < saveData[saveData[obj.attr('id')].connectedFrom[i].id].connectedTo.length; k++) {
                            creatDel.from.dataFrom = saveData[saveData[obj.attr('id')].connectedFrom[i].id].connectedTo[k];
                            if (creatDel.from.dataFrom.id == obj.attr('id')) {
                                creatDel.from.index = k;
                            }
                        }
                        saveData[saveData[obj.attr('id')].connectedFrom[i].id].connectedTo.splice(creatDel.from.index, 1);
                    }
                }
                // 删除obj的连接线
                if (saveData[obj.attr('id')].connectedTo && saveData[obj.attr('id')].connectedTo.length > 0) {
                    for (var j = 0; j < saveData[obj.attr('id')].connectedTo.length; j++) {
                        $("#" + saveData[obj.attr('id')].connectedTo[j].line.svgId).remove();
                        for (var l = 0; l < saveData[saveData[obj.attr('id')].connectedTo[j].id].connectedFrom.length; l++) {
                            creatDel.to.dataTo = saveData[saveData[obj.attr('id')].connectedTo[j].id].connectedFrom[l];
                            if (creatDel.to.dataTo.id == obj.attr('id')) {
                                creatDel.to.index = l;
                            }
                        }
                        saveData[saveData[obj.attr('id')].connectedTo[j].id].connectedFrom.splice(creatDel.to.index, 1);
                    }
                }
                delete saveData[obj.attr('id')];
            });
        });
    },
    // 位置判断
    posItems: function (pos) {
        if (!createPos) {
            createPos = {};
        }
        createPos.posItems = {};
        createPos.posItems = {
            x: pos.obj.position().left,
            y: pos.obj.position().top
        };
        // x
        createPos.posItems.x = createPos.posItems.x < pos.x_start ? pos.x_start : createPos.posItems.x;
        createPos.posItems.x = createPos.posItems.x > pos.x_end ? pos.x_end : createPos.posItems.x;
        // y
        createPos.posItems.y = createPos.posItems.y < pos.y_start ? pos.y_start : createPos.posItems.y;
        createPos.posItems.y = createPos.posItems.y > pos.y_end ? pos.y_end : createPos.posItems.y;
        pos.obj.css({
            'top': createPos.posItems.y + "px",
            'left': createPos.posItems.x + "px"
        });
    }
};

function drag(data, obj, evt, callback) {
    createPos = {
        obj_left: obj.offset().left,
        obj_top: obj.offset().top,
        top: obj.offset().top - $("#left").offset().top,
        left: obj.offset().left - $("#left").offset().left,
        x: evt.clientX,
        y: evt.clientY,
        parameter_data: null,
        posItems: null,
        randomDom: "items_" + flageIndex
    };

    $(document).bind('mousemove', function (evtM) {
        // 当拖拽的距离大于1创建节点标签
        if (Math.abs(createPos.x - evtM.clientX) > 1 || Math.abs(createPos.y - evtM.clientY) > 1) {
            if ($('#' + createPos.randomDom).length == 0) {
                $("#right").append('' +
                    '<div class="items" id="' + createPos.randomDom + '" style="top: ' + createPos.top + 'px;left: ' + createPos.left + 'px;">' +
                    '<span>' + data.text + "|id:" + data.id + '</span>' +
                    '<i class="fa fa-times-circle"></i>' +
                    '<em class="itemsTop"></em>' +
                    '<em class="itemsBottom"></em>' +
                    '</div>');
                $('#' + createPos.randomDom)[0].parameter_data = {};
                $('#' + createPos.randomDom)[0].parameter_data = data;

                flageIndex++;
            }
            $('#' + createPos.randomDom).css({
                'left': createPos.left + (evtM.clientX - createPos.x) - $("#left").width() + "px",
                'top': createPos.top + (evtM.clientY - createPos.y) + "px",
            });
            // 位置
            drapEvt.posItems({
                x_start: $("#right").width() - $("#main").width(),
                x_end: $("#right").width() - $('#' + createPos.randomDom).width(),
                y_start: 0,
                y_end: $("#right").height() - $('#' + createPos.randomDom).height(),
                obj: $('#' + createPos.randomDom)
            });
        }
    });

    $(document).unbind('mouseup').mouseup(function (evtUp) {
        $(document).unbind();
        if (Math.abs(createPos.x - evtUp.clientX) > 1 || Math.abs(createPos.y - evtUp.clientY) > 1) {
            saveData[createPos.randomDom] = {
                original: {
                    id: createPos.randomDom,
                    // pos: {
                    //     x: $('#' + createPos.randomDom).offset().left - $("#right").offset().left,
                    //     y: $('#' + createPos.randomDom).offset().top - $("#right").offset().top
                    // }
                    index: flageIndex
                }
            };
            // 位置
            drapEvt.posItems({
                x_start: 0,
                x_end: $("#right").width() - $('#' + createPos.randomDom).width(),
                y_start: 0,
                y_end: $("#right").height() - $('#' + createPos.randomDom).height(),
                obj: $('#' + createPos.randomDom)
            });
            // Items二拖拽及其事件
            if (callback) {
                drapEvt.itemsDrap(callback);
            } else {
                drapEvt.itemsDrap();
            }
        }
    });
}

// 节点之间的曲线
var svgPos = {
    downX: 0,
    downY: 0,
    moveX: 0,
    moveY: 0,
    svgId: null,
    svgPosition: {
        w: 0,
        h: 0,
        t: 0,
        l: 0
    },
    path: null,
    temPosition: {
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: 0
        }
    }
};
var InstantiateSvg = {
    index: 0,
    rangeSize: 10
};

// 各个svg方法
var svgDom = {
    createSvg: function (svgStyle) {    //创建svg
        var main = document.getElementById('right');
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute(
            'style',
            'height:' + svgStyle.height + "px" +
            ';width:' + svgStyle.width + "px" +
            ';top:' + svgStyle.pos.s.y + "px" +
            ';left:' + svgStyle.pos.s.x + "px"
        );
        svg.id = svgStyle.svgId;
        main.appendChild(svg);
    },
    createPath: function (Ppath) {  //创建path
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.id = Ppath.pathId;
        path.setAttribute('d', Ppath.path);
        path.setAttribute('style', 'stroke:#01AAED;fill:transparent');
        document.getElementById(Ppath.svgId).appendChild(path);
    },
    pathRoute: function (coordinate) {
        var coordinateVal = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            yPath1: 0,
            yPath2: 0,
            svgTop: 0,
            svgLeft: 0
        };
        // 起始位置X
        if (coordinate.path.start.x < coordinate.path.end.x) {
            coordinateVal.svgLeft = coordinate.path.start.x;
            coordinateVal.x1 = 0;
            coordinateVal.x2 = Math.abs(coordinate.path.start.x - coordinate.path.end.x);
        } else {
            coordinateVal.svgLeft = coordinate.path.end.x;
            coordinateVal.x1 = Math.abs(coordinate.path.start.x - coordinate.path.end.x);
            coordinateVal.x2 = 0;
        }
        // 起始位置Y
        if (coordinate.path.start.y < coordinate.path.end.y) {
            coordinateVal.svgTop = coordinate.path.start.y;
            coordinateVal.y1 = 0;
            coordinateVal.y2 = Math.abs(coordinate.path.start.y - coordinate.path.end.y);
        } else {
            coordinateVal.svgTop = coordinate.path.end.y;
            coordinateVal.y1 = Math.abs(coordinate.path.start.y - coordinate.path.end.y);
            coordinateVal.y2 = 0;
        }
        // 曲线的坐标计算
        if (coordinateVal.y1 >= coordinateVal.y2) {
            coordinateVal.yPath1 = 3 / 8 * coordinateVal.y2 + 5 / 8 * coordinateVal.y1;
            coordinateVal.yPath2 = 5 / 8 * coordinateVal.y2 + 3 / 8 * coordinateVal.y1;
        } else {
            coordinateVal.yPath1 = 3 / 8 * coordinateVal.y1 + 5 / 8 * coordinateVal.y2;
            coordinateVal.yPath2 = 5 / 8 * coordinateVal.y1 + 3 / 8 * coordinateVal.y2;
        }
        $("#" + coordinate.svgId).css({
            'width': Math.abs(coordinate.path.start.x - coordinate.path.end.x) + "px",
            'height': Math.abs(coordinate.path.start.y - coordinate.path.end.y) + "px",
            'top': coordinateVal.svgTop + "px",
            'left': coordinateVal.svgLeft + "px"
        });

        var routeId = document.getElementById(coordinate.pathId);
        routeId.setAttribute('d', 'M ' + coordinateVal.x1 + ' ' + coordinateVal.y1 +
            ' C ' + coordinateVal.x1 + ' ' + coordinateVal.yPath1 + ','
            + coordinateVal.x2 + ' ' + coordinateVal.yPath2 + ',' +
            coordinateVal.x2 + ' ' + coordinateVal.y2);
    }
};

// 节点之间的连线
function nodeLine(dom) {
    var obj = $('#right'), Div = dom.find('.itemsBottom');
    Div.unbind('mousedown').mousedown(function (evtD) {
        // 阻止冒泡
        preventBubble(evtD);
        // 初始化参数变量
        svgPos = {
            downX: Div.offset().left,
            downY: Div.offset().top,
            moveX: 0,
            moveY: 0,
            svgId: 'svg_' + InstantiateSvg.index,
            pathId: 'path_' + InstantiateSvg.index,
            path: null,
            tp: {
                s: {
                    x: parseInt(Div.offset().left - obj.offset().left + Div.width() * 0.5),
                    y: parseInt(Div.offset().top - obj.offset().top + Div.height() * 0.5)
                },
                e: {
                    x: 0,
                    y: 0
                },
                m: []
            }
        };
        InstantiateSvg.index++;
        svgDom.createSvg({
            svgId: svgPos.svgId,
            pos: svgPos.tp,
            width: 0,
            height: 0
        });
        svgDom.createPath({
            svgId: svgPos.svgId,
            pathId: svgPos.pathId,
            path: ''
        });
        $(document).bind('mousemove', function (evtM) {
            svgPos.tp.e = {
                x: parseInt(evtM.clientX - obj.offset().left),
                y: parseInt(evtM.clientY - obj.offset().top)
            };
            svgDom.pathRoute({
                svgId: svgPos.svgId,
                pathId: svgPos.pathId,
                path: {
                    start: svgPos.tp.s,
                    end: svgPos.tp.e
                }
            });

            // 筛选链接到的
            obj.find('.items').each(function () {
                var _this = this;
                if (
                    Math.abs(svgPos.tp.e.x - ($(this).find('.itemsTop').offset().left - obj.offset().left)) <= InstantiateSvg.rangeSize &&
                    Math.abs(svgPos.tp.e.y - ($(this).find('.itemsTop').offset().top - obj.offset().top)) <= InstantiateSvg.rangeSize
                ) {
                    svgDom.pathRoute({
                        svgId: svgPos.svgId,
                        pathId: svgPos.pathId,
                        path: {
                            start: svgPos.tp.s,
                            end: {
                                x: $(_this).find('.itemsTop').offset().left - obj.offset().left + Div.width() * 0.5,
                                y: $(_this).find('.itemsTop').offset().top - obj.offset().top + Div.height() * 0.5
                            }
                        }
                    });
                    $(document).unbind('mousemove');
                }
            });
        });
        $(document).unbind('mouseup').mouseup(function () {
            var flageVal = {
                flage: false,
                obj: null
            };
            obj.find('.items').each(function () {
                var _this = this;
                if ($(this).attr('id') != dom.attr('id')) {
                    if (
                        Math.abs(svgPos.tp.e.x - ($(this).find('.itemsTop').offset().left - obj.offset().left)) <= InstantiateSvg.rangeSize &&
                        Math.abs(svgPos.tp.e.y - ($(this).find('.itemsTop').offset().top - obj.offset().top)) <= InstantiateSvg.rangeSize
                    ) {
                        svgDom.pathRoute({
                            svgId: svgPos.svgId,
                            pathId: svgPos.pathId,
                            path: {
                                start: svgPos.tp.s,
                                end: {
                                    x: $(_this).find('.itemsTop').offset().left - obj.offset().left + Div.width() * 0.5,
                                    y: $(_this).find('.itemsTop').offset().top - obj.offset().top + Div.height() * 0.5
                                }
                            }
                        });
                        flageVal = {
                            flage: true,
                            obj: $(_this)
                        };
                    }
                }
            });
            if (!flageVal.flage) {
                $("#" + svgPos.svgId).remove();
            } else {
                if (!saveData[dom.attr('id')].connectedTo) {
                    saveData[dom.attr('id')].connectedTo = [];
                }
                saveData[dom.attr('id')].connectedTo.push({
                    id: flageVal.obj.attr('id'),
                    // pos: {x: flageVal.obj.position().left, y: flageVal.obj.position().top},
                    line: {svgId: svgPos.svgId, pathId: svgPos.pathId}
                });
                if (!saveData[flageVal.obj.attr('id')].connectedFrom) {
                    saveData[flageVal.obj.attr('id')].connectedFrom = [];
                }
                saveData[flageVal.obj.attr('id')].connectedFrom.push({
                    id: dom.attr('id'),
                    // pos: {x:dom.position().left, y: dom.position().top},
                    line: {svgId: svgPos.svgId, pathId: svgPos.pathId}
                });
            }
            $(document).unbind();
        });
    });
}

// 保存各个节点信息
function savaNode(callback) {
    for (var data in saveData) {
        saveData[data].original.pos = {};
        saveData[data].original.data = {};
        saveData[data].original.pos = {
            x: $("#" + data).position().left,
            y: $("#" + data).position().top
        };
        saveData[data].original.data = $("#" + data)[0].parameter_data;
    }
    tip('保存成功！');
    if (callback) {
        callback(saveData);
    }
}

// 页面加载的时候获取节点信息，渲染
function loadNode(nodeData, callback) {
    saveData = nodeData;
    var loadNode = {
        junction: 0,
        junctionPos: 0,
        items: null,
        junctionTo: 0,
        junctionPosTo: 0,
        itemsTo: 0,
        pos: {
            s: {x: 0, y: 0},
            e: {x: 0, y: 0}
        },
        pathPos: {
            s: {x: 0, y: 0},
            e: {x: 0, y: 0}
        },
        svgIndex: 0
    };
    for (var item in nodeData) {
        $("#right").append(
            '<div class="items" id="' + item + '" style="top: ' + nodeData[item].original.pos.y + 'px; left: ' + nodeData[item].original.pos.x + 'px;">' +
            '<span>' + nodeData[item].original.data.text + '</span>' +
            '<i class="fa fa-times-circle"></i>' +
            '<em class="itemsTop"></em>' +
            '<em class="itemsBottom"></em>' +
            '</div>'
        );
    }
    for (var itemSvg in nodeData) {
        loadNode.junction = $("#" + itemSvg).find('.itemsBottom');
        loadNode.junctionTo = $("#" + itemSvg).find('.itemsTop');
        $("#" + itemSvg)[0].parameter_data = nodeData[itemSvg].original.data;
        if (nodeData[itemSvg].connectedTo && nodeData[itemSvg].connectedTo.length > 0) {
            for (var i = 0; i < nodeData[itemSvg].connectedTo.length; i++) {
                loadNode.items = nodeData[itemSvg].original.pos;
                loadNode.itemsTo = nodeData[nodeData[itemSvg].connectedTo[i].id];
                // 连接线的位置X轴判断
                if (loadNode.itemsTo.original.pos.x - loadNode.items.x > 0) {
                    loadNode.pos.s.x = loadNode.items.x + loadNode.junction.position().left + loadNode.junction.width() * 0.5;
                    loadNode.pos.e.x = loadNode.itemsTo.original.pos.x + loadNode.junctionTo.position().left + loadNode.junction.width() * 0.5;
                } else {
                    loadNode.pos.s.x = loadNode.itemsTo.original.pos.x + loadNode.junctionTo.position().left + loadNode.junction.width() * 0.5;
                    loadNode.pos.e.x = loadNode.items.x + loadNode.junction.position().left + loadNode.junction.width() * 0.5;
                }
                // 连接线的位置Y轴判断
                if (loadNode.itemsTo.original.pos.y - loadNode.items.y > 0) {
                    loadNode.pos.s.y = loadNode.items.y + loadNode.junction.position().top + loadNode.junction.width() * 0.5;
                    loadNode.pos.e.y = loadNode.itemsTo.original.pos.y + loadNode.junction.width() * 0.5;
                } else {
                    loadNode.pos.s.y = loadNode.itemsTo.original.pos.y + loadNode.junction.width() * 0.5;
                    loadNode.pos.e.y = loadNode.items.y + loadNode.junction.position().top + loadNode.junction.width() * 0.5;
                }
                // 创建svg
                svgDom.createSvg({
                    svgId: nodeData[itemSvg].connectedTo[i].line.svgId,
                    pos: {
                        s: loadNode.pos.s,
                        e: loadNode.pos.e
                    },
                    width: Math.abs(loadNode.itemsTo.original.pos.x - loadNode.items.x),
                    height: Math.abs(loadNode.itemsTo.original.pos.y - loadNode.items.y - $("#" + itemSvg).height()) + loadNode.junction.width() * 0.5
                });
                // 创建path
                svgDom.createPath({
                    svgId: nodeData[itemSvg].connectedTo[i].line.svgId,
                    pathId: nodeData[itemSvg].connectedTo[i].line.pathId,
                    path: ''
                });
                // path线
                loadNode.pathPos = {
                    s: {
                        x: loadNode.items.x + loadNode.junction.position().left + loadNode.junction.width() * 0.5,
                        y: loadNode.items.y + loadNode.junction.position().top + loadNode.junction.width() * 0.5
                    },
                    e: {
                        x: loadNode.itemsTo.original.pos.x + loadNode.junctionTo.position().left + loadNode.junction.width() * 0.5,
                        y: loadNode.itemsTo.original.pos.y + loadNode.junction.width() * 0.5
                    }
                };
                svgDom.pathRoute({
                    svgId: nodeData[itemSvg].connectedTo[i].line.svgId,
                    pathId: nodeData[itemSvg].connectedTo[i].line.pathId,
                    path: {
                        start: loadNode.pathPos.s,
                        end: loadNode.pathPos.e
                    }
                });
            }
        }
        if (flageIndex < nodeData[itemSvg].original.index) {
            flageIndex = nodeData[itemSvg].original.index;
            while ($("#" + 'svg_' + loadNode.svgIndex).length > 0) {
                loadNode.svgIndex++;
                InstantiateSvg.index = loadNode.svgIndex;
            }
        }
        nodeLine($("#" + itemSvg));
    }
    // 加载完成后直接操作
    if (callback) {
        drapEvt.itemsDrap(callback);
    } else {
        drapEvt.itemsDrap();
    }

}

// 组织冒泡
function preventBubble(evt) {
    var e = evt || window.event;
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
    if (e && e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
}

// 弹窗
function removePop(tip, callback) {
    if (!tip.title) {
        tip.title = '提示';
    }
    if (!tip.text) {
        tip.text = '提示内容';
    }
    var createRemove = '<div class="closeRemove">' +
        '<div class="closeTitle">' + tip.title + '</div>' +
        '<h2>' + tip.text + '</h2>' +
        '<h3>' +
        '<button class="itemsClose">取消</button>' +
        '<button class="itemsRemove">确定</button>' +
        '</h3>' +
        '</div>';
    $("body").append(createRemove);
    $(".closeRemove").css({
        'top': (document.documentElement.clientHeight * 0.7 - $(".closeRemove").height()) * 0.5 + "px",
        'left': (document.documentElement.clientWidth - $(".closeRemove").width()) * 0.5 + "px"
    });
    $(".itemsClose").click(function () {
        $(".closeRemove").remove();
    });
    $(".itemsRemove").click(function () {
        $(".closeRemove").remove();
        if (callback) {
            callback();
        }
    });
}

// 提示窗
function tip(text) {
    $("body").append('<div class="tip">' + text + '</div>');
    $(".tip").hide();
    $(".tip").css({
        'top': document.documentElement.clientHeight * 0.4 + "px",
        'left': (document.documentElement.clientWidth - $(".tip").width()) * 0.5 + "px"
    });
    $(".tip").fadeIn(function () {
        setTimeout(function () {
            $(".tip").fadeOut(function () {
                $(".tip").remove();
            });
        }, 1000);
    });

}