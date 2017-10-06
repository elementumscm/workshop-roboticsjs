# RoboticaJS

## Hexapod

### BOT Configuration

- Edit & run `$ node hexapod/test` to figure out which servo is connected to which board and pin and if its facing in the right direction.
- Keep notes of that, you will need it.
- With the gathered data set up the servos for each leg in `robot.js`.
- For the animations you need to find the highest and lowest point of each articulation and the middle frame will be the resting point. **Make sure they don't hit with each other at any point of the anymation**  
- Once you have the basic animations, you need to wire it with the joystick events in the index.js file. 
### Running and debugging

1. Run `node hexapod` to run the bot with its animations.

2. The bot script provides a REPL to interact with the `hexa` object, you just need to type something like:
    - `$ hexa.walk()`

## License
Licensed under the MIT license.
