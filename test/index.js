const test = require('tape').test ;
const {fromProviderFormat, formatProviderResponse, sendSms} = require('..');

test('parse incoming sms', async(t) => {

  try {
    let payload = {
      "from": "+15083084809",
      "recipients": ["+17743008772"],
      "ccRecipients": [],
      "text": "Hi there!",
      "mediaURL": null,
      "contentId": null
    }
    let obj = await fromProviderFormat({
      messageSid: 'foo',
      applicationSid: 'bar',
      accountSid: 'baz'
    }, payload);
    t.ok(obj.from === payload.from, 'successfully filtered SMS payload');
    
    let sid = '03516fcb-3a92-4d4e-9273-1a2dab3c8295';
    obj = await formatProviderResponse(sid);
    t.ok(obj.receipt === sid && typeof obj.status === 'string', 'respond sends status and receipt');

    t.end();
  }
  catch (err) {
    console.error(err);
    t.end(err);
  }
});

