all:
	emcc hello.c -o hello.html
	sed -i "" '16d' hello.js