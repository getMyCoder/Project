var DW = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
};
var ActualSize = {
    wScaleH: 3.5,
    height: 1440,
    width: 5040
};
$(function () {
    DW = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };
    onload();
    // 旋转球体
    createBall();
    middleTop();
    // 样式funtcion
    onloadFun();
    // 服务器弹窗
    serverPop();
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
    }
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
        {obj: $(".mainLeft"), val: [null, 1300, null, null, null]},
        {obj: $(".middleTopMCon h2"), val: [null, 100, 56, 100, null]},
        {obj: $(".middleTopMCon h3"), val: [null, 45, 18, 38, 11]},
        {obj: $(".moddleTopCon"), val: [null, 700, null, null, null]},
        {obj: $("#earthMap"), val: [null, null, null, null, null]},
        {obj: $(".mainLeft-bottom"), val: [null, 430, null, null, null]},
        {obj: $(".title"), val: [null, 43, null, null, null]},
        {
            obj: $(".title h3"), val: [null, 43, 22, null, null], callback: function () {
                $(".title h3").css({
                    'lineHeight': $(".title").height() + "px"
                });
            }
        },
        {obj: $("#mainB_01"), val: [null, 385, null, null, null]},
        {obj: $("#mainB_02"), val: [null, 385, null, null, null]},
        {obj: $("#mainB_03"), val: [null, 385, null, null, null]},
        {obj: $("#mainB_04"), val: [null, 385, null, null, null]},
        {obj: $("#mainB_02_01"), val: [null, 385, null, null, null]},
        {obj: $("#mainB_02_02"), val: [null, 385, null, null, null]},
        {obj: $("#mainB_02_03"), val: [null, 385, null, null, null]},
        {obj: $(".mainLeft-bottom-btn"), val: [null, 150, null, null, null]},
        // middle
        {obj: $(".mainMiddle"), val: [null, 1300, null, null, null]},
        {obj: $(".mainMiddleTop"), val: [null, 590, null, null, null]},
        {obj: $(".mainMiddleBottom"), val: [null, 710, null, null, null]},
        {obj: $(".mainBTLTitle"), val: [null, 55, 18, 55, null]},
        {obj: $("#mainBTLCanvas"), val: [null, 640, null, null, null]},
        {obj: $(".mainErrHover img"), val: [34, 32, null, null, null]},
        {obj: $(".mainMiddleBTUlLi"), val: [null, null, null, null, 55]},
        {obj: $(".mainMiddleBTUlLi h2"), val: [94, 92, null, null, null]},
        {obj: $(".mainMiddleBTUlLi h3"), val: [null, 100, 18, 60, null]},
        {obj: $(".errorZhs img"), val: [34, 32, null, null, null]},
        // right
        {obj: $(".mainRight"), val: [null, 1300, null, null, null]},
        {obj: $(".mainRightLeft"), val: [null, null, null, null, 50]},
        {obj: $(".mainRightRight"), val: [null, 1250, null, null, null]},
        {obj: $(".mainRightLeft ul li h2"), val: [237, 173, null, null, 50]},
        {obj: $(".mainRightLeft ul li h3"), val: [290, 60, 20, 60, 25]},
        {obj: $(".mainRightLeft ul li h4"), val: [60, 50, null, null, 47]},
        {obj: $(".mainRightRight ul li"), val: [null, 1250, null, null, null]},
        {obj: $(".mainRightRightTop"), val: [null, 143, null, null, null]},
        {
            obj: $(".mainRightRightTop button"), val: [240, 50, null, null, 46.5], callback: function () {
                $(".mainRightRightTop button").css({'marginRight': personFun.getW(60) + "px"});
            }
        },
        // {
        //     obj: $(".mainRightRightCon01"), val: [1123, 1082, null, null, null, null], callback: function () {
        //         $(".mainRightRightCon01Con").height($(".mainRightRightCon01").height() - 58);
        //     }
        // },
        // {obj: $(".mainRightRightCon01Title h2"), val: [null, 90, 20, 90, null, null]},
        // {obj: $(".mainRightRightCon01Table h2"), val: [null, 90, 18, 90, null, null]},
        {obj: $(".mainRightRightCon02"), val: [null, 1082, null, null, null]},
        {obj: $(".mainRightRightCon02Top"), val: [null, 480, null, null, null]},
        {obj: $(".mainRightRightCon02Title"), val: [null, 125, 30, 125, null]},
        {obj: $(".mainRightRightCon02topCon"), val: [null, 355, null, null, null]},
        {obj: $(".mainRightRightCon02topCon dl dd h2"), val: [160, 188, null, null, -23]},
        {obj: $(".mainRightRightCon02topCon dl dd h3"), val: [null, 145, null, 28, null]},
        {obj: $(".mainRightRightCon02topCon dl dd h3 span"), val: [null, null, 20, null, null]},
        {obj: $(".mainRightRightCon02Bottom"), val: [null, 550, null, null, 30]},
        {
            obj: $(".mainRightRightCon02TitleBottom"), val: [null, 73, 30, 73, null], callback: function () {
                $(".mainRightRightCon02TitleBottom").css('paddingTop', personFun.getH(48) + "px");
            }
        },
        {
            obj: $(".mainRightRightCon02LeftCon h2"), val: [null, null, null, null, null], callback: function () {
                $(".mainRightRightCon02LeftCon h2").css('paddingBottom', personFun.getH(10) + "px");
            }
        },
        {obj: $(".mainRightRightCon02LeftCon h2 strong em"), val: [24, 24, null, null, 14]},
        {obj: $(".mainRightRightCon02LeftCon h2 span"), val: [null, null, 20, 32, 12]},
        {obj: $(".mainRightRightCon02RightCon"), val: [null, null, null, null, 10]},
        {
            obj: $(".mainRightRightCon02RightCon h3"), val: [null, null, null, null, 24], callback: function () {
                $(".mainRightRightCon02RightCon h3 span").css({
                    'padding': personFun.getH(5) + "px"
                });
            }
        },
        {obj: $(".mainRightRightCon02RightCon h3 span"), val: [null, null, 20, 40, null]},
        {obj: $(".mainRightRightCon03"), val: [null, 1055, null, null, null]},
        {obj: $(".mainRightRightCon02TitleImg"), val: [null, 90, null, null, null]},
        {obj: $(".mainRightRightCon03Con"), val: [null, null, null, null, 40]},
        {obj: $(".mainRightRightCon03ConTitle"), val: [null, 47, 20, 47, 18]},
        {
            obj: $(".mainRightRightCon03ConText"), val: [null, null, null, null, 27], callback: function () {
                $(".mainRightRightCon03ConText").css({
                    'padding': personFun.getH(20) + "px"
                });
            }
        },
        {
            obj: $(".mainRightRightCon03ConTextItem"), val: [null, null, 20, 34, null], callback: function () {
                $(".mainRightRightCon03ConTextItem").css({
                    'padding': personFun.getH(10) + "px 0"
                });
            }
        },
        // 弹窗1
        {
            obj: $(".defense-data"), val: [null, null, null, null, null], callback: function () {
                $(".defense-data").css({
                    'paddingTop': personFun.getH(15) + "px"
                });
            }
        },
        {obj: $(".defense-data-itmes"), val: [null, null, null, null, 40]},
        {obj: $(".defense-data-itmesTitle"), val: [null, 56, 24, 56, null]},
        {
            obj: $(".defense-data-itmesCon"), val: [null, null, null, null, null], callback: function () {
                $(".defense-data-itmesCon").css({
                    'paddingTop': personFun.getH(20) + "px"
                });
            }
        },
        {obj: $(".defense-data-itmesCon ul"), val: [1400, null, null, null, null]},
        {obj: $(".defense-pop li h2"), val: [68, 97, null, null, 23]},
        {obj: $(".defense-pop li h3"), val: [null, 37, 24, 37, null]},
        {
            obj: $(".defense-pop li h4"), val: [null, 26, 10, 26, null], callback: function () {
                $(".defense-pop li h4").css({
                    'paddingBottom': personFun.getH(12) + "px"
                });
            }
        },
        // 弹窗2
        {
            obj: $(".gxqzhs"), val: [null, null, null, null, null], callback: function () {
                $(".gxqzhs").css({
                    'paddingTop': personFun.getH(15) + "px"
                });
            }
        },
        {obj: $(".gxqzhs-pop"), val: [null, null, null, null, null]},
        {obj: $(".gxqzhs-pop li"), val: [null, 165, null, null, null]},
        {obj: $(".gxqzhs-pop li h2"), val: [94, null, null, null, null],callback:function () {
                $(".gxqzhs-pop li h2").css('marginLeft',personFun.getW(74) + "px")
            }},
        {obj: $(".gxqzhs-pop li h2 img"), val: [94, 92, null, null, 34]},
        {obj: $(".gxqzhs-pop li h3"), val: [165, 165, 24, 165, null]},
        {obj: $(".gxqzhs-pop li h4"), val: [632, null, null, null, null]},
        {obj: $(".gxqzhs-pop li h4 img"), val: [632, 27, null, null, 70]},
        {obj: $(".gxqzhs-pop li h5"), val: [136, null, null, null, null],callback:function () {
                $(".gxqzhs-pop li h5").css('marginLeft',personFun.getW(52) + "px")
            }},
        {obj: $(".gxqzhs-pop li h5 img"), val: [136, 132, null, null, 19]},
        {obj: $(".gxqzhs-pop li h6"), val: [150, 165, 24, 165, null]},
        {obj: $(".gxqzhs-data-itmes"), val: [null, null, null, null, 13]},

    ];
    personFun.setSize(createSize);

    // 时间
    getTimes();
    // 左侧底部滚动
    bannerToggle();
    $(".container").removeClass('hideBox');

}

