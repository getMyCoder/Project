function webView(parameter) {
    return (function (dynamicParameter) {
        if (dynamicParameter === 'error') {
            console.error('传入的数据格式有误');
        } else {
            if (typeof dynamicParameter == "string") {
                return {
                    navLog: function (src, data) {
                        data.id = dynamicParameter;
                        navLog(src, data);
                        return callbackFun(data);
                    },
                    topNav: function (src, data) {
                        data.id = dynamicParameter;
                        topNav(src, data);
                        return callbackFun(data);
                    },
                    leftNav: function (src, data) {
                        data.id = dynamicParameter;
                        leftNav(src, data);
                        return callbackFun(data);
                    }
                };
            } else {
                // 登录信息
                if (parameter.nav) {
                    navLog(parameter.static, parameter.nav);
                }
                // 顶部导航
                if (parameter.topNav) {
                    topNav(parameter.static, parameter.topNav);
                }
                // 右侧导航
                if (parameter.leftNav) {
                    leftNav(parameter.static, parameter.leftNav);
                }
                return callbackFun(parameter);
            }
        }
    })(parameter = typeof parameter == 'object' ? (function () {
        if (parameter.__proto__ === Object.prototype) {
            return parameter;
        } else {
            return 'error';
        }
    })() : (function () {
        if ($("#" + parameter).length > 0) {
            return parameter;
        } else {
            return 'error';
        }
    })());
}

//return callback
function callbackFun(data) {
    return {
        navCallback: function (callback) {
            if (callback) {
                callback(data);
            }
        }
    };
}

// 登录信息
function navLog(src, data) {
    $("#" + data.id).hide();
    var createNav = {
        html: '',
        title: '',
        img: '',
        href: '',
        children: '',
        chilHref: '',
        setHref: '',
        tipVal: '',
        flageHref: '',
        external: ''
    }, childData;
    // 加载数据
    if (data.reload) {
        if (data.reload(data)) {
            data = data.reload(data);
            loadData(data);
        } else {
            data.reload(data, loadData);
        }
    } else {
        loadData(data);
    }

    function loadData(nav) {
        for (var i = 0; i < nav.data.length; i++) {
            createNav = {
                html: '',
                title: '',
                img: '',
                href: '',
                children: '',
                chilHref: '',
                tipVal: '',
                flageHref: '',
                external: ''
            };
            // 标题
            if (nav.data[i].title) {
                createNav.title = '<h4>' + nav.data[i].title + '</h4>';
            }
            // 图标
            if (nav.data[i].img) {
                createNav.img = '<h2><img src="' + src + '/' + nav.data[i].img + '" alt=""></h2>';
            }
            // 下拉列表
            if (nav.data[i].children) {
                createNav.img += '<h3><img src="' + src + '/nav-log.png" alt=""></h3>';
                for (var j = 0; j < nav.data[i].children.length; j++) {
                    childData = nav.data[i].children[j];
                    // 子类中的下拉列表
                    // 判断是否有链接
                    if (childData.href) {
                        createNav.flageHref = childData.href;
                    } else {
                        createNav.flageHref = 'javascript:;';
                    }
                    // 判断是否需要回调
                    if (childData.external) {
                        createNav.external = childData.external;
                    } else {
                        createNav.external = '';
                    }
                    // 判断是否有数值
                    if (childData.value || childData.value == 0) {
                        if (childData.tips) {
                            createNav.tipVal = '<div class="tipVal">' + childData.value + '</div>';
                        }
                        createNav.chilHref += '<li>' +
                            '<a class="log_href" href="javascript:;" data-external="' + createNav.external + '" data-url="' + createNav.flageHref + '">'
                            + childData.text + '(' + childData.value + ')</a>' +
                            '</li>';
                    } else {
                        createNav.chilHref += '<li><a class="log_href" href="javascript:;" data-url="' + createNav.flageHref + '">' + childData.text + '</a></li>';
                    }
                }
                createNav.children = '<div class="logItemsSelect"><ul>' + createNav.chilHref + '</ul></div>';
                createNav.html = '<div class="logItems logItemsTrue">' + createNav.tipVal + createNav.title + createNav.img + createNav.children + '</div>';
            } else {
                // 判断是否需要回调
                if (nav.data[i].external) {
                    createNav.external = nav.data[i].external;
                } else {
                    createNav.external = '';
                }
                // 判断是否有链接
                if (nav.data[i].href) {
                    createNav.setHref = nav.data[i].href;
                } else {
                    createNav.setHref = 'javascript:;';
                }
                createNav.html = '<div class="logItems">' +
                    '<a class="log_href" href="javascript:;" data-external="' + createNav.external + '" data-url="' + createNav.setHref + '">'
                    + createNav.title + createNav.img + '</a></div>';
            }
            $("#" + nav.id).append(createNav.html);

        }
        $("#" + nav.id).fadeIn(150);
        // callback
        // if (nav.callback) {
        //     nav.callback(nav);
        // }
        // 点击事件回调
        $("#" + nav.id).find('.log_href').click(function () {
            if ($(this).attr('data-external')) {
                if (nav.callback) {
                    nav.callback($(this).attr('data-url'));
                }
            } else {
                href_A($(this).attr('data-url'));
            }
        });

        // 事件
        $(".viewLog .logItemsTrue").each(function () {
            $(this).hover(function () {
                $(this).find('.logItemsSelect').slideDown(100);
                $(this).find('h3 img').addClass('imgRotate');
            }, function () {
                $(this).find('.logItemsSelect').slideUp(100);
                $(this).find('h3 img').removeClass('imgRotate');
            });
        });
    }
}

