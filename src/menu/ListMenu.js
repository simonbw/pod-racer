import * as GamepadAxes from '../core/constants/GamepadAxes';
import * as GamepadButtons from '../core/constants/GamepadButtons';
import * as Keys from '../core/constants/Keys';
import * as Pixi from 'pixi.js';
import Entity from '../core/Entity';
import MenuCameraController from '../MenuCameraController';
import * as Util from '../util/Util';

const DOWN_THRESHOLD = 250;

export default class ListMenu extends Entity {
  constructor() {
    super();
    this.pausable = false;
    this.layer = 'menu';
    this.sprite = new Pixi.Graphics();
  }
  
  onAdd() {
    this.text = new Pixi.Text('Super Pod Racer', {
      fontFamily: 'Arial',
      fontSize: '50px',
      fontWeight: 'bold',
      fill: 0xFFFFFF
    });
    this.sprite.x = 20;
    this.sprite.y = 100;
    this.sprite.addChild(this.text);
    
    this.cameraController = new MenuCameraController();
    this.game.addEntity(this.cameraController);
    this.lastMoveTime = Date.now();
    this.setOptions();
    this.options.forEach((option) => this.game.addEntity(option));
    this.currentOption = 0;
    this.selectOption(0);
  }
  
  setOptions() {
    this.options = [];
  }
  
  onTick() {
    const axis = this.game.io.getAxis(GamepadAxes.LEFT_Y);
    let currentTime;
    if (Math.abs(axis) > 0.3) { // TODO: why 0.3?
      currentTime = Date.now();
    }
    if (currentTime - this.lastMoveTime >= DOWN_THRESHOLD) {
      this.lastMoveTime = currentTime;
      this.selectOption(this.currentOption + Math.sign(axis));
    } else if (Math.abs(axis) < 0.2) {
      this.lastMoveTime = 0;
    }
  }
  
  selectOption(index) {
    index = Util.clamp(index, 0, this.options.length - 1);
    this.options[this.currentOption].unSelect();
    this.options[index].select();
    this.currentOption = index;
  }
  
  cancel() {
    // Override me
  }
  
  onButtonDown(button) {
    switch (button) {
      case GamepadButtons.A:
        this.activateOption();
        break;
      case GamepadButtons.D_UP:
        this.selectOption(this.currentOption - 1);
        break;
      case GamepadButtons.D_DOWN:
        this.selectOption(this.currentOption + 1);
        break;
      case GamepadButtons.B:
        this.cancel();
        break;
    }
  }
  
  onKeyDown(key) {
    switch (key) {
      case Keys.SPACE:
      case Keys.ENTER:
        this.activateOption();
        break;
      case Keys.UP:
        this.selectOption(this.currentOption - 1);
        break;
      case Keys.DOWN:
        this.selectOption(this.currentOption + 1);
        break;
      case Keys.ESCAPE:
        this.cancel();
        break;
    }
  }
  
  activateOption() {
    this.options[this.currentOption].activate();
  }
  
  onDestroy() {
    this.cameraController.destroy();
    this.options.forEach((option) => option.destroy());
  }
}