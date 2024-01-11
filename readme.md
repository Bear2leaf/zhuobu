# zhuobu
simple webgl 3d render engine from scratch.

## getting started

make sure you are in the root directory of this project.
npx runtime and typescript compiler is required.

```bash
# you can run all above commands with
rm -rf dist script/dist script/game && \
npx tsc && \
ln -s ../src/worker/game ./script && \
cp -r ./resources ./index.html game.json project.config.json dist && \
npx tsc -p script && \
python3 -m http.server -d dist

# update resources
# cp -r ./resources ./index.html game.json project.config.json dist
```
open http://localhost:8000/ in browser



