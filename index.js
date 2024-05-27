/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-05-26 12:08:27
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-05-27 09:08:11
 * @FilePath: \bot-message-demo\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const settings = require('./config');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	],
});


client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.channel.id === settings.channelId && !message.author.bot) {
    try {
      await sendMessage(message);
    }
    catch (error) {
      console.error('sendMessage error', error?.response?.data || error);
      return;
    }
  }
});

client.login(token);

process.on('uncaughtException', function(err) {
  console.error('uncaughtException', err);
});
console.log(`CEILLING_API: ${settings.backendApi}`);
console.log(`ORDER_CHANNEL: ${settings.channelId}`);
global.channelId = settings.channelId;

const express = require('express');
const { sendMessage } = require('./api/sendmsg');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/send_message', (req, res) => {
  const messageContent = req.query.message;

  if (messageContent) {
    const channel = client.channels.cache.get(settings.channelId);
    if (channel) {
      channel.send(messageContent)
        .then(() => {
          res.status(200).send('Message sent success!');
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Failed to send message.');
        });
    }
    else {
      res.status(404).send('Channel not found.');
    }
  }
  else {
    res.status(400).send('No message content provided.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const { Worker } = require('worker_threads');
// 创建并启动 Worker 线程
const worker = new Worker('./api/worker.js');

worker.on('message', (message) => {
  console.log;(JSON.stringify(message));
  const channel = client.channels.cache.get(settings.channelId);
  if (channel) {
    channel.send(message)
      .then(() => {
        console.log('Message sent success!');
      })
      .catch(err => {
        console.error(err);
        console.log('Failed to send message.');
      });
  }
  else {
    console.log('Channel not found.');
  }
});

