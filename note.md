## webpack配置

- webpack的config文件的四要素--entry，output，module，plugin
- 需要配置 .bablerc文件，设置preset
- loader要使用正则配置文件类型
- html-webpck-plugin，生成html，插入script，分别是webpack配置的entries
- webpack的output的publicPath，是静态资源bundle的路径（配置CDN时很有用）
- webpack的output的hash，chunkhash为根据内容生成的hash


## React
- `<App />` jsx格式的代码，会被babel编译成 `React.clearElement()`，这也说明了为什么有jsx的地方就需要 `import React`。当然了，jsx的编译也可以更改成自定义的编译rule。
- 