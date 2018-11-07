var curImageIdx, SM, StM, ImagesCount = 4,
    Images = {
        panorama: [],
        x: new Image
    },
    loadedResources = 0,
    dy = .2,
    Distance = [1, 2, 3, 4, 5, 6, 8, 12, 16, 20],
    WeaponString = [],
    ResizedImage = function(t, a, e, n, i, s, c, h, o) {
        this.ix = a, this.iy = e, this.iw = n, this.ih = i, this.x = s, this.y = c, this.w = h, this.h = o, this.image = t, this.draw = function() {
            ctx.drawImage(this.image, this.ix, this.iy, this.iw, this.ih, this.x, this.y, this.w, this.h)
        }
    },
    ColorButton = function(t, a, e, n, i, s, c, h) {
        this.x = t, this.y = a, this.w = e, this.h = n, this.color = i, this.overColor = s, this.text = c, this.isHovering = !1, this.doing = h, this.onMouseOver = function(t) {
            t.X > this.x && t.X < this.x + this.w && t.Y > this.y && t.Y < this.y + this.h ? this.isHovering = !0 : this.isHovering = !1
        }, this.onMouseDown = function(t) {
            t.X > this.x && t.X < this.x + this.w && t.Y > this.y && t.Y < this.y + this.h && this.doing()
        }, this.draw = function() {
            this.isHovering ? ctx.fillStyle = this.overColor : ctx.fillStyle = this.color, ctx.fillRect(this.x, this.y, this.w, this.h), ctx.lineWidth = canvas.height / 120, ctx.strokeStyle = "black", ctx.strokeRect(t, a, e, n), ctx.font = canvas.height / 13.5 + "px Hanna", ctx.measureText(this.text).width > this.w && (ctx.font = canvas.height / 13.5 / ctx.measureText(this.text).width * this.w * .9 + "px Hanna"), ctx.fillStyle = "black", ctx.fillText(this.text, t + e / 2, a + n / 2)
        }
    },
    ImageButton = function(t, a, e, n, i, s, c) {
        this.x = t, this.y = a, this.w = e, this.h = n, this.rsimage = i, this.text = s, this.isHovering = !1, this.doing = c, this.onMouseOver = function(t) {
            t.X > this.x && t.X < this.x + this.w && t.Y > this.y && t.Y < this.y + this.h ? this.isHovering = !0 : this.isHovering = !1
        }, this.onMouseDown = function(t) {
            t.X > this.x && t.X < this.x + this.w && t.Y > this.y && t.Y < this.y + this.h && this.doing()
        }, this.draw = function() {
            this.rsimage.draw(), this.isHovering && (ctx.fillStyle = "rgba(255,255,255,0.5)", ctx.fillRect(this.x, this.y, this.w, this.h)), ctx.fillStyle = "white", ctx.fillText(this.text, t + e / 2, a + n / 2)
        }
    },
    StageManager = function() {
        this.playerAngle = null, this.playerDistance = null, this.playerWeapon = null, this.curDifficulty = null, this.randomMode = !1, this.randomModeStageCount = -1, this.intervalTimer = null, this.timeoutTimer = null, this.timeText = null, this.timerTime = null, this.score = 0, this.stageAngle = null, this.cursor = {
            X: 0,
            Y: 0,
            prevX: 0,
            prevY: 0,
            directionX: 0,
            directionY: 0
        }, this.offset = {
            X: 0,
            Y: 0,
            vx: 0,
            vy: 0
        }, this.init = function() {
            curImageIdx = parseInt(100 * Math.random()) % ImagesCount, this.playerAngle = null, this.playerDistance = null, this.playerWeapon = null, this.curDifficulty = null, this.randomMode = !1, this.randomModeStageCount = -1, this.intervalTimer = null, this.timeoutTimer = null, this.timeText = null, this.timerTime = null, this.score = 0, this.stageAngle = null, this.cursor = {
                X: 0,
                Y: 0,
                prevX: 0,
                prevY: 0,
                directionX: 0,
                directionY: 0
            }, this.offset = {
                X: 0,
                Y: 0,
                vx: 0,
                vy: 0
            }
        }, this.resetPlayer = function() {
            this.playerAngle = null, this.playerDistance = null, this.playerWeapon = null
        }, this.setPlayerAngle = function(t) {
            this.playerAngle = t, this.playerAngle <= 0 && (this.playerAngle += 2 * Math.PI)
        }, this.setScore = function() {
            switch (mode) {
                case 2:
                    var t = Math.abs(getDegreeText(this.stageAngle, !0) - getDegreeText(this.playerAngle, !0));
                    if (t >= 180 && (t = 360 - t), t >= 100) return;
                    this.timerTime <= [10, 6, 8][this.randomModeStageCount % 3] / 5 ? t *= 1 : this.timerTime <= [10, 6, 8][this.randomModeStageCount % 3] / 5 * 2 ? t *= .8 : this.timerTime <= [10, 6, 8][this.randomModeStageCount % 3] / 5 * 3 ? t *= .6 : this.timerTime <= [10, 6, 8][this.randomModeStageCount % 3] / 5 * 4 ? t *= .4 : t *= .2, this.score += 100 - t;
                    break;
                case 3:
                    this.playerDistance == SM.curDistance && (this.score += 20);
                    break;
                case 4:
                    this.playerWeapon == SM.curWeapon && (this.score += 20)
            }
        }, this.next = function(t) {
            switch (curImageIdx = parseInt(100 * Math.random()) % ImagesCount, this.resetPlayer(), SM.next(), this.cursor = {
                X: 0,
                Y: 0,
                prevX: 0,
                prevY: 0,
                directionX: 0,
                directionY: 0
            }, this.offset = {
                X: 0,
                Y: 0,
                vx: 0,
                vy: 0
            }, this.stageAngle = SM.curAngle + Math.PI / 2, this.stageAngle >= 2 * Math.PI && (this.stageAngle -= 2 * Math.PI), this.playerAngle = null, this.intervalTimer = null, this.timeoutTimer = null, this.timeText = null, this.timerTime = null, this.curDifficulty = t, this.curDifficulty) {
                case 0:
                    this.randomMode = !1, this.randomModeStageCount = 0, this.setTimer(15);
                    break;
                case 1:
                    this.randomMode = !1, this.randomModeStageCount = 0, this.setTimer(8);
                    break;
                case 2:
                    this.randomMode = !1, this.randomModeStageCount = 0, this.setTimer(6);
                    break;
                case 4:
                    switch (this.randomMode = !0, this.randomModeStageCount++, this.randomModeStageCount % 3) {
                        case 0:
                            this.setTimer(10);
                            break;
                        case 1:
                            this.setTimer(8);
                            break;
                        case 2:
                            this.setTimer(6)
                    }
            }
            "Kar98K" == SM.curWeapon ? playSoundsByPattern(-1) : playSoundsByPattern(parseInt(10 * Math.random()) % 3)
        }, this.setTimer = function(t) {
            this.timerTime = t, this.timerTime < 10 ? this.timerText = "0" + this.timerTime.toFixed(2) : this.timerText = this.timerTime.toFixed(2), this.intervalTimer = setInterval(function() {
                StM.timerTime -= .01, StM.timerTime < 0 && (StM.timerTime = 0), StM.timerTime < 10 ? StM.timerText = "0" + StM.timerTime.toFixed(2) : StM.timerText = StM.timerTime.toFixed(2), StM.timerTime < 2 && (curPatternInterval && clearInterval(curPatternInterval), curPatternTimeout && clearTimeout(curPatternTimeout))
            }, 10), this.timeoutTimer = setTimeout(function() {
                guessDegree(!1), clearInterval(StM.intervalTimer), clearTimeout(StM.timeoutTimer), SM.heartSounds[0].source.stop()
            }, 1e3 * this.timerTime)
        }, this.setGrade = function() {
            this.score / Setting.TotalScore >= .9 ? this.grade = "S" : this.score / Setting.TotalScore >= .8 ? this.grade = "S" : this.score / Setting.TotalScore >= .7 ? this.grade = "S" : this.score / Setting.TotalScore >= .6 ? this.grade = "S" : this.score / Setting.TotalScore >= .5 ? this.grade = "S" : this.grade = "S"
        }
    },
    buttons = [],
    SoundManager = function() {
        this.d = 0, this.f = 1, this.next = function() {
            this.curWeapon = WeaponString[parseInt(100 * Math.random()) % WeaponString.length], this.curDistance = Distance[parseInt(100 * Math.random()) % 10], this.curAngle = parseInt(100 * Math.random()) % 72 * Math.PI * 2 / 72
        }, this.Sounds = Setting.Sounds, this.reflectionSounds = [], this.localSounds = [], this.whizzSounds = [], this.shotSounds = [], this.heartSounds = [], this.impactSounds = []
    },
    SpatializedSample = function(t) {
        this.isPlaying = !1, loadSounds(this, {
            buffer: "sounds/" + t
        }), this.changeAngle = function(t) {
            console.log(t), this.panner && this.panner.setOrientation(Math.cos(t), -Math.sin(t), 1)
        }, this.play = function(t, a, e) {
            var n = context.createBufferSource();
            n.buffer = this.buffer, n.loop = !!e;
            var i = context.createPanner();
            i.coneOuterGain = .1, i.coneOuterAngle = 360, i.coneInnerAngle = 0, n.connect(i), i.connect(context.destination), this.source = n, this.panner = i, foo = this.panner, context.listener.setPosition(0, 0, 0), this.source.start(0), this.isPlaying = !0;
            var s, c;
            s = .1 * t * Math.cos(curRad + a), c = .1 * t * Math.sin(curRad + a), this.panner.setPosition(2 * s, 2 * c, -.5), this.panner.setOrientation(Math.cos(curRad + a), Math.sin(curRad + a), 1)
        }, this.changePosition = function(t, a) {
            if (this.panner) {
                var e = .1 * t * Math.cos(curRad + a),
                    n = .1 * t * Math.sin(curRad + a);
                this.panner.setPosition(2 * e, 2 * n, -.5), this.panner.setOrientation(Math.cos(curRad + a), Math.sin(curRad + a), 1)
            }
        }, this.stop = function() {
            this.source.stop(0), this.isPlaying = !1
        }
    },
    curRad = 0,
    onResize = function() {
        canvas.width = window.innerWidth, canvas.height = window.innerHeight
    },
    loadResources = function() {
        for (image in Images)
            if ("panorama" == image)
                for (var t = 0; t < ImagesCount; t++) Images[image].push(new Image), Images[image][t].src = "image/" + image + t + ".jpg", Images[image][t].onload = function() {
                    loadedResources++
                };
            else Images[image].src = "image/" + image + ".png", Images[image].onload = function() {
                loadedResources++
            }
    },
    isResourcesLoaded = function() {
        for (image in Images)
            if ("panorama" == image)
                for (var t = 0; t < ImagesCount; t++) Images[image].push(new Image), Images[image][t].src = "image/" + image + t + ".jpg";
            else Images[image].src = "image/" + image + ".png"
    },
    curPatternInterval = null,
    curPatternTimeout = null,
    curPatternTimeDelta = 500,
    playSoundsByPattern = function(t) {
        switch (curPatternInterval && clearInterval(curPatternInterval), curPatternTimeout && clearTimeout(curPatternTimeout), t) {
            case -1:
                curPatternTimeout = setTimeout(function() {
                    playSound(), curPatternInterval = setInterval(function() {
                        playSound()
                    }, 6 * curPatternTimeDelta)
                }, curPatternTimeDelta);
                break;
            case 0:
                curPatternTimeout = setTimeout(function() {
                    playSound(), curPatternInterval = setInterval(function() {
                        playSound()
                    }, 2 * curPatternTimeDelta)
                }, curPatternTimeDelta);
                break;
            case 1:
                curPatternTimeout = setTimeout(function() {
                    playSound(), setTimeout(function() {
                        playSound()
                    }, parseInt(1e3 * Math.random()) % 200 + 140), curPatternInterval = setInterval(function() {
                        playSound(), setTimeout(function() {
                            playSound()
                        }, parseInt(1e3 * Math.random()) % 200 + 140)
                    }, 2 * curPatternTimeDelta)
                }, curPatternTimeDelta);
                break;
            case 2:
                curPatternTimeout = setTimeout(function() {
                    playSound(), setTimeout(function() {
                        playSound()
                    }, parseInt(1e3 * Math.random()) % 50 + 140), setTimeout(function() {
                        playSound()
                    }, 250 + parseInt(1e3 * Math.random()) % 50 + 140), curPatternInterval = setInterval(function() {
                        playSound(), setTimeout(function() {
                            playSound()
                        }, parseInt(1e3 * Math.random()) % 50 + 140), setTimeout(function() {
                            playSound()
                        }, 250 + parseInt(1e3 * Math.random()) % 50 + 140)
                    }, 2 * curPatternTimeDelta)
                }, curPatternTimeDelta)
        }
    },
    playSound = function() {
        setTimeout(function() {
            SM.Sounds[SM.curWeapon][Distance.indexOf(SM.curDistance)].play(1 + Setting.weaponSounds.volumeDistanceRate, SM.curAngle), SM.reflectionSounds[SM.curDistance < 6 ? 0 : 1].play(SM.curDistance * Setting.reflectionSounds.volumeDistanceRate, SM.curAngle)
        }, 25 * SM.curDistance / 340 * 250), (1 == StM.curDifficulty || 2 == StM.curDifficulty || 4 == StM.curDifficulty && StM.randomModeStageCount % 3 >= 1) && (Math.random() <= .5 && setTimeout(function() {
            SM.whizzSounds[parseInt(100 * Math.random()) % SM.whizzSounds.length].play(2 * Math.random() + Setting.whizzSounds.volumeDistance, Math.random() <= .5 ? 0 : Math.PI - curRad)
        }, 25 * SM.curDistance / 900 * 250), Math.random() <= .25 && setTimeout(function() {
            SM.shotSounds[parseInt(100 * Math.random()) % SM.shotSounds.length].play(Setting.shotSounds.volumeDistance, -curRad + Math.PI / 2)
        }, 25 * SM.curDistance / 900 * 250), setTimeout(function() {
            switch (curImageIdx) {
                case 0:
                case 3:
                    SM.impactSounds[3].play(2 * Math.random() + Setting.impactSounds.volumeDistance, SM.curAngle + Math.PI);
                    break;
                case 1:
                    SM.impactSounds[[0, 3][parseInt(10 * Math.random()) % 2]].play(2 * Math.random() + Setting.impactSounds.volumeDistance, SM.curAngle + Math.PI);
                    break;
                case 2:
                    SM.impactSounds[[1, 2, 3][parseInt(10 * Math.random()) % 3]].play(2 * Math.random() + Setting.impactSounds.volumeDistance, SM.curAngle + Math.PI)
            }
        }, 25 * SM.curDistance / 800 * 250))
    },
    playLocalSound = function() {
        SM.localSounds[0].play(10, -curRad + Math.PI / 2)
    };