// 顶部导航
function topNav(src, data) {
    // $(".viewTop").append('<div class="viewTopNav" id="viewTopNav"></div>');
    $("#" + data.id).hide();
    var createDiv = {
        html: '',
        li: '',
        parameter: '',
        ico: ''
    };
    createDiv.html = '<ul>' + createDiv.li + '</ul>';
    $("#" + data.id).append(createDiv.html);
    for (var i = 0; i < data.data.length; i++) {
        createDiv.parameter = '';
        if (data.data[i].parameter) {
            createDiv.parameter = data.data[i].parameter;
        }
        if (data.data[i].ico) {
            createDiv.ico = '<h2><img src="' + src + '/' + data.data[i].ico + '" alt=""></h2>';
        }
        createDiv.li = '<li><a href="javascript:;">' + createDiv.ico + '<span>' + data.data[i].title + '</span></a></li>';
        $("#" + data.id + " ul").append(createDiv.li);
        (function (index, parame) {
            var _this = $("#" + data.id + " ul").find('li').eq(index);
            $("#" + data.id + " ul").find('li').eq(index).find('a').click(function () {
                $(_this).addClass('viewTopNavLiActive').siblings().removeClass('viewTopNavLiActive');
                if (data.callback) {
                    var getData = data.callback(parame);
                    leftNav(src, getData);
                    $(".viewLeftToggle h2 span").text($(this).text());
                }
            });
        })(i, createDiv.parameter);
    }
    $("#" + data.id).fadeIn(100);
}

