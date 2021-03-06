import AIRacerController from "../racer/AIRacerController";
import ListMenu from "./ListMenu";
import MainMenu from "./MainMenu";
import MenuOption from "./MenuOption";
import PauseController from "../core/PauseController";
import PlayerRacerController from "../racer/PlayerRacerController";
import Race from "../race/Race";
import RaceCameraController from "../race/RaceCameraController";
import Racer from "../racer/Racer";
import { Vector } from "../core/Vector";
import { Anakin } from "../racer/RacerDefs/index";
import PlayerSoundController from "../sound/PlayerSoundController";

export default class NewGameMenu extends ListMenu {
  makeOptions() {
    return [
      new MenuOption("Free Play", 20, 180, () => this.startFreePlay()),
      new MenuOption("Race", 20, 280, () => this.startRace()),
      new MenuOption("Back", 20, 380, () => this.cancel()),
    ];
  }

  startRace() {
    this.game.addEntity(new PauseController());
    const race = new Race();
    const racer = new Racer([5, 5] as Vector);
    const racer2 = new Racer([0, 5] as Vector);
    const racer3 = new Racer([-5, 5] as Vector);
    const racer4 = new Racer([5, -5] as Vector);
    //const racer3 = new Racer([-5, 5] as Vector);

    this.game.addEntity(racer);
    this.game.addEntity(racer2);
    this.game.addEntity(racer3);
    this.game.addEntity(racer4);
    //this.game.addEntity(racer3);
    this.game.addEntity(new PlayerRacerController(racer));
    this.game.addEntity(new AIRacerController(racer2, race));
    this.game.addEntity(new AIRacerController(racer3, race));
    this.game.addEntity(new AIRacerController(racer4, race));
    //this.game.addEntity(new AIRacerController(racer3, race));
    this.game.addEntity(new RaceCameraController(racer, this.game.camera));

    race.addRacer(racer);
    race.addRacer(racer2);
    race.addRacer(racer3);
    race.addRacer(racer4);
    //race.addRacer(racer3);
    race.addWaypoint([0, 0] as Vector, 5);
    race.addWaypoint([250, -250] as Vector, 40);
    race.addWaypoint([400, 0] as Vector, 50);
    race.addWaypoint([250, 250] as Vector, 40);
    race.addWaypoint([-250, -250] as Vector, 40);
    race.addWaypoint([-400, 0] as Vector, 50);
    race.addWaypoint([-250, 250] as Vector, 40);
    this.game.addEntity(race);

    this.destroy();
  }

  startFreePlay() {
    this.game.addEntity(new PauseController());
    const racer = new Racer([0, -4] as Vector, Anakin);

    this.game.addEntity(racer);
    this.game.addEntity(new PlayerRacerController(racer));
    this.game.addEntity(new PlayerSoundController(racer));
    this.game.addEntity(new RaceCameraController(racer, this.game.camera));

    this.destroy();
  }

  cancel() {
    this.game.addEntity(new MainMenu());
    this.destroy();
  }
}
