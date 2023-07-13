# zhuobu
simple webgl 3d render engine.

## getting started

make sure you are in the root directory of this project.
npx runtime and typescript compiler is required.

```bash
# clean dist directory
rm -rf dist && mkdir dist
# update resource files
cp -r resources project.config.json game.json index.html dist
# compile typescript
npx tsc
# run http server
python3 -m http.server -d dist
```

open http://localhost:8000/ in browser



