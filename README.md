#### Install
```
npm install
npm install --save @permaweb/aoconnect

npm run star
```



```
//index.js is used to connect to the Discord service. Before connecting,

//please configure the token in the config.json file and the channel in the .env file.

//  /api/sendmsg.js is triggered in index.js and is responsible for sending discord messages to aos.

//  /api/worker.js file is responsible for sending aos messages to discord.
```


Example Channel：https://discord.gg/ePSFQqwz

```
//Chat rooms on AOS
Send({ Target = "IeVmvpbu87FyQotxNLmMPtCaNHhyYFtE6phm2kISSC8", Action = "Register" })


//Send messages on AOS
Send({Target = "IeVmvpbu87FyQotxNLmMPtCaNHhyYFtE6phm2kISSC8", Action = "Broadcast", Data = "first msg!" })
```
