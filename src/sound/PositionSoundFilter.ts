import BaseEntity from "../core/BaseEntity";
import * as Util from "../util/Util";
import { Vector } from "../core/Vector";

const MAX_DELAY = 1.0;
const PAN_DISTANCE = 100;
const REF_DISTANCE = 100;
const MAX_FREQUENCY = 22050;

export default class PositionSoundFilter extends BaseEntity {
  position: Vector;
  pan: StereoPannerNode;
  in: AudioNode;
  out: AudioNode;
  gain: GainNode;
  filter: BiquadFilterNode;
  delay: DelayNode;

  onAdd() {
    this.position = [0, 0] as Vector;
    this.in = this.pan = this.game.audio.createStereoPanner();
    this.gain = this.game.audio.createGain();
    this.out = this.game.audio.createGain();
    this.filter = this.game.audio.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.value = MAX_FREQUENCY;
    this.filter.Q.value = 0.3;

    this.delay = this.game.audio.createDelay(MAX_DELAY);
    this.delay.delayTime.value = 0;

    this.pan.connect(this.filter);
    this.filter.connect(this.gain);
    this.gain.connect(this.delay);
    this.delay.connect(this.out);
  }

  onTick() {
    const diff = this.position.sub(this.game.camera.position);
    const distance = diff.magnitude;
    this.gain.gain.value = Util.clamp((REF_DISTANCE / distance) ** 1.2);
    this.pan.pan.value =
      Math.cos(diff.angle) * Util.clamp(distance / PAN_DISTANCE - 0.1);
    this.filter.frequency.value = Util.clamp(
      2 ** 22 / (distance ** 1.4 + 0.1),
      0,
      MAX_FREQUENCY
    );

    // Doppler effect. Needs work
    //delayTime = Math.min(distance / 800, MAX_DELAY);
    //this.delay.delayTime.linearRampToValueAtTime(delayTime, this.game.audio.currentTime + this.game.tickTimestep);
  }
}
