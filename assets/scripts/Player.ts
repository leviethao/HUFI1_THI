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
    animFlag1: boolean = false;
    animFlag2: boolean = false;
    delay: number = 0;
    status:number=0;//khong bt, 1 bat tu
    // LIFE-CYCLE CALLBACKS:
    savespeed: number;
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
        this.savespeed=this.moveSpeed;
    }

    update (dt) {
        this.grownUp(dt);
        this.shrinkBack(dt);
        
        this.node.y += this.moveSpeed * dt;
        this.delay=this.delay+dt;
        cc.log("Test delay: "+this.delay);
        if(this.delay>5)
        {
            this.moveSpeed=this.savespeed;
            this.status=0;
        }
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
            this.animFlag1 = false;
            return;
        }

        if (Math.abs(this.leftItem.x) + Math.abs(this.rightItem.x) >= this.canvas.node.width - this.leftItem.width) {
            this.animFlag1 = false;
            return;
        }

        this.leftItem.x -= this.shrinkSpeed * dt;
        this.rightItem.x += this.shrinkSpeed * dt;

        if (!this.animFlag1) {
            let anim1State = this.leftItem.getComponent(cc.Animation).play("playerRunToLeft");
            anim1State.wrapMode = cc.WrapMode.Loop;
            let anim2State = this.rightItem.getComponent(cc.Animation).play("playerRunToRight");
            anim2State.wrapMode = cc.WrapMode.Loop;
            this.animFlag1 = true;
        }
        
    }

    shrinkBack (dt: number) {
        if (this.shrinkStatus != ShrinkStatus.ShrinkBack) {
            this.animFlag2 = false;
            return;
        }

        if (Math.abs(this.leftItem.x) + Math.abs(this.rightItem.x) <= this.leftItem.width) {
            this.animFlag2 = false;
            return;
        }

        this.leftItem.x += this.shrinkSpeed * dt;
        this.rightItem.x -= this.shrinkSpeed * dt;
        
        
        if (!this.animFlag2) {
            let anim1State = this.leftItem.getComponent(cc.Animation).play("playerRunToRight");
            anim1State.wrapMode = cc.WrapMode.Loop;
    
            let anim2State = this.rightItem.getComponent(cc.Animation).play("playerRunToLeft");
            anim2State.wrapMode = cc.WrapMode.Loop;
            this.animFlag2 = true;   
        }
    }

}