// onload-function
function onloadFun() {
    $(window).resize(function () {
        window.location.reload();
    });

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

// 3D
function createBall() {

    var scene = new THREE.Scene();
    var geometryA = new THREE.SphereGeometry(75, 75, 75);//矩形平面
    var textureA = THREE.ImageUtils.loadTexture("images/maps01.png");//加载纹理贴图
    var materialA = new THREE.MeshLambertMaterial({//贴图通过材质添加给几何体
        map: textureA,//给纹理属性map赋值
        side: THREE.DoubleSide,//两面可见.
        transparent: true
    });//材质对象
    var meshA = new THREE.Mesh(geometryA, materialA);//纹理贴图网格模型对象
    scene.add(meshA);//网格模型添加到场景中


    var geometry = new THREE.PlaneGeometry(320, 140);//矩形平面
    // var geometry = new THREE.PlaneGeometry(BallSize.width, BallSize.height);//矩形平面
    var texture = THREE.ImageUtils.loadTexture("images/mapBg01.png");//加载纹理贴图
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
function OverallNetworkHealthIndex(dataList, callback) {
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
                [300 / 1894 * canvas.width, 148 / 690 * canvas.height]
            ],
            flage: true,
            err: false,
            evt: null
        },
        {
            postion: [
                [760 / 1894 * canvas.width, 450 / 690 * canvas.height],
                [450 / 1894 * canvas.width, 409 / 690 * canvas.height],
                [300 / 1894 * canvas.width, 409 / 690 * canvas.height]
            ],
            flage: true,
            err: false,
            evt: null
        },
        {
            postion: [
                [1200 / 1894 * canvas.width, 350 / 690 * canvas.height],
                [1400 / 1894 * canvas.width, 119 / 690 * canvas.height],
                [1420 / 1894 * canvas.width, 119 / 690 * canvas.height]
            ],
            flage: false,
            err: false,
            evt: null
        },
        {
            postion: [
                [1200 / 1894 * canvas.width, 430 / 690 * canvas.height],
                [1400 / 1894 * canvas.width, 450 / 690 * canvas.height],
                [1420 / 1894 * canvas.width, 450 / 690 * canvas.height]
            ],
            flage: false,
            err: false,
            evt: null
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
        if (dataList[i].val < 60) {
            sizePos[i].img.src = 'images/error.png';
        } else {
            sizePos[i].img.src = 'images/border.png';
        }
        var temporaryW = 200 / 1894 * canvas.width, posW;
        posW = sizePos[i].flage ? -temporaryW * 0.5 * 1.8 : temporaryW * 0.5;
        (function (imgs, pos, index, temporaryW, posW) {

            imgs.img.onload = function () {
                ctx.drawImage(
                    imgs.img,
                    pos[0] - temporaryW * 0.5 + posW,
                    pos[1] - temporaryW * 0.615 * 0.5,
                    temporaryW * 1.4,
                    temporaryW * 1.4 * 0.615
                );
                ctx.beginPath();
                ctx.moveTo(pos[0], pos[1]);
                ctx.fillStyle = '#ccc';
                ctx.textAlign = 'right';
                ctx.font = personFun.getH(18) + 'px Arial';
                ctx.fillText('分数:', pos[0] + temporaryW * 0.2 + posW, pos[1] + temporaryW * 0.08);
                ctx.fill();

                // ctx.beginPath();
                // ctx.moveTo(pos[0], pos[1]);
                // if (dataList[index].val < 60) {
                //     ctx.fillStyle = '#d90c11';
                // } else {
                //     ctx.fillStyle = '#1dbbf8';
                // }
                // ctx.textAlign = 'right';
                // ctx.font = 'normal bold ' + personFun.getH(30) + 'px BW7IGENERALCONDENSED';
                // ctx.fillText(dataList[index].val, pos[0] + temporaryW * 0.6 + posW, pos[1] + temporaryW * 0.1);
                // ctx.fill();

                ctx.beginPath();
                ctx.moveTo(pos[0], pos[1]);
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.font = personFun.getH(20) + 'px 微软雅黑';
                ctx.fillText(dataList[index].text, pos[0] + temporaryW * 0.15 + posW, pos[1] + temporaryW * 0.615 * 0.67);
                ctx.fill();


                if (dataList[index].val < 100 && dataList[index].val > 80) {
                    ctx.beginPath();
                    ctx.moveTo(pos[0], pos[1]);
                    ctx.fillStyle = '#00fff5';
                    ctx.textAlign = 'right';
                    ctx.font = 'normal bold ' + personFun.getH(32) + 'px BW7IGENERALCONDENSED';
                    ctx.fillText(dataList[index].val, pos[0] + temporaryW * 0.6 + posW, pos[1] + temporaryW * 0.1);
                    ctx.fill();
                } else if (dataList[index].val < 80 && dataList[index].val > 60) {
                    ctx.beginPath();
                    ctx.moveTo(pos[0], pos[1]);
                    ctx.fillStyle = '#f3cd3a';
                    ctx.textAlign = 'right';
                    ctx.font = 'normal bold ' + personFun.getH(32) + 'px BW7IGENERALCONDENSED';
                    ctx.fillText(dataList[index].val, pos[0] + temporaryW * 0.6 + posW, pos[1] + temporaryW * 0.1);
                    ctx.fill();
                } else if (dataList[index].val < 60) {
                    ctx.beginPath();
                    ctx.moveTo(pos[0], pos[1]);
                    ctx.fillStyle = '#d90c11';
                    ctx.textAlign = 'right';
                    ctx.font = 'normal bold ' + personFun.getH(32) + 'px BW7IGENERALCONDENSED';
                    ctx.fillText(dataList[index].val, pos[0] + temporaryW * 0.6 + posW, pos[1] + temporaryW * 0.1);
                    ctx.fill();
                    imgs.err = new Image();
                    imgs.err.src = 'images/errLog.png';
                    imgs.err.onload = function () {
                        ctx.drawImage(
                            imgs.err,
                            pos[0] - temporaryW * 0.5 + posW,
                            pos[1] - temporaryW * 0.615 * 0.5 + temporaryW * 1.4 * 0.615 + 5,
                            personFun.getW(23),
                            personFun.getW(27)
                        );
                        ctx.beginPath();
                        ctx.moveTo(pos[0] - temporaryW * 0.5 + posW, pos[1] - temporaryW * 0.615 * 0.5 + temporaryW * 1.4 * 0.615 + 8);
                        ctx.fillStyle = '#d90c11';
                        ctx.textAlign = 'left';
                        ctx.font = personFun.getH(20) + 'px 微软雅黑';
                        ctx.fillText('弱口令指数低，', pos[0] - temporaryW * 0.5 + posW + 13, pos[1] - temporaryW * 0.615 * 0.5 + temporaryW * 1.4 * 0.615 + 15);
                        ctx.fillText('需立即优化', pos[0] - temporaryW * 0.5 + posW + 13, pos[1] - temporaryW * 0.615 * 0.5 + temporaryW * 1.4 * 0.615 + 15 + 15);
                        ctx.fill();
                    };

                }
            };
        })(sizePos[i], temporaryPos, i, temporaryW, posW);
        // 事件
        sizePos[i].evt = {
            x: temporaryPos[0] - 200 / 1894 * canvas.width * 0.5 + posW,
            y: temporaryPos[1] - temporaryW * 0.615 * 0.5,
            w: temporaryW * 1.4,
            h: temporaryW * 1.4 * 0.615,
            Evt: null
        };

    }
    // $(document).click(function (evt) {
    //     for (var i = 0; i < sizePos.length; i++) {
    //         if (
    //             (
    //                 evt.clientX - $("#earthMapData").offset().left > sizePos[i].evt.x &&
    //                 evt.clientX - $("#earthMapData").offset().left < sizePos[i].evt.x + sizePos[i].evt.w
    //             )
    //             &&
    //             (
    //                 evt.clientY - $("#earthMapData").offset().top > sizePos[i].evt.y &&
    //                 evt.clientY - $("#earthMapData").offset().top < sizePos[i].evt.y + sizePos[i].evt.h
    //             )
    //         ) {
    //             if (callback) {
    //                 callback(i);
    //             }
    //         }
    //     }
    //
    // });
}

