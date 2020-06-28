// from data.js
var tableData = data;

// select table
var tbody = d3.select('tbody');

// print data in console
// console.log(tableData);

// add data to table. For every row, add tr to tbody, then add each column value as new td
tableData.forEach(function(appendData) {
    var tableRow = tbody.append('tr')
    Object.entries(appendData).forEach(function([key,value]) {
        var newData = tableRow.append('td')
        newData.text(value)
    })
});

// list of filters
filters = [
    "datetime",
    "country",
    "state",
    "city",
    "shape"
];

// list of placeholders
placeholders = [
    "1/1/2010",
    "us",
    "co",
    "aspen",
    "sphere"
];

// select filters id (in <ul>), run through the filtersElements list and append with attributes and html
// adds each filter and placeholder
var filtersElement = d3.select('#filters');
filtersElement.html("");
for(i = 0; i< filters.length; i++){
    filtersElement.append("li")
    .attr("class", "filter list-group-item")
    .html(`<label for="${filters[i]}">Enter a ${filters[i].toUpperCase()}</label><input value="" class="form-control" id="${filters[i]}" type="text" placeholder="${placeholders[i]}">`);
}

// event listener
d3.selectAll('#filter-btn').on('click', runEnter);
d3.selectAll('.filter').on('change', runEnter);

// d3.select('form').on('submit', runEnter);

function runEnter() {
    // prevent from submitting a form and refreshing page
    d3.event.preventDefault();

    // variables for input values
    var inputValue = d3.select('#datetime').property('value');
    var inputCountry = d3.select('#country').property('value');
    var inputState = d3.select('#state').property('value');
    var inputCity = d3.select('#city').property('value');
    var inputShape = d3.select('#shape').property('value');

    // print input values
    console.log(
        "input value:", inputValue, 
        "inputCountry:", inputCountry,
        "inputState:", inputState,
        "inputCity:", inputCity,
        "inputShape:", inputShape,
        );

    // create a copy of the original dataset
    var filterData = tableData;

    // filter by input values
    if (inputValue) filterData = filterData.filter(x => x.datetime === inputValue);
    if (inputCountry) filterData = filterData.filter(x => x.country === inputCountry);
    if (inputState) filterData = filterData.filter(x => x.state === inputState);
    if (inputCity) filterData = filterData.filter(x => x.city === inputCity);
    if (inputShape) filterData = filterData.filter(x => x.shape=== inputShape);

    console.log(filterData);

    // reset table so you filter on the original data, not the filtered data
    tbody.html('');

    // add filtered data to table
    filterData.forEach(function(appendData) {
        var tableRow = tbody.append('tr')
        Object.entries(appendData).forEach(function([key,value]) {
            var newData = tableRow.append('td')
            newData.text(value)
        })
    });
}
