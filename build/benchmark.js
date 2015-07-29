#!/usr/bin/env node
/// <reference path="../typings/tsd.d.ts" />
var docopt = require('docopt');
var prettystream = require('bunyan-debug-stream');
var Promise = require('bluebird');
var bunyan = require('bunyan');
var path = require('path');
var Int64 = require('node-int64');
var fs = Promise.promisifyAll(require('fs'));
var thrift = require('thrift');
var StreamingSequencerServiceTypes = require('../lib/StreamingSequencerService_types.js');
var CommonTypes = require('../lib/Common_types.js');
var StreamingSequencerService = require('../lib/StreamingSequencerService.js');
var Measured = require('measured');
var invokedas = path.basename(process.argv[1]);
var doc = "Usage:\n    " + invokedas + " <host> <port-number> [--iterations=<runs>] [--concurrency=<max>]\n    " + invokedas + " -h | --help | --version\nOptions:\n    --iterations=<runs>                     Number of iterations to test [default: 10000].\n    --concurrency=<max>                     Maximum number of concurrent connections [default: 1000].\n    -v                                      Show verbose log messages. (-vv for trace level)\n    -h --help                               Show this screen.\n    --version                               Show version number.\n";
var log;
var opts = docopt.docopt(doc);
var globalCounter = new Int64(0x0);
initialize(opts).then(function () {
    return checkPrereqs(opts)
        .catch(function (e) {
        log.fatal("Prerequisite not met: " + e);
        throw ("Failed to start due to unmet prerequisite.");
    }).then(function () {
        //only one option: benchmark
        var connection = thrift.createConnection(opts['<host>'], opts['<port-number>']);
        connection.on('error', function (err) {
            log.error("Error connecting to endpoint", err);
            process.exit(1);
        });
        var client = thrift.createClient(StreamingSequencerService, connection);
        client = Promise.promisifyAll(client);
        log.info("Running benchmark, run for " + opts['--iterations'] + " iterations at max concurrency " + opts['--concurrency']);
        var timer = new Measured.Timer();
        runBenchmark(client, connection, timer);
    });
})
    .catch(function (e) {
    log.fatal("Failed to initialize: ", e);
});
var i = 0;
var c = 0;
function runBenchmark(client, connection, timer) {
    while (c < opts['--concurrency']) {
        if (i + c >= opts['--iterations']) {
            break;
        }
        c++;
        client.nextpos(1, function (stopwatch) {
            return function (e, r) {
                i++;
                c--;
                stopwatch.end();
            };
        }(timer.start()));
    }
    if (i < opts['--iterations']) {
        setImmediate(function () {
            runBenchmark(client, connection, timer);
        });
    }
    else {
        log.info("Completed benchmark. " + i + " iterations", timer.toJSON());
        connection.end();
        process.exit(0);
    }
}
function initialize(opts) {
    log = bunyan.createLogger({
        name: 'corfudb-node-sequencer-benchmark',
        streams: [{
                level: opts['-v'][2] ? 'trace' :
                    opts['-v'][1] ? 'debug' : 'info',
                stream: process.stdout.isTTY ? prettystream({
                    basepath: __dirname,
                    colors: {
                        'trace': 'white'
                    }
                }) : process.stdout,
                type: process.stdout.isTTY ? 'raw' : undefined
            }]
    });
    log.debug("Verbose logging enabled, options were:", opts);
    log.trace("Trace logging enabled (warning: this is very verbose!)");
    return new Promise(function (fulfill, reject) {
        fulfill(null);
    });
}
function checkPrereqs(opts) {
    return new Promise(function (fulfill, reject) {
        fulfill(null);
    });
}
