var DW = {
    width: document.documentElement.clientHeight * 3.5,
    height: document.documentElement.clientHeight
};
var ActualSize = {
    wScaleH: 3.5,
    height: 1440,
    width: 5040
};
$(function () {
    DW = {
        width: document.documentElement.clientHeight * 3.5,
        height: document.documentElement.clientHeight
    };
});
// Person Function
var personFun = {
    // 返回高度
    getH: function (val) {
        return (val / ActualSize.height) * DW.height;
    },
    // 返回宽度
    getW: function (val) {
        return (val / ActualSize.width) * DW.width;
    },
    // 对象设置宽度、高度
    setHW: function (Obj, array) {
        if (array[0]) {
            Obj.width(array[0]);
        }
        if (array[1]) {
            Obj.height(array[1]);
        }
        if (array[2]) {
            Obj.css({
                "fontSize": array[2]
            });
        }
    },
    // 多个对象使用相同的高度
    sameH: function (array, val) {
        for (var i = 0; i < array.length; i++) {
            array[i].height(personFun.getH(val));
        }
    },
    setSize: function (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].val[0]) {
                array[i].obj.width((array[i].val[0] / ActualSize.width) * DW.width);
            }
            if (array[i].val[1]) {
                array[i].obj.height((array[i].val[1] / ActualSize.height) * DW.height);
            }
            if (array[i].val[2]) {
                array[i].obj.css({
                    'fontSize': (array[i].val[2] / ActualSize.height) * DW.height + "px"
                });
            }
            if (array[i].val[3]) {
                array[i].obj.css({
                    'lineHeight': (array[i].val[3] / ActualSize.height) * DW.height + "px"
                });
            }
            if (array[i].val[4]) {
                array[i].obj.css({
                    'marginTop': (array[i].val[4] / ActualSize.height) * DW.height + "px"
                });
            }
            if (array[i].callback) {
                array[i].callback();
            }
        }
    },
    getImgH: function (val, ActualMax, changeVal) {
        return (val / ActualMax) * changeVal;
    },
    getImgW: function (val, ActualMax, changeVal) {
        return (val / ActualMax) * changeVal;
    },
};

// onload
function onload() {
    // 设置宽度、高度、字体
    var createSize = [
        {obj: $(".container"), val: [5040, 1440, null, null, null]},
        {obj: $(".top"), val: [null, 104, null, null, null]},
        {obj: $(".logo"), val: [1564, 104, null, null, null]},
        {obj: $(".logoCon"), val: [null, 104, null, null, null]},
        {obj: $(".logo h2 img"), val: [null, 47, null, null, null]},
        {obj: $(".logo h2"), val: [null, 104, 30, 104, null]},
        {obj: $(".time ul li h2 img"), val: [null, 40, null, null, null]},
        {obj: $(".time ul li h3 span"), val: [null, 25, 12, 20, 25]},
        {obj: $(".time ul li h3 p"), val: [null, 25, 12, 20, null]},
        // main-left
        {obj: $(".mainLeft"), val: [null, 844, null, null, null]},
        {obj: $(".mainMiddle"), val: [null, 844, null, null, null]},
        {obj: $(".mainRight"), val: [null, 844, null, null, null]},
        {obj: $(".title"), val: [null, 43, null, null, null]},
        {obj: $(".title h3"), val: [null, null, 22, 43, null]},
        {
            obj: $(".leftConBg h2"), val: [null, null, 22, null, null], callback: function () {
                $(".leftConBg h2").css({"top": personFun.getH(12) + "px"});
            }
        },
        {obj: $(".leftConBg h3"), val: [null, null, 22, null, null]},
        {obj: $(".leftConFlex"), val: [null, null, null, null, 77]},
        {obj: $(".leftConFlex h2"), val: [195, 46, 18, 46, null]},
        {obj: $(".leftConFlex p"), val: [null, null, 18, 41, null]},
        {obj: $(".itemsDir"), val: [null, 46, null, null, null]},
        {
            obj: $(".itemsUl li"), val: [null, 72, null, null, 20], callback: function () {
                $(".itemsUl").css({'paddingBottom': personFun.getH(20) + "px"});
            }
        },
        {obj: $(".itemsUl li h3"), val: [null, 72, 22, 72, null]},
        // mainBottom
        {obj: $(".mainBottom"), val: [null, null, null, null, 31]},
        {obj: $(".mainB_01"), val: [null, 425, null, null, null]},
        {obj: $(".mainB_02"), val: [null, 425, null, null, null]},
        {obj: $(".mainB_03"), val: [null, 425, null, null, null]},
        {obj: $(".mainB_04"), val: [null, 425, null, null, null]},
        {obj: $(".mainB_05"), val: [null, 425, null, null, null]},
        {obj: $(".moddleTopTitle"), val: [null, 153, null, null, null]},
        {obj: $(".middleTop"), val: [null, 54, null, null, null]},
        {
            obj: $(".middleTop h2 span"), val: [12, 12, null, null, null], callback: function () {
                $(".middleTop h2 span").css({
                    'top': ($(".middleTop h2").height() - $(".middleTop h2 span").height()) * 0.52 + "px",
                    'left': ($(".middleTop h2").width() - $(".middleTop h2 span").width()) * 0.55 + "px"
                });
            }
        },
        {obj: $(".middleTop h3"), val: [null, 54, null, null, null]},
        {obj: $(".middleTop h3 span"), val: [null, 27, 14, null, null]},
        {obj: $(".middleTop h3 p"), val: [null, 27, 16, null, null]},
        {obj: $(".middleTopMCon h2"), val: [null, 60, 50, null, null]},
        {obj: $(".middleTopMCon h3"), val: [null, null, 14, null, 20]},
        {obj: $("#earthMap"), val: [null, 665, null, null, null]},
        {obj: $("#earthMapData"), val: [null, 665, null, null, null]},
        // {obj: $(".moddleTopCon"), val: [null, 694, null, null, null]},
    ];
    personFun.setSize(createSize);
    // 时间
    getTimes();
    // 网络架构总览canvas
    frameworkCan();
    // 旋转球体
    createBall();
}

