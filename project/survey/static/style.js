function CreateItems() {
    this.items = null;
    this.boxSize = 80;
    this.data = null;
    this.flageInit = false;
    this.focusFlage = {
        edit: false,
        add: false
    };
    this.WH = {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
    };
}

CreateItems.prototype = {
    init: function (data) { //初始化
        // 样式
        this.style();
        // 拖拽
        this.dragItems();
        //加载表单数据
        if (data) {
            data = typeof data == 'string' ? JSON.parse(data) : data;
            if (Object.prototype.toString.call(data) == '[object Array]') {
                this.flageInit = true;
                this.renderData(data);
            }
        }
    },
    style: function () {
        $(".survey").css('minHeight', this.WH.h - 30);
        // $(".survey-right-con").css('minHeight', $(".survey-right").height() - $(".survey-right-title").height() - parseInt($(".survey-right-title").css('marginTop')) * 2 - 20);
        // $(".survey-right-main").css('minHeight', $(".survey-right").height() - $(".survey-right-title").height() - parseInt($(".survey-right-title").css('marginTop')) * 2 - 20);
        $(".survey-right-con").append('<div class="line-survey"></div>');
    },
    globalEvent: { //全局事件
        cursor_auto: function () {
            $(".survey-right-con .survey-right-items").css('cursor', 'auto');
        },
        cursor_move: function () {
            $(".survey-right-con .survey-right-items").css('cursor', 'move');
        }
    },
    dragItems: function () {// 拖动
        var _this_ = this;
        var pos = {  // move Items
            items: {x: 0, y: 0},
            dowm: {x: 0, y: 0, caX: 0, caY: 0},
            move: {x: 0, y: 0},
            up: {x: 0, y: 0}
        };
        var boundary = {
            x: 0,
            x_0: 0,
            y: 0,
            y_0: 0
        };
        $(".survey-left .survey-left-items").each(function () {
            $(this).find('.survey-left-con h2').each(function () {
                $(this).mousedown(function (evtMd) {
                    boundary = {
                        x: $(".survey-right-con").offset().left,
                        x_0: $(".survey-right-con").offset().left + $(".survey-right-con").width(),
                        y: $(".survey-right-con").offset().top,
                        y_0: $(".survey-right-con").offset().top + $(".survey-right-con").height()
                    };
                    _this_.items = null;
                    var _this = this;
                    pos.dowm = {
                        x: $(_this).offset().left - $(".survey").offset().left,
                        y: $(_this).offset().top - $(".survey").offset().top,
                        caX: evtMd.clientX - $(_this).offset().left,
                        caY: evtMd.clientY - $(_this).offset().top
                    };
                    $(".survey").append(
                        '<div data-type="' + $(_this).attr('data-type') + '" class="moveItems moveActive">' +
                        '<h2>' + $(this).html() + '</h2>' +
                        '</div>'
                    );
                    $(".moveItems").css({
                        'top': pos.dowm.y + "px",
                        'left': pos.dowm.x + "px"
                    });
                    $(document).bind("mousemove", function (evtMm) {
                        pos.move.x = evtMm.clientX - $(".survey").offset().left - pos.dowm.caX;
                        pos.move.y = evtMm.clientY - $(".survey").offset().top - pos.dowm.caY;
                        $(".moveItems").css({
                            'top': pos.move.y + "px",
                            'left': pos.move.x + "px"
                        });
                        // 判断拖动的类型
                        _this_.judgeItems($(".moveItems"), 80);
                    });
                    $(".moveItems").mouseup(function (evtUp) {
                        $(document).unbind('mousemove');
                        // 创建选项
                        if (
                            (evtUp.clientX > boundary.x && evtUp.clientX < boundary.x_0) &&
                            (evtUp.clientY > boundary.y && evtUp.clientY < boundary.y_0)
                        ) {
                            _this_.createLable({obj: $(".moveItems")});
                        }
                        // 移除items
                        $(".moveItems").remove();
                    });
                });
            });
        });
    },
    judgeItems: function (obj, size) {  // 判断拖动的位置
        if (size) {
            this.boxSize = size;
        }
        var _this_ = this;
        var this_pos = {
            x: 0,
            y: 0,
            x_0: 0,
            y_0: 0,
            x_1: 0,
            y_1: 0
        };
        var obj_all = $(".survey-right-con .survey-right-items");
        obj_all.each(function (index) {
            this_pos.y = $(this).offset().top;
            this_pos.y_0 = $(this).offset().top + $(this).height() * 0.5;
            this_pos.y_1 = $(this).offset().top + $(this).height();
            this_pos.x = $(this).offset().left;
            this_pos.x_0 = $(this).offset().left + $(this).offset().left + $(this).width();
            if (
                (obj.offset().top > this_pos.y && obj.offset().top < this_pos.y_0) &&
                (obj.offset().left >= this_pos.x && obj.offset().left <= this_pos.x_0)
            ) {
                _this_.items = $(this);
                $(this).css({
                    'marginTop': _this_.boxSize + "px"
                });
                obj_all.not($(this)).css({
                    'marginTop': "0px"
                });
            } else if (
                (obj.offset().top > this_pos.y_0 && obj.offset().top < this_pos.y_1) &&
                (obj.offset().left >= this_pos.x && obj.offset().left <= this_pos.x_0)
            ) {
                if (index != obj_all.length - 1) {
                    _this_.items = obj_all.eq(index + 1);
                    obj_all.eq(index + 1).css({
                        'marginTop': _this_.boxSize + "px"
                    });
                    obj_all.not(obj_all.eq(index + 1)).css({
                        'marginTop': "0px"
                    });
                } else {
                    _this_.items = null;
                    $(".survey-right-con .survey-right-items").css({
                        'marginTop': "0"
                    });
                }
            }
        });
    },
    createLable: function (data) {// 拖动创建标签
        var templateHtml = null;
        if (data.addHtml) {
            templateHtml = data.addHtml;
        }
        if (data.obj) {
            templateHtml = $(".template").find('.type-' + data.obj.attr('data-type')).html();
        }
        if (data.type) {
            templateHtml = $(".template").find('.type-' + data.type).html();
        }
        if (this.items != null) {
            this.items.before('<div class="survey-right-items survey-right-items-active">' + templateHtml + '</div>');
        } else {
            $(".survey-right-con").append('<div class="survey-right-items survey-right-items-active">' + templateHtml + '</div>');
        }
        $(".survey-right-items-active").fadeIn(300);
        $(".survey-right-items").removeClass('survey-right-items-active');
        $(".survey-right-con .survey-right-items").css({
            'marginTop': "0"
        });
        if (!this.flageInit) {
            // 标题序列号
            this.title_list();
            // 编辑
            this.move_edit();
            // 添加选项
            this.move_add();
            // 上移
            this.move_up();
            // 下移
            this.move_down();
            // 删除
            this.move_del();
            // 移动
            this.items_move();
        }
    },
    move_edit: function () {//编辑
        var _this = this;
        $(".survey-right-con .survey-right-items").find('.template-edit').unbind().bind("click", function () {
            // 解除除了当前的模块的编辑和添加
            _this.del_other_select($(this).parents('.survey-right-items'));
            // 添加按钮显示
            $(this).parents('.template-html').find('.parameter-add').hide();
            $(this).parents('.template-html').find('.template-add').show();
            $(this).parents('.template-html').find('.addBtn').attr('data-text', 'no');
            // 判断点击的状态
            if ($(this).attr('data-edit') == 'no') {
                // 判断编辑是否被激活
                _this.focusFlage.edit = true;
                _this.focusFlage.add = false;
                _this.globalEvent.cursor_auto();
                // 编辑标签
                $(this).attr('data-edit', 'select');
                $(this).text('保存');
                $(this).addClass('template-edit-active');
                // 编辑的内容
                $(this).parents('.template-html').find('.template-title span').attr('contenteditable', 'true');
                $(this).parents('.template-html').find('.template-title span').addClass('editActive');
                $(this).parents('.template-html').find('.template-con h2').each(function () {
                    var this_h2 = this;
                    // label
                    $(this).find('label span').attr('data-for', $(this).find('label').attr('for'));
                    $(this).find('label').attr('for', '');
                    $(this).find('label span').addClass('editActive');
                    $(this).find('label span').attr('contenteditable', 'true');
                    // 删除
                    $(this).find('p').removeClass('del-lable');
                    $(this).find('p').unbind().bind('click', function () {
                        _this.pop_ups('确认删除该选项？', function () {
                            this_h2.remove();
                        });
                    });
                });
            } else {
                _this.globalEvent.cursor_move();
                // 编辑标签
                _this.edit_save($(this));
            }
        });
    },
    edit_save: function (that) { //保存
        // 判断编辑是否被激活
        this.focusFlage.edit = false;
        // 编辑标签
        that.attr('data-edit', 'no');
        that.text('编辑');
        that.removeClass('template-edit-active');
        // 编辑的内容
        that.parents('.template-html').find('.template-title span').attr('contenteditable', 'false');
        that.parents('.template-html').find('.template-title span').removeClass('editActive');
        that.parents('.template-html').find('.template-con h2').each(function () {
            $(this).find('label span').removeClass('editActive');
            $(this).find('label span').attr('contenteditable', 'false');
            $(this).find('label').attr('for', $(this).find('label span').attr('data-for'));
            $(this).find('p').addClass('del-lable');
        });
    },
    move_up: function () { //上移
        // 模块上移
        var temporaryLabel = {
            html: '',
            type: ''
        }, _that = this;
        $(".survey-right-con .survey-right-items").each(function (index) {
            var _this = this;
            $(this).find('.template-up').unbind().bind("click", function () {
                // 解除除了当前的模块的编辑和添加
                _that.del_other_select($(_this), 'all');
                _that.globalEvent.cursor_move();
                _that.focusFlage.edit = false;
                _that.focusFlage.add = false;
                // 交换
                if (index != 0) {
                    temporaryLabel.type = $(_this).prev().find('.template-html').attr('data-type');
                    temporaryLabel.html = $(_this).prev().find('.template-main').html();
                    // 交换内容
                    $(_this).prev().find('.template-main').html($(_this).find('.template-main').html());
                    $(_this).find('.template-main').html(temporaryLabel.html);
                    // 交换属性
                    $(_this).prev().find('.template-html').attr('data-type', $(_this).find('.template-html').attr('data-type'));
                    $(_this).find('.template-html').attr('data-type', temporaryLabel.type);
                    // 标题序列号
                    _that.title_list();
                }
            });
        });
    },
    move_down: function () { //下移
        // 模块下移
        var temporaryLabel = {
            html: '',
            type: ''
        }, _that = this;
        $(".survey-right-con .survey-right-items").each(function (index) {
            var _this = this;
            $(this).find('.template-down').unbind().bind("click", function () {
                // 解除除了当前的模块的编辑和添加
                _that.del_other_select($(_this), 'all');
                _that.globalEvent.cursor_move();
                _that.focusFlage.edit = false;
                _that.focusFlage.add = false;
                // 交换
                if (index != $(".survey-right-con .survey-right-items").length - 1) {
                    temporaryLabel.type = $(_this).next().find('.template-html').attr('data-type');
                    temporaryLabel.html = $(_this).next().find('.template-main').html();
                    // 交换内容
                    $(_this).next().find('.template-main').html($(_this).find('.template-main').html());
                    $(_this).find('.template-main').html(temporaryLabel.html);
                    // 交换属性
                    $(_this).next().find('.template-html').attr('data-type', $(_this).find('.template-html').attr('data-type'));
                    $(_this).find('.template-html').attr('data-type', temporaryLabel.type);
                    // 标题序列号
                    _that.title_list();
                }
            });
        });
    },
    move_del: function () { //删除
        // 模块删除
        var _that = this;
        $(".survey-right-con .survey-right-items").find('.template-del').unbind().bind('click', function () {
            var _this = this;
            // 解除除了当前的模块的编辑和添加
            _that.del_other_select($(this).parents(".survey-right-items"), 'all');
            _that.globalEvent.cursor_move();
            _that.focusFlage.edit = false;
            _that.focusFlage.add = false;
            // 交换内容
            _that.pop_ups('确定删除该表单吗？', function () {
                $(_this).parents('.survey-right-items').remove();
                // 标题序列号
                _that.title_list();
            });
        });
    },
    lable_add: function (str, obj) { //标签类型选择
        var getLabel = null;
        if (str == 'radio') {
            getLabel = '<h2>\n' +
                '   <input type="radio" class="input-template" name="sex" id="' + obj.id + '"/>\n' +
                '   <label for="' + obj.id + '" class="label-template"><span>' + obj.val + '</span></label>\n' +
                '   <p class="del-lable"><i>&times;</i></p>\n' +
                '</h2>';
        }
        if (str == 'checkbox') {
            getLabel = '<h2>\n' +
                '    <input type="checkbox" name="sex" class="input-template" id="' + obj.id + '"/>\n' +
                '    <label for="' + obj.id + '" class="label-template"><span>' + obj.val + '</span></label>\n' +
                '    <p class="del-lable"><i>&times;</i></p>\n' +
                '</h2>';
        }
        if (str == 'text') {
            getLabel = '<h2>\n' +
                '    <input type="text" class="input-template" id="' + obj.id + '"/>\n' +
                '    <label for="' + obj.id + '" class="label-template"><span>' + obj.val + '</span></label>\n' +
                '    <p class="del-lable"><i>&times;</i></p>\n' +
                '</h2>';
        }
        return getLabel;
    },
    title_list: function () { //序号排序
        $(".survey-right-con .survey-right-items").each(function (index) {
            $(this).find('.template-title i').text(index + 1);
        });
    },
    del_other_select: function (obj, all) { //解除其他模块的编辑和添加
        // 解除除了当前的模块的编辑和添加
        if (all && all == 'all') {
            var this_obj = $(".survey-right-con .survey-right-items");
        } else {
            var this_obj = $(".survey-right-con .survey-right-items").not(obj);
        }
        // 添加按钮的操作
        this_obj.find('.template-add').show();
        this_obj.find('.parameter-add').hide();
        this_obj.find('.addBtn').attr('data-text', 'no');
        // 编辑按钮的操作
        this.edit_save(this_obj.find('.template-html .template-edit'));
    },
    move_add: function () { //添加
        var this_ = null, _that = this;
        $(".survey-right-con .survey-right-items").find('.template-add').unbind().bind("click", function () {
            // 判断添加是否被激活
            _that.focusFlage.add = true;
            _that.focusFlage.edit = false;
            _that.globalEvent.cursor_auto();
            // 解除除了当前的模块的编辑和添加
            _that.del_other_select($(this).parents('.survey-right-items'));
            // 当前处于编辑状态
            if ($(this).parents('.template-html').find('.template-edit').attr('data-edit') == 'select') {
                _that.edit_save($(this).parents('.template-html').find('.template-edit'));
            }
            // 数值、状态、参数
            $(this).parent().find('.addInput').val('');
            this_ = this;
            $(this).hide();
            $(this).parent('.addBtn').find('.parameter-add').show();
            $(this).parent('.addBtn').attr('data-text', 'select');
            // 确定
            $(".add-determine").unbind().bind("click", function () {
                // 判断添加是否被激活
                _that.focusFlage.add = false;
                _that.globalEvent.cursor_move();
                var create_obj = $(this).parents('.template-html').find('.template-con');
                // 判断当前的表单类型
                create_obj.append(
                    _that.lable_add($(this).parents('.template-html').attr('data-type'), {
                        id: new Date().getTime(),
                        val: $(this).parents('.parameter-add').find('.addInput').val()
                    })
                );
                // 按钮和表单切换
                $(this_).parent('.addBtn').find('.parameter-add').hide();
                $(this_).show();
                $(this_).parent('.addBtn').attr('data-text', 'no');
            });
            // 取消
            $(".add-cancel").unbind().bind("click", function () {
                // 判断添加是否被激活
                _that.focusFlage.add = false;
                _that.globalEvent.cursor_move();
                // 按钮和表单切换
                $(this_).parent('.addBtn').find('.parameter-add').hide();
                $(this_).show();
                $(this_).parent('.addBtn').attr('data-text', 'no');
            });
        });
    },
    items_move: function () { //items拖动移动
        var itemsPos = {
            y: 0,
            y1: 0,
            html: '',
            caHeight: $(".survey-right-con").offset().top,
            padTop: 0,
            del_height: 0,
            temporary: {
                html: '',
                type: ''
            }
        }, _that = this;
        $(".survey-right-con .survey-right-items").each(function () {
            var _this = this;
            $(this).mousedown(function (md) {
                if (!_that.focusFlage.add && !_that.focusFlage.edit) {
                    itemsPos.y = parseInt($(this).css('paddingTop')) + $(this).offset().top - itemsPos.caHeight + $(".survey-right-main").scrollTop();
                    itemsPos.padTop = parseInt($(this).css('paddingTop'));
                    $(document).bind("mousemove", function (mm) {
                        // 通过判断是否存在创建悬浮标签
                        if (Math.abs(md.clientY - mm.clientY) > 10 && $(".mask-box").length == 0) {
                            // 创建的浮动的div
                            itemsPos.html = '<div class="mask-box"><h3>' + $(_this).find('.template-title').html() + '</h3></div>';
                            $(".survey-right-con").append(itemsPos.html);
                            $(".mask-box").css({
                                'height': $(_this).height() + "px",
                                'top': itemsPos.y + "px"
                            });
                            // 获取当前的data-type和html
                            itemsPos.del_height = $(_this).height();
                            itemsPos.temporary.html = $(_this).html();
                            $(_this).remove();
                            // 取消mousemove
                            if ($(".mask-box").length > 0) {
                                $(".mask-box").mouseup(function () {
                                    $(document).unbind("mousemove");
                                    $(".mask-box").remove();
                                    // 鼠标抬起创建标签
                                    _that.createLable({addHtml: itemsPos.temporary.html});
                                });
                            }
                        }
                        itemsPos.y1 = mm.clientY - md.clientY + itemsPos.y;
                        if (itemsPos.y1 <= itemsPos.padTop) {
                            itemsPos.y1 = itemsPos.padTop;
                        }
                        $(".mask-box").css({
                            'top': itemsPos.y1 + "px"
                        });
                        // 判断拖动的类型
                        if ($(".mask-box").length > 0) {
                            _that.judgeItems($(".mask-box"), itemsPos.del_height);
                        }
                    });
                    // 取消mousemove
                    $(this).mouseup(function () {
                        $(document).unbind("mousemove");
                    });
                }
            });
        });
    },
    pop_ups: function (msg, callback) { //弹窗
        var pop_html = '<div class="pop">\n' +
            '    <div class="pop-title">提示</div>\n' +
            '    <div class="pop-con">' + msg + '</div>\n' +
            '    <div class="pop-btn">\n' +
            '        <button class="pop-cancel">取消</button>\n' +
            '        <button class="pop-determine">确定</button>\n' +
            '    </div>\n' +
            '</div>';
        $("body").append(pop_html);
        $(".pop").css({
            'top': this.WH.h * 0.3 + "px",
            'left': (this.WH.w - $(".pop").width()) * 0.5 + "px"
        });
        $(".pop-cancel").click(function () {
            $(".pop").remove();
        });
        $(".pop-determine").click(function () {
            $(".pop").remove();
            if (callback) {
                callback();
            }
        });
    },
    saveData: function () { //保存数据
        var _this = this, label_arr = [];
        _this.data = [];
        $(".survey-right-con .survey-right-items").each(function () {
            label_arr = [];
            $(this).find('.template-con h2').each(function () {
                label_arr.push({
                    id: $(this).find('label').attr('for'),
                    text: $(this).find('.label-template span').text()
                });
            });
            _this.data.push({
                type: $(this).find('.template-html').attr('data-type'),
                title: $(this).find('.template-title span').text(),
                label: label_arr
            });
        });
        return _this.data;
    },
    renderData: function (data) { //加载数据
        var str = '', _this = this;
        for (var i = 0; i < data.length; i++) {
            str = '';
            for (var j = 0; j < data[i].label.length; j++) {
                str += _this.lable_add(data[i].type, {
                    id: data[i].label[j].id,
                    val: data[i].label[j].text
                });
            }
            // 该参数判断是否加载事件，防止事件重复加载
            if (i == data.length - 1) {
                _this.flageInit = false;
            }
            // 创建标签
            this.createLable({
                type: data[i].type
            });
            // 把数据中的列表添加到新创建的表单中
            $(".survey-right-con .survey-right-items").eq(i).find('.template-con').html(str);
            $(".survey-right-con .survey-right-items").eq(i).find('.template-title span').html(data[i].title);
        }
    },
    removeData: function () { //删除
        $(".survey-right-con .survey-right-items").remove();
    }
};

// 初始化
var survey = (function () {
    return new CreateItems();
})();




