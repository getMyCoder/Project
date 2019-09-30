var DW, posCtx, canvas, ctx, ctxImg;

// 调用
function getEchart(ArrayList, echartArray) {
    intDom();
    setDomSize(ArrayList, echartArray);
    $(window).resize(function () {
        intDom();
        setDomSize(ArrayList, echartArray)
    })
}

// dom初始化
function intDom() {
    DW = {
        width: $("#mainBody").width(),
        height: document.documentElement.clientHeight + 200,
        OL: $("#mainBody").offset().left,
        OT: $("#mainBody").offset().top
    };
    posCtx = {
        imgW: 0,
        imgH: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    ctxImg = {
        width: DW.width * 0.35,
        height: DW.width * 0.35 * 0.71,
        parseW: 0,
        parseH: 0
    };
}

// dom样式
function setDomSize(ArrayList, echartArray) {
    $(".main").height(DW.height * 0.96);
    $(".mainBody").height(DW.height);
    $(".mainCon").css({
        "paddingTop": DW.height * 0.02 + "px"
    });
    $(".mainConC").height($(".mainCon").height() - $(".title").height() - 2);
    var canvasDW = {
        width: $(".mainConC").width(),
        height: $(".mainConC").height()
    };
    $(".mainConC").append('<canvas id="cjqjk" width="' + canvasDW.width + '" height="' + canvasDW.height + '"></canvas>');
    canvas = document.getElementById('cjqjk');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    $(".ClassA").width(canvasDW.width * 0.3);
    $(".ClassAllJs").width(canvasDW.width * 0.2125);
    $(".ClassAllJs").css({
        "width": canvasDW.width * 0.2125,
    });
    $(".ClassAllTitle").css({
        "height": canvasDW.height * 0.044 + "px",
        "lineHeight": canvasDW.height * 0.044 + "px",
    });
    setCtxBg(ArrayList, echartArray);

}

// canvas的背景图片
function setCtxBg(ArrayList, echartArray) {
    var img = new Image();
    img.src = 'images/cjqjk_bg.png';
    img.onload = function () {
        ctxImg.parseW = $(".mainConC").width();
        ctxImg.parseH = $(".mainConC").height();
        ctx.drawImage(img, (ctxImg.parseW - ctxImg.width) / 2, ctxImg.parseH - ctxImg.height, ctxImg.width, ctxImg.height)
        ctx.beginPath();
        ctx.font = "bold " + ctxImg.parseW * 0.018 + 'px Arial';
        ctx.fillStyle = '#043579';
        ctx.textAlign = 'center';
        ctx.fillText('采集器监控中心', ctxImg.parseW * 0.5, ctxImg.parseH - ctxImg.height * 0.5)
        posCtx = {
            imgW: ctxImg.width,
            imgH: ctxImg.height,
            left: (ctxImg.parseW - ctxImg.width) / 2,
            right: ctxImg.parseW * 0.5 + ctxImg.width * 0.5,
            top: ctxImg.parseH - ctxImg.height,
            bottom: 0
        };
        setCtxItems(ArrayList);

// ---------------echart调用-----------------
        var mousePos = {
            X: (ctxImg.parseW - ctxImg.width) / 2 + ctxImg.width * 0.25,
            Y: ctxImg.parseH - ctxImg.height + ctxImg.height * 0.25,
            W: ctxImg.width * 0.5,
            H: ctxImg.height * 0.5
        };
        setMouse($(".ClassA"), mousePos, function () {
            $(".ClassA").css({
                "top": ctxImg.parseH - ctxImg.height * 0.8 + "px",
                "left": ctxImg.parseW / 2 + $(".ClassA").width() / 3.5 + "px"
            });
            $(".ClassA").show();
            echart_Brokenline(echartArray);
        })
    };

}

// 各个主机
function setCtxItems(dataList) {
    var setImgPos, indexDataL, spotPos, indexDataLW, someIndex, someR;
    // if (dataList.length == 5) {
    //     setImgPos = {
    //         w: DW.width * 0.092 * 4 / dataList.length,
    //         h: DW.width * 0.092 * 4 / dataList.length
    //     };
    //     indexDataL = 1 / (dataList.length + 1);
    //     indexDataLW = ctxImg.parseW * indexDataL * 0.5;
    //     spotPos = [
    //         {
    //             start: [posCtx.left + posCtx.imgW * 0.224, posCtx.top + posCtx.imgH * 0.40],
    //             moddle: [],
    //             end: [],
    //             imgPosition: {
    //                 x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 0 + indexDataLW,
    //                 y: ctxImg.parseH * 0.25,
    //             }
    //         },
    //         {
    //             start: [posCtx.left + posCtx.imgW * 0.224, posCtx.top + posCtx.imgH * 0.40],
    //             moddle: [],
    //             end: [],
    //             imgPosition: {
    //                 x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 1 + indexDataLW,
    //                 y: ctxImg.parseH * 0.45,
    //             }
    //         },
    //         {
    //             start: [posCtx.left + posCtx.imgW * 0.388, posCtx.top + posCtx.imgH * 0.268],
    //             moddle: [
    //                 [posCtx.left + posCtx.imgW * 0.388, posCtx.top + posCtx.imgH * 0.268 - 100],
    //                 [(ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 2 + indexDataLW + setImgPos.w * 0.5, posCtx.top + posCtx.imgH * 0.268 - 200]
    //             ],
    //             end: [],
    //             imgPosition: {
    //                 x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 2 + indexDataLW,
    //                 y: ctxImg.parseH * 0.25,
    //             }
    //         },
    //         {
    //             start: [posCtx.left + posCtx.imgW * 0.775, posCtx.top + posCtx.imgH * 0.40],
    //             moddle: [],
    //             end: [],
    //             imgPosition: {
    //                 x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 3 + indexDataLW,
    //                 y: ctxImg.parseH * 0.45,
    //             }
    //         },
    //         {
    //             start: [posCtx.left + posCtx.imgW * 0.775, posCtx.top + posCtx.imgH * 0.40],
    //             moddle: [],
    //             end: [],
    //             imgPosition: {
    //                 x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 4 + indexDataLW,
    //                 y: ctxImg.parseH * 0.15,
    //             }
    //         }
    //     ];
    //     someIndex = ctxImg.parseW * 0.08;
    //     someR = 5
    // } else {
    //     setImgPos = {
    //         w: DW.width * 0.092,
    //         h: DW.width * 0.092
    //     };
    //     indexDataL = 1 / (dataList.length + 1);
    //     indexDataLW = ctxImg.parseW * indexDataL * 0.5;
    //     spotPos = [
    //         {
    //             start: [posCtx.left + posCtx.imgW * 0.224, posCtx.top + posCtx.imgH * 0.40],
    //             moddle: [],
    //             end: [],
    //             imgPosition: {
    //                 x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + indexDataLW * 0.8,
    //                 y: ctxImg.parseH * 0.4,
    //             }
    //         },
    //         {
    //             start: [posCtx.left + posCtx.imgW * 0.388, posCtx.top + posCtx.imgH * 0.268],
    //             moddle: [
    //                 [posCtx.left + posCtx.imgW * 0.388, posCtx.top + posCtx.imgH * 0.268 - 100],
    //                 [(ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL + indexDataLW + setImgPos.w * 0.5, posCtx.top + posCtx.imgH * 0.268 - 200]
    //             ],
    //             end: [],
    //             imgPosition: {
    //                 x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL + indexDataLW,
    //                 y: ctxImg.parseH * 0.2,
    //             }
    //         },
    //         {
    //             start: [posCtx.left + posCtx.imgW * 0.775, posCtx.top + posCtx.imgH * 0.40],
    //             moddle: [],
    //             end: [],
    //             imgPosition: {
    //                 x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 2 + indexDataLW * 1.2,
    //                 y: ctxImg.parseH * 0.4,
    //             }
    //         }
    //     ];
    //     someIndex = ctxImg.parseW * 0.12;
    //     someR = 8
    // }

    if(dataList.length == 1){
        setImgPos = {
            w: DW.width * 0.092,
            h: DW.width * 0.092
        };
        indexDataL = 1 / (dataList.length + 1);
        indexDataLW = ctxImg.parseW * indexDataL * 0.5;
        spotPos = [
            {
                start: [posCtx.left + posCtx.imgW * 0.388, posCtx.top + posCtx.imgH * 0.268],
                moddle: [
                    [posCtx.left + posCtx.imgW * 0.388, posCtx.top + posCtx.imgH * 0.268 - 100],
                    [posCtx.left*0.6+indexDataLW + setImgPos.w * 0.5, posCtx.top + posCtx.imgH * 0.268 - 200]
                ],
                end: [],
                imgPosition: {
                    x: posCtx.left*0.6+indexDataLW,
                    y: ctxImg.parseH * 0.2,
                }
            },
        ];
        someIndex = ctxImg.parseW * 0.12;
        someR = 8
    }else if(dataList.length == 2){
        setImgPos = {
            w: DW.width * 0.092,
            h: DW.width * 0.092
        };
        indexDataL = 1 / (dataList.length + 1);
        indexDataLW = ctxImg.parseW * indexDataL * 0.5;
        spotPos = [
            {
                start: [posCtx.left + posCtx.imgW * 0.224, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.2) * 0.5 + indexDataLW * 0.8,
                    y: ctxImg.parseH * 0.25,
                }
            },
            {
                start: [posCtx.left + posCtx.imgW * 0.775, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 1.1 + indexDataLW * 1.2,
                    y: ctxImg.parseH * 0.25,
                }
            }
        ];
        someIndex = ctxImg.parseW * 0.12;
        someR = 8
    }else if(dataList.length == 3){
        setImgPos = {
            w: DW.width * 0.092,
            h: DW.width * 0.092
        };
        indexDataL = 1 / (dataList.length + 1);
        indexDataLW = ctxImg.parseW * indexDataL * 0.5;
        spotPos = [
            {
                start: [posCtx.left + posCtx.imgW * 0.224, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + indexDataLW * 0.8,
                    y: ctxImg.parseH * 0.4,
                }
            },
            {
                start: [posCtx.left + posCtx.imgW * 0.388, posCtx.top + posCtx.imgH * 0.268],
                moddle: [
                    [posCtx.left + posCtx.imgW * 0.388, posCtx.top + posCtx.imgH * 0.268 - 100],
                    [(ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL + indexDataLW + setImgPos.w * 0.5, posCtx.top + posCtx.imgH * 0.268 - 200]
                ],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL + indexDataLW,
                    y: ctxImg.parseH * 0.2,
                }
            },
            {
                start: [posCtx.left + posCtx.imgW * 0.775, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 2 + indexDataLW * 1.2,
                    y: ctxImg.parseH * 0.4,
                }
            }
        ];
        someIndex = ctxImg.parseW * 0.12;
        someR = 8
    }else if(dataList.length == 4){
        setImgPos = {
            w: DW.width * 0.092 * 4 / dataList.length,
            h: DW.width * 0.092 * 4 / dataList.length
        };
        indexDataL = 1 / (dataList.length + 1);
        indexDataLW = ctxImg.parseW * indexDataL * 0.5;
        spotPos = [
            {
                start: [posCtx.left + posCtx.imgW * 0.224, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.05 + ctxImg.parseW * indexDataL * 0 + indexDataLW,
                    y: ctxImg.parseH * 0.15,
                }
            },
            {
                start: [posCtx.left + posCtx.imgW * 0.224, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 0.8 + indexDataLW,
                    y: ctxImg.parseH * 0.4,
                }
            },
            {
                start: [posCtx.left + posCtx.imgW * 0.775, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 2.2+ indexDataLW,
                    y: ctxImg.parseH * 0.4,
                }
            },
            {
                start: [posCtx.left + posCtx.imgW * 0.775, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 3.2 + indexDataLW,
                    y: ctxImg.parseH * 0.15,
                }
            }
        ];
        someIndex = ctxImg.parseW * 0.1;
        someR = 5
    }else{
        setImgPos = {
            w: DW.width * 0.092 * 4 / dataList.length,
            h: DW.width * 0.092 * 4 / dataList.length
        };
        indexDataL = 1 / (dataList.length + 1);
        indexDataLW = ctxImg.parseW * indexDataL * 0.5;
        spotPos = [
            {
                start: [posCtx.left + posCtx.imgW * 0.224, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 0 + indexDataLW,
                    y: ctxImg.parseH * 0.15,
                }
            },
            {
                start: [posCtx.left + posCtx.imgW * 0.224, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 1 + indexDataLW,
                    y: ctxImg.parseH * 0.4,
                }
            },
            {
                start: [posCtx.left + posCtx.imgW * 0.388, posCtx.top + posCtx.imgH * 0.268],
                moddle: [
                    [posCtx.left + posCtx.imgW * 0.388, posCtx.top + posCtx.imgH * 0.268 - 100],
                    [(ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 2 + indexDataLW + setImgPos.w * 0.5, posCtx.top + posCtx.imgH * 0.268 - 200]
                ],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 2 + indexDataLW,
                    y: ctxImg.parseH * 0.15,
                }
            },
            {
                start: [posCtx.left + posCtx.imgW * 0.775, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 3 + indexDataLW,
                    y: ctxImg.parseH * 0.4,
                }
            },
            {
                start: [posCtx.left + posCtx.imgW * 0.775, posCtx.top + posCtx.imgH * 0.40],
                moddle: [],
                end: [],
                imgPosition: {
                    x: (ctxImg.parseW * indexDataL - DW.width * 0.092) * 0.5 + ctxImg.parseW * indexDataL * 4 + indexDataLW,
                    y: ctxImg.parseH * 0.15,
                }
            }
        ];
        someIndex = ctxImg.parseW * 0.08;
        someR = 5
    }

    for (var i = 0; i < spotPos.length; i++) {
        var imgSX = spotPos[i].imgPosition.x, imgSY = spotPos[i].imgPosition.y;
        spotPos[i].imgPosition.content = dataList[i];
        spotPos[i].imgPosition.mousePos = {};
        spotPos[i].imgPosition.moveFun = function () {
        };
        spotPos[i].imgPosition.img = function () {
            this.imgItems = new Image();
            this.imgItems.src = 'images/cjqjk_items.png';
            var _this = this;

            this.imgItems.onload = function () {
                setArcItems(_this, _this.x, _this.y, setImgPos.w, setImgPos.h, someIndex, someR);
                ctx.beginPath();
                ctx.fillStyle = '#fff';
                ctx.arc(_this.x + setImgPos.w / 2 + 2, _this.y + setImgPos.h / 2 + 1, setImgPos.w / 2 * 0.96, Math.PI * 2, false);
                ctx.fill();
                ctx.drawImage(_this.imgItems, _this.x, _this.y, setImgPos.w, setImgPos.h);
                ctx.beginPath();
                ctx.font = "bold " + ctxImg.parseW * 0.012 + "px Arial";
                ctx.textAlign = 'center';
                ctx.fillStyle = '#0c4a79';
                ctx.fillText(_this.content.title, _this.x + setImgPos.w * 0.5 + 5, _this.y + setImgPos.h * 0.5 + ctxImg.parseW * 0.015);
                _this.mousePos = {
                    X: _this.x,
                    Y: _this.y,
                    W: setImgPos.w,
                    H: setImgPos.h
                };
            };

        };

        spotPos[i].imgPosition.img();


        ctx.beginPath();
        ctx.moveTo(spotPos[i].start[0], spotPos[i].start[1]);
        ctx.fillStyle = '#9bd9e2';
        ctx.arc(spotPos[i].start[0], spotPos[i].start[1], 5.5, Math.PI * 2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(spotPos[i].start[0], spotPos[i].start[1]);
        ctx.fillStyle = '#05aac3';
        ctx.arc(spotPos[i].start[0], spotPos[i].start[1], 2.5, Math.PI * 2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = '#05aac3';
        ctx.moveTo(spotPos[i].start[0], spotPos[i].start[1]);
        if (spotPos[i].moddle.length > 0) {
            for (var j = 0; j < spotPos[i].moddle.length; j++) {
                ctx.lineTo(spotPos[i].moddle[j][0], spotPos[i].moddle[j][1]);
            }
        } else {
            ctx.lineTo(imgSX + setImgPos.w * 0.5, spotPos[i].start[1]);
        }
        ctx.lineTo(imgSX + setImgPos.w * 0.5, imgSY + setImgPos.w * 0.925);
        ctx.stroke();
    }

    function CreateMoveB(evtM, _thisObj) {
        var evtME = {
            X: evtM.clientX - canvas.offsetLeft - DW.OL,
            Y: evtM.clientY + $(window).scrollTop() - canvas.offsetTop - DW.OT
        };
        var Obj = 0;
        for (var p = 0; p < _thisObj.length; p++) {
            Obj = _thisObj[p].imgPosition;
            if ((evtME.X > Obj.mousePos.X && evtME.X < Obj.mousePos.X + Obj.mousePos.W) && (evtME.Y > Obj.mousePos.Y && evtME.Y < Obj.mousePos.Y + Obj.mousePos.H)) {
                if ($(".ClassAll").width() + Obj.mousePos.X + DW.width * 0.1 > document.documentElement.clientWidth) {
                    $(".ClassB").css({
                        'left': Obj.mousePos.X - $(".ClassB").width()+ "px",
                        'top': Obj.mousePos.Y + DW.height * 0.05
                    });
                    $(".ClassB i").css({
                        "left": $(".ClassB").width() - $(".ClassB i").width() / 2 - 3 + "px"
                    });
                    $(".ClassB i").addClass("positionAllI")
                } else {
                    $(".ClassB").css({
                        'left': Obj.mousePos.X + DW.width * 0.1,
                        'top': Obj.mousePos.Y + DW.height * 0.05
                    });
                    $(".ClassB i").css({
                        "left": " -13px"
                    });
                    $(".ClassB i").removeClass("positionAllI")
                }
                $(".ClassB").show();
                $(".ClassBTitle").html(Obj.content.content.title);
                $(".classBCon").children('h2').remove();
                $(".classBCon").append('<h2></h2>');
                for (var n = 0; n < Obj.content.content.text.length; n++) {
                    var dataStr;
                    if (Obj.content.content.text[n].classname && Obj.content.content.text[n].classname !== '') {
                        dataStr = '<p>' + Obj.content.content.text[n].name + '：<span class=' + Obj.content.content.text[n].classname + '>' + Obj.content.content.text[n].str + '</span></p>'
                    } else {
                        dataStr = '<p>' + Obj.content.content.text[n].name + '：<span>' + Obj.content.content.text[n].str + '</span></p>'
                    }
                    $(".classBCon h2").append(dataStr)
                }
                return
            } else {
                $(".ClassB").hide()

            }
            CreateMoveC(evtM, evtME, _thisObj[p])
        }
    }

    function CreateMoveC(evtM, _thisObj) {
        var evtME = {
            X: evtM.clientX - DW.OL,
            Y: evtM.clientY + $(window).scrollTop() - canvas.offsetTop - DW.OT
        };

        for (var p = 0; p < _thisObj.length; p++) {
            var Obj = _thisObj[p].imgPosition.content.text.posIndex;
            var OObj = 0;
            for (var q = 0; q < Obj.length; q++) {
                OObj = Obj[q];
                if ((evtME.X > OObj.X && evtME.X < OObj.X + OObj.W) && (evtME.Y > OObj.Y && evtME.Y < OObj.Y + OObj.H)) {
                    if ($(".ClassC").width() + OObj.X + DW.width * 0.065 > document.documentElement.clientWidth) {
                        $(".ClassC").css({
                            'left': OObj.X-$(".ClassC").width()+"px",
                            'top': OObj.Y - DW.height * 0.01
                        });
                        $(".ClassC i").addClass("positionAllI");

                        $(".ClassC i").css({
                            "left": $(".ClassC").width() - $(".ClassC i").width() / 2 - 4 + "px"
                        });
                    } else {
                        $(".ClassC").css({
                            'left': OObj.X + DW.width * 0.065,
                            'top': OObj.Y - DW.height * 0.01
                        });
                        $(".ClassC i").removeClass("positionAllI");

                        $(".ClassC i").css({
                            "left":"-12px"
                        });
                    }

                    $(".ClassC").show();
                    $(".ClassCTitle").html(_thisObj[p].imgPosition.content.text.title[q]);
                    $(".classCCon").children('h2').remove();
                    $(".classCCon").append('<h2></h2>');
                    for (var s = 0; s < _thisObj[p].imgPosition.content.text.ChildCon[q].length; s++) {
                        var name_Data = _thisObj[p].imgPosition.content.text.ChildCon[q][s].name;
                        var classname_Data;
                        var str_Data = _thisObj[p].imgPosition.content.text.ChildCon[q][s].str;

                        var dataStr;
                        if (_thisObj[p].imgPosition.content.text.ChildCon[q][s].classname && _thisObj[p].imgPosition.content.text.ChildCon[q][s].classname !== '') {
                            classname_Data = _thisObj[p].imgPosition.content.text.ChildCon[q][s].classname;
                            dataStr = '<p>' + name_Data + '：<span class=' + classname_Data + '>' + str_Data + '</span></p>'
                        } else {
                            dataStr = '<p>' + name_Data + '：<span>' + str_Data + '</span></p>'
                        }
                        $(".classCCon h2").append(dataStr)
                    }
                    return
                } else {
                    $(".ClassC").hide()
                }
            }
        }
    }

    $(document).mousemove(function (evtM) {
        $(function () {
            CreateMoveB(evtM, spotPos);
            CreateMoveC(evtM, spotPos)
        })
    });
}

// 小圆环分支
function setArcItems(Obj, posX, posY, posW, posH, someIndex, someR) {
    var setArc = {
        arcR: someIndex,
        imgConterX: posX + posW * 0.5,
        imgConterY: posY + posH * 0.5,
        setRs: ctxImg.parseW * 0.025,
        setRX: 0,
        setRY: 0,
        randomDeg: 0,
        indexItems: 0
    };
    setArc.indexItems = 360 / Obj.content.text.title.length;
    Obj.content.text.posIndex = [];
    for (var k = 0; k < Obj.content.text.title.length; k++) {
        setArc.randomDeg = Math.sin(Math.PI / 180 * (setArc.indexItems * k)) * setArc.arcR;
        if (Obj.content.text.title.length % 2 === 0) {
            if (Obj.content.text.title.length / 2 == k) {
                setArc.randomDeg = Math.sin(Math.PI / 180 * (setArc.indexItems * (k - 0.2))) * setArc.arcR;
            }
        }
        setArc.setRX = setArc.imgConterX + setArc.randomDeg;
        if (setArc.indexItems * k < 90) {
            setArc.setRY = Math.sqrt(Math.abs(Math.pow(setArc.arcR, 2) - Math.pow(setArc.randomDeg, 2)));
        } else if (setArc.indexItems * k < 180) {
            setArc.setRY = -(Math.sqrt(Math.abs(Math.pow(setArc.arcR, 2) - Math.pow(setArc.randomDeg, 2))));
        } else if (setArc.indexItems * k < 270) {
            setArc.setRY = -(Math.sqrt(Math.abs(Math.pow(setArc.arcR, 2) - Math.pow(setArc.randomDeg, 2))));
        } else {
            setArc.setRY = Math.sqrt(Math.abs(Math.pow(setArc.arcR, 2) - Math.pow(setArc.randomDeg, 2)));
        }

        _ArcItems(Obj.content, Obj.content.text.title[k], setArc.setRX, setArc.imgConterY - setArc.setRY, setArc.setRs, someR, [setArc.imgConterX, setArc.imgConterY]);
        Obj.content.text.posIndex.push({
            X: setArc.setRX - setArc.setRs * 0.5,
            Y: setArc.imgConterY - setArc.setRY - setArc.setRs * 0.5,
            W: setArc.setRs * 2,
            H: setArc.setRs * 2
        });
    }
}

// 小圆环分支图标
function _ArcItems(Obj, ObjData, ArcX, ArcY, ArcR, someR, lineXY) {
    ctx.beginPath();
    ctx.setLineDash([4, 2]);
    ctx.moveTo(lineXY[0], lineXY[1]);
    ctx.lineTo(ArcX, ArcY);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = '#c4daef';
    ctx.arc(ArcX, ArcY, ArcR, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(ArcX, ArcY, ArcR - someR, Math.PI * 2, false);
    ctx.fill();
    ctx.setLineDash([0]);
    Obj.text.img = function () {
        this.smallImg = new Image();
        this.smallImg.src = 'images/cjqjk_small.png';
        var _this = this;
        this.smallImg.onload = function () {
            ctx.drawImage(_this.smallImg, ArcX - ctxImg.parseW * 0.015 * 0.5, ArcY - ctxImg.parseW * 0.015, ctxImg.parseW * 0.015, ctxImg.parseW * 0.015);
        };
        ctx.beginPath();
        ctx.fillStyle = '#0c4a7b';
        ctx.font = "bold " + ctxImg.parseW * 0.008 + "px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(ObjData, ArcX, ArcY + ctxImg.parseW * 0.011);
    };
    Obj.text.img();
}

// echarts
function echart_Brokenline(DataList) {
    $(".echart-main").width($(".ClassA").width());
    var myChart = echarts.init(document.getElementById('echart-main'));
    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: '8%',
            left: '10%',
            data: []
        },
        grid: {
            top: '5%',
            left: '3%',
            right: '4%',
            bottom: '25%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    };
    for (var i = 0; i < DataList.data.length; i++) {
        option.series.push({
            name: DataList.data[i].title,
            type: 'line',
            stack: '总量',
            data: DataList.data[i].data
        });
        option.legend.data.push({
            name: DataList.data[i].title,
            textStyle: {
                fontSize: 12,
                color: '#000000'
            },
            icon: 'stack'
        })
    }
    option.xAxis.data = DataList.time
    myChart.setOption(option);
}

// 鼠标事件
function setMouse(DIV, mousePos, callback) {
    $(document).mousemove(function (evtM) {
        var evtME = {
            X: evtM.clientX,
            Y: evtM.clientY + $(window).scrollTop()
        };
        if ((evtME.X > mousePos.X && evtME.X < mousePos.X + mousePos.W) && (evtME.Y > mousePos.Y && evtME.Y < mousePos.Y + mousePos.H)) {
            callback()
        } else {
            DIV.hide()
        }
    });
}