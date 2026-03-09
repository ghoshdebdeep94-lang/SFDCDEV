const events = {};

const samePageRef = (pageRef1, pageRef2) => {
    const obj1 = pageRef1.attributes;
    const obj2 = pageRef2.attributes;
    return Object.keys(obj1)
        .concat(Object.keys(obj2))
        .every((key) => obj1[key] === obj2[key]);
};

const fireEvent = (pageRef, eventName, payload) => {
    if (events[eventName]) {
        const listeners = events[eventName];
        listeners.forEach((listener) => {
            if (samePageRef(pageRef, listener.pageRef)) {
                try {
                    listener.callback(payload);
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(error);
                }
            }
        });
    }
};

const registerListener = (eventName, callback, thisArg) => {
    if (!events[eventName]) {
        events[eventName] = [];
    }
    const duplicate = events[eventName].find(
        (listener) =>
            listener.callback === callback && listener.thisArg === thisArg
    );
    if (!duplicate) {
        events[eventName].push({ callback, thisArg, pageRef: thisArg.pageRef });
    }
};

const unregisterListener = (eventName, callback, thisArg) => {
    if (events[eventName]) {
        events[eventName] = events[eventName].filter(
            (listener) =>
                listener.callback !== callback || listener.thisArg !== thisArg
        );
    }
};

const unregisterAllListeners = (thisArg) => {
    Object.keys(events).forEach((eventName) => {
        events[eventName] = events[eventName].filter(
            (listener) => listener.thisArg !== thisArg
        );
    });
};

export {
    fireEvent,
    registerListener,
    unregisterListener,
    unregisterAllListeners
};
