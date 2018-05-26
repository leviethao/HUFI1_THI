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

    prevEntityPosY: number; 

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.pauseMenu.active = false;
    }

    start () {
        this.spawnEntity(200);
    }

    update (dt) {
        if (this.prevEntityPosY - this.camera.y <= this.node.height / 2) {
            this.spawnEntity(this.prevEntityPosY + this.node.height / 2);
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

        entity.position = new cc.Vec2(0, yPos);
        this.prevEntityPosY = entity.y;
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

        switch (entity.name) {
            case "SimpleEntity": {
                let entityItem = entity.getChildByName("Item");
                if (playerRightItem.x - playerRightItem.width / 2 < entityItem.width / 2) {
                    return entityItem.width / 2 - (playerRightItem.x - playerRightItem.width / 2);
                }
            } break;
            case "CoupleEntity" : {

            } break;
        }
    }
}