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
import GameSetting from "./GameSetting";

enum ShrinkStatus {
    None,
    ShrinkBack,
    GrownUp
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Canvas)
    canvas: cc.Canvas = null;

    leftItem: cc.Node = null;
    rightItem: cc.Node = null;
    shrinkSpeed: number = 0;
    shrinkStatus: ShrinkStatus = ShrinkStatus.None;
    shrinkDefault: number;
    moveSpeed: number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
        this.canvas.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
        this.canvas.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
    }

    init () {
        this.leftItem = this.node.getChildByName("LeftItem");
        this.rightItem = this.node.getChildByName("RightItem");

        let gameSetting = this.canvas.getComponent(InGame).gameSetting.getComponent(GameSetting);
        this.shrinkSpeed = gameSetting.shrinkSpeed;
        this.shrinkDefault = gameSetting.shrinkDefault;

        this.leftItem.x = -this.shrinkDefault / 2;
        this.rightItem.x = this.shrinkDefault / 2;

        this.moveSpeed = gameSetting.playerMoveSpeed;
    }

    start () {

    }

    update (dt) {
        this.grownUp(dt);
        this.shrinkBack(dt);
        
        this.node.y += this.moveSpeed * dt;
    }

    onTouchStart () {
        this.shrinkStatus = ShrinkStatus.GrownUp;
    }

    onTouchMove () {

    }

    onTouchEnd () {
        this.shrinkStatus = ShrinkStatus.ShrinkBack;
    }

    grownUp (dt: number) {
        if (this.shrinkStatus != ShrinkStatus.GrownUp) {
            return;
        }

        if (Math.abs(this.leftItem.x) + Math.abs(this.rightItem.x) >= this.canvas.node.width - this.leftItem.width) {
            return;
        }

        this.leftItem.x -= this.shrinkSpeed * dt;
        this.rightItem.x += this.shrinkSpeed * dt;
    }

    shrinkBack (dt: number) {
        if (this.shrinkStatus != ShrinkStatus.ShrinkBack) {
            return;
        }

        if (Math.abs(this.leftItem.x) + Math.abs(this.rightItem.x) <= this.leftItem.width + 4) {
            return;
        }

        this.leftItem.x += this.shrinkSpeed * dt;
        this.rightItem.x -= this.shrinkSpeed * dt;
    }
}
