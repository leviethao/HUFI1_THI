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

import InGame from "./InGame";

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Canvas)
    canvas: cc.Canvas = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    start () {

    }

    // update (dt) {}

    onCollisionEnter (other, self) {
        switch (other.tag) {
            case 0: { //left player
                this.canvas.node.getComponent(InGame).gameOver();
            } break;
            case 1: {//right player
                this.canvas.node.getComponent(InGame).gameOver();
            } break;
            case 2: { //entity
                this.canvas.node.getComponent(InGame).gameOver();
            } break;
        }
    }
}
