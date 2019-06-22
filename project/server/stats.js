const moment = require('moment');

let add = (stats, req) => {
    stats.push(Object.assign({time: moment().format()}, req.body));
    return JSON.stringify(stats, null, 4);
};
module.exports = {
    add,
};