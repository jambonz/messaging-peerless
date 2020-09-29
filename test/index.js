const test = require('tape').test ;

test('parse incoming sms', async(t) => {
  const {filter, respond} = require('..');

  try {
    let payload = {
      "from": "+15083084809",
      "recipients": ["+17743008772"],
      "ccRecipients": [],
      "text": "Hi there!",
      "mediaURL": null,
      "contentId": null
    }
    let obj = await filter(payload);
    t.ok(obj.raw.from === obj.from, 'successfully filtered SMS payload');
    
    let sid = '03516fcb-3a92-4d4e-9273-1a2dab3c8295';
    let res = {sid};
    obj = respond(res);
    t.ok(obj.receipt === sid && typeof obj.status === 'string', 'respond sends status and receipt');
    t.end();
  }
  catch (err) {
    console.error(err);
    t.end(err);
  }
});

