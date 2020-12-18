// <html data-ns-prop="xxx">
export default (name, ns) => {
    if (!name)
        return;

    let attrNames = ns ? [
        // sampleProp > data-ns-sample-prop > dataset.nsSampleProp
        ns + name[0].toUpperCase() + name.slice(1),
        // sampleProp > data-ns-sampleProp > dataset.nsSampleprop
        ns + name[0].toUpperCase() + name.slice(1).toLowerCase(),
    ] : [
        // sampleProp > data-sample-prop > dataset.sampleProp
        name,
        // sampleProp > data-sampleProp > dataset.sampleprop
        name.toLowerCase(),
    ];

    return attrNames
        .map(attr => document.documentElement.dataset[attr])
        .find(x => x !== undefined);
};
