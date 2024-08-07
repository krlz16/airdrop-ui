/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export type AirdropInfoStruct = {
  airdropName: string;
  airdropAddress: AddressLike;
  totalAirdropAmount: BigNumberish;
  airdropAmountLeft: BigNumberish;
  claimAmount: BigNumberish;
  expirationDate: BigNumberish;
  airdropType: BigNumberish;
};

export type AirdropInfoStructOutput = [
  airdropName: string,
  airdropAddress: string,
  totalAirdropAmount: bigint,
  airdropAmountLeft: bigint,
  claimAmount: bigint,
  expirationDate: bigint,
  airdropType: bigint
] & {
  airdropName: string;
  airdropAddress: string;
  totalAirdropAmount: bigint;
  airdropAmountLeft: bigint;
  claimAmount: bigint;
  expirationDate: bigint;
  airdropType: bigint;
};

export interface CustomAirdrop1155MerkleInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "claim"
      | "claimedLeaf"
      | "getAirdropAmountLeft"
      | "getAirdropInfo"
      | "getBalance"
      | "getExpirationDate"
      | "getTotalAirdropAmount"
      | "hasBeenTotallyClaimed"
      | "hasClaimed"
      | "hasExpired"
      | "onERC1155Received"
      | "owner"
      | "renounceOwnership"
      | "root"
      | "setRoot"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "Claim" | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "claim",
    values: [AddressLike, BigNumberish, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimedLeaf",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAirdropAmountLeft",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAirdropInfo",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getExpirationDate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalAirdropAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "hasBeenTotallyClaimed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "hasClaimed",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasExpired",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "root", values?: undefined): string;
  encodeFunctionData(functionFragment: "setRoot", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimedLeaf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAirdropAmountLeft",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAirdropInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getExpirationDate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalAirdropAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasBeenTotallyClaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hasClaimed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasExpired", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "root", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRoot", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace ClaimEvent {
  export type InputTuple = [recipient: AddressLike, amount: BigNumberish];
  export type OutputTuple = [recipient: string, amount: bigint];
  export interface OutputObject {
    recipient: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CustomAirdrop1155Merkle extends BaseContract {
  connect(runner?: ContractRunner | null): CustomAirdrop1155Merkle;
  waitForDeployment(): Promise<this>;

  interface: CustomAirdrop1155MerkleInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  claim: TypedContractMethod<
    [user: AddressLike, amount: BigNumberish, proof: BytesLike[]],
    [void],
    "nonpayable"
  >;

  claimedLeaf: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;

  getAirdropAmountLeft: TypedContractMethod<[], [bigint], "view">;

  getAirdropInfo: TypedContractMethod<[], [AirdropInfoStructOutput], "view">;

  getBalance: TypedContractMethod<[], [bigint], "view">;

  getExpirationDate: TypedContractMethod<[], [bigint], "view">;

  getTotalAirdropAmount: TypedContractMethod<[], [bigint], "view">;

  hasBeenTotallyClaimed: TypedContractMethod<[], [boolean], "view">;

  hasClaimed: TypedContractMethod<[_address: AddressLike], [boolean], "view">;

  hasExpired: TypedContractMethod<[], [boolean], "view">;

  onERC1155Received: TypedContractMethod<
    [
      operator: AddressLike,
      from: AddressLike,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike
    ],
    [string],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  root: TypedContractMethod<[], [string], "view">;

  setRoot: TypedContractMethod<[_root: BytesLike], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<
    [user: AddressLike, amount: BigNumberish, proof: BytesLike[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claimedLeaf"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "getAirdropAmountLeft"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getAirdropInfo"
  ): TypedContractMethod<[], [AirdropInfoStructOutput], "view">;
  getFunction(
    nameOrSignature: "getBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getExpirationDate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTotalAirdropAmount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "hasBeenTotallyClaimed"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "hasClaimed"
  ): TypedContractMethod<[_address: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "hasExpired"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "onERC1155Received"
  ): TypedContractMethod<
    [
      operator: AddressLike,
      from: AddressLike,
      id: BigNumberish,
      value: BigNumberish,
      data: BytesLike
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "root"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "setRoot"
  ): TypedContractMethod<[_root: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "Claim"
  ): TypedContractEvent<
    ClaimEvent.InputTuple,
    ClaimEvent.OutputTuple,
    ClaimEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "Claim(address,uint256)": TypedContractEvent<
      ClaimEvent.InputTuple,
      ClaimEvent.OutputTuple,
      ClaimEvent.OutputObject
    >;
    Claim: TypedContractEvent<
      ClaimEvent.InputTuple,
      ClaimEvent.OutputTuple,
      ClaimEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
