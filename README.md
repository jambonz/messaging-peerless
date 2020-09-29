# messaging-peerless  [![Build Status](https://secure.travis-ci.org/jambonz/messaging-peerless.png)](http://travis-ci.org/jambonz/messaging-peerless)

Helper functions for parsing incoming SMS/MMS messages from Peerless into a standard format for application processing.

## Peerless SMS format
Peerless sends incoming SMS over http in json format, e.g.
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