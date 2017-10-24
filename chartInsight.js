var client = new Keen({
    projectId: '59ee1a67c9e77c0001573e47',
    readKey: '53BA2573489435C8983C8D8D8F0E731FCFB0F32721213BB141A6B1BDFF43D6FDF2DA4DC7BA4EB27A0574EB3CB8E24B750F9715C5ED136017D628E738C39D9B4555ED0B6541B0C1038BD833D29E754CE4DF1148B8A90E225028D8B8A5954E89FB'
});

Keen.ready(function() {

    // Pageviews by browser

    var pageviews_timeline = new Keen.Dataviz()
        .el('#chart-01')
        .type('area')
        .height(280)
        .stacked(true)
        .title('Hourly Visits by Browser')
        .prepare();

    client
        .query('count', {
            event_collection: 'pageviews',
            interval: 'hourly',
            group_by: 'tech.browser.family',
            timeframe: 'this_3_days'
        })
        .then(function(res) {
            pageviews_timeline
                .data(res)
                .sortGroups('desc')
                .render();
        })
        .catch(function(err) {
            pageviews_timeline.message(err.message)
        });


    // Pageviews by browser (pie)

    var pageviews_pie = new Keen.Dataviz()
        .el('#chart-02')
        .type('pie')
        .height(280)
        .title('Overeall Visits by browser')
        .prepare();

    client
        .query('count', {
            event_collection: 'pageviews',
            group_by: 'tech.browser.family',
            timeframe: 'this_3_days'
        })
        .then(function(res) {
            pageviews_pie
                .data(res)
                .sortGroups('desc')
                .render();
        })
        .catch(function(err) {
            pageviews_pie.message(err.message)
        });


    // Impressions timeline

    var impressions_timeline = new Keen.Dataviz()
        .el('#chart-03')
        .type('horizontal-bar')
        .height(280)
        .stacked(true)
        .title('Daily Visits by Operating System')
        .prepare();

    client
        .query('count', {
            event_collection: 'pageviews',
            group_by: 'tech.os.family',
            interval: 'daily',
            timeframe: 'this_3_days'
        })
        .then(function(res) {
            impressions_timeline
                .data(res)
                .sortGroups('desc')
                .render();
        })
        .catch(function(err) {
            impressions_timeline.message(err.message)
        });

    // Impressions by device

    var impressions_by_device = new Keen.Dataviz()
        .el('#chart-04')
        .type('bar')
        .height(280)
        .stacked(true)
        .title('Daily Visits by State')
        .prepare();

    client
        .query('count', {
            event_collection: 'pageviews',
            group_by: 'geo.province',
            interval: 'daily',
            timeframe: 'this_3_days'
        })
        .then(function(res) {
            impressions_by_device
                .data(res)
                .sortGroups('desc')
                .render();
        })
        .catch(function(err) {
            impressions_by_device.message(err.message)
        });


    var pageClicks_pie = new Keen.Dataviz()
        .el('#chart-05')
        .type('pie')
        .height(280)
        .title('Most Clicked Links')
        .prepare();

    client
        .query('count', {
            event_collection: 'clicks',
            group_by: 'element.href',
            timeframe: 'this_3_days'
        })
        .then(function(res) {
            pageClicks_pie
                .data(res)
                .sortGroups('desc')
                .render();
        })
        .catch(function(err) {
            pageClicks_pie.message(err.message)
        });
    // Impressions by country

    //TESTERS BELOW
    var impressions_by_country = new Keen.Dataviz()
        .el('#chart-06')
        .type('bar')
        .height(280)
        .stacked(true)
        .title('Daily Visits by Zip Code')
        .prepare();

    client
        .query('count', {
            event_collection: 'pageviews',
            group_by: 'geo.postal_code',
            interval: 'daily',
            timeframe: 'this_5_days'
        })
        .then(function(res) {
            impressions_by_country
                .data(res)
                .sortGroups('desc')
                .render();
        })
        .catch(function(err) {
            impressions_by_country.message(err.message)
        });

});

// NOT ADDED YET TO HTML ================= 

// METRIC (blue)
var impressionsByMetrics = new Keen.Dataviz()
    .el('#chart-06')
    .height(300)
    .prepare();

// Use keen-analysis.js to run a query
// and pass the result into your chart:
client
    .query('count', {
        event_collection: 'pageviews',
        timeframe: 'this_3_days'
    })
    .then(function(res) {
        // Handle the result
        impressionsByMetrics
            .data(res)
            .render();
    })
    .catch(function(err) {
        // Handle the error
        impressionsByMetrics
            .message(err.message);
    });

// bar chart (NOT stacked)
var chartRandom = new Keen.Dataviz()
    .el('#chart-07')
    .type("bar")
    .height(300)
    .prepare();

// Use keen-analysis.js to run a query
// and pass the result into your chart:
client
    .query('count', {
        event_collection: 'pageviews',
        timeframe: 'this_3_days',
        interval: "weekly"
    })
    .then(function(res) {
        // Handle the result
        chartRandom
            .data(res)
            .render();
    })
    .catch(function(err) {
        // Handle the error
        chartRandom
            .message(err.message);
    });

// horizontal chart
var horizontalChart = new Keen.Dataviz()
    .el('#chart-08')
    .type("horizontal-bar")
    .height(300)
    .prepare();

// Use keen-analysis.js to run a query
// and pass the result into your chart:
client
    .query('count', {
        event_collection: 'pageviews',
        group_by: [
            "paired"
        ],
        timeframe: 'this_3_days'
    })
    .then(function(res) {
        // Handle the result
        horizontalChart
            .data(res)
            .render();
    })
    .catch(function(err) {
        // Handle the error
        horizontalChart
            .message(err.message);
    });

// states table
var statesChart = new Keen.Dataviz()
    .el('#chart-09')
    .type("table")
    .height(300)
    .prepare();

// Use keen-analysis.js to run a query
// and pass the result into your chart:
client
    .query('count', {
        event_collection: 'pageviews',
        timeframe: 'this_3_days',
        // group_by: ["user.address.state"],
        group_by: 'visitor.geo.province',
    })
    .then(function(res) {
        // Handle the result
        statesChart
            .data(res)
            .sortGroups('desc')
            .labelMapping({
                'Texas': 'TX',
                'null': 'Other'
            })
            .render();
    })
    .catch(function(err) {
        // Handle the error
        statesChart
            .message(err.message);
    });