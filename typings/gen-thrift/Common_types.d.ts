//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


declare enum ErrorCode {
  'OK' = 0,
  'ERR_OVERWRITE' = 1,
  'ERR_TRIMMED' = 2,
  'ERR_UNWRITTEN' = 3,
  'ERR_BADPARAM' = 4,
  'ERR_FULL' = 5,
  'ERR_IO' = 6,
  'OK_SKIP' = 7,
  'ERR_STALEEPOCH' = 8,
}

declare enum ExtntMarkType {
  'EX_EMPTY' = 0,
  'EX_FILLED' = 1,
  'EX_TRIMMED' = 2,
  'EX_SKIP' = 3,
}

declare class ExtntInfo {
  metaFirstOff: number;
  metaLength: number;
  flag: ExtntMarkType;

  constructor(args?: { metaFirstOff: number; metaLength: number; flag: ExtntMarkType; });
}

declare class Hints {
  err: ErrorCode;
  nextMap: { [k: string]: number; };
  txDec: boolean;

  constructor(args?: { err: ErrorCode; nextMap: { [k: string]: number; }; txDec: boolean; });
}

declare class ExtntWrap {
  err: ErrorCode;
  inf: ExtntInfo;
  ctnt: string[];

  constructor(args?: { err: ErrorCode; inf: ExtntInfo; ctnt: string[]; });
}

declare class UnitServerHdr {
  epoch: number[];
  off: number;
  streamID: string;

  constructor(args?: { epoch: number[]; off: number; streamID: string; });
}
