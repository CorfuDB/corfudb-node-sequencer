/// <reference path="../typings/tsd.d.ts" />

var docopt = require('docopt');
var prettystream = require('bunyan-debug-stream');
import Promise = require('bluebird');
import bunyan = require('bunyan');
import path = require('path');

var Int64 = require('node-int64');
var fs : any = Promise.promisifyAll(require('fs'));
var thrift = require('thrift');

var StreamingSequencerServiceTypes = require('../lib/StreamingSequencerService_types.js');
var CommonTypes = require('../lib/Common_types.js');
var StreamingSequencerService = require('../lib/StreamingSequencerService.js');

var invokedas : string = path.basename(process.argv[1]);

var doc : string = `Usage:
    ${ invokedas } serve <port-number>
    ${ invokedas } -h | --help | --version
Options:
    -v                                      Show verbose log messages. (-vv for trace level)
    -h --help                               Show this screen.
    --version                               Show version number.
`;

var log : bunyan.Logger;

var opts = docopt.docopt(doc);
var globalCounter = new Int64(0x0);
initialize(opts).then(function () {
    return checkPrereqs(opts)
            .catch(function(e){
                log.fatal("Prerequisite not met: " + e);
                throw("Failed to start due to unmet prerequisite.");
                }).then(function() {
                    //figure out what to do based on arg
                    if (opts['serve'])
                    {
                        serve(opts);
                    }
                });
})
.catch(function(e) {
    log.fatal("Failed to initialize: ", e);
});


function serve(opts: any) : void
{
    log.info(`nodeJS streaming sequencer server starting on port ${opts['<port-number>']}`);
    try {
        var server = thrift.createServer(StreamingSequencerService, {
            ping:   function(result) {
                result(null, true);
            },
            reset:  function(result) {
                result(null);
            },
            simulateFailure: function(enable: Boolean, result) {
                result(null);
            },
            recover: function(lowbound, result) {
                globalCounter = lowbound;
                result(null);
            },
            setAllocationSize: function(stream: String, result) {
                result();
            },
            nextstreampos: function(stream: String, result) {
                globalCounter = globalCounter + 1;
                result(null, globalCounter);
            },
            nextpos: function(numTokens: Number, result) {
                globalCounter = globalCounter + numTokens;
                result(null, globalCounter);
            }
        }, {
            //no options
        });
        server.listen(opts['<port-number>']);
    }
    catch (e)
    {
        log.error("Error creating server", e.stack);
    }
}

function initialize(opts : any) : Promise<any>
{
    log = bunyan.createLogger({
        name: 'corfudb-node-sequencer',
        streams: [{
             level: opts['-v'][2] ? 'trace' :
                    opts['-v'][1] ? 'debug' : 'info',
            stream: (<any>process.stdout).isTTY ? prettystream({
                basepath: __dirname,
                colors: {
                    'trace': 'white'
                }
                }) : process.stdout,
            type: (<any>process.stdout).isTTY ? 'raw' : undefined,
        }]
    })

    log.debug("Verbose logging enabled, options were:", opts);
    log.trace("Trace logging enabled (warning: this is very verbose!)");
    return new Promise(function (fulfill, reject){
        fulfill(null);
    });
}

function checkPrereqs(opts: any) : Promise<any>
{
    return new Promise(function (fulfill, reject){
        fulfill(null);
    });
}

