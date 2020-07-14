var game = {
    init: function () {
        // 样式
        this.style()
        // 创建标签
        this.items()
    },
    parameter: { //参数
        size: 4,//个数
        sizeH: 40,//宽-高
        createLable: {
            distinguish: null,
            type: null,
            indexClass: null,
            left: null
        },
        items: {
            timer: null,
            speed: 400
        },
        type: {
            index: 0,
            originalIndex: 0
        },
        coordinate: {
            items: [],
            list: {}
        },
        fraction: 0
    },
    style: function () { //样式

    },
    items: function () { //创建标签
        // 类型设置
        this.parameter.type.index = 0
        this.parameter.type.originalIndex = 0
        // 标签参数
        this.parameter.createLable.distinguish = new Date().getTime()
        this.parameter.createLable.type = (Math.random() * this.parameter.size).toFixed(0)
        this.parameter.createLable.indexClass = 'items_' + this.parameter.createLable.type
        this.parameter.createLable.left = (Math.random() * ($(".main").width() / this.parameter.sizeH - this.parameter.size)).toFixed(0)
        var lableStr = '';
        for (var i = 0; i < this.parameter.size; i++) {
            lableStr += '<div ' +
                'id="' + this.parameter.createLable.distinguish + '-' + i + '" ' +
                'class="items ' + this.parameter.createLable.indexClass + ' ' + this.parameter.createLable.indexClass + '_' + this.parameter.type.index + '_' + i + '">' +
                '</div>'
        }
        $(".main").append(lableStr)
        for (var j = 0; j < this.parameter.size; j++) {
            $("#" + this.parameter.createLable.distinguish + '-' + j).css(
                'left',
                ($("#" + this.parameter.createLable.distinguish + '-' + j).position().left + this.parameter.createLable.left * this.parameter.sizeH) + "px"
            )
        }

        // 判断是否结束
        for (var k = 0; k < this.parameter.size; k++) {
            if (
                this.parameter.coordinate.items.indexOf(
                    $("#" + this.parameter.createLable.distinguish + '-' + k).position().left / this.parameter.sizeH +
                    "-" +
                    ($("#" + this.parameter.createLable.distinguish + '-' + k).position().top + this.parameter.sizeH) / this.parameter.sizeH
                ) !== -1
            ) {
                this.gameOver()
                return
            }
        }
        // 创建的标签移动
        this.moveItems()
        // 方向
        this.event()
    },
    moveItems: function () { //移动
        this.setInterValF()
    },
    setInterValF: function () { //定时器
        var _this = this, differenceTop = _this.parameter.sizeH, itemsFlage = false
        this.parameter.items.timer = setInterval(function () {
            var itemsFlage = true
            for (var i = 0; i < _this.parameter.size; i++) {
                // 判断要终点的位置
                if (
                    _this.parameter.coordinate.items.indexOf(
                        $("#" + _this.parameter.createLable.distinguish + '-' + i).position().left / differenceTop +
                        "-" +
                        ($("#" + _this.parameter.createLable.distinguish + '-' + i).position().top + differenceTop) / differenceTop
                    ) !== -1
                ) {
                    // 关闭定时器
                    _this.clearItemsMove()
                    itemsFlage = false
                } else {
                    if (($("#" + _this.parameter.createLable.distinguish + '-' + i).position().top + differenceTop) >= $(".main").height()) {
                        // 关闭定时器
                        _this.clearItemsMove()
                        itemsFlage = false
                    }
                }
            }
            if (itemsFlage) { //正常下落
                for (var j = 0; j < _this.parameter.size; j++) {
                    $("#" + _this.parameter.createLable.distinguish + '-' + j).css({
                        'top': ($("#" + _this.parameter.createLable.distinguish + '-' + j).position().top + differenceTop) + "px"
                    })
                }
            } else { //到达终点
                // 获取坐标
                _this.calculationCoordinate()
                // 创建标签
                _this.items()
            }
        }, _this.parameter.items.speed)
    },
    clearItemsMove: function () {//关闭定时器动画
        var _this = this
        clearInterval(_this.parameter.items.timer)
        $(document).unbind('keydown')
    },
    event: function () { //事件
        var _this = this
        $(document).bind('keydown', function (e) {
            // 左
            if (e.keyCode === 37) {
                _this.judgeItems(-1)
            }
            // 右
            if (e.keyCode === 39) {
                _this.judgeItems(1)
            }
            // 下
            if (e.keyCode === 40) {
                _this.addSpeed()
            }
            //变形
            if (e.keyCode === 38) {
                _this.change_shape()
            }
            // 事件
            $(document).keyup(function () {
                // 解除document事件
                $(document).unbind('keydown')
                // 事件
                _this.clearItemsMove()
                _this.parameter.items.speed = 400
                _this.setInterValF()
                // 重新添加
                _this.event()
            })
        })
    },
    judgeItems: function (direction) { //临界点判断
        var _this = this, itemsFlage = true
        for (var i = 0; i < _this.parameter.size; i++) {
            if (
                ($("#" + _this.parameter.createLable.distinguish + '-' + i).position().left + _this.parameter.sizeH * direction) < 0 ||
                ($("#" + _this.parameter.createLable.distinguish + '-' + i).position().left + _this.parameter.sizeH * direction) > ($(".main").width() - _this.parameter.sizeH) ||
                _this.parameter.coordinate.items.indexOf(
                    ($("#" + _this.parameter.createLable.distinguish + '-' + i).position().left + _this.parameter.sizeH * direction) / _this.parameter.sizeH +
                    "-" +
                    ($("#" + _this.parameter.createLable.distinguish + '-' + i).position().top) / _this.parameter.sizeH
                ) !== -1
            ) {
                itemsFlage = false
            }
        }
        if (itemsFlage) {
            for (var j = 0; j < _this.parameter.size; j++) {
                $("#" + _this.parameter.createLable.distinguish + '-' + j).css({
                    'left': ($("#" + _this.parameter.createLable.distinguish + '-' + j).position().left + _this.parameter.sizeH * direction) + "px"
                })
            }
        }
    },
    change_shape: function () { //变形
        var _this = this, index = 0

        if (this.parameter.type.index === 3) {
            this.parameter.type.index = 0
        } else {
            this.parameter.type.index += 1
        }

        // 图形变换
        this.itemsType(_this.parameter.createLable.indexClass, this.parameter.type.index)
    },
    itemsType: function (pre_type, pre_index) {  //转换形状
        var _this = this, objArray = [], position_arr = []
        for (var i = 0; i < _this.parameter.size; i++) {
            objArray.push($("#" + _this.parameter.createLable.distinguish + '-' + i))
        }

        // 设置位置
        function setPosition(array) {
            // 判断是否超出边界
            var flageW = false
            stopLoop()

            function stopLoop() {
                flageW = true
                for (var i = 0; i < array.length; i++) {
                    if (objArray[i].position().left + array[i][0] >= $(".main").width()) {
                        flageW = false
                    }
                }
                if (!flageW) {
                    for (var i = 0; i < array.length; i++) {
                        array[i][0] = array[i][0] - _this.parameter.sizeH
                    }
                    stopLoop()
                }
            }

            // 调整样式
            for (var i = 0; i < array.length; i++) {
                objArray[i].css({
                    'top': (objArray[i].position().top + array[i][1]) + "px",
                    'left': (objArray[i].position().left + array[i][0]) + "px"
                })
            }
        }

        // 种类
        var type = {
            items_0: function () { //正方形
                position_arr = [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0]
                ]
                return position_arr
            },
            items_1: function () {//长方形
                switch (pre_index) {
                    case 0:
                        position_arr = [
                            [0, 0],
                            [_this.parameter.sizeH, -_this.parameter.sizeH],
                            [_this.parameter.sizeH * 2, -_this.parameter.sizeH * 2],
                            [_this.parameter.sizeH * 3, -_this.parameter.sizeH * 3]
                        ]
                        break
                    case 1:
                        position_arr = [
                            [0, 0],
                            [-_this.parameter.sizeH, _this.parameter.sizeH],
                            [-_this.parameter.sizeH * 2, _this.parameter.sizeH * 2],
                            [-_this.parameter.sizeH * 3, _this.parameter.sizeH * 3],
                        ]
                        break
                    case 2:
                        position_arr = [
                            [0, 0],
                            [_this.parameter.sizeH, -_this.parameter.sizeH],
                            [_this.parameter.sizeH * 2, -_this.parameter.sizeH * 2],
                            [_this.parameter.sizeH * 3, -_this.parameter.sizeH * 3]
                        ]
                        break
                    case 3:
                        position_arr = [
                            [0, 0],
                            [-_this.parameter.sizeH, _this.parameter.sizeH],
                            [-_this.parameter.sizeH * 2, _this.parameter.sizeH * 2],
                            [-_this.parameter.sizeH * 3, _this.parameter.sizeH * 3],
                        ]
                        break
                }
                return position_arr

            },
            items_2: function () {//L形状
                switch (pre_index) {
                    case 0:
                        position_arr = [
                            [-_this.parameter.sizeH * 2, 0],
                            [0, 0],
                            [-_this.parameter.sizeH, _this.parameter.sizeH],
                            [-_this.parameter.sizeH, _this.parameter.sizeH]
                        ]
                        break
                    case 1:
                        position_arr = [
                            [0, 0],
                            [_this.parameter.sizeH, -_this.parameter.sizeH],
                            [_this.parameter.sizeH * 2, -_this.parameter.sizeH * 2],
                            [-_this.parameter.sizeH, -_this.parameter.sizeH]
                        ]
                        break
                    case 2:
                        position_arr = [
                            [0, 0],
                            [0, 0],
                            [-_this.parameter.sizeH, _this.parameter.sizeH],
                            [_this.parameter.sizeH, _this.parameter.sizeH]
                        ]
                        break
                    case 3:
                        position_arr = [
                            [_this.parameter.sizeH * 2, 0],
                            [-_this.parameter.sizeH, _this.parameter.sizeH],
                            [0, 0],
                            [_this.parameter.sizeH, -_this.parameter.sizeH]
                        ]
                        break
                }
                return position_arr
            },
            items_3: function () {//⊥形状
                switch (pre_index) {
                    case 0:
                        position_arr = [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [_this.parameter.sizeH, -_this.parameter.sizeH]
                        ]
                        break
                    case 1:
                        position_arr = [
                            [-_this.parameter.sizeH, 0],
                            [0, 0],
                            [0, 0],
                            [-_this.parameter.sizeH * 2, _this.parameter.sizeH]
                        ]
                        break
                    case 2:
                        position_arr = [
                            [0, 0],
                            [_this.parameter.sizeH, -_this.parameter.sizeH],
                            [_this.parameter.sizeH, -_this.parameter.sizeH],
                            [_this.parameter.sizeH, -_this.parameter.sizeH]
                        ]
                        break
                    case 3:
                        position_arr = [
                            [_this.parameter.sizeH, 0],
                            [-_this.parameter.sizeH, _this.parameter.sizeH],
                            [-_this.parameter.sizeH, _this.parameter.sizeH],
                            [0, _this.parameter.sizeH]
                        ]
                        break
                }
                return position_arr
            },
            items_4: function () {
                switch (pre_index) {
                    case 0:
                        position_arr = [
                            [-_this.parameter.sizeH, 0],
                            [-_this.parameter.sizeH * 2, _this.parameter.sizeH],
                            [_this.parameter.sizeH, 0],
                            [0, _this.parameter.sizeH]
                        ]
                        break
                    case 1:
                        position_arr = [
                            [_this.parameter.sizeH, 0],
                            [_this.parameter.sizeH * 2, -_this.parameter.sizeH],
                            [-_this.parameter.sizeH, 0],
                            [0, -_this.parameter.sizeH]
                        ]
                        break
                    case 2:
                        position_arr = [
                            [-_this.parameter.sizeH, 0],
                            [-_this.parameter.sizeH * 2, _this.parameter.sizeH],
                            [_this.parameter.sizeH, 0],
                            [0, _this.parameter.sizeH]
                        ]
                        break
                    case 3:
                        position_arr = [
                            [_this.parameter.sizeH, 0],
                            [_this.parameter.sizeH * 2, -_this.parameter.sizeH],
                            [-_this.parameter.sizeH, 0],
                            [0, -_this.parameter.sizeH]
                        ]
                        break
                }
                return position_arr
            },
        }

        setPosition(type[pre_type]())

    },
    addSpeed: function () { //加速下落
        var _this = this
        _this.clearItemsMove()
        _this.parameter.items.speed = 50
        _this.setInterValF()
    },
    calculationCoordinate: function () { //计算坐标
        var _this = this
        for (var j = 0; j < _this.parameter.size; j++) {
            if (!_this.parameter.coordinate.list[$("#" + _this.parameter.createLable.distinguish + '-' + j).position().top / _this.parameter.sizeH]) {
                _this.parameter.coordinate.list[$("#" + _this.parameter.createLable.distinguish + '-' + j).position().top / _this.parameter.sizeH] = []
            }
            _this.parameter.coordinate.list[$("#" + _this.parameter.createLable.distinguish + '-' + j).position().top / _this.parameter.sizeH].push(
                $("#" + _this.parameter.createLable.distinguish + '-' + j).position().left / _this.parameter.sizeH +
                "-" +
                $("#" + _this.parameter.createLable.distinguish + '-' + j).position().top / _this.parameter.sizeH
            )
        }
        // 判断成行的条数
        _this.judgeSuccess()
    },
    judgeSuccess: function () { //判断成条的行数
        var _this = this, deleteArray = [], successFlage = false, successIndex = 0

        // 循环按行添加的数据
        for (var val in _this.parameter.coordinate.list) {
            // 判断该行是否排满
            if (_this.parameter.coordinate.list[val].length === ($(".main").width() / _this.parameter.sizeH)) {
                // 添加需要移除数据的序列
                deleteArray.push(val)
            }
        }

        if (deleteArray.length > 0) {
            _this.parameter.coordinate.list = {}
            $(".main .items").each(function () {
                // 往下累计
                for (var i = 0; i < deleteArray.length; i++) {
                    if (($(this).position().top / _this.parameter.sizeH).toString() == deleteArray[i]) {
                        $(this).remove()
                    }
                    if (parseInt($(this).position().top / _this.parameter.sizeH) < parseInt(deleteArray[i])) {
                        $(this).css('top', ($(this).position().top + _this.parameter.sizeH) + "px")
                    }
                }
            })
            // 条数数据添加
            $(".main .items").each(function () {
                if (!_this.parameter.coordinate.list[$(this).position().top / _this.parameter.sizeH]) {
                    _this.parameter.coordinate.list[$(this).position().top / _this.parameter.sizeH] = []
                }
                _this.parameter.coordinate.list[$(this).position().top / _this.parameter.sizeH].push(
                    $(this).position().left / _this.parameter.sizeH + "-" + $(this).position().top / _this.parameter.sizeH
                )
            })
            // 得分
            _this.parameter.fraction = _this.parameter.fraction + deleteArray.length * 100 * deleteArray.length
            $(".value").text(_this.parameter.fraction)
        }
        // 删除当前的已排满的行数
        // for (var k = 0; k < deleteArray.length; k++) {
        //     delete _this.parameter.coordinate.list[deleteArray[k]]
        // }
        // 初始化所有的块的数据
        _this.parameter.coordinate.items = []
        // 循环行数
        for (var vval in _this.parameter.coordinate.list) {
            // 把当前模块存在的数据循环
            for (var m = 0; m < _this.parameter.coordinate.list[vval].length; m++) {
                _this.parameter.coordinate.items.push(_this.parameter.coordinate.list[vval][m])
            }
        }
    },
    gameOver:function () {//游戏结束
        for (var k = 0; k < this.parameter.size; k++) {
            $("#" + this.parameter.createLable.distinguish + '-' + k).remove()
        }
        this.clearItemsMove()
        alert('结束')
    }
}