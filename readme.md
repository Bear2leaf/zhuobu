# zhuobu
simple webgl 3d render engine from scratch.

## getting started

make sure you are in the root directory of this project.
npx runtime and typescript compiler is required.

```bash
# you can run all above commands with
rm -rf dist && mkdir dist && cp -r resources game.json index.html project.config.json dist && tsc && echo '{"type": "module"}' > dist/package.json && touch distresources/game.js

# update resources
cp -r resources game.json index.html project.config.json dist

# start http server
python3 -m http.server -d dist

```
open http://localhost:8000/ in browser