// 获取时间
function getTimes() {
    var date = new Date();
    var createDate = date.getFullYear() + "年"
        + (date.getMonth() + 1) + "月"
        + date.getDate() + "日 "
        + date.getHours() + "时"
        + date.getMinutes() + "分"
        + date.getSeconds() + "秒";
    $(".time ul li").eq(0).find('h3 p').html(createDate);
    setInterval(function () {
        date = new Date();
        createDate = date.getFullYear() + "年"
            + (date.getMonth() + 1) + "月"
            + date.getDate() + "日 "
            + date.getHours() + "时"
            + date.getMinutes() + "分"
            + date.getSeconds() + "秒";
        $(".time ul li").eq(0).find('h3 p').html(createDate);
    }, 1000);
}

// 网络架构总览
function frameworkModule(data) {
    var data01 = '<div class="leftConFlex"><h2>' + data.preview[0][0] + '：<span>' + data.preview[0][1] + '</span></h2><div class="leftConFlexP"></div></div>';
    $(".leftCon").append(data01);
    $(".leftConFlexP").children().remove();
    for (var i = 1; i < data.preview.length; i++) {
        $(".leftConFlexP").append('<p>' + data.preview[i][0] + '：<span>' + data.preview[i][1] + '%</span></p>');
    }
    var data02 = '<div class="leftConData"></div>';
    $(".leftCon").append(data02);
    for (var k = 0; k < data.model.length; k++) {
        $(".leftConData").append('<div class="items"><div class="itemsDir"><img src="images/uprow.png" alt=""></div><ul class="itemsUl"></ul></div>');
    }
    var createImg = null;
    for (var j = 0; j < data.model.length; j++) {
        for (var m = 0; m < data.model[j].data.length; m++) {
            if (data.model[j].data[m][1]) {
                createImg = '<h2 class="headImg"><span><img src="' + data.model[j].data[m][1] + '" alt=""></span></h2>';
            } else {
                createImg = '';
            }
            $(".leftConData .items").eq(j).find('.itemsUl').append('<li>' + createImg + '<h3>' + data.model[j].data[m][0] + '</h3></li>');
        }
    }
    var tipsHtml = null;
    $(".leftConData .items").each(function (index) {
        var _this = this;
        $(this).hover(function () {
            tipsHtml = '<div class="leftConTip"><div class="leftConTipCon"><h3>资产总量：100</h3></div><i></i></div>';
            $(_this).append(tipsHtml);
            for (var n = 0; n < data.model[index].tips.length; n++) {
                $(".leftConTipCon").append('<p>' + data.model[index].tips[n][0] + '：<span>' + data.model[index].tips[n][1] + '%</span></p>');
            }
            var createSizeIt = [
                {obj: $(".leftConTip"), val: [470, 275, 22, 72, null]},
                {obj: $(".leftConTipCon h3"), val: [null, 62, 24, 62, null]},
                {obj: $(".leftConTipCon p"), val: [null, 38, 18, 38, null]}
            ];
            personFun.setSize(createSizeIt);
            $(".leftConTip").css({
                'top': personFun.getH(-220) + "px"
            });
        }, function () {
            $(".leftConTip").remove();
            tipsHtml = null;
        });
    });
}

