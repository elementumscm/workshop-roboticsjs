const temporal = require('temporal');

function init(five, board) {
  const quad = {
    status: 'sleep'
  };

  const lift = { femur: 0 };
  const easeIn = 'inQuad';
  const easeOut = 'outQuad';
  const gait = 1;
  const s = {
    front: {
      coxa: [ 90 - 30 * gait, 90, 90 + 30 * gait ],
      femur: [ 30, 0, 50 ]
    },

    rear: {
      coxa: [ 90 + 30 * gait, 90, 90 - 30 * gait ],
      femur: [ 50, 0, 30 ]
    }
  };

  // Front Right Leg
  quad.r1c = new five.Servo({ address: 0x40, controller: 'PCA9685', pin: 0, board });
  quad.r1f = new five.Servo({ address: 0x40, controller: 'PCA9685', pin: 1, board, invert:true });
  quad.r1 = new five.Servos([quad.r1c, quad.r1f]);

  // Front Left Leg
  quad.l1c = new five.Servo({ address: 0x40, controller: 'PCA9685', pin: 2, board, invert:true });
  quad.l1f = new five.Servo({ address: 0x40, controller: 'PCA9685', pin: 3, board });
  quad.l1 = new five.Servos([quad.l1c, quad.l1f]);

  // Rear Right Leg
  quad.r2c = new five.Servo({ address: 0x40, controller: 'PCA9685', pin: 4, board, invert: true });
  quad.r2f = new five.Servo({ address: 0x40, controller: 'PCA9685', pin: 5, board, invert: true });
  quad.r2 = new five.Servos([quad.r2c, quad.r2f]);

  //Rear Left Leg
  quad.l2c = new five.Servo({ address: 0x40, controller: 'PCA9685', pin: 6, board });
  quad.l2f = new five.Servo({ address: 0x40, controller: 'PCA9685', pin: 7, board });
  quad.l2 = new five.Servos([quad.l2c, quad.l2f]);

  quad.coxa = new five.Servos([quad.r1c, quad.l1c, quad.r2c, quad.l2c]);
  quad.femurs = new five.Servos([quad.r1f, quad.l1f, quad.r2f, quad.l2f]);

  quad.joints = new five.Servos([quad.coxa, quad.femurs]);

  quad.legs = new five.Servos([
    quad.r1c, quad.r1f,
    quad.l1c, quad.l1f,
    quad.r2c, quad.r2f,
    quad.l2c, quad.l2f
  ]);

  const legsAnimation = new five.Animation(quad.legs);
  const femursAnimation = new five.Animation(quad.femurs);

  const stand = {
    target: quad.joints,
    duration: 500,
    loop: false,
    fps: 100,
    cuePoints: [0, 0.1, 0.3, 0.7, 1.0],
    oncomplete: function oncomplete() {
      quad.state = 'stand';
    },
    keyFrames: [
      [null, { degrees: s.front.coxa[1] }],
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
      ]
    ]
  };

  quad.walk = function quadWalk(dir) {
    let a = dir === 'rev' ? 0 : 2,
      b = dir === 'rev' ? 2 : 0;

    legsAnimation.enqueue({
      duration: 1500,
      cuePoints: [0, 0.25, 0.5, 0.625, 0.75, 0.875, 1.0],
      loop: true,
      loopback: 0.5,
      fps: 100,
      onstop: function onstop() {
        quad.att();
      },
      oncomplete: function oncomplete() {},
      keyFrames: [
        /* r1c, r1f */
        [
          null,
          null,
          { degrees: s.front.coxa[a] },
          { degrees: s.front.coxa[1] },
          { degrees: s.front.coxa[b] },
          null,
          { degrees: s.front.coxa[a] }
        ],
        [
          null,
          { step: lift.femur, easing: easeOut },
          { degrees: s.front.femur[a], easing: easeIn },
          { degrees: s.front.femur[1] },
          { degrees: s.front.femur[b] },
          { step: lift.femur, easing: easeOut },
          { degrees: s.front.femur[a], easing: easeIn },
        ],

        /* l1c, l1f */
        [
          null,
          null,
          { degrees: s.front.coxa[b] },
          null,
          { degrees: s.front.coxa[a] },
          { degrees: s.front.coxa[1] },
          { degrees: s.front.coxa[b] },
        ],
        [
          null,
          null,
          { degrees: s.front.femur[b] },
          { step: lift.femur, easing: easeOut },
          { degrees: s.front.femur[a], easing: easeIn },
          { degrees: s.front.femur[1] },
          { degrees: s.front.femur[b] },
        ],

        /* r2c, r2f */
        [
          null,
          null,
          { degrees: s.rear.coxa[b] },
          null,
          { degrees: s.rear.coxa[a] },
          { degrees: s.rear.coxa[1] },
          { degrees: s.rear.coxa[b] },
        ],
        [
          null,
          null,
          { degrees: s.rear.femur[b] },
          { step: lift.femur, easing: easeOut },
          { degrees: s.rear.femur[a], easing: easeIn },
          { degrees: s.rear.femur[1] },
          { degrees: s.rear.femur[b] },
        ],

        /* l2c, l2f */
        [
          null,
          null,
          { degrees: s.rear.coxa[a] },
          { degrees: s.rear.coxa[1] },
          { degrees: s.rear.coxa[b] },
          null,
          { degrees: s.rear.coxa[a] },
        ],
        [
          null,
          { step: lift.femur, easing: easeOut },
          { degrees: s.rear.femur[a], easing: easeIn },
          { degrees: s.rear.femur[1] },
          { degrees: s.rear.femur[b] },
          { step: lift.femur, easing: easeOut },
          { degrees: s.rear.femur[a], easing: easeIn },
        ],
      ],
    });
  };

  quad.turn = function quadTurn(dir) {
    let a = dir === 'left' ? 0 : 2,
      b = dir === 'left' ? 2 : 0;

    legsAnimation.enqueue({
      duration: 1500,
      fps: 100,
      cuePoints: [0, 0.25, 0.5, 0.625, 0.75, 0.875, 1.0],
      loop: true,
      loopback: 0.5,
      onstop: function onstop() {
        quad.att();
      },
      keyFrames: [
        [
          null,
          null,
          { degrees: s.front.coxa[a] },
          null,
          { degrees: s.front.coxa[b] },
          null,
          { degrees: s.front.coxa[a] },
        ],
        [
          null,
          null,
          { degrees: s.front.femur[a] },
          { step: lift.femur, easing: easeOut },
          { degrees: s.front.femur[b] },
          null,
          { degrees: s.front.femur[a] },
        ],

        [
          null,
          null,
          { degrees: s.front.coxa[a] },
          null,
          { degrees: s.front.coxa[b] },
          null,
          { degrees: s.front.coxa[a] },
        ],
        [
          null,
          { step: lift.femur, easing: easeOut },
          { degrees: s.front.femur[a], easing: easeIn },
          null,
          { degrees: s.front.femur[b], easing: easeIn },
          { step: lift.femur, easing: easeOut },
          { degrees: s.front.femur[a], easing: easeIn },
        ],

        [
          null,
          null,
          { degrees: s.rear.coxa[b] },
          null,
          { degrees: s.rear.coxa[a] },
          null,
          { degrees: s.rear.coxa[b] },
        ],
        [
          null,
          { step: lift.femur, easing: easeOut },
          { degrees: s.rear.femur[b], easing: easeIn },
          null,
          { degrees: s.rear.femur[a], easing: easeIn },
          { step: lift.femur, easing: easeOut },
          { degrees: s.rear.femur[b], easing: easeIn },
        ],

        [
          null,
          null,
          { degrees: s.rear.coxa[b] },
          null,
          { degrees: s.rear.coxa[a] },
          null,
          { degrees: s.rear.coxa[b] },
        ],
        [
          null,
          null,
          { degrees: s.rear.femur[b] },
          { step: lift.femur, easing: easeOut },
          { degrees: s.rear.femur[a] },
          null,
          { degrees: s.rear.femur[b] },
        ],
      ],
    });
  };

  quad.att = function quadStand() {
    let grouped,
      work = [
        {
          name: 'r1',
          offset: 0,
          home: s.front.femur[1],
          chome: s.front.coxa[1],
        },
        {
          name: 'r2',
          offset: 0,
          home: s.rear.femur[1],
          chome: s.front.coxa[1],
        },
        {
          name: 'l1',
          offset: 0,
          home: s.front.femur[1],
          chome: s.front.coxa[1],
        },
        {
          name: 'l2',
          offset: 0,
          home: s.rear.femur[1],
          chome: s.front.coxa[1],
        },
      ];

    work.forEach((leg, i) => {
      work[i].offset = Math.abs(
        quad[leg.name + 'f'].last.reqDegrees - leg.home
      );
    });

    if (work[1].offset > work[3].offset) {
      grouped = [[0, 2], [1, 3]];
    } else {
      grouped = [[1, 3], [0, 2]];
    }

    grouped.forEach((group, i) => {
      group.forEach(leg => {
        temporal.queue([
          {
            delay: 250 * i,
            task: () => {
              quad[work[leg].name + 'f'].to(work[leg].home + lift.femur);
            },
          },
          {
            delay: 50,
            task: () => {
              quad[work[leg].name + 'c'].to(work[leg].chome);
            },
          },
          {
            delay: 50,
            task: () => {
              quad[work[leg].name + 'f'].to(work[leg].home);
            },
          },
        ]);
      });
    });
    quad.state = 'stand';
  };

  quad.sleep = function() {
    femursAnimation.enqueue({
      duration: 1000,
      fps: 100,
      cuePoints: [0, 0.5, 1.0],
      loop: false,
      oncomplete: function onstop() {
        // quad.stop()
      },
      keyFrames: [
        [{ degrees: 0 }, { degrees: 45 }, { degrees: 180 }],
        [{ degrees: 0 }, { degrees: 45 }, { degrees: 180 }],
        [{ degrees: 0 }, { degrees: 45 }, { degrees: 180 }],
        [{ degrees: 0 }, { degrees: 45 }, { degrees: 180 }],
      ],
    });
  };

  quad.stand = () => {
    legsAnimation.enqueue(stand);
  };

  quad.stop = () => {
    legsAnimation.stop();
  };

  quad.joints.to(90);

  // Return the usable robot.
  return quad;
}

module.exports = { init };
