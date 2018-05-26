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

import CoupleEntity from "./CoupleEntity";
import SimpleEntity from "./SimpleEntity";
import Player from "./Player";
import PrefabDeviation from "./PrefabDeviation";
import PrefabSlow from "./PrefabSlow";
import PrefabDoublePoint from "./PrefabDoublePoint";
import PrefabImmortal from "./PrefabImmortal";


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    gameSetting: cc.Node = null;

    @property(cc.Node)
    pauseMenu: cc.Node = null;

    @property(cc.Prefab)
    simpleEntityPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    coupleEntityPrefab: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Node)
    camera: cc.Node = null;
     @property(cc.Prefab)
    PrefabDeviation: cc.Prefab = null;
    @property(cc.Prefab)
    PrefabSlow: cc.Prefab = null;
    @property(cc.Prefab)
    PrefabDoublePoint: cc.Prefab = null;
    @property(cc.Prefab)
    PrefabImmortal: cc.Prefab = null;
    prevEntityPosY: number; 
    delay: number;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.pauseMenu.active = false;
    }

    start () {
        this.spawnEntity(200);
        this.delay=0;
    }

    update (dt) {
        if (this.prevEntityPosY - this.camera.y <= this.node.height / 2) {
            this.spawnEntity(this.prevEntityPosY + this.node.height / 2);
        }
        this.delay=this.delay+dt;
        if(this.delay>2)
        {
            this.delay=0;
            this.spawmCN();
        }
    }

    spawnEntity (yPos: number) {
        let entityPrefab: cc.Prefab = null;
        let count = 2;
        let rand = Math.floor(Math.random() * count) + 1;
        let entityComponent: string = "";

        switch (rand) {
            case 1: {
                entityPrefab = this.simpleEntityPrefab;
                entityComponent = "SimpleEntity";
            } break;
            case 2: {
                entityPrefab = this.coupleEntityPrefab;
                entityComponent = "CoupleEntity";
            } break;
        }

        let entity = cc.instantiate(entityPrefab);
        this.node.addChild(entity);
        entity.getComponent(entityComponent).canvasNode = this.node;
        entity.getComponent(entityComponent).init();


        let d2: number = this.computeD2(entity);
        let playerComponent = this.player.getComponent(Player);
        let d1Needed = (d2 * playerComponent.moveSpeed) / playerComponent.shrinkSpeed;
        let maxY = 100;
        let minY = 50;
        let randY = Math.floor(Math.random() * maxY + minY);
        let d1 = d1Needed + randY;


        entity.position = new cc.Vec2(0, Math.max(yPos, d1));
        this.prevEntityPosY = entity.y;
    }
    spawmCN()
    {
        let random=Math.round(cc.random0To1()*3);
        cc.log("Test random: "+random);
        let CN: cc.Node;
        if(random==0)
        {
            CN = cc.instantiate(this.PrefabDeviation);
            CN.getComponent(PrefabDeviation).canvas =this.node.getComponent(cc.Canvas);
            CN.getComponent(PrefabDeviation).init();
            this.node.addChild(CN);
            
        }
        else if(random==1)
        {
            CN = cc.instantiate(this.PrefabSlow);
            CN.getComponent(PrefabSlow).canvas = this.node.getComponent(cc.Canvas);
            CN.getComponent(PrefabSlow).init();
            this.node.addChild(CN);
        }
        else if(random==2)
        {
            CN = cc.instantiate(this.PrefabDoublePoint);
            CN.getComponent(PrefabDoublePoint).canvas = this.node.getComponent(cc.Canvas);
            CN.getComponent(PrefabDoublePoint).init();
            this.node.addChild(CN);
        }
        else if(random==3)
        {
            CN = cc.instantiate(this.PrefabImmortal);
            CN.getComponent(PrefabImmortal).canvas = this.node.getComponent(cc.Canvas);
            CN.getComponent(PrefabImmortal).init();
            this.node.addChild(CN);
        }

        this.camera.getComponent(cc.Camera).addTarget(CN);
    }
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

    computeD2 (entity: cc.Node) : number {
        let playerRightItem: cc.Node = this.player.getChildByName("RightItem");
        let d2:number = 0;

        switch (entity.name) {
            case "SimpleEntity": {
                let entityItem = entity.getChildByName("Item");
                if (playerRightItem.x - playerRightItem.width / 2 <= entityItem.width / 2) {
                    d2 =  entityItem.width / 2 - (playerRightItem.x - playerRightItem.width / 2);
                } else {
                    d2 = 0;
                }
            } break;
            case "CoupleEntity" : {
                let entityRightItem = entity.getChildByName("RightItem");
                if (playerRightItem.x + playerRightItem.width / 2 >= entityRightItem.x - entityRightItem.width) {
                    d2 = playerRightItem.x + playerRightItem.width / 2 - (entityRightItem.x - entityRightItem.width); 
                }  else {
                    d2 = 0;
                }
            } break;
        }

        return d2;
    }
    

}