export const getInfo = async (obj, setRes, setChange) => {
    const dime = obj?.parameters?.filter(item => item?.columnType === "dimension");
    if (!dime || dime.length === 0) setRes((p) => ({ ...p, customDataHasError: true, customDataMessage: "Could not find the dimensions to plot on x-axis" }));
    else {
        setRes((p) => ({ ...p, params: { ...p?.params, dimension: dime[0]?.key } }))
    }

    const comparison = obj?.parameters?.filter(item => item?.columnType === "measure");
    if (!comparison || comparison.length === 0 || comparison.length === 1) setRes((p) => ({ ...p, customDataHasError: true, customDataMessage: "Could not find the attributes to compare" }));
    else {
        var low = comparison[0]?.timex?.timex;
        var high = comparison[0]?.timex?.timex;

        var lowKey = comparison[0]?.key;
        var highKey = comparison[0]?.key;

        for (let i = 1; i < comparison.length; i++) {
            var currTimex = comparison[i]?.timex?.timex;

            if (currTimex < low) {
                low = currTimex;
                lowKey = comparison[i]?.key;
            }
            if (currTimex > high) {
                high = currTimex;
                highKey = comparison[i]?.key;
            }
        }

        setRes((p) => ({ ...p, params: { ...p.params, lower_bound: lowKey, upper_bound: highKey } }));
    }

    setRes((p) => ({
        ...p,
        data: obj?.data,
        loading: false,
        hasError: obj?.hasError
    }));

    let profit = 0;
    let loss = 0;

    for (let i = 0; i < obj?.data?.length; i++) {
        var diff = obj?.data[i][highKey] - obj?.data[i][lowKey];
        if (diff >= 0) profit += diff;
        else loss -= diff;
    }
    if(!obj.hasOwnProperty("data") || obj?.data?.length === 0) {
        setRes((p) => ({...p, customDataHasError: true, customDataMessage: "No data to display"}));
        profit = 0;
        loss = 0;
    }

    setChange((p) => ({
        ...p,
        profit: profit,
        loss: loss,
        net: profit - loss
    }))
}