// 漏洞资产覆盖率
function mainB_01Echart(dataList) {
    var createData = dataList;
    $("#mainB_01").append('<canvas id="mainB_01Echart" width="' + $("#mainB_01").width() + '" height="' + $("#mainB_01").height() + '"></canvas>');
    var canvas = document.getElementById('mainB_01Echart');
    var ctx = canvas.getContext('2d');
    var newW = 715;
    var hrSize = canvas.width;
    var colorImg = [
        {img: 'right01E01.png', color: '#851914', row: "right01EB01.png", background: {color: "#ea2016", colorLG: ["rgba(234,32,22,0.6)", "rgba(202,17,6,0.6)"]}},
        {img: 'right01E02.png', color: '#c28a03', row: "right01EB02.png", background: {color: "#e1a003", colorLG: ["rgba(225,160,3,0.6)", "rgba(167,120,7,0.6)"]}},
        {img: 'right01E03.png', color: '#0053c5', row: "right01EB03.png", background: {color: "#006cff", colorLG: ["rgba(0,108,255,0.6)", "rgba(1,73,170,0.6)"]}}
    ];
    for (var i = 0; i < createData.length; i++) {
        createData[i].img = {};
        createData[i].img.colorImg = colorImg[i];
        // title
        createData[i].img.ctxImg = new Image();
        createData[i].img.ctxImg.src = "images/" + createData[i].img.colorImg.img;
        (function (cData, index) {
            cData.img.ctxImg.onload = function () {
                ctx.drawImage(
                    cData.img.ctxImg,
                    20 / newW * hrSize + 230 / newW * hrSize * index,
                    50 / newW * hrSize,
                    30 / newW * hrSize,
                    30 / newW * 1.125 * hrSize
                );
                ctx.beginPath();
                ctx.font = "11px 微软雅黑";
                ctx.fillStyle = cData.img.colorImg.color;
                ctx.fillText(
                    cData.Loophole[0].substring(0, 2) + '：',
                    25 / newW * hrSize + 230 / newW * hrSize * index + 30 / newW * hrSize,
                    42 / newW * 1.8 * hrSize
                );
                ctx.fillStyle = "#fff";
                ctx.fillText(
                    cData.benchmark[1] + "%",
                    20 / newW * hrSize + 230 / newW * hrSize * index + 120 / newW * hrSize,
                    // 24 / newW * hrSize * 5.75 + 50 / newW * hrSize + 210 / newW * hrSize * index + 5,
                    42 / newW * 1.8 * hrSize
                );
                ctx.fill();
            };
        })(createData[i], i);
        // container
        // container-title
        ctx.beginPath();
        ctx.font = "12px 微软雅黑";
        ctx.fillStyle = "#fff";
        ctx.fillText(
            createData[i].Loophole[0],
            50 / newW * hrSize,
            50 / newW * 4 * hrSize + 35 / newW * hrSize * 4 * i
        );
        ctx.fillStyle = "#fff";
        ctx.fillText(
            createData[i].Loophole[1] + "%",
            607 / newW * hrSize,
            50 / newW * 4 * hrSize + 35 / newW * hrSize * 4 * i
        );
        ctx.fill();
        // 区域
        ctx.fillStyle = "#0b2a55";
        var createLW = 607 / newW * hrSize;
        ctx.fillRect(
            50 / newW * hrSize,
            46 / newW * 4.8 * hrSize + 35 / newW * hrSize * 4 * i,
            createLW,
            24 / newW * hrSize
        );
        ctx.fillStyle = createData[i].img.colorImg.background.color;
        ctx.fillRect(
            50 / newW * hrSize,
            46 / newW * 4.8 * hrSize + 35 / newW * hrSize * 4 * i,
            createLW * (createData[i].Loophole[1] / 100),
            24 / newW * hrSize
        );
        var grad = ctx.createLinearGradient(
            50 / newW * hrSize,
            46 / newW * 4.8 * hrSize + 35 / newW * hrSize * 4 * i,
            createLW * (createData[i].benchmark[1] / 100),
            46 / newW * 4.3 * hrSize + 35 / newW * hrSize * 4 * i,
        );
        grad.addColorStop(0, createData[i].img.colorImg.background.colorLG[0]);
        grad.addColorStop(1, createData[i].img.colorImg.background.colorLG[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(
            50 / newW * hrSize,
            46 / newW * 4.8 * hrSize + 35 / newW * hrSize * 4 * i,
            createLW * (createData[i].benchmark[1] / 100),
            24 / newW * hrSize
        );
        createData[i].img.rowImg = new Image();
        createData[i].img.rowImg.src = "images/" + createData[i].img.colorImg.row;
        (function (cData, index) {
            cData.img.rowImg.onload = function () {
                ctx.drawImage(
                    cData.img.rowImg,
                    50 / newW * hrSize + createLW * (createData[index].benchmark[1] / 100) - 20 / newW * hrSize * 0.5,
                    46 / newW * 4.8 * hrSize + 35 / newW * hrSize * 4 * index - 20 / newW * hrSize * 0.8 * 0.9,
                    20 / newW * hrSize,
                    20 / newW * hrSize * 0.8
                );
            };
        })(createData[i], i);
    }
}

function mainB_01EchartB(dataList) {
    var createData = dataList;
    $("#mainB_01").append('<canvas id="mainB_01Echart" width="' + $("#mainB_01").width() + '" height="' + $("#mainB_01").height() + '"></canvas>');
    var canvas = document.getElementById('mainB_01Echart');
    var ctx = canvas.getContext('2d');
    var newW = 715;
    var hrSize = canvas.width;
    var colorImg = [
        {img: 'right01E01.png', color: '#851914', row: "right01EB01.png", background: {color: "#ea2016", colorLG: ["rgba(234,32,22,0.6)", "rgba(202,17,6,0.6)"]}},
        {img: 'right01E02.png', color: '#c28a03', row: "right01EB02.png", background: {color: "#e1a003", colorLG: ["rgba(225,160,3,0.6)", "rgba(167,120,7,0.6)"]}},
        {img: 'right01E03.png', color: '#0053c5', row: "right01EB03.png", background: {color: "#006cff", colorLG: ["rgba(0,108,255,0.6)", "rgba(1,73,170,0.6)"]}}
    ];
    for (var i = 0; i < createData.length; i++) {
        createData[i].img = {};
        createData[i].img.colorImg = colorImg[i];
        // title
        createData[i].img.ctxImg = new Image();
        createData[i].img.ctxImg.src = "images/" + createData[i].img.colorImg.img;
        (function (cData, index) {
            cData.img.ctxImg.onload = function () {
                ctx.drawImage(
                    cData.img.ctxImg,
                    20 / newW * hrSize + 230 / newW * hrSize * index,
                    30 / newW * hrSize,
                    30 / newW * hrSize,
                    30 / newW * 1.125 * hrSize
                );
                ctx.beginPath();
                ctx.font = "11px 微软雅黑";
                ctx.fillStyle = cData.img.colorImg.color;
                ctx.fillText(
                    cData.Loophole[0].substring(0, 2) + '：',
                    25 / newW * hrSize + 230 / newW * hrSize * index + 30 / newW * hrSize,
                    30 / newW * 1.8 * hrSize
                );
                ctx.fillStyle = "#fff";
                ctx.fillText(
                    cData.benchmark[1] + "%",
                    20 / newW * hrSize + 230 / newW * hrSize * index + 120 / newW * hrSize,
                    // 24 / newW * hrSize * 5.75 + 50 / newW * hrSize + 210 / newW * hrSize * index + 5,
                    30 / newW * 1.8 * hrSize
                );
                ctx.fill();
            };
        })(createData[i], i);
        // container
        // container-title
        ctx.beginPath();
        ctx.font = "12px 微软雅黑";
        ctx.fillStyle = "#fff";
        ctx.fillText(
            createData[i].Loophole[0],
            50 / newW * hrSize,
            30 / newW * 4 * hrSize + 24 / newW * hrSize * 4 * i
        );
        ctx.fillStyle = "#fff";
        ctx.fillText(
            createData[i].Loophole[1] + "%",
            607 / newW * hrSize,
            30 / newW * 4 * hrSize + 24 / newW * hrSize * 4 * i
        );
        ctx.fill();
        // 区域
        ctx.fillStyle = "#0b2a55";
        var createLW = 607 / newW * hrSize;
        ctx.fillRect(
            50 / newW * hrSize,
            30 / newW * 4.8 * hrSize + 24 / newW * hrSize * 4 * i,
            createLW,
            24 / newW * hrSize
        );
        ctx.fillStyle = createData[i].img.colorImg.background.color;
        ctx.fillRect(
            50 / newW * hrSize,
            30 / newW * 4.8 * hrSize + 24 / newW * hrSize * 4 * i,
            createLW * (createData[i].Loophole[1] / 100),
            24 / newW * hrSize
        );
        var grad = ctx.createLinearGradient(
            50 / newW * hrSize,
            30 / newW * 4.8 * hrSize + 24 / newW * hrSize * 4 * i,
            createLW * (createData[i].benchmark[1] / 100),
            24 / newW * 4.3 * hrSize + 24 / newW * hrSize * 4 * i,
        );
        grad.addColorStop(0, createData[i].img.colorImg.background.colorLG[0]);
        grad.addColorStop(1, createData[i].img.colorImg.background.colorLG[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(
            50 / newW * hrSize,
            30 / newW * 4.8 * hrSize + 24 / newW * hrSize * 4 * i,
            createLW * (createData[i].benchmark[1] / 100),
            24 / newW * hrSize
        );
        createData[i].img.rowImg = new Image();
        createData[i].img.rowImg.src = "images/" + createData[i].img.colorImg.row;
        (function (cData, index) {
            cData.img.rowImg.onload = function () {
                ctx.drawImage(
                    cData.img.rowImg,
                    50 / newW * hrSize + createLW * (createData[index].benchmark[1] / 100) - 20 / newW * hrSize * 0.5,
                    30 / newW * 4.8 * hrSize + 24 / newW * hrSize * 4 * index - 20 / newW * hrSize * 0.8 * 0.9,
                    20 / newW * hrSize,
                    20 / newW * hrSize * 0.8
                );
            };
        })(createData[i], i);
    }
}

// 安全事件发展趋势
function mainB_05_01(dataList) {
    var myChart = echarts.init(document.getElementById('mainB_02'));
    var color = ['172,33,26', '255,160,3', '211,77,31', '0,108,255', '113,176,61'];
    var option = {
        title: {
            text: '',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
            },
            left: '6%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        legend: {
            icon: 'rect',
            itemWidth: 15,
            itemHeight: 10,
            borderRadius: 4,
            itemGap: 13,
            data: [],
            right: '4%',
            top: '5%',
            textStyle: {
                fontSize: 12,
                color: '#F1F1F3'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                data: dataList.time
            }, {
                axisPointer: {
                    show: false
                },
                axisLine: {

                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisTick: {
                    show: false
                },

                position: 'bottom',
                offset: 20,
                data: []
            }],
        yAxis: [
            {
                type: 'value',
                name: '',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            }],
        series: []
    };
    for (var i = 0; i < dataList.value.length; i++) {
        option.legend.data.push(dataList.value[i].name);
        option.series.push({
            name: dataList.value[i].name,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(' + color[i] + ', 0.2)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(' + color[i] + ', 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(' + color[i] + ',27)',
                    borderColor: 'rgba(' + color[i] + ',0.27)',
                    borderWidth: 12

                }
            },
            data: dataList.value[i].data
        });
    }
    myChart.setOption(option);
}

// 配置合规资产覆盖率
function mainB_02Echart(dataList) {
    mainB_02Echart01(dataList[0]);

    // 01-left
    function mainB_02Echart01(dataL) {
        var myChart = echarts.init(document.getElementById('mainB_02_01'));
        var option = {
            tooltip: {
                formatter: "{b}"
            },
            series: [
                {
                    type: 'gauge',
                    radius: '90%',
                    data: [{
                        value: dataL.Irregularities[1],
                        name: dataL.Irregularities[1] + '%\n' + dataL.Irregularities[0]
                    }],
                    min: 10,
                    max: 90,
                    startAngle: 210,
                    endAngle: -30,
                    splitNumber: 8,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: [[0.3, 'rgba(255,160,3,0.6)'], [0.6, 'rgba(255,160,3,0.6)'], [1, 'rgba(255,160,3,0.6)']],
                            width: 2,
                            // shadowBlur: 13,
                            // shadowColor: '#1749ed',
                            // shadowOffsetX: 1,
                            // shadowOffsetY: -4,
                        }
                    },
                    splitLine: {
                        length: 5,
                        lineStyle: {
                            color: 'rgba(255,160,3,0.6)'
                        }
                    },
                    axisTick: {
                        length: 5,
                        splitNumber: 5,
                        lineStyle: {
                            color: 'rgba(255,160,3,0.6)'
                        }
                    },
                    axisLabel: {
                        distance: 2,
                        color: 'rgba(255,160,3,1)',
                        fontWeight: 400,
                        fontSize: 10
                    },
                    pointer: {
                        length: '100%',
                        width: 2,
                    },
                    itemStyle: {
                        color: 'rgba(255,160,1)',
                    },
                    title: {
                        offsetCenter: [0, '90%'],
                        color: 'rgba(255,160,3,1)',
                        fontSize: 12,
                        // borderRadius: 4,
                        // borderColor: '#20fcd6',
                        // borderWidth: 1,
                        // shadowColor: '#20fcd6',
                        // shadowBlur: 40,
                        padding: [15, 5],
                        // shadowOffsetX: 0,
                        // shadowOffsetY: 0,
                    },
                    detail: {
                        show: false
                    },
                    emphasis: {
                        itemStyle: {
                            color: 'rgba(255,160,3,1)'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255,160,3,0.6)',
                    }
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    legendHoverLink: false,
                    radius: ['0%', '20%'],
                    z: 10,
                    label: {
                        "normal": {
                            "show": false
                        }
                    },
                    labelLine: {
                        "normal": {
                            "show": false
                        }
                    },
                    data: [{
                        "value": 100,
                        itemStyle: {
                            normal: {
                                color: "rgba(255,160,3,0.3)"
                            }
                        }
                    }],
                    tooltip: {
                        show: false
                    },
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    legendHoverLink: false,
                    radius: ['0%', '40%'],
                    z: 1,
                    label: {
                        "normal": {
                            "show": false
                        }
                    },
                    labelLine: {
                        "normal": {
                            "show": false
                        }
                    },
                    data: [{
                        "value": 100,
                        itemStyle: {
                            normal: {
                                color: "rgba(255,160,3,0.1)"
                            }
                        }
                    }],
                    tooltip: {
                        show: false
                    },
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    legendHoverLink: false,
                    radius: ['0%', '12%'],
                    z: 10,
                    label: {
                        "normal": {
                            "show": false
                        }
                    },
                    labelLine: {
                        "normal": {
                            "show": false
                        }
                    },
                    data: [{
                        "value": 100,
                        itemStyle: {
                            normal: {
                                color: "rgba(255,160,3,1)"
                            }
                        }
                    }],
                    tooltip: {
                        show: false
                    },
                }
            ]
        };
        myChart.setOption(option);
        $("#mainB_02_01").append('<div class="mainB_02H2"><h2 style="color: rgb(255,160,3);">' + dataL.benchmark[0] + '：<i>' + dataL.benchmark[1] + '%</i></h2></div>');
    }

    mainB_02Echart02(dataList[1]);

    // 02-middle
    function mainB_02Echart02(dataL) {
        var myChart = echarts.init(document.getElementById('mainB_02_02'));
        var option = {
            tooltip: {
                formatter: "{b}"
            },
            series: [
                {
                    type: 'gauge',
                    radius: '90%',
                    data: [{
                        value: dataL.Irregularities[1],
                        name: dataL.Irregularities[1] + '%\n' + dataL.Irregularities[0]
                    }],
                    min: 10,
                    max: 90,
                    startAngle: 210,
                    endAngle: -30,
                    splitNumber: 8,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: [[0.3, 'rgba(234,32,22,0.6)'], [0.6, 'rgba(234,32,22,0.6)'], [1, 'rgba(234,32,22,0.6)']],
                            width: 3,
                            // shadowBlur: 13,
                            // shadowColor: '#1749ed',
                            // shadowOffsetX: 1,
                            // shadowOffsetY: -4,
                        }
                    },
                    splitLine: {
                        length: 7,
                        lineStyle: {
                            color: 'rgba(234,32,22,0.6)'
                        }
                    },
                    axisTick: {
                        length: 7,
                        splitNumber: 5,
                        lineStyle: {
                            color: 'rgba(234,32,22,0.6)'
                        }
                    },
                    axisLabel: {
                        distance: 2,
                        color: 'rgba(234,32,22,1)',
                        fontWeight: 400,
                        fontSize: 12
                    },
                    pointer: {
                        length: '100%',
                        width: 4,
                    },
                    itemStyle: {
                        color: 'rgba(234,32,22)',
                    },
                    title: {
                        offsetCenter: [0, '70%'],
                        color: 'rgba(234,32,22,1)',
                        // borderRadius: 4,
                        // borderColor: '#20fcd6',
                        // borderWidth: 1,
                        // shadowColor: '#20fcd6',
                        // shadowBlur: 40,
                        padding: [15, 5],
                        // shadowOffsetX: 0,
                        // shadowOffsetY: 0,
                        fontSize: 12,
                    },
                    detail: {
                        show: false
                    },
                    emphasis: {
                        itemStyle: {
                            color: 'rgba(234,32,22,1)'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(234,32,22,0.6)',
                    }
                },

                {
                    type: 'pie',
                    hoverAnimation: false,
                    legendHoverLink: false,
                    radius: ['0%', '20%'],
                    z: 10,
                    label: {
                        "normal": {
                            "show": false
                        }
                    },
                    labelLine: {
                        "normal": {
                            "show": false
                        }
                    },
                    data: [{
                        "value": 100,
                        itemStyle: {
                            normal: {
                                color: "rgba(234,32,22,0.3)"
                            }
                        }
                    }],
                    tooltip: {
                        show: false
                    },
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    legendHoverLink: false,
                    radius: ['0%', '40%'],
                    z: 1,
                    label: {
                        "normal": {
                            "show": false
                        }
                    },
                    labelLine: {
                        "normal": {
                            "show": false
                        }
                    },
                    data: [{
                        "value": 100,
                        itemStyle: {
                            normal: {
                                color: "rgba(234,32,22,0.1)"
                            }
                        }
                    }],
                    tooltip: {
                        show: false
                    },
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    legendHoverLink: false,
                    radius: ['0%', '12%'],
                    z: 10,
                    label: {
                        "normal": {
                            "show": false
                        }
                    },
                    labelLine: {
                        "normal": {
                            "show": false
                        }
                    },
                    data: [{
                        "value": 100,
                        itemStyle: {
                            normal: {
                                color: "rgba(234,32,22,1)"
                            }
                        }
                    }],
                    tooltip: {
                        show: false
                    },
                }
            ]
        };
        myChart.setOption(option);
        $("#mainB_02_02").append('<div class="mainB_02H2"><h2 style="color: rgb(234,32,22);">' + dataL.benchmark[0] + '：<i>' + dataL.benchmark[1] + '%</i></h2></div>');
    }

    mainB_02Echart03(dataList[2]);

    // 02-right
    function mainB_02Echart03(dataL) {
        var myChart = echarts.init(document.getElementById('mainB_02_03'));
        var option = {
            tooltip: {
                formatter: "{b}"
            },
            series: [
                {
                    type: 'gauge',
                    radius: '90%',
                    data: [{
                        value: dataL.Irregularities[1],
                        name: dataL.Irregularities[1] + '%\n' + dataL.Irregularities[0]
                    }],
                    min: 10,
                    max: 90,
                    startAngle: 210,
                    endAngle: -30,
                    splitNumber: 8,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: [[0.3, 'rgba(0,108,255,0.6)'], [0.6, 'rgba(0,108,255,0.6)'], [1, 'rgba(0,108,255,0.6)']],
                            width: 2,
                            // shadowBlur: 13,
                            // shadowColor: '#1749ed',
                            // shadowOffsetX: 1,
                            // shadowOffsetY: -4,
                        }
                    },
                    splitLine: {
                        length: 5,
                        lineStyle: {
                            color: 'rgba(0,108,255,0.6)'
                        }
                    },
                    axisTick: {
                        length: 5,
                        splitNumber: 5,
                        lineStyle: {
                            color: 'rgba(0,108,255,0.6)'
                        }
                    },
                    axisLabel: {
                        distance: 2,
                        color: 'rgba(0,108,255,1)',
                        fontWeight: 400,
                        fontSize: 12
                    },
                    pointer: {
                        length: '100%',
                        width: 2,
                    },
                    itemStyle: {
                        color: 'rgba(0,108,255)',
                    },
                    title: {
                        offsetCenter: [0, '90%'],
                        color: 'rgba(0,108,255,1)',
                        // borderRadius: 4,
                        // borderColor: '#20fcd6',
                        // borderWidth: 1,
                        // shadowColor: '#20fcd6',
                        // shadowBlur: 40,
                        padding: [15, 5],
                        // shadowOffsetX: 0,
                        // shadowOffsetY: 0,
                        fontSize: 12,
                    },
                    detail: {
                        show: false
                    },
                    emphasis: {
                        itemStyle: {
                            color: 'rgba(0,108,255,1)'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,108,255,0.6)',
                    }
                },

                {
                    type: 'pie',
                    hoverAnimation: false,
                    legendHoverLink: false,
                    radius: ['0%', '20%'],
                    z: 10,
                    label: {
                        "normal": {
                            "show": false
                        }
                    },
                    labelLine: {
                        "normal": {
                            "show": false
                        }
                    },
                    data: [{
                        "value": 100,
                        itemStyle: {
                            normal: {
                                color: "rgba(0,108,255,0.3)"
                            }
                        }
                    }],
                    tooltip: {
                        show: false
                    },
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    legendHoverLink: false,
                    radius: ['0%', '40%'],
                    z: 1,
                    label: {
                        "normal": {
                            "show": false
                        }
                    },
                    labelLine: {
                        "normal": {
                            "show": false
                        }
                    },
                    data: [{
                        "value": 100,
                        itemStyle: {
                            normal: {
                                color: "rgba(0,108,255,0.1)"
                            }
                        }
                    }],
                    tooltip: {
                        show: false
                    },
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    legendHoverLink: false,
                    radius: ['0%', '12%'],
                    z: 10,
                    label: {
                        "normal": {
                            "show": false
                        }
                    },
                    labelLine: {
                        "normal": {
                            "show": false
                        }
                    },
                    data: [{
                        "value": 100,
                        itemStyle: {
                            normal: {
                                color: "rgba(0,108,255,1)"
                            }
                        }
                    }],
                    tooltip: {
                        show: false
                    },
                }
            ]
        };
        myChart.setOption(option);
        $("#mainB_02_03").append('<div class="mainB_02H2"><h2 style="color: rgb(0,108,255);">' + dataL.benchmark[0] + '：<i>' + dataL.benchmark[1] + '%</h2></div>');
    }

    $(".mainB_02H2 h2").css({
        // 'height': personFun.getH(30) + "px",
        // 'width': personFun.getH(220) + 'px',
        'fontSize': personFun.getH(10) + "px",
        // 'borderRadius': personFun.getH(30) * 0.6 + "px",
        // 'lineHeight': personFun.getH(30) + "px",
    });
    $(".mainB_02H2").css({
        'top': personFun.getH(280) + 'px'
    });
}

