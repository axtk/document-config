import getMeta from '../lib/getMeta';
import getRootDataAttribute from '../lib/getRootDataAttribute';

export default (options = {}) => {
    let {ns, props, transform = {}} = options;
    let applyTransform = (k, v) => typeof transform[k] === 'function' ? transform[k](v) : v;
    let config = Object.create(null);

    if (Array.isArray(props)) {
        for (let k of props) {
            let value = [getMeta(k, ns), getRootDataAttribute(k, ns)]
                .find(x => x !== undefined);

            if (value !== undefined)
                config[k] = applyTransform(k, value);
        }
    }
    else if (ns) {
        for (let [k, v] of Object.entries(document.documentElement.dataset)) {
            // k = <ns><uppercase character><rest>
            let matchesNS = (
                k.startsWith(ns) &&
                k[ns.length] &&
                k[ns.length] === k[ns.length].toUpperCase()
            );

            if (matchesNS) {
                let key = k.slice(ns.length);

                if (key) {
                    key = key[0].toLowerCase() + key.slice(1);

                    config[key] = applyTransform(key, v);
                }
            }
        }

        for (let meta of document.querySelectorAll(`meta[name^="${ns}."]`)) {
            let key = meta.name.slice(ns.length + 1);

            if (key)
                config[key] = applyTransform(key, meta.content);
        }
    }
    
    return config;
};
