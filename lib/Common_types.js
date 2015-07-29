//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = module.exports = {};
ttypes.ErrorCode = {
  'OK' : 0,
  'ERR_OVERWRITE' : 1,
  'ERR_TRIMMED' : 2,
  'ERR_UNWRITTEN' : 3,
  'ERR_BADPARAM' : 4,
  'ERR_FULL' : 5,
  'ERR_IO' : 6,
  'OK_SKIP' : 7,
  'ERR_STALEEPOCH' : 8
};
ttypes.ExtntMarkType = {
  'EX_EMPTY' : 0,
  'EX_FILLED' : 1,
  'EX_TRIMMED' : 2,
  'EX_SKIP' : 3
};
ExtntInfo = module.exports.ExtntInfo = function(args) {
  this.metaFirstOff = null;
  this.metaLength = null;
  this.flag = 1;
  if (args) {
    if (args.metaFirstOff !== undefined) {
      this.metaFirstOff = args.metaFirstOff;
    }
    if (args.metaLength !== undefined) {
      this.metaLength = args.metaLength;
    }
    if (args.flag !== undefined) {
      this.flag = args.flag;
    }
  }
};
ExtntInfo.prototype = {};
ExtntInfo.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.metaFirstOff = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.metaLength = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.flag = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ExtntInfo.prototype.write = function(output) {
  output.writeStructBegin('ExtntInfo');
  if (this.metaFirstOff !== null && this.metaFirstOff !== undefined) {
    output.writeFieldBegin('metaFirstOff', Thrift.Type.I64, 1);
    output.writeI64(this.metaFirstOff);
    output.writeFieldEnd();
  }
  if (this.metaLength !== null && this.metaLength !== undefined) {
    output.writeFieldBegin('metaLength', Thrift.Type.I32, 2);
    output.writeI32(this.metaLength);
    output.writeFieldEnd();
  }
  if (this.flag !== null && this.flag !== undefined) {
    output.writeFieldBegin('flag', Thrift.Type.I32, 3);
    output.writeI32(this.flag);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Hints = module.exports.Hints = function(args) {
  this.err = null;
  this.nextMap = null;
  this.txDec = null;
  if (args) {
    if (args.err !== undefined) {
      this.err = args.err;
    }
    if (args.nextMap !== undefined) {
      this.nextMap = args.nextMap;
    }
    if (args.txDec !== undefined) {
      this.txDec = args.txDec;
    }
  }
};
Hints.prototype = {};
Hints.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.err = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.MAP) {
        var _size0 = 0;
        var _rtmp34;
        this.nextMap = {};
        var _ktype1 = 0;
        var _vtype2 = 0;
        _rtmp34 = input.readMapBegin();
        _ktype1 = _rtmp34.ktype;
        _vtype2 = _rtmp34.vtype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var key6 = null;
          var val7 = null;
          key6 = input.readString();
          val7 = input.readI64();
          this.nextMap[key6] = val7;
        }
        input.readMapEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.BOOL) {
        this.txDec = input.readBool();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Hints.prototype.write = function(output) {
  output.writeStructBegin('Hints');
  if (this.err !== null && this.err !== undefined) {
    output.writeFieldBegin('err', Thrift.Type.I32, 1);
    output.writeI32(this.err);
    output.writeFieldEnd();
  }
  if (this.nextMap !== null && this.nextMap !== undefined) {
    output.writeFieldBegin('nextMap', Thrift.Type.MAP, 2);
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.I64, Thrift.objectLength(this.nextMap));
    for (var kiter8 in this.nextMap)
    {
      if (this.nextMap.hasOwnProperty(kiter8))
      {
        var viter9 = this.nextMap[kiter8];
        output.writeString(kiter8);
        output.writeI64(viter9);
      }
    }
    output.writeMapEnd();
    output.writeFieldEnd();
  }
  if (this.txDec !== null && this.txDec !== undefined) {
    output.writeFieldBegin('txDec', Thrift.Type.BOOL, 3);
    output.writeBool(this.txDec);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ExtntWrap = module.exports.ExtntWrap = function(args) {
  this.err = null;
  this.inf = null;
  this.ctnt = null;
  if (args) {
    if (args.err !== undefined) {
      this.err = args.err;
    }
    if (args.inf !== undefined) {
      this.inf = args.inf;
    }
    if (args.ctnt !== undefined) {
      this.ctnt = args.ctnt;
    }
  }
};
ExtntWrap.prototype = {};
ExtntWrap.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.err = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.inf = new ttypes.ExtntInfo();
        this.inf.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.LIST) {
        var _size10 = 0;
        var _rtmp314;
        this.ctnt = [];
        var _etype13 = 0;
        _rtmp314 = input.readListBegin();
        _etype13 = _rtmp314.etype;
        _size10 = _rtmp314.size;
        for (var _i15 = 0; _i15 < _size10; ++_i15)
        {
          var elem16 = null;
          elem16 = input.readBinary();
          this.ctnt.push(elem16);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ExtntWrap.prototype.write = function(output) {
  output.writeStructBegin('ExtntWrap');
  if (this.err !== null && this.err !== undefined) {
    output.writeFieldBegin('err', Thrift.Type.I32, 1);
    output.writeI32(this.err);
    output.writeFieldEnd();
  }
  if (this.inf !== null && this.inf !== undefined) {
    output.writeFieldBegin('inf', Thrift.Type.STRUCT, 2);
    this.inf.write(output);
    output.writeFieldEnd();
  }
  if (this.ctnt !== null && this.ctnt !== undefined) {
    output.writeFieldBegin('ctnt', Thrift.Type.LIST, 3);
    output.writeListBegin(Thrift.Type.STRING, this.ctnt.length);
    for (var iter17 in this.ctnt)
    {
      if (this.ctnt.hasOwnProperty(iter17))
      {
        iter17 = this.ctnt[iter17];
        output.writeBinary(iter17);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

UnitServerHdr = module.exports.UnitServerHdr = function(args) {
  this.epoch = null;
  this.off = null;
  this.streamID = null;
  if (args) {
    if (args.epoch !== undefined) {
      this.epoch = args.epoch;
    }
    if (args.off !== undefined) {
      this.off = args.off;
    }
    if (args.streamID !== undefined) {
      this.streamID = args.streamID;
    }
  }
};
UnitServerHdr.prototype = {};
UnitServerHdr.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.LIST) {
        var _size18 = 0;
        var _rtmp322;
        this.epoch = [];
        var _etype21 = 0;
        _rtmp322 = input.readListBegin();
        _etype21 = _rtmp322.etype;
        _size18 = _rtmp322.size;
        for (var _i23 = 0; _i23 < _size18; ++_i23)
        {
          var elem24 = null;
          elem24 = input.readI32();
          this.epoch.push(elem24);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I64) {
        this.off = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.streamID = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

UnitServerHdr.prototype.write = function(output) {
  output.writeStructBegin('UnitServerHdr');
  if (this.epoch !== null && this.epoch !== undefined) {
    output.writeFieldBegin('epoch', Thrift.Type.LIST, 1);
    output.writeListBegin(Thrift.Type.I32, this.epoch.length);
    for (var iter25 in this.epoch)
    {
      if (this.epoch.hasOwnProperty(iter25))
      {
        iter25 = this.epoch[iter25];
        output.writeI32(iter25);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.off !== null && this.off !== undefined) {
    output.writeFieldBegin('off', Thrift.Type.I64, 2);
    output.writeI64(this.off);
    output.writeFieldEnd();
  }
  if (this.streamID !== null && this.streamID !== undefined) {
    output.writeFieldBegin('streamID', Thrift.Type.STRING, 3);
    output.writeString(this.streamID);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};
