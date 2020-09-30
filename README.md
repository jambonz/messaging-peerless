# messaging-peerless  [![Build Status](https://secure.travis-ci.org/jambonz/messaging-peerless.png)](http://travis-ci.org/jambonz/messaging-peerless)

Helper functions for parsing incoming SMS/MMS messages from Peerless into a standard format for application processing.

## Functions

### fromProviderFormat({messageSid, applicationSid, accountSid}, url, payload)
translates an incoming SMS from Peerless into a standard format for application processing.

Peerless format looks like this:
```
{
	"from": "+15083084809",
	"recipients": ["+17743008772"],
	"ccRecipients": [],
	"text": "Hi there!",
	"mediaURL": null,
	"contentId": null
}
```

standard format is:
```
{
	"messageSid": "7c626e1b-7796-4f77-9848-056900b071c4",
	"applicationSid": "9fd9866f-d4bc-46e2-91f1-43da922d80ce",
	"accountSid": "505faa3d-e1cb-4855-8346-f57fb5611b7d",
	"from": "+15083084809",
	"to": ["+17743008772"],
	"text": "Hi there!",
	"cc": [],
	"media": []
}
```

### formatProviderResponse(messageSid)
This function will be called before sending a response to Peerless for an incoming SMS. Peerless requires a 200 OK with a JSON body in response to incoming SMS, e.g.

```
{"receipt": "7c626e1b-7796-4f77-9848-056900b071c4"}
```

### sendSms(opts, payload)
send an outgoing SMS message from a payload that is presented in standard application format.

The `opts` parameter may include properties that are needed to construct the proper URL, perform HTTP basic authentication, etc.



