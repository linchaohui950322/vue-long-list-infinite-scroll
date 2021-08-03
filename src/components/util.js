/** @flow */
// https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=82b449b4-56d4-4182-aec0-b45d1b821473
// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
const request =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  };

const cancel =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  function(id) {
    window.clearTimeout(id);
  };

const raf = request
const caf = cancel

export const cancelAnimationTimeout = (frame) => caf(frame.id);

export const requestAnimationTimeout = (
  callback,
  delay,
) => {
  let start;
  // wait for end of processing current event handler, because event handler may be long
  Promise.resolve().then(() => {
    start = Date.now();
  });

  const timeout = () => {
    if (Date.now() - start >= delay) {
      callback.call();
    } else {
      frame.id = raf(timeout);
    }
  };

  const frame = {
    id: raf(timeout),
  };

  return frame;
};
