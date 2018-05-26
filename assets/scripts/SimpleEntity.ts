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

    canvasNode: cc.Node = null;
    item: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    init () {
        this.canvasNode.getComponent(InGame).camera.getComponent(cc.Camera).addTarget(this.node);
        
        this.item = this.node.getChildByName("Item");

        let randWidth = Math.floor(Math.random() * this.canvasNode.width * 0.7) + this.canvasNode.width / 6;
        this.item.width = randWidth;

        let randHeight = Math.floor(Math.random() * this.canvasNode.height / 2) + this.item.height;
        this.item.height = randHeight;
    }

    start () {

    }

    update (dt) {
        //this.node.y -= 100 * dt;
    }
}