// 资产弱口令统计
function mainB_03_01(dataList) {
    var myChart = echarts.init(document.getElementById('mainB_04'));
    var createAttr = {
        color: ["#a9211b", "#d34d1f", "#e1a003", "#71b03d", "#1fbcf9"],
    };
    var option = {
        title: {
            text: "资产价值等级",
            top: "78%",
            left: "49%",
            textAlign: "center",
            textStyle: {
                fontSize: personFun.getH(22),
                color: "#0088e1",
            }
        },
        grid: {
            top: 10,
        },
        series: []
    };
    for (var i = 0; i < dataList.length; i++) {
        (function (createList, index) {
            option.series.push(
                {
                    type: 'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    radius: 95 - index * 20 + '%',
                    center: ['50%', '70%'],
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        color: '#fff',
                        show: true,
                        padding: [20, 0, 0, 0],
                        fontSize: 10,
                        distance: -35,
                        z: 999,
                        align: 'center',
                        formatter(value) {
                            // if (value === 0) {
                            //     if (createList[0].length > 1) {
                            //         return " " + createList[0];
                            //     } else {
                            //         return "  " + createList[0];
                            //     }
                            // } else if (value - 10 <= createList[1] && value > createList[1]) {
                            //     return createList[1] + '%';
                            // }
                            // if(value ==100 && createList[1]==100){
                            //     return createList[1] + '%';
                            // }

                            if (value === 0) {
                                if (createList[0].length > 1) {
                                    return " " + createList[0];
                                } else {
                                    return "  " + createList[0];
                                }
                            }
                            if (value === 100) {
                                return createList[1] + '%';

                            }
                        }
                    },
                    detail: {
                        offsetCenter: ["96%", 10],
                        textStyle: {
                            fontSize: 12,
                            fontWeight: '',
                            color: '#fff'
                        },
                        formatter: function (value) {
                            // console.log(value);
                            // return value + '%';
                        }
                    },
                    pointer: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: "#323232",
                        }
                    },
                    min: 0,
                    max: 100,
                    axisLine: {
                        lineStyle: {
                            width: 12,
                            color: [
                                [createList[1] / 100, createAttr.color[index]],
                                [1, '#002764']
                            ]
                        }
                    },
                    data: [{
                        name: '',
                        value: createList[1]
                    }]
                },
            );

        })(dataList[i], i);
    }
    myChart.setOption(option, true);
}

