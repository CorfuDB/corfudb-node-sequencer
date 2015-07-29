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
var invokedas = path.basename(process.argv[1]);
var doc = "Usage:\n    " + invokedas + " serve <port-number>\n    " + invokedas + " -h | --help | --version\nOptions:\n    -v                                      Show verbose log messages. (-vv for trace level)\n    -h --help                               Show this screen.\n    --version                               Show version number.\n";
var log;
var opts = docopt.docopt(doc);
var globalCounter = new Int64(0x0);
initialize(opts).then(function () {
    return checkPrereqs(opts)
        .catch(function (e) {
        log.fatal("Prerequisite not met: " + e);
        throw ("Failed to start due to unmet prerequisite.");
    }).then(function () {
        //figure out what to do based on arg
        if (opts['serve']) {
            serve(opts);
        }
    });
})
    .catch(function (e) {
    log.fatal("Failed to initialize: ", e);
});
function serve(opts) {
    log.info("nodeJS streaming sequencer server starting on port " + opts['<port-number>']);
    try {
        var server = thrift.createServer(StreamingSequencerService, {
            ping: function (result) {
                result(null, true);
            },
            reset: function (result) {
                result(null);
            },
            simulateFailure: function (enable, result) {
                result(null);
            },
            recover: function (lowbound, result) {
                globalCounter = lowbound;
                result(null);
            },
            setAllocationSize: function (stream, result) {
                result();
            },
            nextstreampos: function (stream, result) {
                globalCounter = globalCounter + 1;
                result(null, globalCounter);
            },
            nextpos: function (numTokens, result) {
                globalCounter = globalCounter + numTokens;
                result(null, globalCounter);
            }
        }, {});
        server.listen(opts['<port-number>']);
    }
    catch (e) {
        log.error("Error creating server", e.stack);
    }
}
function initialize(opts) {
    log = bunyan.createLogger({
        name: 'corfudb-node-sequencer',
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
