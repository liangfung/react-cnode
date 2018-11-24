##  记录下部分要点

### server-entry的读取
在server端需要加载并执行server-entry.js, 要使用node的Module的api，

### server端的state应用到client
在server端初始化的initial state（可能是在server处理一些逻辑或者fetch data以展示首屏），需要拼接到html中，client就可以拿到并以其做state的初始化