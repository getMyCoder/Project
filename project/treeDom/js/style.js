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
                $("#left ul").append('<li><h2 data-id="' + domData[k].id + '" data-children="' + childrenFlage + '"><span>' + domData[k].text + '</span></h2></li>');
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
                                        '<span>' + domData[i].text + '</span></h2>' +
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
        $(this).children('h2').click(function () {
            // 事件返回数据
            if ($(this).attr('data-children') == 1) {
                var _this_ = this;
                for (var i = 0; i < dataList.data.length; i++) {
                    if (dataList.data[i].id == $(_this_).attr('data-id')) {
                        if (dataList.callback) {
                            if (dataList.callback.click) {
                                dataList.callback.click(dataList.data[i]);
                            }
                            if (dataList.callback.mousedown) {
                                dataList.callback.mousedown(dataList.data[i]);
                            }
                            if (dataList.callback.mouseup) {
                                dataList.callback.mouseup(dataList.data[i]);
                            }
                        }
                    }
                }
            }
            // 列表的显示、隐藏
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
