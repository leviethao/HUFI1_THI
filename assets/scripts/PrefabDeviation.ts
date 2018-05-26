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
import Camera from "./Camera";
import Player from "./Player";
@ccclass
export default class NewClass extends cc.Component {
    
    canvas: cc.Canvas=null;
    camera:cc.Node=null;
    onLoad () {
    }
    init()
    {
        this.camera=this.canvas.node.getComponent(InGame).camera.getComponent(Camera).node;
        let random=cc.randomMinus1To1()*(this.canvas.node.width/2-this.node.width);
        this.node.position=this.node.position.add(new cc.Vec2(random,this.camera.y*2));
    }
    start () {

    }

    update (dt) {
    }
}
