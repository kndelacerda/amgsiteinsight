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
        .title('Pageviews by browser - Hourly')
        .prepare();

    client
        .query('count', {
            event_collection: 'pageviews',
            interval: 'hourly',
            group_by: 'user.device_info.browser.family',
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
        .title('Pageviews by browser')
        .prepare();

    client
        .query('count', {
            event_collection: 'pageviews',
            group_by: 'user.device_info.browser.family',
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
        .type('bar')
        .height(280)
        .stacked(true)
        .title('Daily Pageviews')
        .prepare();

    client
        .query('count', {
            event_collection: 'pageviews',
            group_by: 'ad.advertiser',
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
        .title('Weekly Pageviews')
        .prepare();

    client
        .query('count', {
            event_collection: 'pageviews',
            group_by: 'user.device_info.device.family',
            interval: 'weekly',
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


    // Impressions by country

    var impressions_by_country = new Keen.Dataviz()
        .el('#chart-05')
        .type('bar')
        .height(280)
        .stacked(true)
        .title('Impressions by country')
        .prepare();

    client
        .query('count', {
            event_collection: 'pageviews',
            group_by: 'user.geo_info.country',
            interval: 'hourly',
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
var chart = new Keen.Dataviz()
    .el('#chart-06')
    .height(300)
    .prepare();

// Use keen-analysis.js to run a query
// and pass the result into your chart:
client
    .query('count', {
        event_collection: 'pageviews',
        timeframe: 'this_5_days'
    })
    .then(function(res) {
        // Handle the result
        chart
            .data(res)
            .render();
    })
    .catch(function(err) {
        // Handle the error
        chart
            .message(err.message);
    });

// bar chart (NOT stacked)
var chart = new Keen.Dataviz()
    .el('#chart-07')
    .type("bar")
    .height(300)
    .prepare();

// Use keen-analysis.js to run a query
// and pass the result into your chart:
client
    .query('count', {
        event_collection: 'pageviews',
        timeframe: 'this_5_days',
        interval: "weekly"
    })
    .then(function(res) {
        // Handle the result
        chart
            .data(res)
            .render();
    })
    .catch(function(err) {
        // Handle the error
        chart
            .message(err.message);
    });

// horizontal chart
var chart = new Keen.Dataviz()
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
        timeframe: 'this_5_days'
    })
    .then(function(res) {
        // Handle the result
        chart
            .data(res)
            .render();
    })
    .catch(function(err) {
        // Handle the error
        chart
            .message(err.message);
    });

// states table
var chart = new Keen.Dataviz()
    .el('#chart-09')
    .type("table")
    .height(300)
    .prepare();

// Use keen-analysis.js to run a query
// and pass the result into your chart:
client
    .query('count', {
        event_collection: 'pageviews',
        timeframe: 'this_5_days',
        group_by: ["user.address.state"],
    })
    .then(function(res) {
        // Handle the result
        chart
            .data(res)
            .sortGroups('desc')
            .render();
    })
    .catch(function(err) {
        // Handle the error
        chart
            .message(err.message);
    });

//