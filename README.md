# corfudb-node-sequencer

This is a streaming sequencer for CorfuDB written in Node.js (specifically, TypeScript).

## Prerequisites

Before using this server, you need Node.js installed.

On Debian-based systems, this is something like:

```
$ sudo apt-get install nodejs nodejs-legacy npm
```

On OS X, this is something like:
```
$ brew install node
```

## Installation

Installation is easy - just install via the node package manager (npm):

```
$ sudo npm install -g corfudb-node-sequencer
```

This will install the **corfudb-node-sequencer** command. To run the sequencer,
specify the port you want to serve on as below:

```
$ corfudb-node-sequencer serve 9000
```

The installation also includes a benchmarking utility which is invoked via the
**corfudb-node-sequencer-benchmark** command. This utility can benchmark any 
corfudb streaming sequencer running under the Thrift protocol.

To run it, give it the port the number to run against:
```
$ corfudb-node-sequencer-benchmark 9000
```

## Building the server

The server is implemented in TypeScript, and the sources 