// 网络架构总览canvas
function frameworkCan() {
    $("#left01Bg").height($("#left01Bg").width() * 0.27977);
    $("#left01Bg").append('<canvas id="left01BgCan" width="' + $("#left01Bg").width() + '" height="' + $("#left01Bg").height() + '"></canvas>');
    var canvasImg = document.getElementById('left01BgCan');
    var ctxImg = canvasImg.getContext('2d');
    var bgImg = new Image();
    bgImg.src = 'images/left01Bg01.png';
    bgImg.onload = function () {
        ctxImg.drawImage(bgImg, 0, 0, canvasImg.width, canvasImg.height);
        ctxImg.fillStyle = '#e1a003';
        ctxImg.textAlign = 'center';
        ctxImg.font = personFun.getH(22) + "px 微软雅黑";
        ctxImg.fillText('指挥专网', canvasImg.width * 0.5, 35 / 390 * canvasImg.height);
        ctxImg.fillText('指挥专网', canvasImg.width * 0.5, 385 / 390 * canvasImg.height);
    };
// 箭头
    $("#left01Bg").append('<canvas id="left01Move" width="' + $("#left01Bg").width() + '" height="' + $("#left01Bg").height() + '"></canvas>');
    var canM = document.getElementById('left01Move');
    var ctx = canM.getContext('2d');
    var createMap = [
        {start: [555 / 1394 * canM.width, 233 / 390 * canM.height], end: [555 / 1394 * canM.width, 205 / 390 * canM.height], src: 'rows01.png'},
        {start: [602 / 1394 * canM.width, 282 / 390 * canM.height], end: [786 / 1394 * canM.width, 173 / 390 * canM.height], src: 'rows02.png'},
        {start: [602 / 1394 * canM.width, 282 / 390 * canM.height], end: [788 / 1394 * canM.width, 282 / 390 * canM.height], src: 'rows03.png'},
        {start: [788 / 1394 * canM.width, 282 / 390 * canM.height], end: [602 / 1394 * canM.width, 176 / 390 * canM.height], src: 'rows04.png'},
        {start: [830 / 1394 * canM.width, 233 / 390 * canM.height], end: [830 / 1394 * canM.width, 205 / 390 * canM.height], src: 'rows01.png'},
        {start: [602 / 1394 * canM.width, 149 / 390 * canM.height], end: [786 / 1394 * canM.width, 149 / 390 * canM.height], src: 'rows03.png'},
        {start: [595 / 1394 * canM.width, 122 / 390 * canM.height], end: [696 / 1394 * canM.width, 60 / 390 * canM.height], src: 'rows07.png'},
        {start: [796 / 1394 * canM.width, 122 / 390 * canM.height], end: [696 / 1394 * canM.width, 60 / 390 * canM.height], src: 'rows08.png'}
    ];
    createRow();
    setInterval(function () {
        createRow();
    }, 1500);

    function createRow() {
        var dynamicMap = [], getRandom, getRandomVal = [];
        createMap.forEach(function (val) {
            dynamicMap.push(val);
        });
        for (var i = 0; i < 4; i++) {
            getRandom = parseInt(Math.random() * dynamicMap.length);
            getRandomVal.push(dynamicMap[getRandom]);
            dynamicMap.splice(getRandom, 1);
            getRandomVal[i].img = {};
            getRandomVal[i].img.spead = {
                x: (getRandomVal[i].end[0] - getRandomVal[i].start[0]) / 25,
                y: (getRandomVal[i].end[1] - getRandomVal[i].start[1]) / 25,
                addX: 0,
                addY: 0,
                timer: null,
                flage: false
            };
        }
        for (var j = 0; j < getRandomVal.length; j++) {
            (function (map, mapImg) {
                map.img.spead.timer = setInterval(function () {
                    ctx.clearRect(0, 0, canM.width, canM.height);
                    mapImg = new Image();
                    mapImg.src = 'images/' + map.src;
                    mapImg.onload = function () {
                        map.img.spead.addX += map.img.spead.x;
                        map.img.spead.addY += map.img.spead.y;
                        ctx.drawImage(
                            mapImg,
                            map.start[0] - personFun.getH(14) * 0.5 + map.img.spead.addX,
                            map.start[1] - personFun.getH(14) * 0.5 + map.img.spead.addY,
                            personFun.getH(14),
                            personFun.getH(14)
                        );
                        // X轴判断
                        if (map.img.spead.x >= 0) {
                            // Y轴判断
                            if (map.img.spead.y >= 0) {
                                if (map.start[0] + map.img.spead.addX > map.end[0] ||
                                    map.start[1] + map.img.spead.addY > map.end[1]) {
                                    map.img.spead.flage = true;
                                }
                            } else {
                                if (map.start[0] + map.img.spead.addX > map.end[0] ||
                                    map.start[1] + map.img.spead.addY < map.end[1]) {
                                    map.img.spead.flage = true;
                                }
                            }
                        } else {
                            // Y轴判断
                            if (map.img.spead.y >= 0) {
                                if (map.start[0] + map.img.spead.addX < map.end[0] ||
                                    map.start[1] + map.img.spead.addY > map.end[1]) {
                                    map.img.spead.flage = true;
                                }
                            } else {
                                if (map.start[0] + map.img.spead.addX < map.end[0] ||
                                    map.start[1] + map.img.spead.addY < map.end[1]) {
                                    map.img.spead.flage = true;
                                }
                            }
                        }
                        if (map.img.spead.flage) {
                            clearInterval(map.img.spead.timer);
                            ctx.clearRect(0, 0, canM.width, canM.height);
                            dynamicMap = null;
                            getRandom = null;
                            getRandomVal = null;
                        }
                    };
                }, 30);
            })(getRandomVal[j], getRandomVal[j].img.image);
        }
    }
}