// 左侧导航
function leftNav(src, data) {
    $("#" + data.id).hide();
    $("#" + data.id).html('');
    var createHtml = {
        toggle: '',
        ul: '',
        li: '',
        liTop: '',
        children: '',
        dl: '',
        href: '',
        toggleText: ''
    };
    if (data.toggle) {
        if ($(".viewTopNav ul li").length > 0) {
            createHtml.toggleText = $(".viewTopNav ul li").eq(0).find('a span').text();
        }
        createHtml.toggle = '<div class="viewLeftToggle">\n' +
            '<h2><span>' + createHtml.toggleText + '</span></h2>\n' +
            '<h3 class="viewSlideH3"><img src="' + src + '/toggle.png" alt=""></h3>\n' +
            '</div>';
    }
    for (var i = 0; i < data.data.length; i++) {
        createHtml.dl = '';
        var getData = data.data[i];
        if (getData.children) {
            for (var j = 0; j < getData.children.length; j++) {
                if (getData.children[j].href) {
                    createHtml.href = getData.children[j].href;
                } else {
                    createHtml.href = 'javascript:;';
                }
                createHtml.dl += '<dd><h3><a class="newHref" href="javascript:;" data-url="' + createHtml.href + '">' + getData.children[j].text + '</a></h3></dd>';
            }
            createHtml.li += '<li>\n' +
                '    <h2 data-select="0">\n' +
                '        <a href="javascript:;">\n' +
                '        <i><strong><img src="' + src + '/' + getData.ico + '" alt=""></strong></i>\n' +
                '        <span>' + getData.text + '</span>\n' +
                '        <em><img src="' + src + '/nav-arrow.png" alt=""></em>\n' +
                '        </a>\n' +
                '        </h2>\n' +
                '        <dl>' + createHtml.dl + '</dl>\n' +
                '    </li>';
        } else {
            if (getData.href) {
                createHtml.href = getData.href;
            } else {
                createHtml.href = 'javascript:;';
            }
            createHtml.li += '<li>\n' +
                '    <h2 data-select="0">\n' +
                '        <a class="newHref" href="javascript:;" data-url="' + createHtml.href + '">\n' +
                '        <i><strong><img src="' + src + '/' + getData.ico + '" alt=""></strong></i>\n' +
                '        <span>' + getData.text + '</span>\n' +
                '        </a>\n' +
                '        </h2>\n' +
                '    </li>';
        }
    }
    createHtml.ul = '<div class="viewLeftList"><ul class="viewLeftUl">' + createHtml.toggle + createHtml.li + '</ul></div>';
    $("#" + data.id).append(createHtml.ul);
    // 树事件
    $("#" + data.id).height(document.documentElement.clientHeight - $(".viewTop").height());
    $(".viewLeftUl li").each(function () {
        var _this = this;
        $(this).find('h2').click(function () {
            if ($("#" + data.id).attr('data-select') == '0') {
                $(this).addClass('viewLeftUlActive');
                $(_this).siblings().find('h2').removeClass('viewLeftUlActive');
                $(_this).siblings().find('dl dd').removeClass('viewLeftUlActive');
                if ($(this).attr('data-select') == '0') {
                    $(this).find('em img').addClass('viewLeftUlImgActive');
                    $(_this).siblings().find('em img').removeClass('viewLeftUlImgActive');
                    $(this).attr('data-select', '1');
                    $(_this).siblings().find('h2').attr('data-select', '0');
                    $(_this).find('dl').slideDown(100);
                    $(_this).siblings().find('dl').slideUp(100);
                } else {
                    $(this).find('em img').removeClass('viewLeftUlImgActive');
                    $(this).attr('data-select', '0');
                    $(_this).find('dl').slideUp(100);
                }
            }
        });

        $(this).find('dl dd').each(function () {
            $(this).click(function () {
                $(_this).find('h2').removeClass('viewLeftUlActive');
                $(_this).siblings().find('dl dd').removeClass('viewLeftUlActive');
                $(this).addClass('viewLeftUlActive').siblings().removeClass('viewLeftUlActive');
            });
        });
    });
    $("#" + data.id).fadeIn(100);
    // 判断min or max状态
    if ($("#" + data.id).attr('data-select') == '1') {
        $("#" + data.id).addClass('toggleLeft');
        $(".toggleLeft ul li dl").hide();
        toggleMin();
    }
    // toggle
    $(".viewSlideH3").click(function () {
        $(".viewLeftUl li h2").find('em img').removeClass('viewLeftUlImgActive');
        $(".viewLeftUl li h2").attr('data-select', '0');
        if ($("#" + data.id).attr('data-select') == '0') {
            $("#" + data.id).addClass('toggleLeft');
            $("#" + data.id).find('.viewLeftList').removeClass('viewLeftListAuto');
            $("#" + data.id).animate({
                'width': "78px"
            }, 100);
            $(".viewRight").animate({
                'width': $(".viewMain").width() - 78 + "px"
            }, 100);
            $(".iframeA").animate({
                'width': $(".viewMain").width() - 78 + "px"
            }, 100);
            $("#" + data.id).attr('data-select', '1');
            $(".toggleLeft ul li dl").hide();
            toggleMin();
        } else {
            $(".viewRight").animate({
                'width': $(".viewMain").width() - 246 + "px"
            }, 100);
            $(".iframeA").animate({
                'width': $(".viewMain").width() - 246 + "px"
            }, 100);
            $("#" + data.id).animate({
                'width': "246px"
            }, 100, function () {
                $("#" + data.id).removeClass('toggleLeft');
                $("#" + data.id).find('.viewLeftList').addClass('viewLeftListAuto');
            });
            $("#" + data.id).attr('data-select', '0');
        }
    });
    // 链接跳转
    $("#" + data.id).find(".newHref").each(function (index) {
        if (index === 0) {
            href_A($(this).attr('data-url'));
            if ($("#" + data.id).attr('data-select') == '0') {
                $(".viewLeftUl li").eq(0).find('h2 em img').addClass('viewLeftUlImgActive');
                $(".viewLeftUl li").eq(0).find('dl').show();
                $(".viewLeftUl li").eq(0).find('h2').attr('data-select', '1');
                $(".viewLeftUl li").eq(0).find('h2').addClass('viewLeftUlActive');
                $("#" + data.id).find('.viewLeftList').addClass('viewLeftListAuto');
            }
            if (data.callback) {
                data.callback($(this));
            }
        }
        $(this).click(function () {
            var getData;
            if (data.reload($(this).attr('data-url'))) {
                getData = data.reload($(this).attr('data-url'));
                href_A(getData);
            } else {
                href_A($(this).attr('data-url'));
            }
            if (data.callback) {
                data.callback($(this));
            }

        });
    });

    // min状态的children
    function toggleMin() {
        var flageDl = '1', flageValue = '';
        $(".viewLeftUl li").each(function () {
            var _this = this;
            $(this).hover(function () {
                if ($("#" + data.id).attr('data-select') == '1') {
                    if ($(_this).find('dl').length == 0) {
                        flageValue = $(_this).find('h2 a').attr('data-url');
                        flageDl = '0';
                        $(_this).append('<dl>' +
                            '<dd class="viewToggleDd">' +
                            '<h3><a class="newHref" href="javascript:;" data-url="' + flageValue + '">' + $(_this).find('h2 a').text() + '</a></h3>' +
                            '</dd></dl>');
                        $(_this).find('.newHref').click(function () {
                            href_A($(this).attr('data-url'));
                        });
                    } else {
                        $(_this).find('dl dd').eq(0).before('<dd class="viewToggleDd"><h3><a href="javascript:;">' + $(_this).find('h2 a').text() + '</a></h3></dd>');
                    }
                    $(_this).find('dl').addClass('toggleDl');

                } else {
                    $(_this).find('dl').removeClass('toggleDl');
                    $(_this).find('.viewToggleDd').remove();
                }
            }, function () {
                if (flageDl == '0') {
                    $(_this).find('dl').remove();
                    flageDl = '1';
                }
                $(_this).find('dl').removeClass('toggleDl');
                $(_this).find('.viewToggleDd').remove();
            });
        });
    }
}

// 链接跳转
function href_A(src) {
    $(".viewRight").hide();
    $(".viewRight").css({
        'height': document.documentElement.clientHeight - $(".viewTop").height() + "px",
        'width': $(".viewContainer").width() - $(".viewLeft").width() + "px"
    });
    $(".iframeA").css({
        'height': document.documentElement.clientHeight - $(".viewTop").height() + "px",
        'width': $(".viewContainer").width() - $(".viewLeft").width() + "px"
    });
    $(".iframeA").attr('src', src);
    $(".viewRight").fadeIn(100);
}