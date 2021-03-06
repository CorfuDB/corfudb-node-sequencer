//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


declare class SimpleSequencerServiceClient {
  input: Thrift.TJSONProtocol;
  output: Thrift.TJSONProtocol;
  seqid: number;

  constructor(input: Thrift.TJSONProtocol, output?: Thrift.TJSONProtocol);

  nextpos(ntokens: number): number;

  nextpos(ntokens: number, callback: Function): void;

  recover(lowbound: number): void;

  recover(lowbound: number, callback: Function): void;

  simulateFailure(fail: boolean, length: number): void;

  simulateFailure(fail: boolean, length: number, callback: Function): void;

  reset(): void;

  reset(, callback: Function): void;

  ping(): boolean;

  ping(, callback: Function): void;
}