// 左侧底部滚动
function bannerToggle() {
    var index = 0, timer = null;
    $(".mainLeft-bottom-btn-L").click(function () {
        if (index != 0) {
            index--;
            $(".mainLeft-bottom-con").animate({
                'marginLeft': -index * 100 + "%"
            });
        }
    });
    $(".mainLeft-bottom-btn-R").click(function () {
        if (index != 1) {
            index++;
            $(".mainLeft-bottom-con").animate({
                'marginLeft': -index * 100 + "%"
            });
        }
    });
    setToggleBanner();
    $(".mainLeft-bottom").hover(function () {
        clearInterval(timer);
    }, function () {
        setToggleBanner();
    });

    function setToggleBanner() {
        timer = setInterval(function () {
            if (index == 1) {
                $(".mainLeft-bottom-con").animate({
                    'marginLeft': "0"
                });
                index--;
            } else {
                $(".mainLeft-bottom-con").animate({
                    'marginLeft': "-100%"
                });
                index++;
            }

        }, 3000);
    }

}

// middleTop
function middleTop() {
    var mainMTopSize = {
        width: $(".mainMiddleTop").width(),
        height: $(".mainMiddleTop").height()
    };
    $(".mainMiddleTop").append('<canvas id="mainMiddleTopBg" width="' + mainMTopSize.width + '" height="' + mainMTopSize.height + '"></canvas>');
    $(".mainMiddleTop").append('<canvas id="mainMiddleTopMove" width="' + mainMTopSize.width + '" height="' + mainMTopSize.height + '"></canvas>');
    // 背景
    var canvas = document.getElementById('mainMiddleTopBg');
    var ctx = canvas.getContext('2d');
    // 移动的点
    var canvasBall = document.getElementById('mainMiddleTopMove');
    var ctxBall = canvasBall.getContext('2d');
    // 坐标换算比例
    var proportion = {
        x: mainMTopSize.width / 1696,
        y: mainMTopSize.height / 586
    };
    // 原始坐标
    var timer, lineTimer, moveTimer = 10, spotSpeed = 200;
    var coordinate = [{
        spead: spotSpeed, //步数
        actual: {   //走的距离
            x: 0,
            y: 0
        },
        index: 0,   //当前的index number
        indexFlage: 0,  //是否超过步数 number,超过步数重置为0
        timer: null,
        lineCoordinate: [
            {x: 1621, y: 221},
            {x: 1428, y: 338},
            {x: 1245, y: 225},
            {x: 1060, y: 325},
            {x: 772, y: 496},
            {x: 382, y: 270},
            {x: 382, y: 546}
        ],
        SeparateCoordinate: [
            {
                spead: spotSpeed,
                actual: {
                    x: 0,
                    y: 0
                },
                index: 0,
                indexFlage: 0,
                lineCoordinate: [{x: 382, y: 546}, {x: 327, y: 547}, {x: 327, y: 584}],
            },
            {
                spead: spotSpeed,
                actual: {
                    x: 0,
                    y: 0
                },
                index: 0,
                indexFlage: 0,
                lineCoordinate: [{x: 382, y: 546}, {x: 916, y: 547}, {x: 916, y: 584}],
            },
            {
                spead: spotSpeed,
                actual: {
                    x: 0,
                    y: 0
                },
                index: 0,
                indexFlage: 0,
                lineCoordinate: [{x: 382, y: 546}, {x: 1142, y: 547}, {x: 1142, y: 584}],
            },
            {
                spead: spotSpeed,
                actual: {
                    x: 0,
                    y: 0
                },
                index: 0,
                indexFlage: 0,
                lineCoordinate: [{x: 382, y: 546}, {x: 1367, y: 547}, {x: 1367, y: 584}],
            },
            {
                spead: spotSpeed,
                actual: {
                    x: 0,
                    y: 0
                },
                index: 0,
                indexFlage: 0,
                lineCoordinate: [{x: 382, y: 546}, {x: 1601, y: 547}, {x: 1601, y: 584}],
            }
        ]
    }];
    var middleTopImg = new Image();
    middleTopImg.src = 'images/middleBG.png';
    middleTopImg.onload = function () {
        ctx.drawImage(middleTopImg, 0, 0, mainMTopSize.width, mainMTopSize.height);
        lineTimer = coordinate[0].spead * moveTimer * (coordinate[0].lineCoordinate.length - 1) + coordinate[0].SeparateCoordinate[0].spead * moveTimer * coordinate[0].SeparateCoordinate[0].lineCoordinate.length;
        spotMove(coordinate, function () {
            spotMove(coordinate[0].SeparateCoordinate);
        });
        setInterval(function () {
            spotMove(coordinate, function () {
                spotMove(coordinate[0].SeparateCoordinate);
            });
        }, lineTimer);
    };

    // 点-移动
    function spotMove(data, callback) {
        timer = setInterval(function () {
            ctxBall.beginPath();
            ctxBall.clearRect(0, 0, canvasBall.width, canvasBall.height);
            for (var i = 0; i < data.length; i++) {
                data[i].actual.x += (data[i].lineCoordinate[data[i].index + 1].x - data[i].lineCoordinate[data[i].index].x) / data[i].spead;
                data[i].actual.y += (data[i].lineCoordinate[data[i].index + 1].y - data[i].lineCoordinate[data[i].index].y) / data[i].spead;
                data[i].indexFlage++;
                spot(
                    data[i].lineCoordinate[data[i].index].x + data[i].actual.x,
                    data[i].lineCoordinate[data[i].index].y + data[i].actual.y
                );
                if (data[i].indexFlage >= data[i].spead) {
                    data[i].index++;
                    data[i].indexFlage = 0;
                    data[i].actual.x = 0;
                    data[i].actual.y = 0;
                    if (data[i].index >= data[i].lineCoordinate.length - 1) {
                        data[i].index = 0;
                        clearInterval(timer);
                        ctxBall.clearRect(0, 0, canvasBall.width, canvasBall.height);
                        if (callback) {
                            callback();
                        }
                    }
                }
            }
        }, moveTimer);
    }

    // 点
    function spot(X, Y) {
        ctxBall.beginPath();
        ctxBall.fillStyle = '#00fcff';
        ctxBall.arc(X * proportion.x, Y * proportion.y, 3, 0, Math.PI * 2, false);
        ctxBall.fill();
    }
}

