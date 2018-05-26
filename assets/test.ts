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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        //var act4 = cc.scaleBy(1,1.2);
        //var act5 = cc.scaleBy(1,5/6);
        //this.node.runAction(cc.repeatForever(cc.sequence(act1,act2)));
        var act1 = cc.moveTo(1,this.node.x,this.node.y + 10);
        var act2 = cc.moveTo(1,this.node.x,this.node.y - 8);
        var act3 = cc.moveTo(0.2,this.node.x,this.node.y - 5)
        this.node.runAction(cc.repeatForever(cc.sequence(act1,act2,cc.delayTime(0.2))));
    }

    // update (dt) {}
}
