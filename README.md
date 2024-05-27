#### Install
```
npm install
npm run star
```


1. **测试外部消息发送到discord**：
   使用Postman或类似的工具向`http://localhost:3000/send-message`发送一个POST请求，包含JSON格式的消息内容。例如：

   ```json
   {
     "message": "Hello, Discord!"
   }
   ```

如果配置正确，你的Discord bot应该会在指定频道中发送“Hello, Discord!”的消息。

2. **测试discord外部消息到外部系统**：：
在你的Discord频道中发送消息。你的Bot应该会监听到消息并将其内容发送到你指定的外部系统的API