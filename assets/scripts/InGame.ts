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
import GameSetting from "./GameSetting";


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

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Node)
    street: cc.Node = null;

    prevEntityPosY: number;
    entityList: cc.Node[] = [];
    level: number = 0;
    levelFactor: number = 0;
    score: number = 0;
    moveSpeedFactor: number = 0;
    isStart: boolean = true;



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.pauseMenu.active = false;
        this.levelFactor = this.gameSetting.getComponent(GameSetting).levelFactor;
        this.moveSpeedFactor = this.gameSetting.getComponent(GameSetting).moveSpeedFactor;
    }

    start () {
        this.spawnEntity(this.node.height * 0.7);
    }

    update (dt) {
        this.tutorial();

        if (this.prevEntityPosY - this.camera.y <= this.node.height / 2) {
            this.spawnEntity(this.prevEntityPosY + this.node.height / 2);
        }

        this.levelUp();
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

    gainScore () {
        this.score++;
        this.updateScoreLabel();
    }

    levelUp () {
        if (this.score - (this.level * this.levelFactor) >= this.levelFactor){
            this.level++;
            this.player.getComponent(Player).moveSpeed += this.moveSpeedFactor;
            console.log("AALEVEL: " + this.level);
            console.log("AASPEED: " + this.player.getComponent(Player).moveSpeed);
        }
    }

    updateScoreLabel () {
        this.scoreLabel.string = this.score.toString();
    }

    tutorial () {
        if (this.isStart) {

            this.isStart = false;
        }
    }

}