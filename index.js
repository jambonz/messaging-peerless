// peerless format requires no changes
function filter(payload, req) {
  const obj = Object.assign({}, payload, {raw: payload});
  return obj;
}

function respond(payload) {
  return {
    status: 'ok',
    receipt: payload.sid
  };
}

module.exports = {
  filter,
  respond
};
