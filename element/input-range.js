/**
 * @uses number/getPrecision()
 * @uses number/toPrecision()
 * @uses string/genRandomString()
 */
function addRangeTicks(range, datalistClass = null) {
    let min  = parseFloat(range.min);
    let max  = parseFloat(range.max);
    let step = parseFloat(range.step);
    let precision = getPrecision(step);
    let tickValues = [];
    for (let tickValue = min; tickValue <= max + step/2; tickValue += step) {
        tickValues.push(toPrecision(tickValue, precision));
    }
    if (tickValues.length == 0) {
        return;
    }
    let datalist = document.createElement("datalist");
    datalist.id = "range-ticks-" + genRandomString();
    if (datalistClass) {
        datalist.className = datalistClass;
    }
    for (let tickValue of tickValues) {
        let option = document.createElement("option");
        option.value = tickValue;
        datalist.append(option);
    }
    range.after(datalist);
    range.setAttribute("list", datalist.id);
}