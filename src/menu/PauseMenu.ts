import Ground from "../environment/Ground";
import ListMenu from "./ListMenu";
import MainMenu from "./MainMenu";
import MenuOption from "./MenuOption";

export default class PauseMenu extends ListMenu {
  cameraController: undefined;

  makeOptions() {
    return [
      new MenuOption("Continue", 20, 180, () => this.unPause()),
      new MenuOption("Quit", 20, 280, () => this.toMainMenu())
    ];
  }

  cancel() {
    this.unPause();
  }

  unPause() {
    this.game.unpause();
    this.destroy();
  }

  toMainMenu() {
    this.game.togglePause();
    this.game.removeAll(); // TODO: maybe we can do better?
    this.game.addEntity(new Ground());
    this.game.addEntity(new MainMenu());
    this.destroy();
  }
}