// 3D
function createBall() {

    /**
     * 创建场景对象
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
        // var box=new THREE.BoxGeometry(100,100,100);//创建一个立方体几何对象
        // var material=new THREE.MeshLambertMaterial({color:0x0000ff});//材质对象
        // var mesh=new THREE.Mesh(box,material);//网格模型对象
        // scene.add(mesh);//网格模型添加到场景中


    var geometryA = new THREE.SphereGeometry(100, 100, 100);//矩形平面
    var textureA = THREE.ImageUtils.loadTexture("images/maps01.png");//加载纹理贴图
    var materialA = new THREE.MeshLambertMaterial({//贴图通过材质添加给几何体
        map: textureA,//给纹理属性map赋值
        side: THREE.DoubleSide,//两面可见.
        transparent: true
    });//材质对象
    var meshA = new THREE.Mesh(geometryA, materialA);//纹理贴图网格模型对象
    scene.add(meshA);//网格模型添加到场景中


    var geometry = new THREE.PlaneGeometry(460, 199);//矩形平面
    // var geometry = new THREE.PlaneGeometry(BallSize.width, BallSize.height);//矩形平面
    var texture = THREE.ImageUtils.loadTexture("images/mapBg.png");//加载纹理贴图
    var material = new THREE.MeshLambertMaterial({//贴图通过材质添加给几何体
        map: texture,//给纹理属性map赋值
        side: THREE.DoubleSide,//两面可见
    });//材质对象
    var mesh = new THREE.Mesh(geometry, material);//纹理贴图网格模型对象
    scene.add(mesh);//网格模型添加到场景中


    /**
     * 光源设置
     */
        //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300);//点光源位置
    scene.add(point);//点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    /**
     * 相机设置
     */
    var width = $("#earthMap").width();//窗口宽度
    var height = $("#earthMap").height();//窗口高度
    var k = width / height;//窗口宽高比
    var s = 100;//三维场景缩放系数
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 0, 200);//设置相机位置
    camera.lookAt(scene.position);//设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(width, height);
    renderer.setClearColor(0xb9d3ff, 0);//设置背景颜色
    // document.body.appendChild(renderer.domElement);//body元素中插入canvas对象
    document.getElementById('earthMap').appendChild(renderer.domElement);
    //执行渲染操作


    render();

    function render() {
        renderer.render(scene, camera);//执行渲染操作
        meshA.rotateY(0.01);//每次绕y轴旋转0.01弧度
        mesh.rotation.y = 1;
        // mesh.rotation.z=1
        // mesh.rotation.x += 0.01;
        requestAnimationFrame(render);//请求再次执行渲染函数render
    }

}