// 人防战备数据中心
function prepareData(dataList, flage) {
    var mainBTLCSize = {
        width: $("#mainBTLCanvas").width(),
        height: $("#mainBTLCanvas").height()
    };
    $("#mainBTLCanvas").append('<canvas id="mainBTLCanvasBG" width="' + mainBTLCSize.width + '" height="' + mainBTLCSize.height + '"></canvas>');
    var canvas = document.getElementById('mainBTLCanvasBG');
    var ctx = canvas.getContext('2d');
    var imagesData = new Image();
    if (flage == '1') {
        imagesData.src = 'images/middleBL.png';
    } else {
        imagesData.src = 'images/middleBLError.png';
        $(".mainMiddleBotLeft").append('<div class="errH2">\n' +
            '                            <i><img src="images/errLog.png" alt=""></i>\n' +
            '                            <span>疏散掩蔽系统遭到口令暴力破解攻击行为</span>\n' +
            '                        </div>');
        $(".errH2").css({
            'top': personFun.getH(340) + "px",
            'left': personFun.getW(60) + "px",
        });
    }
    imagesData.onload = function () {
        ctx.drawImage(imagesData, 0, 0, canvas.width, canvas.height);
        // 左侧顶部
        setFontSize(dataList.title[0], personFun.getW(150), personFun.getH(230), 'center');
        setFontSize(dataList.title[1], personFun.getW(365), personFun.getH(230), 'center');
        setFontSize(dataList.serverLeft[0], personFun.getW(150), personFun.getH(385), 'center');
        setFontSize(dataList.serverLeft[1], personFun.getW(85), personFun.getH(503), 'center');
        setFontSize(dataList.serverLeft[2], personFun.getW(85), personFun.getH(613), 'center');
        setFontSize(dataList.serverLeft[3], personFun.getW(208), personFun.getH(503), 'center');
        setFontSize(dataList.serverLeft[4], personFun.getW(208), personFun.getH(613), 'center');
        if (dataList.serverRight[0].length > 4) {
            setFontSize(dataList.serverRight[0].substr(0, 4), personFun.getW(366), personFun.getH(392), 'center');
            setFontSize(dataList.serverRight[0].substr(4, dataList.serverRight[0].length), personFun.getW(366), personFun.getH(415), 'center');
        } else {
            setFontSize(dataList.serverRight[0], personFun.getW(366), personFun.getH(388), 'center');
        }
        setFontSize(dataList.serverRight[1], personFun.getW(366), personFun.getH(605), 'center');
        setFontSize(dataList.serverList.title, personFun.getW(520), personFun.getH(613), 'center');
        for (var i = 0; i < dataList.serverList.list.length; i++) {
            if (dataList.serverList.list[i].length > 4) {
                setFontSize(dataList.serverList.list[i].substr(0, 4), personFun.getW(616), personFun.getH(230 + i * 58), 'left');
                setFontSize(dataList.serverList.list[i].substr(4, dataList.serverList.list[i].length), personFun.getW(616), personFun.getH(230 + i * 58 + 22), 'left');
            } else {
                setFontSize(dataList.serverList.list[i], personFun.getW(616), personFun.getH(230 + i * 58), 'left');
            }
        }
        // 弹窗
        dom_click();
    };

    function setFontSize(data, X, Y, align) {
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = align;
        ctx.font = personFun.getH(20) + ' 微软雅黑';
        ctx.fillText(data, X, Y);
        ctx.fill();
    }

    // 鼠标经过和点击事件
    function dom_click() {
        $(".mainErrHover").css({
            'top': personFun.getH(330) + "px",
            'left': personFun.getW(19) + "px",
            'width': personFun.getW(246) + "px",
            'height': personFun.getH(352) + "px",
        });
        $(".defense-data").css({
            'top': $(".mainLeft").offset().top - personFun.getH(52) + "px",
            'left': $(".mainLeft").offset().left + "px",
            'width': $(".mainLeft").width() + "px",
            'height': personFun.getH(1330) + "px",
        });
        // $(".hrefDiv").css({
        //     'top': personFun.getH(540) + "px",
        //     'left': personFun.getW(455) + "px",
        //     'width': personFun.getW(170) + "px",
        //     'height': personFun.getH(180) + "px",
        // });
        // $(".hrefDiv").click(function () {
        //     $(".mainRightLeft ul li").eq(0).addClass('mainRightLeftActBg').siblings().removeClass('mainRightLeftActBg');
        //     $(".mainRightRight ul li").eq(0).fadeIn(100).siblings().fadeOut(100);
        // });
        $(".mainErrHover").click(function () {
            $(".defense-data").fadeIn(100);
        });
        $(".mainErrHover").focus(function () {
            $(".mainErrHover").attr('data-focus', 'yes');
        });
        $(".defense-data").focus(function () {
            $(".defense-data").attr('data-focus', 'yes');
        });
        $(".mainErrHover").blur(function () {
            $(".mainErrHover").attr('data-focus', 'no');
        });
        $(".defense-data").blur(function () {
            $(".defense-data").attr('data-focus', 'no');
        });
        $('body').bind('click', function () {
            if ($(".mainErrHover").attr('data-focus') == 'no' && $(".defense-data").attr('data-focus') == 'no') {
                $(".defense-data").fadeOut(100);
            }
        });
    }

}

