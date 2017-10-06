const temporal = require('temporal');

function init(five, board) {
  const quad = {
    status: 'sleep',
  };

  const lift = { femur: 20 };
  const easeIn = 'inQuad';
  const easeOut = 'outQuad';
  const easeInOut = 'inOutQuad';
  const gait = 1;
  const s = {
    front: {
      coxa: [ 100 - 20 * gait, 100, 100 + 20 * gait ],
      femur: [ 100, 80, 60 ],
      tibia: [60, 45, 30]
    },

    mid: {
      coxa: [ 90 + 15 * gait, 90, 90 - 15 * gait ],
      femur: [ 60, 80, 100 ],
      tibia: [30, 45, 60]
    },

    rear: {
      coxa: [ 100 + 20 * gait, 100, 100 - 20 * gait ],
      femur: [ 100, 80, 60 ],
      tibia: [60, 45, 30]
    }
  };
  const hexa = {
    status: 'sleep'
  };

  hexa.r1c = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 15});
  hexa.r1f = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 14});
  hexa.r1t = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 13});
  hexa.r1 = new five.Servos([hexa.r1c, hexa.r1f, hexa.r1t]);

  hexa.r2c = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 11});
  hexa.r2f = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 10});
  hexa.r2t = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 9});
  hexa.r2 = new five.Servos([hexa.r2c, hexa.r2f, hexa.r2t]);

  hexa.r3c = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 7});
  hexa.r3f = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 6});
  hexa.r3t = new five.Servo({address: 0x41, controller: 'PCA9685', pin: 5});
  hexa.r3 = new five.Servos([hexa.r3c, hexa.r3f, hexa.r3t]);

  hexa.l1c = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 0, invert: true});
  hexa.l1f = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 1, invert: true});
  hexa.l1t = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 2, invert: true});
  hexa.l1 = new five.Servos([hexa.l1c, hexa.l1f, hexa.l1t]);

  hexa.l2c = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 4, invert: true});
  hexa.l2f = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 5, invert: true});
  hexa.l2t = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 6, invert: true});
  hexa.l2 = new five.Servos([hexa.l2c, hexa.l2f, hexa.l2t]);

  hexa.l3c = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 8, invert: true});
  hexa.l3f = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 9, invert: true});
  hexa.l3t = new five.Servo({address: 0x40, controller: 'PCA9685', pin: 10, invert: true});
  hexa.l3 = new five.Servos([hexa.l3c, hexa.l3f, hexa.l3t]);

  hexa.coxa = new five.Servos([hexa.r1c, hexa.l1c, hexa.r2c, hexa.l2c, hexa.r3c, hexa.l3c]);
  hexa.femur = new five.Servos([hexa.r1f, hexa.l1f, hexa.r2f, hexa.l2f, hexa.r3f, hexa.l3f]);
  hexa.tibia = new five.Servos([hexa.r1t, hexa.l1t, hexa.r2t, hexa.l2t, hexa.r3t, hexa.l3t]);

  hexa.joints = new five.Servos([hexa.coxa, hexa.femur, hexa.tibia]);

  hexa.legs = new five.Servos([
    hexa.r1c, hexa.r1f, hexa.r1t,
    hexa.l1c, hexa.l1f, hexa.l1t,
    hexa.r2c, hexa.r2f, hexa.r2t,
    hexa.l2c, hexa.l2f, hexa.l2t,
    hexa.r3c, hexa.r3f, hexa.r3t,
    hexa.l3c, hexa.l3f, hexa.l3t
  ]);

  const legsAnimation = new five.Animation(hexa.legs);

  const stand = {
    target: hexa.joints,
    duration: 500,
    loop: false,
    fps: 100,
    cuePoints: [0, 0.1, 0.3, 0.7, 1.0],
    oncomplete: function oncomplete() {
      hexa.state = 'stand';
    },
    keyFrames: [
      [
        null,
        { degrees: s.front.coxa[1] }
      ],
      [
        null,
        false,
        false,
        {
          degrees: s.front.femur[1],
          easing: easeOut
        },
        {
          degrees: s.front.femur[1],
          easing: easeIn
        }
      ],
      [
        null,
        false, {
        degrees: s.front.tibia[1] + 13
      },
        false, {
        degrees: s.front.tibia[1]
      }
      ]
    ]
  };

  const sleep = {
    duration: 500,
    cuePoints: [0, 0.5, 1.0],
    fps: 100,
    target: hexa.joints,
    oncomplete: function oncomplete() {
      hexa.state = 'sleep';
    },
    keyFrames: [
      [null, false, { degrees: 100, easing: easeOut }],
      [null, { degrees: 60, easing: easeInOut }, { degrees: 120, easing: easeInOut }],
      [null, { degrees: 30, easing: easeInOut }, { step: 0, easing: easeInOut }]
    ]
  };

  const waveRight = {
    duration: 1500,
    cuePoints: [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    target: hexa.r1,
    oncomplete: function oncomplete() {
      hexa.state = 'stand';
    },
    keyFrames: [
      [null, false, { degrees: 120, easing: easeInOut }, false, false, false, false, false, { degrees: 52, easing: easeInOut }, { copyDegrees: 0, easing: easeInOut } ], // r1c
      [null, { step: 55, easing: easeInOut }, false, false, false, false, false, false, { step: -55, easing: easeInOut }, { copyDegrees: 0, easing: easeInOut } ], // r1f
      [null, { degrees: 85, easing: easeInOut }, { degrees: 45, easing: easeInOut }, { step: -15, easing: easeInOut }, { step: 30, easing: easeInOut}, { copyDegrees: 3, easing: easeInOut}, { copyFrame: 4 }, { copyDegrees: 2, easing: easeInOut}, { copyFrame: 1 }, {copyDegrees: 0, easing: easeInOut} ]
    ]
  };

  const waveLeft = {
    duration: 1500,
    cuePoints: [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    target: hexa.l1,
    oncomplete: function oncomplete() {
      hexa.state = 'stand';
    },
    keyFrames: [
      [null, false, { degrees: 120, easing: easeInOut }, false, false, false, false, false, { degrees: 52, easing: easeInOut }, {copyDegrees: 0, easing: easeInOut} ], // l1c
      [null, { step: 55, easing: easeInOut }, false, false, false, false, false, false, { step: -55, easing: easeInOut }, {copyDegrees: 0, easing: easeInOut} ], // l1f
      [null, { degrees: 85, easing: easeInOut }, { degrees: 45, easing: easeInOut }, { step: -15, easing: easeInOut}, { step: 30, easing: easeInOut}, { copyDegrees: 3, easing: easeInOut}, { copyFrame: 4 }, { copyDegrees: 2, easing: easeInOut}, { copyFrame: 1 }, {copyDegrees: 0, easing: easeInOut} ]
    ]
  };

  hexa.walk = function hexaWalk(dir) {
    let a = dir === 'rev' ? 0 : 2,
      b = dir === 'rev' ? 2 : 0;

    legsAnimation.enqueue({
      duration: 1500,
      target: hexa.legs,
      cuePoints: [0, 0.25, 0.5, 0.625, 0.75, 0.875, 1.0],
      loop: true,
      loopback: 0.5,
      fps: 100,
      onstop: function onstop() {
        hexa.stand();
      },
      oncomplete: function oncomplete() {},
      keyFrames: [
        /* r1c, r1f, r1t */
        [ null, null, { degrees: s.front.coxa[a] }, { degrees: s.front.coxa[1]}, {degrees: s.front.coxa[b]}, null, {degrees: s.front.coxa[a]}],
        [ null, { step: lift.femur, easing: easeOut }, { degrees: s.front.femur[a], easing: easeIn}, {degrees: s.front.femur[1]}, {degrees: s.front.femur[b]}, { step: lift.femur, easing: easeOut }, {degrees: s.front.femur[a], easing: easeIn}],
        [ null, { step: lift.tibia, easing: easeOut }, { degrees: s.front.tibia[a], easing: easeIn}, {degrees: s.front.tibia[1]}, {degrees: s.front.tibia[b]}, { step: lift.tibia, easing: easeOut }, {degrees: s.front.tibia[a], easing: easeIn}],

        /* l1c, l1f, l1t */
        [ null, null, { degrees: s.front.coxa[b] }, null, { degrees: s.front.coxa[a]}, {degrees: s.front.coxa[1]}, {degrees: s.front.coxa[b]}],
        [ null, null, { degrees: s.front.femur[b] }, { step: lift.femur, easing: easeOut }, {degrees: s.front.femur[a], easing: easeIn}, {degrees: s.front.femur[1]}, {degrees: s.front.femur[b]}],
        [ null, null, { degrees: s.front.tibia[b] }, { step: lift.tibia, easing: easeOut }, {degrees: s.front.tibia[a], easing: easeIn}, {degrees: s.front.tibia[1]}, {degrees: s.front.tibia[b]}],

        /* r2c, r2f, r2t */
        [ null, null, { degrees: s.rear.coxa[b] }, null, { degrees: s.rear.coxa[a]}, {degrees: s.rear.coxa[1]}, {degrees: s.rear.coxa[b]}],
        [ null, null, { degrees: s.rear.femur[b] }, { step: lift.femur, easing: easeOut }, {degrees: s.rear.femur[a], easing: easeIn}, {degrees: s.rear.femur[1]}, {degrees: s.rear.femur[b]}],
        [ null, null, { degrees: s.mid.tibia[b] }, { step: lift.tibia, easing: easeOut }, {degrees: s.mid.tibia[a], easing: easeIn}, {degrees: s.mid.tibia[1]}, {degrees: s.mid.tibia[b]}],

        /* l2c, l2f, l2t */
        [ null, null, { degrees: s.rear.coxa[a] }, { degrees: s.rear.coxa[1]}, {degrees: s.rear.coxa[b]}, null, {degrees: s.rear.coxa[a]}],
        [ null, { step: lift.femur, easing: easeOut }, { degrees: s.rear.femur[a], easing: easeIn}, {degrees: s.rear.femur[1]}, {degrees: s.rear.femur[b]}, { step: lift.femur, easing: easeOut }, {degrees: s.rear.femur[a], easing: easeIn}],
        [ null, { step: lift.tibia, easing: easeOut }, { degrees: s.mid.tibia[a], easing: easeIn}, {degrees: s.mid.tibia[1]}, {degrees: s.mid.tibia[b]}, { step: lift.tibia, easing: easeOut }, {degrees: s.mid.tibia[a], easing: easeIn}],

        /* r3c, r3f, r3t */
        [ null, null, { degrees: s.front.coxa[a] }, { degrees: s.front.coxa[1]}, {degrees: s.front.coxa[b] }, null, { degrees: s.front.coxa[a] }],
        [ null, { step: lift.femur, easing: easeOut }, { degrees: s.front.femur[a], easing: easeIn }, { degrees: s.front.femur[1] }, { degrees: s.front.femur[b] }, { step: lift.femur, easing: easeOut }, { degrees: s.front.femur[a], easing: easeIn }],
        [ null, { step: lift.tibia, easing: easeOut }, { degrees: s.rear.tibia[a], easing: easeIn }, { degrees: s.rear.tibia[1] }, { degrees: s.rear.tibia[b] }, { step: lift.tibia, easing: easeOut }, { degrees: s.rear.tibia[a], easing: easeIn }],

        /* l3c, l3f, r3t */
        [ null, null, { degrees: s.front.coxa[b] }, null, { degrees: s.front.coxa[a] }, { degrees: s.front.coxa[1] }, { degrees: s.front.coxa[b] }],
        [ null, null, { degrees: s.front.femur[b] }, { step: lift.femur, easing: easeOut }, { degrees: s.front.femur[a], easing: easeIn }, { degrees: s.front.femur[1] }, { degrees: s.front.femur[b] }],
        [ null, null, { degrees: s.rear.tibia[b] }, { step: lift.tibia, easing: easeOut }, { degrees: s.rear.tibia[a], easing: easeIn }, { degrees: s.rear.tibia[1] }, { degrees: s.rear.tibia[b] }]

      ]
    });
    return this;
  };

  hexa.turn = function hexaTurn(dir) {
    let a = dir === 'left' ? 0 : 2,
      b = dir === 'left' ? 2 : 0;

    legsAnimation.enqueue({
      duration: 1500,
      fps: 100,
      cuePoints: [0, 0.25, 0.5, 0.625, 0.75, 0.875, 1.0],
      loop: true,
      loopback: 0.5,
      onstop: function onstop() {
        hexa.att();
      },
      keyFrames: [
        [ null, null, { degrees: s.front.coxa[a] }, null, { degrees: s.front.coxa[b] }, null, { degrees: s.front.coxa[a] }],
        [ null, null, { degrees: s.front.femur[a] }, { step: lift.femur, easing: easeOut }, { degrees: s.front.femur[b] }, null, { degrees: s.front.femur[a] }],

        [ null, null, { degrees: s.front.coxa[a] }, null, { degrees: s.front.coxa[b] }, null, { degrees: s.front.coxa[a] }],
        [ null, { step: lift.femur, easing: easeOut }, { degrees: s.front.femur[a], easing: easeIn}, null, { degrees: s.front.femur[b], easing: easeIn }, { step: lift.femur, easing: easeOut }, { degrees: s.front.femur[a], easing: easeIn }],

        [ null, null, { degrees: s.rear.coxa[b] }, null, { degrees: s.rear.coxa[a] }, null, { degrees: s.rear.coxa[b] }],
        [ null, { step: lift.femur, easing: easeOut }, { degrees: s.rear.femur[b], easing: easeIn}, null, { degrees: s.rear.femur[a], easing: easeIn }, { step: lift.femur, easing: easeOut }, { degrees: s.rear.femur[b], easing: easeIn }],

        [ null, null, { degrees: s.rear.coxa[b] }, null, { degrees: s.rear.coxa[a] }, null, { degrees: s.rear.coxa[b] }],
        [ null, null, { degrees: s.rear.femur[b] }, { step: lift.femur, easing: easeOut }, { degrees: s.rear.femur[a] }, null, {degrees: s.rear.femur[b] }]
      ]
    });
    return this;
  };

  hexa.att = function hexaStand() {
    let grouped,
      work = [
        { name: 'r1', offset: 0, home: s.front.femur[1], thome: s.front.tibia[1], chome: s.front.coxa[1]},
        { name: 'r2', offset: 0, home: s.mid.femur[1], thome: s.mid.tibia[1], chome: s.front.coxa[1] },
        { name: 'r3', offset: 0, home: s.rear.femur[1], thome: s.rear.tibia[1], chome: s.front.coxa[1] },
        { name: 'l1', offset: 0, home: s.front.femur[1], thome: s.front.tibia[1], chome: s.front.coxa[1] },
        { name: 'l2', offset: 0, home: s.mid.femur[1], thome: s.mid.tibia[1], chome: s.front.coxa[1] },
        { name: 'l3', offset: 0, home: s.rear.femur[1], thome: s.rear.tibia[1], chome: s.front.coxa[1] }
      ];

    work.forEach((leg, i) => {
      work[i].offset = Math.abs(hexa[leg.name + 'f'].last.reqDegrees - leg.home);
    });

    if (work[1].offset > work[4].offset) {
      grouped = [
        [0, 2, 4],
        [1, 3, 5]
      ];
    } else {
      grouped = [
        [1, 3, 5],
        [0, 2, 4]
      ];
    }

    grouped.forEach((group, i) => {
      group.forEach((leg) => {
        temporal.queue([{
          delay: 250 * i,
          task: () => {
            hexa[work[leg].name + 'f'].to(work[leg].home + lift.femur);
            hexa[work[leg].name + 't'].to(work[leg].thome + lift.tibia);
          }
        }, {
          delay: 50,
          task: () => {
            hexa[work[leg].name + 'c'].to(work[leg].chome);
          }
        }, {
          delay: 50,
          task: () => {
            hexa[work[leg].name + 'f'].to(work[leg].home);
            hexa[work[leg].name + 't'].to(work[leg].thome);
          }
        }]);
      });
    });
    hexa.state = 'stand';
  };

  hexa.sleep = () => {
    legsAnimation.enqueue(sleep);
  };

  hexa.stand = () => {
    legsAnimation.enqueue(stand);
  };

  hexa.waveLeft = () => {
    legsAnimation.enqueue(waveLeft);
  };

  hexa.waveRight = () => {
    legsAnimation.enqueue(waveRight);
  };

  hexa.stop = () => {
    legsAnimation.stop();
  };

  return hexa;
}

module.exports = { init };
