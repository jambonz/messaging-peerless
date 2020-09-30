const bent = require('bent');
const assert = require('assert');
const noopLogger = {
  info: console.log,
  error: console.error
};

const toBase64 = (str) => Buffer.from(str || '', 'utf8').toString('base64');

const fromProviderFormat = (opts, url, payload) => {
  const obj = Object.assign({}, opts, {
    from: payload.from,
    to: payload.recipients || [],
    cc: payload.ccRecipients || [],
    text: payload.text,
    media: []
  });
  if (payload.mediaURL) obj.media.push(payload.mediaURL);
  return obj;
};

const formatProviderResponse = (messageSid) => {
  return {receipt: messageSid, status: 'accepted'};
}

const basicAuth = (username, password) => {
  if (!username || !password) return {};
  const creds = `${username}:${password || ''}`;
  const header = `Basic ${toBase64(creds)}`;
  return {Authorization: header};
};

const sendSms = async(opts, payload) => {
  const logger = opts.logger || noopLogger;
  const headers = opts.auth ? basicAuth(opts.auth.username, opts.auth.password) : {};
  assert.ok(typeof opts.url === 'string', 'sendSms: opts.url must be provided');
  const post = bent('POST', 'json', 200, headers);
  try {
    const buf = await post(opts.url, payload);
    return buf;
  } catch (err) {
    logger.error({err, url: opts.url}, 'Error sending SMS to peerless');
  }
};

module.exports = {
  fromProviderFormat,
  formatProviderResponse,
  sendSms
};