onResize = function() {
    canvas.width = canvas.parentNode.offsetWidth, canvas.height = .5625 * canvas.parentNode.offsetWidth
};
$(function() {
    for (str in window.canvas = $("canvas")[0], window.ctx = canvas.getContext("2d"), onResize(), canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock, document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock, loadResources(), onmousemove = onMouseMove, onmousedown = onMouseDown, onmouseup = onMouseUp, onkeydown = onKeyDown, onresize = onResize, Setting.Sounds) WeaponString.push(str);
    StM = new StageManager, (SM = new SoundManager).next(), curImageIdx = parseInt(100 * Math.random()) % ImagesCount;
    for (var t = 0; t < 10; t++)
        for (weapon in SM.Sounds) SM.Sounds[weapon].push(new SpatializedSample("Extracted/" + weapon + "/" + (Distance[t] - 1) + ".mp3"));
    SM.reflectionSounds.push(new SpatializedSample("Extracted/Reflection_01.mp3")), SM.reflectionSounds.push(new SpatializedSample("Extracted/Reflection_02.mp3")), SM.localSounds.push(new SpatializedSample("Extracted/AWM.mp3"));
    for (t = 0; t < 6; t++) SM.whizzSounds.push(new SpatializedSample("Extracted/Swish_0" + (t + 1) + ".mp3"));
    for (t = 0; t < 6; t++) SM.shotSounds.push(new SpatializedSample("Extracted/Damage_Male_0" + (t + 1) + ".mp3"));
    SM.heartSounds.push(new SpatializedSample("Extracted/Heart.mp3"));
    for (t = 0; t < 6; t++) SM.impactSounds.push(new SpatializedSample("Extracted/Impact_" + (t + 1) + ".mp3"));
    buttons.push(new ImageButton(canvas.width / 100, canvas.width / 100, canvas.width / 100 * 48.5, canvas.height - canvas.width / 100 * 2, new ResizedImage(Images.panorama[0], 0, 0, canvas.width / 100 * 48.5, canvas.height - canvas.width / 100 * 2, canvas.width / 100, canvas.width / 100, canvas.width / 100 * 48.5, canvas.height - canvas.width / 100 * 2), language.practice_mode, function() {
        mode = 1
    })), buttons.push(new ImageButton(canvas.width / 100 * 50.5, canvas.width / 100, canvas.width / 100 * 48.5, canvas.height - canvas.width / 100 * 2, new ResizedImage(Images.panorama[0], canvas.width / 100 * 247, 0, canvas.width / 100 * 48.5, canvas.height - canvas.width / 100 * 2, canvas.width / 100 * 50.5, canvas.width / 100, canvas.width / 100 * 48.5, canvas.height - canvas.width / 100 * 2), language.rank_mode, function() {
        mode = 2, SM.heartSounds[0].play(Setting.heartSounds.volumeDistance, -curRad + Math.PI / 2, !0), StM.next(4), canvas.requestPointerLock()
    })), buttons.push(new ImageButton(canvas.width / 100, canvas.width / 100, canvas.width / 100 * 32, canvas.height - canvas.width / 100 * 2, new ResizedImage(Images.panorama[0], canvas.width / 100 * 10, 0, canvas.width / 100 * 32, canvas.height - canvas.width / 100 * 2, canvas.width / 100, canvas.width / 100, canvas.width / 100 * 32, canvas.height - canvas.width / 100 * 2), language.beginner, function() {
        mode = 2, SM.heartSounds[0].play(Setting.heartSounds.volumeDistance, -curRad + Math.PI / 2, !0), StM.next(0), canvas.requestPointerLock()
    })), buttons.push(new ImageButton(canvas.width / 100 * 34, canvas.width / 100, canvas.width / 100 * 32, canvas.height - canvas.width / 100 * 2, new ResizedImage(Images.panorama[0], canvas.width / 100 * 180, 0, canvas.width / 100 * 32, canvas.height - canvas.width / 100 * 2, canvas.width / 100 * 34, canvas.width / 100, canvas.width / 100 * 32, canvas.height - canvas.width / 100 * 2), language.intermediate, function() {
        mode = 2, SM.heartSounds[0].play(Setting.heartSounds.volumeDistance, -curRad + Math.PI / 2, !0), StM.next(1), canvas.requestPointerLock()
    })), buttons.push(new ImageButton(canvas.width / 100 * 67, canvas.width / 100, canvas.width / 100 * 32, canvas.height - canvas.width / 100 * 2, new ResizedImage(Images.panorama[0], canvas.width / 100 * 350, 0, canvas.width / 100 * 32, canvas.height - canvas.width / 100 * 2, canvas.width / 100 * 67, canvas.width / 100, canvas.width / 100 * 32, canvas.height - canvas.width / 100 * 2), language.advanced, function() {
        mode = 2, SM.heartSounds[0].play(Setting.heartSounds.volumeDistance, -curRad + Math.PI / 2, !0), StM.next(2), canvas.requestPointerLock()
    })), buttons.push(new ColorButton(canvas.width / 8 * 5.7, canvas.height / 8 * 7 - canvas.height / 48, .275 * canvas.width, .0694 * canvas.width, "white", "gold", language.try_again, function() {
        StM.randomMode && StM.randomModeStageCount == Setting.RankModeStageCount - 1 ? (StM.setGrade(), mode = 6) : (mode = 2, SM.heartSounds[0].play(Setting.heartSounds.volumeDistance, -curRad + Math.PI / 2, !0), StM.next(StM.curDifficulty), canvas.requestPointerLock())
    })), buttons.push(new ColorButton(canvas.width / 80, canvas.height / 8 * 7 - canvas.height / 48, .23 * canvas.width, .0694 * canvas.width, "white", "lime", language.back_to_home, function() {
        StM.init(), mode = 0
    }));
    for (t = 0; t < 4; t++) buttons.push(new ColorButton(canvas.width / 2 - .32965 * canvas.width + .1735 * canvas.width * t, canvas.height / 2 + .0694 * canvas.width, .1388 * canvas.width, .0694 * canvas.width, "rgba(255,255,255,0.5)", "rgba(0,255,0,0.5)", "", function() {
        playLocalSound(), 3 == mode ? (StM.playerDistance = this.text / 25, 1 == StM.curDifficulty || 4 cm== StM.curDifficulty && StM.randomModeStageCount % 3 == 1 ? (clearTimeout(StM.timeoutTimer), clearInterval(StM.intervalTimer), StM.randomMode && StM.setScore(), mode = 5) : (clearTimeout(StM.timeoutTimer), clearInterval(StM.intervalTimer), StM.randomMode && StM.setScore(), genButton(mode = 4))) : 4 == mode && (StM.playerWeapon = this.text, clearTimeout(StM.timeoutTimer), clearInterval(StM.intervalTimer), StM.randomMode && StM.setScore(), mode = 5)
    }));
    buttons.push(new ColorButton(canvas.width / 8 * 5.7, canvas.height / 8 * 7 - canvas.height / 48, .275 * canvas.width, .0694 * canvas.width, "white", "gold", language.register_in_leaderboard, function() {
        mode = 7, showTextBox(!0)
    })), buttons.push(new ColorButton(canvas.width / 2 - .1041 * canvas.width, canvas.height / 2 + canvas.height / 7, .2082 * canvas.width, .0694 * canvas.width, "white", "lime", language.registration, function() {
        isRegistering = !0, showTextBox(!1), $.getJSON("./api/insert.php?encrypted=" + aiofg135($("#nickname")[0].value, StM.score), function(t) {
            if (isRegistering = !1, t.result) isRegistered = !0, setTimeout(function() {
                isRegistered = !1, onmousedown = null, onmouseup = null, location.href = "http://pubggunfire.com/leaderboard.php"
            }, 1500);
            else {
                switch (isRegisterFailed = !0, t.code) {
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                        isRegisterFailed = !0, registerFailedMsg = language.registration_failed;
                    default:
                        registerFailedMsg = t.msg
                }
                setTimeout(function() {
                    isRegisterFailed = !1, showTextBox(!0)
                }, 1500)
            }
        })
    })), draw()
});
var registerFailedMsg = "",
    isRegisterFailed = !1,
    showTextBox = function(t) {
        var a = $("#nickname")[0];
        t ? (a.style.left = parseInt(canvas.offsetLeft) + canvas.width / 2 - canvas.width / 4 + canvas.height / 240 + "px", a.style.top = parseInt(canvas.offsetTop) + canvas.height / 4 + canvas.height / 6 + canvas.height / 240 + "px", a.style.width = canvas.width / 2 - canvas.height / 120 - canvas.height / 240 + "px", a.style.height = canvas.height / 7 - canvas.height / 120 - canvas.height / 240 + "px", a.style.zIndex = 1, a.style.fontFamily = "Hanna", a.style.fontSize = canvas.width / 30 + "px", a.value = "", a.style.backgroundColor = "rgba(0,0,0,0)", a.style.color = "rgba(0,0,0,0)", a.style.textDecoration = "none", a.style.border = "none", a.style.textAlign = "center") : (a.style.left = "-3000px", a.style.top = "-3000px")
    },
    genButton = function(t) {
        for (var a = 7; a < 11; a++) buttons[a].text = "";
        var e;
        switch (t) {
            case 3:
                e = Distance.indexOf(SM.curDistance) < 3 ? parseInt(100 * Math.random()) % (Distance.indexOf(SM.curDistance) + 1) : Distance.indexOf(SM.curDistance) > 6 ? parseInt(100 * Math.random()) % (4 - (Distance.indexOf(SM.curDistance) - 6)) + (Distance.indexOf(SM.curDistance) - 6) : parseInt(100 * Math.random()) % 4;
                for (a = 7; a < 11; a++) buttons[a].text = 25 * Distance[Distance.indexOf(SM.curDistance) - e + (a - 7)];
                break;
            case 4:
                buttons[[7, 8, 9, 10][parseInt(10 * Math.random()) % 4]].text = SM.curWeapon;
                var n = WeaponString.indexOf(SM.curWeapon),
                    i = WeaponString.slice();
                i[n] = i[0], i.shift();
                for (a = 7; a < 11; a++) "" == buttons[a].text && (n = parseInt(10 * Math.random()) % i.length, buttons[a].text = i[n], i[n] = i[0], i.shift())
        }
    },
    mode = -1,
    frame = 0,
    drawLoadingBar = function() {
        drawLoading(language.loading), ctx.fillStyle = "rgb(255,127,39)", ctx.font = .0347 * canvas.width * 1.5 / 2.5 + "px Hanna", ctx.textBaseline = "middle", ctx.textAlign = "center", ctx.fillText(language.loading_msg, canvas.width / 2, canvas.height / 2 + canvas.height / 8), ctx.strokeStyle = "white", ctx.fillStyle = "white", ctx.strokeRect(canvas.width / 2 - canvas.width / 3, canvas.height / 2 + canvas.height / 6, canvas.width / 3 * 2, canvas.height / 12), ctx.fillRect(canvas.width / 2 - canvas.width / 3, canvas.height / 2 + canvas.height / 6, canvas.width / 3 * 2, canvas.height / 12), ctx.fillStyle = "rgb(34,177,76)", ctx.fillRect(canvas.width / 2 - canvas.width / 3, canvas.height / 2 + canvas.height / 6, canvas.width / 3 * 2 * loadedResources / (ImagesCount + 1), canvas.height / 12)
    },
    draw = function() {
        switch (frame++, ctx.fillStyle = "white", ctx.fillRect(0, 0, canvas.width, canvas.height), ctx.font = .0347 * canvas.width * 1.5 + "px Hanna", ctx.textAlign = "center", ctx.textBaseline = "middle", mode) {
            case -1:
                drawLoadingBar(), loadedResources == ImagesCount + 1 && (mode = 0);
                break;
            case 0:
                buttons[0].draw(), buttons[1].draw();
                break;
            case 1:
                buttons[2].draw(), buttons[3].draw(), buttons[4].draw();
                break;
            case 2:
                StM.offset.vx *= .6, StM.offset.vy *= .6, StM.offset.X += StM.offset.vx, StM.offset.Y += StM.offset.vy, StM.offset.Y > canvas.height * dy ? StM.offset.Y = canvas.height * dy : StM.offset.Y < -canvas.height * dy && (StM.offset.Y = -canvas.height * dy), curRad = StM.offset.X / (canvas.height * (1 + 2 * dy) / Images.panorama[curImageIdx].height * Images.panorama[curImageIdx].width) * Math.PI * 2, StM.offset.X >= canvas.height * (1 + 2 * dy) / Images.panorama[curImageIdx].height * Images.panorama[curImageIdx].width ? StM.offset.X -= canvas.height * (1 + 2 * dy) / Images.panorama[curImageIdx].height * Images.panorama[curImageIdx].width : StM.offset.X <= -canvas.height * (1 + 2 * dy) / Images.panorama[curImageIdx].height * Images.panorama[curImageIdx].width && (StM.offset.X += canvas.height * (1 + 2 * dy) / Images.panorama[curImageIdx].height * Images.panorama[curImageIdx].width), drawPanorama(), drawCrossHair(), drawNavigation(), drawTimer();
                break;
            case 3:
            case 4:
                drawPanorama(), ctx.font = .0347 * canvas.width + "px Hanna", ctx.fillStyle = "black", 3 == mode ? ctx.fillText(language.how_far, canvas.width / 2, canvas.height / 2 - 100) : ctx.fillText(language.what_kind_of, canvas.width / 2, canvas.height / 2 - 100), buttons[7].draw(), buttons[8].draw(), buttons[9].draw(), buttons[10].draw();
                break;
            case 5:
                drawResult();
                break;
            case 6:
                drawScoreResult(), buttons[6].draw(), buttons[11].draw();
                break;
            case 7:
                drawScoreResult(), buttons[6].draw(), buttons[11].draw(), drawGetNamePopup(), buttons[12].draw(), isRegisterFailed ? drawLoading(registerFailedMsg, !0) : isRegistered ? drawLoading(language.registration_complete, !0) : isRegistering && drawLoading(language.registering)
        }
        requestAnimationFrame(draw)
    },
    isRegistering = !1,
    isRegistered = !1,
    drawLoading = function(t, a) {
        ctx.fillStyle = "rgba(0,0,0,0.8)", ctx.fillRect(0, 0, canvas.width, canvas.height), ctx.fillStyle = "white", a ? ctx.fillText(t, canvas.width / 2, canvas.height / 2) : frame % 40 < 10 ? ctx.fillText(t, canvas.width / 2, canvas.height / 2) : frame % 40 < 20 ? ctx.fillText(t + ".", canvas.width / 2, canvas.height / 2) : frame % 40 < 30 ? ctx.fillText(t + "..", canvas.width / 2, canvas.height / 2) : ctx.fillText(t + "...", canvas.width / 2, canvas.height / 2)
    },
    drawGetNamePopup = function() {
        ctx.fillStyle = "rgba(0,0,0,0.5)", ctx.fillRect(0, 0, canvas.width, canvas.height), ctx.fillStyle = "white", ctx.fillRect(canvas.width / 6, canvas.height / 6, canvas.width / 3 * 2, canvas.height / 3 * 2), ctx.fillStyle = "black", ctx.font = canvas.width / 40 * .9 + "px Hanna", ctx.fillText(language.create_a_nickname, canvas.width / 2, canvas.height / 4 + canvas.height / 18), ctx.strokeRect(canvas.width / 2 - canvas.width / 4, canvas.height / 4 + canvas.height / 6, canvas.width / 2, canvas.height / 7), ctx.font = canvas.width / 30 + "px Hanna", ctx.fillText($("#nickname")[0].value, canvas.width / 2, canvas.height / 4 + canvas.height / 6 + canvas.height / 14), ctx.drawImage(Images.x, canvas.width / 2 + canvas.width / 3 - canvas.width / 12, canvas.height / 6 + canvas.width / 12 - Images.x.width)
    },
    drawScoreResult = function() {
        ctx.fillStyle = "black", ctx.fillText(language.overall_score, canvas.width / 2, canvas.height / 12), ctx.strokeStyle = "black", ctx.beginPath(), ctx.moveTo(canvas.width / 2 - canvas.width / 3, canvas.height / 8 + 40), ctx.lineTo(canvas.width / 2 + canvas.width / 3, canvas.height / 8 + 40), ctx.lineWidth = canvas.height / 400, ctx.stroke(), ctx.fillStyle = "crimson", ctx.textAlign = "right", ctx.font = canvas.height / 8 + "px Hanna", ctx.fillText(parseInt(StM.score), canvas.width / 2, canvas.height / 3), ctx.fillStyle = "black", ctx.textAlign = "left", ctx.font = canvas.height / 12 + "px Hanna", ctx.fillText(" / " + Setting.TotalScore, canvas.width / 2, canvas.height / 3 + 20), ctx.textAlign = "center", ctx.beginPath(), ctx.lineCap = "round", ctx.lineWidth = 12, ctx.moveTo(canvas.width / 2 - .0694 * canvas.width, canvas.height / 2 + .11798 * canvas.width), ctx.lineTo(canvas.width / 2 + .0694 * canvas.width, canvas.height / 2 + .1041 * canvas.width), ctx.moveTo(canvas.width / 2 - .0694 * canvas.width, canvas.height / 2 + .1041 * canvas.width), ctx.lineTo(canvas.width / 2 + .0694 * canvas.width, canvas.height / 2 + .09022 * canvas.width), ctx.strokeStyle = "crimson", ctx.stroke(), ctx.fillStyle = "crimson", ctx.font = .1388 * canvas.width + "px Hanna", ctx.fillText(StM.grade, canvas.width / 2, canvas.height / 2 + .0347 * canvas.width)
    },
    getDegreeText = function(t, a) {
        var e = t / Math.PI * 180;
        if (e = Math.ceil(e) % 5 == 0 ? Math.ceil(e) : Math.floor(e) % 5 == 0 ? Math.floor(e) : parseInt(e), a) return e;
        switch (e) {
            case 0:
                e = "N";
                break;
            case 45:
                e = "NE";
                break;
            case 90:
                e = "E";
                break;
            case 135:
                e = "SE";
                break;
            case 180:
                e = "S";
                break;
            case 225:
                e = "SW";
                break;
            case 270:
                e = "W";
                break;
            case 315:
                e = "NW";
                break;
            case 360:
                e = "N"
        }
        return e
    },
    drawResult = function() {
        switch (ctx.fillStyle = "black", ctx.fillText(language.result, canvas.width / 2, canvas.height / 12), ctx.strokeStyle = "black", ctx.beginPath(), ctx.moveTo(canvas.width / 2 - canvas.width / 3, canvas.height / 8 + .0278 * canvas.width), ctx.lineTo(canvas.width / 2 + canvas.width / 3, canvas.height / 8 + .0278 * canvas.width), ctx.lineWidth = canvas.height / 400, ctx.stroke(), 4 == StM.curDifficulty ? StM.randomModeStageCount % 3 : StM.curDifficulty) {
            case 0:
                ctx.font = canvas.height / 15 + "px Hanna", ctx.fillStyle = "black", ctx.fillText(language.actual_gunfire, canvas.width / 4 * 3 + canvas.width / 8, canvas.height / 8 * 3.5), ctx.fillStyle = "black", ctx.fillText(language.my_choice, canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 3.5), ctx.font = canvas.height / 10.8 + "px Hanna", ctx.fillStyle = "crimson", ctx.fillText(getDegreeText(StM.stageAngle), canvas.width / 4 * 3 + canvas.width / 8, canvas.height / 8 * 4.5), ctx.fillStyle = "black", StM.playerAngle ? ctx.fillText(getDegreeText(StM.playerAngle), canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 4.5) : ctx.fillText("-", canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 4.5);
                break;
            case 1:
                ctx.font = canvas.height / 15 + "px Hanna", ctx.fillStyle = "black", ctx.fillText(language.actual_gunfire, canvas.width / 4 * 3 + canvas.width / 8, canvas.height / 8 * 3), ctx.fillStyle = "black", ctx.fillText(language.my_choice, canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 3), ctx.font = canvas.height / 10.8 + "px Hanna", ctx.fillStyle = "crimson", ctx.fillText(getDegreeText(StM.stageAngle), canvas.width / 4 * 3 + canvas.width / 8, canvas.height / 8 * 4), ctx.fillStyle = "black", StM.playerAngle ? ctx.fillText(getDegreeText(StM.playerAngle), canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 4) : ctx.fillText("-", canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 4), ctx.fillStyle = "crimson", ctx.fillText(25 * SM.curDistance + " M", canvas.width / 4 * 3 + canvas.width / 8, canvas.height / 8 * 5), ctx.fillStyle = "black", StM.playerDistance ? ctx.fillText(25 * StM.playerDistance + " M", canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 5) : ctx.fillText("-", canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 5);
                break;
            case 2:
                ctx.font = canvas.height / 15 + "px Hanna", ctx.fillStyle = "black", ctx.fillText(language.actual_gunfire, canvas.width / 4 * 3 + canvas.width / 8, canvas.height / 8 * 2.5), ctx.fillStyle = "black", ctx.fillText(language.my_choice, canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 2.5), ctx.font = canvas.height / 10.8 + "px Hanna", ctx.fillStyle = "crimson", ctx.fillText(getDegreeText(StM.stageAngle), canvas.width / 4 * 3 + canvas.width / 8, canvas.height / 8 * 3.5), ctx.fillStyle = "black", StM.playerAngle ? ctx.fillText(getDegreeText(StM.playerAngle), canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 3.5) : ctx.fillText("-", canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 3.5), ctx.fillStyle = "crimson", ctx.fillText(25 * SM.curDistance + " M", canvas.width / 4 * 3 + canvas.width / 8, canvas.height / 8 * 4.5), ctx.fillStyle = "black", StM.playerDistance ? ctx.fillText(25 * StM.playerDistance + " M", canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 4.5) : ctx.fillText("-", canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 4.5), ctx.fillStyle = "crimson", ctx.fillText(SM.curWeapon, canvas.width / 4 * 3 + canvas.width / 8, canvas.height / 8 * 5.5), ctx.fillStyle = "black", StM.playerWeapon ? ctx.fillText(StM.playerWeapon, canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 5.5) : ctx.fillText("-", canvas.width / 4 * 3 - canvas.width / 8, canvas.height / 8 * 5.5)
        }
        ctx.lineCap = "round", StM.playerAngle && (ctx.beginPath(), ctx.strokeStyle = "black", ctx.lineWidth = canvas.height / 120, ctx.moveTo(canvas.width / 4, canvas.height / 2), ctx.lineTo(canvas.width / 4 + canvas.height / 4 * Math.cos(StM.playerAngle - Math.PI / 2), canvas.height / 2 + canvas.height / 4 * Math.sin(StM.playerAngle - Math.PI / 2)), ctx.stroke()), ctx.beginPath(), ctx.strokeStyle = "crimson", ctx.lineWidth = canvas.height / 120, ctx.moveTo(canvas.width / 4, canvas.height / 2), ctx.lineTo(canvas.width / 4 + canvas.height / 4 * Math.cos(StM.stageAngle - Math.PI / 2), canvas.height / 2 + canvas.height / 4 * Math.sin(StM.stageAngle - Math.PI / 2)), ctx.stroke(), ctx.beginPath(), ctx.arc(canvas.width / 4, canvas.height / 2, canvas.height / 4, 0, 2 * Math.PI, !0), ctx.strokeStyle = "black", ctx.lineWidth = canvas.height / 80, ctx.stroke(), StM.playerAngle && (ctx.fillStyle = "white", ctx.fillRect(canvas.width / 4 + canvas.height / 4 * Math.cos(StM.playerAngle - Math.PI / 2) - canvas.height / 18, canvas.height / 2 + canvas.height / 4 * Math.sin(StM.playerAngle - Math.PI / 2) - canvas.height / 32, canvas.height / 9, canvas.height / 16), ctx.lineWidth = canvas.height / 120, ctx.strokeStyle = "black", ctx.strokeRect(canvas.width / 4 + canvas.height / 4 * Math.cos(StM.playerAngle - Math.PI / 2) - canvas.height / 18, canvas.height / 2 + canvas.height / 4 * Math.sin(StM.playerAngle - Math.PI / 2) - canvas.height / 32, canvas.height / 9, canvas.height / 16), ctx.fillStyle = "black", ctx.font = canvas.height / 27 + "px Hanna", ctx.fillText(getDegreeText(StM.playerAngle), canvas.width / 4 + canvas.height / 4 * Math.cos(StM.playerAngle - Math.PI / 2), canvas.height / 2 + canvas.height / 4 * Math.sin(StM.playerAngle - Math.PI / 2))), ctx.fillStyle = "white", ctx.fillRect(canvas.width / 4 + canvas.height / 4 * Math.cos(StM.stageAngle - Math.PI / 2) - canvas.height / 18, canvas.height / 2 + canvas.height / 4 * Math.sin(StM.stageAngle - Math.PI / 2) - canvas.height / 32, canvas.height / 9, canvas.height / 16), ctx.lineWidth = canvas.height / 120, ctx.strokeStyle = "crimson", ctx.strokeRect(canvas.width / 4 + canvas.height / 4 * Math.cos(StM.stageAngle - Math.PI / 2) - canvas.height / 18, canvas.height / 2 + canvas.height / 4 * Math.sin(StM.stageAngle - Math.PI / 2) - canvas.height / 32, canvas.height / 9, canvas.height / 16), ctx.fillStyle = "crimson", ctx.font = canvas.height / 27 + "px Hanna", ctx.fillText(getDegreeText(StM.stageAngle), canvas.width / 4 + canvas.height / 4 * Math.cos(StM.stageAngle - Math.PI / 2), canvas.height / 2 + canvas.height / 4 * Math.sin(StM.stageAngle - Math.PI / 2)), StM.randomMode ? (buttons[5].text = language.next_stage, 14 == StM.randomModeStageCount && (buttons[5].text = language.check_your_score)) : buttons[5].text = language.try_again, buttons[5].draw(), StM.randomMode && 14 == StM.randomModeStageCount || buttons[6].draw()
    },
    drawPanorama = function() {
        ctx.drawImage(Images.panorama[curImageIdx], canvas.width / 2 - Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy) / 2 + StM.offset.X, -canvas.height * dy + StM.offset.Y, Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy), canvas.height * (1 + 2 * dy)), StM.offset.X > 0 ? ctx.drawImage(Images.panorama[curImageIdx], canvas.width / 2 - Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy) / 2 * 3 + StM.offset.X, -canvas.height * dy + StM.offset.Y, Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy), canvas.height * (1 + 2 * dy)) : ctx.drawImage(Images.panorama[curImageIdx], canvas.width / 2 + Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy) / 2 + StM.offset.X, -canvas.height * dy + StM.offset.Y, Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy), canvas.height * (1 + 2 * dy))
    },
    drawNavigation = function() {
        ctx.beginPath(), ctx.moveTo(canvas.width / 2, 37.5), ctx.lineTo(canvas.width / 2 - 5, 25), ctx.lineTo(canvas.width / 2 + 5, 25), ctx.lineTo(canvas.width / 2, 37.5), ctx.fillStyle = "white", ctx.fill(), ctx.save(), ctx.rect(canvas.width / 2 - 245, 40, 490, 45), ctx.clip();
        for (var t = -36; t <= 36; t++) {
            var a = 15 * t < 0 ? 15 * t + 360 < 0 ? 15 * t + 720 : 15 * t + 360 : 15 * t;
            if (ctx.beginPath(), t % 3 == 0) switch (ctx.moveTo(canvas.width / 2 + 35 * t + StM.offset.X / (Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy)) * 24 * 35, 42.5), ctx.lineTo(canvas.width / 2 + 35 * t + StM.offset.X / (Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy)) * 24 * 35, 55), ctx.lineWidth = 2, a) {
                case 0:
                    a = "N";
                    break;
                case 45:
                    a = "NE";
                    break;
                case 90:
                    a = "E";
                    break;
                case 135:
                    a = "SE";
                    break;
                case 180:
                    a = "S";
                    break;
                case 225:
                    a = "SW";
                    break;
                case 270:
                    a = "W";
                    break;
                case 315:
                    a = "NW"
            } else ctx.moveTo(canvas.width / 2 + 35 * t + StM.offset.X / (Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy)) * 24 * 35, 45), ctx.lineTo(canvas.width / 2 + 35 * t + StM.offset.X / (Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy)) * 24 * 35, 52.5), ctx.lineWidth = 1;
            ctx.strokeStyle = "white", ctx.stroke(), ctx.textAlign = "center", ctx.textBaseline = "middle", ctx.font = "12px Verdana san-serif", ctx.fillText(a, canvas.width / 2 + 35 * t + StM.offset.X / (Images.panorama[curImageIdx].width / Images.panorama[curImageIdx].height * canvas.height * (1 + 2 * dy)) * 24 * 35, 67.5)
        }
        ctx.restore()
    },
    drawCrossHair = function() {
        ctx.beginPath(), ctx.moveTo(canvas.width / 2 - 2.5, canvas.height / 2), ctx.lineTo(canvas.width / 2 - 15, canvas.height / 2), ctx.moveTo(canvas.width / 2 + 2.5, canvas.height / 2), ctx.lineTo(canvas.width / 2 + 15, canvas.height / 2), ctx.moveTo(canvas.width / 2, canvas.height / 2 - 2.5), ctx.lineTo(canvas.width / 2, canvas.height / 2 - 15), ctx.moveTo(canvas.width / 2, canvas.height / 2 + 2.5), ctx.lineTo(canvas.width / 2, canvas.height / 2 + 15), ctx.lineWidth = 2, ctx.strokeStyle = "white", ctx.stroke()
    },
    drawTimer = function() {
        StM.timerTime < 3 ? ctx.fillStyle = "red" : ctx.fillStyle = "white", ctx.font = .02083 * canvas.width + "px Hanna", ctx.fillText(StM.timerText, canvas.width - .0694 * canvas.width, .0347 * canvas.width)
    },
    guessDegree = function(t) {
        curPatternInterval && clearInterval(curPatternInterval), curPatternTimeout && clearTimeout(curPatternTimeout), t && (playLocalSound(), StM.setPlayerAngle(-curRad)), document.exitPointerLock(), 0 == StM.curDifficulty || 4 == StM.curDifficulty && StM.randomModeStageCount % 3 == 0 ? (clearTimeout(StM.timeoutTimer), clearInterval(StM.intervalTimer), StM.randomMode && StM.setScore(), mode = 5) : (clearTimeout(StM.timeoutTimer), clearInterval(StM.intervalTimer), StM.randomMode && StM.setScore(), genButton(mode = 3))
    },
    onMouseDown = function(t) {
        var a = {
            X: t.pageX - canvas.offsetLeft,
            Y: t.pageY - canvas.offsetTop
        };
        switch (mode) {
            case 0:
                buttons[0].onMouseDown(a), buttons[1].onMouseDown(a);
                break;
            case 1:
                buttons[2].onMouseDown(a), buttons[3].onMouseDown(a), buttons[4].onMouseDown(a);
                break;
            case 2:
                SM.heartSounds[0].source.stop(), guessDegree(!0), clearInterval(StM.intervalTimer), clearTimeout(StM.timeoutTimer);
                break;
            case 3:
            case 4:
                buttons[7].onMouseDown(a), buttons[8].onMouseDown(a), buttons[9].onMouseDown(a), buttons[10].onMouseDown(a);
                break;
            case 5:
                buttons[5].onMouseDown(a), StM.randomMode && 14 == StM.randomModeStageCount || buttons[6].onMouseDown(a);
                break;
            case 6:
                buttons[6].onMouseDown(a), buttons[11].onMouseDown(a);
                break;
            case 7:
                isRegistering && isRegistered && isRegisterFailed || (buttons[12].onMouseDown(a), a.X > canvas.width / 2 + canvas.width / 3 - canvas.width / 12 && a.X < canvas.width / 2 + canvas.width / 3 - canvas.width / 12 + Images.x.width && a.Y > canvas.height / 6 + canvas.width / 12 - Images.x.width && a.Y < canvas.height / 6 + canvas.width / 12 && (mode = 6, showTextBox(!1)))
        }
    },
    onMouseUp = function(t) {
        mode
    },
    onMouseMove = function(t) {
        var a = {
            X: t.pageX - canvas.offsetLeft,
            Y: t.pageY - canvas.offsetTop
        };
        switch (mode) {
            case 0:
                buttons[0].onMouseOver(a), buttons[1].onMouseOver(a);
                break;
            case 1:
                buttons[2].onMouseOver(a), buttons[3].onMouseOver(a), buttons[4].onMouseOver(a);
                break;
            case 2:
                document.pointerLockElement !== canvas && document.mozPointerLockElement !== canvas && document.webkitPointerLockElement !== canvas || (StM.cursor.prevX = StM.cursor.X, StM.cursor.prevY = StM.cursor.Y, StM.cursor.X = t.movementX, StM.cursor.Y = t.movementY, StM.cursor.prevX < 0 && StM.cursor.X < 0 ? StM.cursor.directionX = -1 : StM.cursor.prevX > 0 && StM.cursor.X > 0 && (StM.cursor.directionX = 1), (StM.cursor.directionX < 0 && t.movementX < 200 || StM.cursor.directionX > 0 && t.movementX > -200) && (StM.offset.vx -= t.movementX), StM.cursor.prevY < 0 && StM.cursor.Y < 0 ? StM.cursor.directionY = -1 : StM.cursor.prevY > 0 && StM.cursor.Y > 0 && (StM.cursor.directionY = 1), (StM.cursor.directionY < 0 && t.movementY < 200 || StM.cursor.directionY > 0 && t.movementY > -200) && (StM.offset.vy -= t.movementY));
                for (var e = 0; e < 10; e++) SM.Sounds[SM.curWeapon][e].changePosition(SM.curDistance, SM.curAngle);
                SM.reflectionSounds[0].changePosition(1.5 * SM.curDistance, SM.curAngle), SM.reflectionSounds[1].changePosition(1.5 * SM.curDistance, SM.curAngle);
                break;
            case 3:
            case 4:
                buttons[7].onMouseOver(a), buttons[8].onMouseOver(a), buttons[9].onMouseOver(a), buttons[10].onMouseOver(a);
                break;
            case 5:
                buttons[5].onMouseOver(a), StM.randomMode && 14 == StM.randomModeStageCount || buttons[6].onMouseOver(a);
                break;
            case 6:
                buttons[6].onMouseOver(a), buttons[11].onMouseOver(a);
                break;
            case 7:
                isRegistering && isRegistered && isRegisterFailed || buttons[12].onMouseOver(a)
        }
    },
    onKeyDown = function(t) {
        var a = t.keyCode || t.which;
        switch (mode) {
            case 2:
                switch (a) {
                    case 27:
                        document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas ? document.exitPointerLock() : canvas.requestPointerLock()
                }
        }
    };
