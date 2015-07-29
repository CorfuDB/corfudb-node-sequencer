//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


declare class SimpleLogUnitServiceClient {
  input: Thrift.TJSONProtocol;
  output: Thrift.TJSONProtocol;
  seqid: number;

  constructor(input: Thrift.TJSONProtocol, output?: Thrift.TJSONProtocol);

  write(hdr: UnitServerHdr, ctnt: string[], et: ExtntMarkType): ErrorCode;

  write(hdr: UnitServerHdr, ctnt: string[], et: ExtntMarkType, callback: Function): void;

  fix(hdr: UnitServerHdr): ErrorCode;

  fix(hdr: UnitServerHdr, callback: Function): void;

  read(hdr: UnitServerHdr): ExtntWrap;

  read(hdr: UnitServerHdr, callback: Function): void;

  sync(): void;

  sync(, callback: Function): void;

  readmeta(hdr: UnitServerHdr): ExtntWrap;

  readmeta(hdr: UnitServerHdr, callback: Function): void;

  readHints(hdr: UnitServerHdr): Hints;

  readHints(hdr: UnitServerHdr, callback: Function): void;

  setHintsNext(hdr: UnitServerHdr, stream: string, nextOffset: number): ErrorCode;

  setHintsNext(hdr: UnitServerHdr, stream: string, nextOffset: number, callback: Function): void;

  setHintsTxDec(hdr: UnitServerHdr, dec: boolean): ErrorCode;

  setHintsTxDec(hdr: UnitServerHdr, dec: boolean, callback: Function): void;

  querytrim(): number;

  querytrim(, callback: Function): void;

  queryck(): number;

  queryck(, callback: Function): void;

  ckpoint(hdr: UnitServerHdr): void;

  ckpoint(hdr: UnitServerHdr, callback: Function): void;

  ping(): boolean;

  ping(, callback: Function): void;

  reset(): void;

  reset(, callback: Function): void;

  simulateFailure(fail: boolean, length: number): void;

  simulateFailure(fail: boolean, length: number, callback: Function): void;

  setEpoch(epoch: number): void;

  setEpoch(epoch: number, callback: Function): void;

  highestAddress(): number;

  highestAddress(, callback: Function): void;
}