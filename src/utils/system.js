var ee = require('event-emitter');

const System = function () {};
ee(System.prototype);

export const systemEmmiter = new System();