// 旋转地球Data
function OverallNetworkHealthIndex(dataList) {
    $("#earthMapData").append('<canvas id="ONHealth" width="' + $("#earthMapData").width() + '" height="' + $("#earthMapData").height() + '"></canvas>');
    var canvas = document.getElementById('ONHealth');
    var ctx = canvas.getContext('2d');
    // 1894
    // 690
    var sizePos = [
        {
            postion: [
                [700 / 1894 * canvas.width, 400 / 690 * canvas.height],
                [512 / 1894 * canvas.width, 148 / 690 * canvas.height],
                [425 / 1894 * canvas.width, 148 / 690 * canvas.height]
            ],
            flage: true
        },
        {
            postion: [
                [760 / 1894 * canvas.width, 520 / 690 * canvas.height],
                [392 / 1894 * canvas.width, 409 / 690 * canvas.height],
                [311 / 1894 * canvas.width, 409 / 690 * canvas.height]
            ],
            flage: true
        },
        {
            postion: [
                [1200 / 1894 * canvas.width, 350 / 690 * canvas.height],
                [1433 / 1894 * canvas.width, 119 / 690 * canvas.height],
                [1540 / 1894 * canvas.width, 119 / 690 * canvas.height]
            ],
            flage: false
        },
        {
            postion: [
                [1200 / 1894 * canvas.width, 430 / 690 * canvas.height],
                [1514 / 1894 * canvas.width, 500 / 690 * canvas.height],
                [1610 / 1894 * canvas.width, 500 / 690 * canvas.height]
            ],
            flage: false
        }


    ];
    for (var i = 0; i < sizePos.length; i++) {
        var temporaryPos = null;
        ctx.beginPath();
        ctx.fillStyle = '#1fbcf9';
        ctx.strokeStyle = '#0181d6';
        ctx.moveTo(sizePos[i].postion[0][0], sizePos[i].postion[0][1]);
        for (var j = 0; j < sizePos[i].postion.length; j++) {
            ctx.lineTo(sizePos[i].postion[j][0], sizePos[i].postion[j][1]);
            ctx.moveTo(sizePos[i].postion[j][0], sizePos[i].postion[j][1]);
            if (j == sizePos[i].postion.length - 1) {
                temporaryPos = sizePos[i].postion[j];
            } else {
                ctx.arc(sizePos[i].postion[j][0], sizePos[i].postion[j][1], 2.5, 0, Math.PI * 2, false);
            }
            ctx.moveTo(sizePos[i].postion[j][0], sizePos[i].postion[j][1]);
        }
        ctx.fill();
        ctx.stroke();
        sizePos[i].img = new Image();
        sizePos[i].img.src = 'images/border.png';
        (function (imgs, pos) {
            // console.log(imgs);
            var temporaryW = 130 / 1894 * canvas.width, posW;
            posW = imgs.flage ? -temporaryW * 0.5 : temporaryW * 0.5;
            imgs.img.onload = function () {
                // console.log(temporaryPos);
                ctx.drawImage(
                    imgs.img,
                    pos[0] - temporaryW * 0.5 + posW,
                    pos[1] - temporaryW * 0.615 * 0.5,
                    temporaryW,
                    temporaryW * 0.615
                );
                ctx.beginPath();
                ctx.moveTo(pos[0], pos[1]);
                ctx.fillStyle = '#1fbcf9';
                ctx.textAlign = 'right';
                ctx.font = personFun.getH(30) + 'px Arial';
                ctx.fillText('45', pos[0] + temporaryW * 0.35 + posW, pos[1]+temporaryW * 0.615*0.03);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(pos[0], pos[1]);
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'right';
                ctx.font = personFun.getH(18) + 'px 微软雅黑';
                ctx.fillText('脆弱性', pos[0] + temporaryW * 0.35 + posW, pos[1]+temporaryW * 0.615*0.35);
                ctx.fill();


            };
        })(sizePos[i], temporaryPos);


    }

}

