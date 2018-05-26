// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    gameSetting: cc.Node = null;

    @property(cc.Node)
    pauseMenu: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {
        this.pauseMenu.active = false;
    }

    update (dt) {}

    gameOver () {
        this.node.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
            cc.director.loadScene("GameOver");
        })));
    }

    onPauseBtnClicked () {
        this.pauseMenu.active = true;
        cc.director.pause();
    }

    onResumeBtnClicked () {
        cc.director.resume();
        this.pauseMenu.active = false;
    }

    onReplayBtnClicked () {
        cc.director.resume();
        cc.director.loadScene("InGame");
    }

    onMainMenuBtnClicked () {
        cc.director.resume();
        cc.director.loadScene("GameStart");
    }

    onExitBtnClicked () {
        cc.director.resume();
        cc.game.end();
    }
}
