var fp = require('./FPModule.js').FP;

fp.define('Observable', {
    config: {
        eventId: ''
    },
    static: {
        instances: 0
    },
    fireEvent: function () {
        console.log(this.eventId);
    }
});

var observable = fp.create('Observable', { eventId: 'add' });
observable.fireEvent();

console.log(Observable.instances);

console.log('Hello world');



