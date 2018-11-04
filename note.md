## webpack配置

- webpack的config文件的四要素--entry，output，module，plugin
- 需要配置 .bablerc文件，设置preset
- loader要使用正则配置文件类型
- html-webpck-plugin，生成html，插入script，分别是webpack配置的entries
- webpack的output的publicPath，是静态资源bundle的路径（配置CDN时很有用）
- webpack的output的hash，chunkhash为根据内容生成的hash
- htmlPlugin，可以指定模板，根据模板来生成index.html


## React
- `<App />` jsx格式的代码，会被babel编译成 `React.clearElement()`，这也说明了为什么有jsx的地方就需要 `import React`。当然了，jsx的编译也可以更改成自定义的编译rule。
- 

## 服务端
- 服务端文件server.js,本项目用express
- express.static提供静态文件，可以指定**虚拟路径前缀**


## 开发时的服务端渲染
1. 之前的server.js是依据在`dist`目录下生成的写在硬盘中的文件拿到的，每次修改都需要重新启动一次
2. 用了devServer之后，client端的资源文件是由webpack-dev-server编译生成保存在内存中的
3. `webpack`的`output`是 **往硬盘上写入编译文件**的，尽量避免把编译好的bundle写在硬盘上，会比较慢，效率不高。开发时，编译后的文件保存在内存中效率更高

因为上述的三个特点，加上现在初步的服务端渲染开发环境是由express的server启动的，拿不到template（原来是用ReactDomServer.renderToString()方法生成并返回html字符串），作出以下的改动

1. memory-fs和webpack配合, 把用webpack编译好的bundle也 **保存在内存**中，并用 memoryFs.readFileSync()方法读取`bundle string`（是webpack编译好的文件，数据类型为`string`）
2. new Module(),将读取到的`bundle string`用module解析，**解析成模块**--->ServerBundle
3. template, 使用`axios`拿到client端的devServer编译生成的保存在内存中的template.html(axios在server端也可以使用）
4. HTML字符串返回，用ReactDomServer.renderToString()将`serverBundle`(mfs中的`bundle string`解析而来的)编辑成HTML字符串
5. HTML字符串(content)和template拼接起来，形成最终的HTML string，由server返回到client，实现server端直出。

## 工程化构建优化
1. webpack的configuration文件分为三个，base, client, server，可以有效的减少冗余代码，提高可迭代性
2. webpack的`target`设置，client端为`web`, server端为`node`
3. 使用

## cnode api 代理
1. 某些API是需要用户登录之后才能请求请求成功的，其登录校验是使用session机制验证accessToken。在node服务端可以使用以下工具实现
  - body-parser（parse请求body,然后能在req.body中拿到req的请求payload）
  - express-session（在服务端保存session,真正上线的话session存在数据库）
  - query-string