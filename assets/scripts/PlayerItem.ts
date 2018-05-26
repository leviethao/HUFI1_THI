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
    @property(cc.Canvas)
    canvas: cc.Canvas = null;
    speed:number;
    onLoad () {
       
    }

    start () {
        this.speed=this.canvas.node.getComponent(InGame).player.getComponent(Player).moveSpeed;
    }

    update (dt) {
        
    }

    onCollisionEnter (other, self) {
        // switch (other.tag) {
        //     case 0: 
        //     { 
        //     } break;
        //     case 1: 
        //     { 
        //     } break;
        //     case 2:
        //     {
        //         this.canvas.node.getComponent(InGame).player.getComponent(Player).status=1;
        //         this.canvas.node.getComponent(InGame).player.getComponent(Player).delay=0;
        //     }break;
        //     case 3: 
        //     {  
        //         this.canvas.node.getComponent(InGame).player.getComponent(Player).moveSpeed= this.speed-300;
        //         this.canvas.node.getComponent(InGame).player.getComponent(Player).delay=0;        
        //     } break;
        // }
        if (other.tag == 0)
        {
                 this.canvas.node.getComponent(InGame).player.getComponent(Player).status=1;
                 this.canvas.node.getComponent(InGame).player.getComponent(Player).delay=0;
        }
        else if (other.tag == 1)
        {
                 this.canvas.node.getComponent(InGame).player.getComponent(Player).moveSpeed= this.speed-300;
                 this.canvas.node.getComponent(InGame).player.getComponent(Player).delay=0;      
        }
    }
}
