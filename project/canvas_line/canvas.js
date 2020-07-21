function Boob() {
    // canvas
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = document.documentElement.clientWidth
    this.canvas.height = document.documentElement.clientHeight
    // 缓存
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');
    this._canvas.width = document.documentElement.clientWidth
    this._canvas.height = document.documentElement.clientHeight
    // 参数
    this.parameter = {
        r: 2,  //半径
        allSize: 400,//个数
        items: [], //所有的点的集合
        spead: 0.5, //速度
        dir: [1, -1],
        mousemove: null,
        removeRadio: 10,//移除的半径
        radioItems: [],
        lineWidth: 80,//线的长度
        mouseLineWidth:150, //鼠标处的线长
        color:"#eee"
    }
}

Boob.prototype = {
    init: function () { //初始化
        this.drawCanvas()
    },
    drawCanvas: function () {
        // this.cache()
        //初始化生成
        var _this = this
        window.requestAnimationFrame(function () {
            _this.draw()
        })

        document.onmousemove = function (e) {
            _this.parameter.mousemove = [e.clientX, e.clientY]
        }
    },
    cache: function () { //缓存

    },
    draw: function () { //初始化生成
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        var position = {
            x: {
                spead: 0,
                direct: 0
            },
            y: {
                spead: 0,
                direct: 0
            }
        }
        // 点
        this._ctx.beginPath()
        this._ctx.strokeStyle =this.parameter.color
        this._ctx.fillStyle = this.parameter.color
        for (var i = 0; i < this.parameter.allSize; i++) {
            position = this.move(i)
            this._ctx.moveTo(parseInt(position.x.spead) + this.parameter.r, parseInt(position.y.spead))
            this._ctx.arc(parseInt(position.x.spead), parseInt(position.y.spead), this.parameter.r, 0, Math.PI * 2, false)
        }
        this._ctx.stroke()
        this._ctx.fill()
        this._ctx.closePath()
        // 线
        this._ctx.beginPath()
        this._ctx.strokeStyle = this.parameter.color
        for (var j = 0; j < this.parameter.items.length; j++) {
            if (
                this.parameter.mousemove && Math.pow(
                Math.pow(Math.abs(this.parameter.items[j].x.spead - this.parameter.mousemove[0]), 2) +
                Math.pow(Math.abs(this.parameter.items[j].y.spead - this.parameter.mousemove[1]), 2)
                , 0.5) <= this.parameter.mouseLineWidth
            ) {
                this._ctx.moveTo(this.parameter.items[j].x.spead - 0.5, this.parameter.items[j].y.spead - 0.5)
                this._ctx.lineTo(this.parameter.mousemove[0],this.parameter.mousemove[1])
            }
            for (var k = 0; k < this.parameter.items.length; k++) {
                if (
                    Math.pow(
                        Math.pow(Math.abs(this.parameter.items[j].x.spead - this.parameter.items[k].x.spead), 2) +
                        Math.pow(Math.abs(this.parameter.items[j].y.spead - this.parameter.items[k].y.spead), 2)
                        , 0.5) <= this.parameter.lineWidth
                ) {
                    this._ctx.moveTo(this.parameter.items[j].x.spead - 0.5, this.parameter.items[j].y.spead - 0.5)
                    this._ctx.lineTo(this.parameter.items[k].x.spead - 0.5, this.parameter.items[k].y.spead - 0.5)
                }
            }
        }
        this._ctx.stroke()
        this._ctx.closePath()
        this.ctx.drawImage(this._canvas, 0, 0, this.canvas.width, this.canvas.height)
        var _this = this
        window.requestAnimationFrame(function () {
            _this.draw()
        })
    },
    move: function (index) { //移动
        var position = {
            x: {
                spead: null,
                direct: null
            },
            y: {
                spead: null,
                direct: null
            }
        }, _this = this, speadAll = {
            random: null,
            spead: null
        }

        if (this.parameter.items[index]) {
            // X
            if (this.parameter.items[index].x.spead + 1 >= (this._canvas.width - this.parameter.r)) {
                this.parameter.items[index].x.direct = -Math.random() * this.parameter.spead
            }
            if (this.parameter.items[index].x.spead - 1 <= this.parameter.r) {
                this.parameter.items[index].x.direct = Math.random() * this.parameter.spead
            }
            // Y
            if (this.parameter.items[index].y.spead + 1 >= (this._canvas.height - this.parameter.r)) {
                this.parameter.items[index].y.direct = -Math.random() * this.parameter.spead
            }
            if (this.parameter.items[index].y.spead - 1 <= this.parameter.r) {
                this.parameter.items[index].y.direct = Math.random() * this.parameter.spead
            }
            this.parameter.items[index].x.spead = this.parameter.items[index].x.spead + this.parameter.items[index].x.direct
            this.parameter.items[index].y.spead = this.parameter.items[index].y.spead + this.parameter.items[index].y.direct
            position.x.spead = this.parameter.items[index].x.spead
            position.y.spead = this.parameter.items[index].y.spead
        } else {
            position.x.spead = Math.random() * this.canvas.width.toFixed(0)
            position.x.direct = Math.random() * this.parameter.dir[(Math.random() * (this.parameter.dir.length)).toFixed(0)] * this.parameter.spead
            position.y.spead = Math.random() * this.canvas.height.toFixed(0)
            position.y.direct = Math.random() * this.parameter.dir[(Math.random() * (this.parameter.dir.length)).toFixed(0)] * this.parameter.spead
            this.parameter.items.push(position)
        }
        return position
    }
}

var boob = new Boob()
boob.init()