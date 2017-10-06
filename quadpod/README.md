# RoboticaJS

## Quadpod

### BOT Configuration

- Edit & run `$ node quadbot/test` to figure out which servo is connected to which pin and if its facing in the right direction.
- Keep notes of that, you will need it.
- With the gathered data set up the servos for each leg.
- For the animations you need to find the highest and lowest point of each articulation and the middle frame will be the resting point. **Make sure they don't hit with each other at any point of the anymation**  
### Running and debugging

1. Run `node quadbot` to run the bot with its animations.

2. The bot script provides a REPL to interact with the `quad` object, you just need to type something like:
    - `$ quad.walk()`

## License
Licensed under the MIT license.
