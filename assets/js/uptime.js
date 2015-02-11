var displayStatus = function (key, elem, title) {
    jQuery.getJSON('https://api.uptimerobot.com/getMonitors?apiKey=' + key + '&noJsonCallback=1&format=json&logs=1&responseTimes=1', function (data) {
        if (data.stat == "ok" && data.monitors.monitor && data.monitors.monitor.length > 0) {
            var responsetime = _.sortBy(_.map(data.monitors.monitor[0].responsetime, function (responsetime) {
                return [new Date(responsetime.datetime).getTime(), ~~responsetime.value];
            }), function (responsetime) {
                return responsetime[0];
            });

            var plotBands = [], curLog = {};
            _.each(_.sortBy(data.monitors.monitor[0].log, function (d) {
                return new Date(d.datetime).getTime();
            }), function (log) {
                if (log.type === "1") {
                    curLog.from = new Date(log.datetime).getTime();
                    curLog.color = 'rgba(231, 76, 60, 0.5)';
                } else if (log.type === "2") {
                    curLog.to = new Date(log.datetime).getTime();
                    plotBands.push(curLog);
                    curLog = {};
                }
            });



            new Highcharts.Chart({
                chart: {
                    renderTo: elem,
                    backgroundColor: 'transparent',
                    type: 'line',
                    zoomType: 'x'
                },
                title: {
                    text: title,
                    style: {
                        color: '#333'
                    }
                },
                legend: {enabled: false},
                xAxis: {
                    type: 'datetime',
                    plotBands: plotBands,
                    labels: {
                        style: {
                            color: '#333'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Antwortzeit (ms)',
                        style: {
                            color: '#333'
                        }
                    },
                    labels: {
                        style: {
                            color: '#333'
                        }
                    }
                },
                tooltip: {valueSuffix: ' Millisekunden'},
                credits: {enabled: false},
                plotOptions: {
                    line: {
                        states: {hover: {lineWidth: 2}}
                    }
                },
                series: [{
                    name: 'Antwortzeit',
                    color: '#333',
                    data: responsetime
                }]
            });


        } else {
            //todo
        }
    });
};
displayStatus('m776590614-845f2b50d369b2f04d1f2575', 'breadfish', 'breadfish.de');
displayStatus('m776523836-c6af347eaef0fd187f938c5c', 'screenshot', 'Breadfish++ Screenshot Service');
displayStatus('m776470973-6be83e56bfbb9477e071516e', 'chat', 'Breadfish++ Chat Service');
displayStatus('m776327110-9063e705c2e1721741a11ee3', 'teamspeak', 'Breadfish++ Teamspeak Service');