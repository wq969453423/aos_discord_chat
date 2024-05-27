const { message, createDataItemSigner } = require('@permaweb/aoconnect');
const { readFileSync } = require('node:fs');

const wallet = JSON.parse(
  readFileSync('/aos.json').toString(),
);


async function sendMessage(msg) {


  const username = msg.author.username;

  await message({
    process: 'IeVmvpbu87FyQotxNLmMPtCaNHhyYFtE6phm2kISSC8',
    tags: [
      { name: 'Action', value: 'BroadcastDiscord' },
      { name: 'Data', value: msg.content },
      { name: 'Event', value: username },
    ],
    signer: createDataItemSigner(wallet),
    data: msg.content,
  })
  .then(console.log)
  .catch(console.error);
}

module.exports = {
  sendMessage,
};