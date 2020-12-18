// <meta name="ns.prop" content="xxx">
export default (name, ns) => {
    if (!name)
        return;

    let meta = document.querySelector(`meta[name="${(ns ? ns + '.' : '') + name}"`);
    
    if (meta)
        return meta.content;
};
