# zhuobu
simple webgl 3d render engine from scratch.

## getting started

make sure you are in the root directory of this project.
npx runtime and typescript compiler is required.

```bash
# clean dist directory (keep game.js for minigame reload)
find dist -type f -not -name 'game.js' -delete
# update resource files
cp -r resources project.config.json game.json index.html dist
# compile typescript in watch mode (for development)
npx tsc -w
# run http server
python3 -m http.server -d dist

# (Optional) or you can run all above commands with
find dist -type f -not -name 'game.js' -delete  && \
cp -r resources project.config.json game.json index.html dist  &&  \
npx tsc -w & python3 -m http.server -d dist
```

open http://localhost:8000/ in browser



