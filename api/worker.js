const { results } = require('@permaweb/aoconnect');
const { parentPort } = require('worker_threads');

let cursor = '';

// 定义轮询函数
async function polling() {
  try {
    if (cursor == '') {
      const resultsOut = await results({
        process: 'IeVmvpbu87FyQotxNLmMPtCaNHhyYFtE6phm2kISSC8',
        from: cursor,
        sort: 'DESC',
        limit: 1,
      });
      cursor = resultsOut.edges[0].cursor;
    }

    console.log('Polling...');
    const resultsOut2 = await results({
      process: 'IeVmvpbu87FyQotxNLmMPtCaNHhyYFtE6phm2kISSC8',
      from: cursor,
      sort: 'ASC',
      limit: 25,
    });


    for (const element of resultsOut2.edges) {
      cursor = element.cursor;
      console.error(cursor);
      if (element.node.Messages.length == 0) {
        continue;
      }
      const elementData = element.node.Messages;
      const messagesData = elementData.filter(e => e.Target == 'IeVmvpbu87FyQotxNLmMPtCaNHhyYFtE6phm2kISSC8' && e.Tags.length > 0 && e.Tags.some(f => f.name == 'Action' && f.value == 'SendDiscordMsg'));
      for (const messagesItem of messagesData) {
        if (elementData) {
          console.log(messagesItem);
          const event = messagesItem.Tags.find(e => e.name == 'Event')?.value;
          const sendTest = event + ' : ' + messagesItem.Data;
          parentPort.postMessage(sendTest);

        }
      }
    }

  }
  catch (error) {
    console.error('Polling error:', error);
  }
  finally {
    setTimeout(polling, 5000);
  }
}

polling();

