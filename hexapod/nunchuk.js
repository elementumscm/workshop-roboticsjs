const hash = require('object-hash');
const charm = require('charm')();

charm.pipe(process.stdout);

class Nunchuk {
  constructor(
    { joystick = true, buttons = true, accelerometer = true, freq = 100 } = {},
  ) {
    this.onChangeCallback = null;
    this.state = {
      // This is our source of truth.
      x: 0, // x-axis [-1, 0, 1]
      y: 0, // y-axis [-1, 0, 1]
      a: 0, // button a [0, 1]
      b: 0, // button b [0, 1]
    };
    this.lastState = {
      // Set from last sensors read.
      x: 0, // x-axis [-1, 0, 1]
      y: 0, // y-axis [-1, 0, 1]
      a: 0, // button a [0, 1]
      b: 0, // button b [0, 1]
    };

    this.scale = {
      x: {
        max: 1112,
        min: 112,
        center: 480,
      },
      y: {
        max: 600,
        min: 40,
        center: 512,
      },
    };

    this.joystick = joystick;
    this.buttons = buttons;
    this.accelerometer = accelerometer;
    this.freq = freq;
    this.debug = !!process.env.DEBUG || false;
  }

  init(five, board) {
    // Create a new `nunchuk` hardware instance.
    this.controller = new five.Wii.Nunchuk({
      freq: 50,
      board,
    });

    this.setEvents();
    this.loop();
    this.hello();

    return this;
  }

  hello() {
    charm.move(0, 1).foreground('blue').write('I know kung fu!');
  }

  loop() {
    this.timer = setInterval(() => {
      if (!this.isStateChange(this.lastState)) return;

      this.state = this.lastState;
      if (typeof this.onChangeCallback !== 'function') return;
      this.onChangeCallback(this.state);
    }, this.freq);
  }

  updateState(event, type) {
    if (this.debug) this.logEvent(event, type);
    this.lastState = this.getStateFromEvent(event, type);
  }

  getStateHash(state) {
    return hash(state);
  }

  isStateChange(state) {
    // Get hashes.
    const hash = this.getStateHash(this.state);
    const newHash = this.getStateHash(state);

    return hash !== newHash;
  }

  setState(state) {
    this.state = state;
  }

  isButtonChange(state) {
    return this.state.a !== state.a || this.state.b !== state.b;
  }

  getButtonName(target) {
    const buttonMap = {
      c: 'a',
      z: 'b',
    };

    const buttonName = buttonMap[target.which] || null;
    return buttonName;
  }

  getDirection(axis, value) {
    if (!axis || !value || axis === 'z') return 0;

    const center = this.scale[axis].center;
    const threshold = 100;
    if (value > center + threshold) return 1;
    if (value < center - threshold) return -1;
    return 0;
  }

  getStateFromEvent(event, type = 'MOVEMENT') {
    const { axis, target } = event;
    const button = this.getButtonName(target);
    const value = parseInt(target[event.axis], 10) || 0;
    const { isUp, isDown } = target;
    const direction = this.getDirection(axis, value);

    let x = this.state.x;
    let y = this.state.y;
    let a = this.state.a;
    let b = this.state.b;
    let newState = { x, y, a, b };

    // There's a bug in johnny-five where some peaks
    // moving on -x throws incorrect values.
    if (axis === 'x') {
      if (value > 1000) return this.lastState;
    }

    // Update button state.
    if (button) {
      newState[button] = type !== 'up' ? 1 : 0;

      // Update button state and return.
      if (this.isButtonChange(newState)) {
        return newState;
      }
    }

    // Update axis and return.
    if (axis) newState[axis] = direction;
    return newState;
  }

  setEvents() {
    // Joystick events.
    if (this.joystick) {
      this.controller.joystick.on('change', event => {
        this.updateState(event);
      });
    }

    // Button events.
    if (this.buttons) {
      const buttons = ['down', 'up', 'hold'];
      buttons.forEach(type => {
        this.controller.on(type, event => {
          this.updateState(event, type);
        });
      });
    }

    // Acceleromoter events.
    if (this.accelerometer) {
      this.controller.accelerometer.on('change', event => {
        this.updateState(event);
      });
    }
  }

  logEvent(event, type = 'MOVEMENT') {
    const { axis, direction, target } = event;
    const button = this.getButtonName(target);
    const value = target[event.axis];
    const { isUp, isDown } = target;

    if (process.env.X) if (axis !== 'x') return;

    console.log(`
      JOYSTICK EVENT:
        - value: ${value}
        - axis: ${axis}
        - direction: ${direction}
        - type: ${type}
        - button: ${button}
        - up: ${isUp}
        - down: ${isDown}
    `);
  }

  onChange(callback) {
    this.onChangeCallback = callback;
  }
}

const nunchuk = new Nunchuk();
module.exports = nunchuk;