// 工程
function engineeringModule(flage) {
    if (flage == '0') {
        $(".mainMiddleBotRight ul li").eq(3).addClass('errorqx');
        $(".errorqx").append('<div class="errPop"><img src="images/errLog.png" alt=""></div>');
        $(".errPop").css({
            'width': personFun.getW(40) + "px",
            'top': personFun.getH(56) + "px",
            'left': ($(".mainMiddleBotRight ul li").width() - personFun.getW(40)) * 0.5 + "px",
        });
    }
    $(".gxqzhs").css({
        'top': $(".mainLeft").offset().top - personFun.getH(52) + "px",
        'left': $(".mainLeft").offset().left + "px",
        'width': $(".mainLeft").width() + "px",
        'height': personFun.getH(1330) + "px",
    });
    $(".mainMiddleBotRight ul li").eq(3).click(function () {
        $(".gxqzhs").fadeIn(100);
    });
    $(".mainMiddleBotRight ul li").eq(3).focus(function () {
        $(".mainMiddleBotRight ul li").eq(3).attr('data-focus', 'yes');
    });
    $(".gxqzhs").focus(function () {
        $(".gxqzhs").attr('data-focus', 'yes');
    });
    $(".mainMiddleBotRight ul li").eq(3).blur(function () {
        $(".mainMiddleBotRight ul li").eq(3).attr('data-focus', 'no');
    });
    $(".gxqzhs").blur(function () {
        $(".gxqzhs").attr('data-focus', 'no');
    });
    $('body').bind('click', function () {
        if ($(".mainMiddleBotRight ul li").eq(3).attr('data-focus') == 'no' && $(".gxqzhs").attr('data-focus') == 'no') {
            $(".gxqzhs").fadeOut(100);
        }
    });
}

// right
function securityIncidents() {
    $(".mainRightLeft ul li").each(function (index) {
        $(this).click(function () {
            $(this).addClass('mainRightLeftActBg').siblings().removeClass('mainRightLeftActBg');
            $(".mainRightRight ul li").eq(index).fadeIn(100).siblings().fadeOut(100);
        });
    });
}

