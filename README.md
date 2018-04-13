# cross-origin-demo

## 使用

修改`server`和`client`目录下的 `index.js` 文件中的本地 IP：`hostname`，和端口：`port`、`clientPort`、`serverPort`，然后在根目录下执行：

```bash
npm start
```

**说明**：

* `CORS` demo访问：http://hostname:clientPort
* `JSONP` demo访问：http://hostname:clientPort/jsonp
* `postMessage()` demo访问：http://hostname:clientPort/msg