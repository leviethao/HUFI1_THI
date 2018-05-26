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

    active = true;
    @property(cc.SpriteFrame)
    on: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    off: cc.SpriteFrame = null;

    start () {

    }

    onClick() {
        var sprite = this.getComponent(cc.Sprite);
        var music = this.getComponent(cc.AudioSource);
        if(this.active)
        {
            music.stop();
            sprite.spriteFrame = this.off;
            this.active = false;
        }
        else
        {
            music.play();
            sprite.spriteFrame = this.on;
            this.active = true;
        }
    }
    // update (dt) {}
}