// 右侧滚动
var cltTimer=null;
function rightScroll(dataList, flage) {
    $(".mainRightRightCon01Con").html('');
    // 添加html
    var tableTitle = ' <div class="mainRightRightCon01Title">\n' +
        '<h2 style="width: 18.46%;"></h2>\n' +
        '<h2 style="width: 18.75%;"></h2>\n' +
        '<h2 style="width: 24.8%;"></h2>\n' +
        '<h2 style="width: 12.11%;"></h2>\n' +
        '<h2 style="width: 24%;"></h2>\n' +
        '</div>';
    var tableBody = '<div class="mainRightRightCon01Table">' +
        '<table border="0" cellpadding="0" cellspacing="0" class="warningTable" width="100%">' +
        '<tbody></tbody>' +
        '</table>' +
        '</div>';
    $(".mainRightRightCon01Con").append(tableTitle + tableBody);
    // 填充数据
    var degree = null;//程度参数
    for (var i = 0; i < dataList.title.length; i++) {
        $(".mainRightRightCon01Title h2").eq(i).html(dataList.title[i]);
    }
    for (var j = 0; j < dataList.data.length; j++) {
        $(".warningTable tbody").append('<tr>' +
            '<td width="18.46%"><h2></h2></td>\n' +
            '<td width="18.75%"><h2></h2></td>\n' +
            '<td width="24.8%"><h2></h2></td>\n' +
            '<td width="12.2%"><h2></h2></td>\n' +
            '<td width="24%"><h2></h2></td>' +
            '</tr>');
        for (var k = 0; k < dataList.data[j].length - 1; k++) {
            $(".warningTable tbody tr").eq(j).find('td').eq(k).find('h2').html(dataList.data[j][k]);
            if (k == 3) {
                degree = dataList.data[j][dataList.data[j].length - 1].degree;
                if (!degree || degree == 0) {
                    $(".warningTable tbody tr").eq(j).find('td').eq(k).find('h2').addClass('no_warningTableActiveNone');
                } else {
                    $(".warningTable tbody tr").eq(j).find('td').eq(k).find('h2').addClass('no_warningTableActive0' + degree);
                }
            }
        }
    }
    // 加载样式
    personFun.setSize([
        {
            obj: $(".mainRightRightCon01"), val: [1123, 1082, null, null, null, null], callback: function () {
                $(".mainRightRightCon01Con").height($(".mainRightRightCon01").height() - 58);
            }
        },
        {obj: $(".mainRightRightCon01Title h2"), val: [null, 90, 20, 90, null, null]},
        {obj: $(".mainRightRightCon01Table h2"), val: [null, 90, 18, 90, null, null]}
    ]);
    $(".mainRightRightCon01Table").height($(".mainRightRightCon01Con").height() - $(".mainRightRightCon01Title").height());
    $(".mainRightRightCon01Title h2").each(function (index) {
        var _this = this;
        $(".warningTable tbody tr").each(function () {
            $(this).find('td').eq(index).find('h2').width($(_this).width() - 2);
        });
    });

    // 判断警告
    if (flage == '1') {
        $(".warningTable").addClass('no_warningTable');
        no_warningEvt();
    } else {
        $(".warningTable tbody tr").each(function (ide) {
            if (ide % 2 == 1) {
                $(this).addClass('selectTrActive');
            }
        });
    }

    // 有告警
    function no_warningEvt() {
        var createHtml = $(".mainRightRightCon01Table").html();
        var indexItems = parseInt($(".mainRightRightCon01Table").height() / $(".no_warningTable").height());
        if ($(".mainRightRightCon01Table").height() % $(".no_warningTable").height() > 0) {
            indexItems = indexItems + 1;
        }
        indexItems = indexItems + 1;
        indexTable(indexItems, createHtml, 'start', dataList.data.length, indexItems);
        var setSpeed = 0, indexCount = indexItems;
        cltTimer=setInterval(function () {
            if (Math.abs(setSpeed) > $(".no_warningTable").height()) {
                indexCount++;
                setSpeed = 0;
                indexTable(1, createHtml, '0', dataList.data.length, indexCount);
                personFun.setSize([
                    {
                        obj: $(".mainRightRightCon01"), val: [1123, 1082, null, null, null, null], callback: function () {
                            $(".mainRightRightCon01Con").height($(".mainRightRightCon01").height() - 58);
                        }
                    },
                    {obj: $(".mainRightRightCon01Title h2"), val: [null, 90, 20, 90, null, null]},
                    {obj: $(".mainRightRightCon01Table h2"), val: [null, 90, 18, 90, null, null]}
                ]);
            } else {
                $(".mainRightRightCon01Table .no_warningTable").each(function (index) {
                    $(this).css('top', $(".no_warningTable").height() * index + setSpeed + "px");
                });
                setSpeed--;
            }
        }, 50);
    }

    // 判断当前模块可以存放table的个数
    function indexTable(index, html, start, parityIndex, count) {
        var getHtml = '', getObj;
        for (var i = 0; i < index; i++) {
            getHtml += html;
        }
        $(".mainRightRightCon01Table .no_warningTable").eq(0).remove();
        $(".mainRightRightCon01Table").append(getHtml);
        $(".mainRightRightCon01Table .no_warningTable").each(function (index) {
            $(this).css('top', $(".no_warningTable").height() * index + "px");
        });
        // 判断表格的单双行数
        if (parityIndex % 2 == 0) {
            $(".warningTable tbody tr").each(function (ide) {
                if (ide % 2 == 1) {
                    $(this).addClass('selectTrActive');
                }
            });
        } else {
            getObj = $(".mainRightRightCon01Table .no_warningTable");
            if (start == 'start') {
                getObj.each(function (index) {
                    $(this).find("tbody tr").each(function (ide) {
                        if (index % 2 == 0) {
                            if (ide % 2 == 1) {
                                $(this).addClass('selectTrActive');
                            }
                        } else {
                            if (ide % 2 == 0) {
                                $(this).addClass('selectTrActive');
                            }
                        }
                    });
                });
            } else {
                getObj.eq(getObj.length - 1).find("tbody tr").each(function (index) {
                    if (count % 2 == 0) {
                        if (index % 2 == 0) {
                            $(this).addClass('selectTrActive');
                        }
                    } else {
                        if (index % 2 == 1) {
                            $(this).addClass('selectTrActive');
                        }
                    }
                });
            }
        }
    }
}

// 右侧的模板
function tableTemplate(dataList, flage) {
    $(".mainRightRightCon01Con").html('');
    // 添加html
    var tableTitle = ' <div class="mainRightRightCon01Title">\n' +
        '<h2 style="width: 18.46%;"></h2>\n' +
        '<h2 style="width: 18.75%;"></h2>\n' +
        '<h2 style="width: 24.8%;"></h2>\n' +
        '<h2 style="width: 12.11%;"></h2>\n' +
        '<h2 style="width: 24%;"></h2>\n' +
        '</div>';
    var tableBody = '<div class="mainRightRightCon01Table">' +
        '<table border="0" cellpadding="0" cellspacing="0" class="warningTable" width="100%">' +
        '<tbody></tbody>' +
        '</table>' +
        '</div>';
    $(".mainRightRightCon01Con").append(tableTitle + tableBody);
    // 填充数据
    var degree = null;//程度参数
    for (var i = 0; i < dataList.title.length; i++) {
        $(".mainRightRightCon01Title h2").eq(i).html(dataList.title[i]);
    }
    for (var j = 0; j < dataList.data.length; j++) {
        $(".warningTable tbody").append('<tr>' +
            '<td width="18.46%"><h2></h2></td>\n' +
            '<td width="18.75%"><h2></h2></td>\n' +
            '<td width="24.8%"><h2></h2></td>\n' +
            '<td width="12.2%"><h2></h2></td>\n' +
            '<td width="24%"><h2></h2></td>' +
            '</tr>');
        for (var k = 0; k < dataList.data[j].length - 1; k++) {
            $(".warningTable tbody tr").eq(j).find('td').eq(k).find('h2').html(dataList.data[j][k]);
            if (k == 3) {
                degree = dataList.data[j][dataList.data[j].length - 1].degree;
                if (!degree || degree == 0) {
                    $(".warningTable tbody tr").eq(j).find('td').eq(k).find('h2').addClass('no_warningTableActiveNone');
                } else {
                    $(".warningTable tbody tr").eq(j).find('td').eq(k).find('h2').addClass('no_warningTableActive0' + degree);
                }
            }
        }
    }
    // 加载样式
    personFun.setSize([
        {
            obj: $(".mainRightRightCon01"), val: [1123, 1082, null, null, null, null], callback: function () {
                $(".mainRightRightCon01Con").height($(".mainRightRightCon01").height() - 58);
            }
        },
        {obj: $(".mainRightRightCon01Title h2"), val: [null, 90, 20, 90, null, null]},
        {obj: $(".mainRightRightCon01Table h2"), val: [null, 90, 18, 90, null, null]}
    ]);
    $(".mainRightRightCon01Table").height($(".mainRightRightCon01Con").height() - $(".mainRightRightCon01Title").height());
    $(".mainRightRightCon01Title h2").each(function (index) {
        var _this = this;
        $(".warningTable tbody tr").each(function () {
            $(this).find('td').eq(index).find('h2').width($(_this).width() - 2);
        });
    });
    // 奇偶行数
    $(".warningTable tbody tr").each(function (ide) {
        if (ide % 2 == 1) {
            $(this).addClass('selectTrActive');
        }
    });
    if (flage == '1') {
        $(".warningTable").addClass('no_warningTable');
    }
}

// 服务器弹窗
function serverPop() {
    $(".defenseError").find('h2 img').attr('src', 'images/defenseItems_hover.png');
    $(".defense-data-itmesBtnR").css({
        'left': $(".defense-data-itmesCon ul").offset().left + $(".defense-data-itmesCon ul").width() - 2 + "px"
    });
}

// 弹窗警告
function popWarning(dataList, flage) {
    // $(".defenseError").find('h2 img').attr('src', 'images/defenseItems_hover.png');
    // $(".defense-data .defense-data-itmes").each(function () {
    //     $(this).find('ul li').each(function () {
    //         $(this).click(function () {
    //             $(".mainRightLeft ul li").eq(0).addClass('mainRightLeftActBg').siblings().removeClass('mainRightLeftActBg');
    //             $(".mainRightRight ul li").eq(0).fadeIn(100).siblings().fadeOut(100);
    //             if (callback) {
    //                 callback(function (data) {
    //                     console.log(data);
    //                 });
    //             }
    //         });
    //     });
    // });
    clearInterval(cltTimer)
    tableTemplate(dataList, flage);
}