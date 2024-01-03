# zhuobu
simple webgl 3d render engine from scratch.

## getting started

make sure you are in the root directory of this project.
npx runtime and typescript compiler is required.

```bash
# clean dist directory
find dist -delete && mkdir dist
# link resource files
ln -s ../resources ../index.html ./dist
# compile typescript in watch mode (for development)
npx tsc
# run http server
python3 -m http.server -d dist

# (Optional) or you can run all above commands with
find dist -delete && mkdir dist && \
ln -s ../resources ../index.html ./dist && \
cp game.json project.config.json dist && npx tsc && \
python3 -m http.server -d dist
```

open http://localhost:8000/ in browser



