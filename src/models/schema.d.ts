import { BonusMultiplier } from "./shop-state";
import { DateTimeRange } from "@app/shared/date-range/date-range";
import { NewTimedOfferOverrideJson } from "./new-schema";

export type ShopJson = {
  Id: string;
  Name: string;
  ShopItems: Array<ShopShopItemJson>;
  IsTimedOffer: boolean;
  TimedOffer: TimedOfferJson | NewTimedOfferOverrideJson | null;
};

export type PbwWedgeJson = {
  Multiplier: number;
  Weight: number;
};

export type ShopEventThemeJson = {
  Name: string;
  ThemeId: string;
  StartTime: DateTimeRange | string | null;
  EndTime: DateTimeRange | string | null;
};
export type TimedOfferJson = {
  Duration: number;
  Cooldown: number | null;
};
//
//TODO grab third eventcontainerguid
export type ShopTypes = Basic | RandomSelect | SequencedPurchase;

export type Basic = {};
export type RandomSelect = {};
export type SequencedPurchase = {};

// export type ShopEventContainerJson = {
//   EventContainerGuid: string;
// };
export type ShopLogicJson = {
  Priority: number;
  Name: string;
  ShopLogicSelectors: Array<ShopLogicSelectorJson>;
  ShopId: string;
  Platforms: Array<string> | null;
};
export type ShopLogicSelectorJson = {
  Value: string;
  LogicSelector: string;
};
export type ShopLogicSetJson = {
  Id: string;
  Name: string;
  ShopLogics: Array<ShopLogicJson>;
};
export type ShopShopItemJson = {
  Name: string;
  BonusMultiplier: number | null;
  MLMTicketAmount: number | null;
  PBWEnabled: boolean;
  ShopItemId: string;
  RevealWeight: any;
};
export type ShopShopItemUnweightedJson = {
  Name: string;
  BonusMultiplier: number | null;
  MLMTicketAmount: number | null;
  PBWEnabled: boolean;
  ShopItemId: string;
};
export type PlatformIAPAndPricesJson = {
  StoreType: string;
  IAPAndPriceIds: Array<String>;
};
export type IAPAndPriceJson = {
  Id: string;
  IAPIdentifier: string;
  Price: number;
};
export type ShopItemJson = {
  Id: string;
  Chips: number;
  IAPAndPriceId: string;
};
export type TimingJson = {
  Timing: TimingUnion;
};

export type TimingUnion = StartEndJson | TimedOfferJson;

export type ShopEventJson = {
  Id: string;
  Name: string;
  PlayerIds: string;
  ModGroup: number;
  ModValues: string;
  StartTime: string | null;
  EndTime: string | null;
  Platforms: Array<string> | null | undefined;
  Levels: string;
  BonusMultiplier: number | null;
  BonusMultiplierDisplayType: string | null;
  Priority: number;
  Type: string;
  PbwOverride: boolean;
  ShopLogicSetId: string;
  PbwWedges: Array<PbwWedgeJson> | null;
  ShopEventThemes: ShopEventThemeJson[] | null; // turn to null later
  DealBuyButton: string | null;
  ShopTypeSelector: string;
};
//
export type ValidJson = {
  Shops: Array<ShopJson>;
  ShopLogicSets: Array<ShopLogicSetJson>;
  ShopItems: Array<ShopItemJson>;
  ShopEvents: Array<ShopEventJson>;
  PlatformIAPAndPrices: Array<PlatformIAPAndPricesJson>;
  IAPAndPrices: Array<IAPAndPriceJson>;
  MaxChipsPerTransaction: number;
};

type Dictionary<T> = { [key: string]: T };

export type NewTimedOfferJson = {
  // Note: These dates are not nullable, always required
  Start: string; // Convert to DateTime/Moment in memory
  End: string; // Convert to DateTime/Moment in memory
  Duration: number; // Positive integer
  Cooldown?: number | null; // Optional/nullable positive integer
};

export type BuyOnceJson = {
  // Note: These dates are not nullable, always required
  Start: string; // Convert to DateTime/Moment in memory
  End: string; // Convert to DateTime/Moment in memory
};

export type StartEndJson = {
  // Start?: string | null | DateTimeRange; // Optional/nullable, convert to nullable DateTime/Moment
  // End?: string | null | DateTimeRange; // Optional/nullable, convert to nullable DateTime/Moment
  Start?: string | null; // Optional/nullable, convert to nullable DateTime/Moment
  End?: string | null; // Optional/nullable, convert to nullable DateTime/Moment
};

// This produces:
// export type Timings = StartEnd | TimedOffer | BuyOnce
// Exactly one of them should be defined at all times - it is an error otherwise
export type TimingContainerJson = {
  TimedOffer?: NewTimedOfferJson | null;
  BuyOnce?: BuyOnceJson | null;
  StartEnd?: StartEndJson | null;
};

// This is what Shops have, not full Timed Offers

export type LogicSelectorJson = {
  Value: string;
  LogicSelector: string; // Enum, pull legitimate values from server-facing service
};

// export type PbwWedgeJson = {
//   Multiplier: number; // Positive integer
//   Weight: number; // Positive integer
// };

export type BonusMultiplierJson = {
  Multiplier: number; // Positive integer
  DisplayType: string; // Enum, pull legitimate values from server-facing service
};

export type ShopThemeJson = {
  Name: string;
  ThemeId: string;
  StartTime?: string | null; // Optional/nullable, convert to nullable DateTime/Moment
  EndTime?: string | null; // Optional/nullable, convert to nullable DateTime/Moment
};

export type ShopItemInstanceJson = {
  Name: string;
  ShopItemId: string; // Key from ShopItems dictionary
  PBWEnabled: boolean;
  MLMTicketAmount?: number | null; // Positive integer
  BonusMultiplier?: number | null; // Positive number
};

export type NewDateTimeRangeJson = {
  Start: Moment | null;
  End: Moment | null;
  Type: string;
  Duration?: number;
  Cooldown?: number;
};

export type NewShopJson = {
  Name: string;
  ShopItems: ShopInstanceJsons[];
  IsTimedOffer: boolean; // Should only be true if TimedOffer is supplied
  TimedOffer?: NewTimedOfferOverrideJson | null; // Should only be supplied if IsTimedOffer is true
};

export type NewShopLogicJson = {
  Name: string;
  Priority: number; // Positive integer
  ShopLogicSelectors: LogicSelectorJson[];
  Shop: NewShopJson;
  Platforms?: string[] | null; // values are from the keys for PlatformIAPAndPrices - default to empty array if missing
};

export type NewShopLogicSetJson = {
  Name: string;
  ShopLogics: NewShopLogicJson[];
};

export type NewShopEventJson = {
  Name: string;
  PlayerIds: string; // Actually an array - comma-separated values packed into a string
  ModGroup: number; // positive integer
  ModValues: string;
  Levels: string;
  BonusMultiplier: number | null;
  BonusMultiplierDisplayType: string | null;
  Priority: number; // Positive Integer
  Timing: TimingContainerJson;
  // Platforms?: string[] | null | undefined; // values are from the keys for PlatformIAPAndPrices - default to empty array if missing
  Platforms?: any; // values are from the keys for PlatformIAPAndPrices - default to empty array if missing
  Type: string;
  PbwOverride: boolean;
  PbwWedges?: PbwWedgeJson[] | null; // Optional value, turn into an empty array if it's missing - also, turn an empty array into null on serialize
  ShopLogicSet: NewShopLogicSetJson;
  ShopEventThemes: ShopEventThemeJson[];
  DealBuyButton: string | null; // nullable enum - get the values from the server-facing service
};

export type ShopItemInstanceWeightedJson = {
  Name: string;
  ShopItemId: string; // Key from ShopItems dictionary
  PBWEnabled: boolean;
  RevealWeight: number; // Positive Integer
  MLMTicketAmount?: number | null; // Positive integer
  BonusMultiplier?: number | null; // Positive number
};

export type ShopWeightedJson = {
  Name: string;
  ShopItems: ShopItemInstanceWeightedJson[];
  IsTimedOffer: boolean; // Should only be true if TimedOffer is supplied
  TimedOffer?: NewTimedOfferOverrideJson | null; // Should only be supplied if IsTimedOffer is true
};

export type ShopLogicWeightedJson = {
  Name: string;
  Priority: number; // Positive integer
  ShopLogicSelectors: LogicSelectorJson[];
  Shop: ShopWeightedJson;
  Platforms?: string[] | null; // values are from the keys for PlatformIAPAndPrices - default to empty array if missing
};

export type ShopLogicSetWeightedJson = {
  Name: string;
  ShopLogics: ShopLogicWeightedJson[];
};

export type NewShopEventWeightedJson = {
  Name: string;
  PlayerIds: string; // Actually an array - comma-separated values packed into a string
  ModGroup: number; // positive integer
  ModValues: string;
  Levels: string;
  BonusMultiplier: number | null;
  BonusMultiplierDisplayType: string | null;
  Priority: number; // Positive Integer
  Timing: TimingContainerJson;
  Platforms: string[]; // values are from the keys for PlatformIAPAndPrices
  Type: string;
  PbwOverride: boolean;
  PbwWedges?: PbwWedgeJson[] | null; // Optional value, turn into an empty array if it's missing - also, turn an empty array into null on serialize
  ShopLogicSet: ShopLogicSetWeightedJson;
  ShopEventThemes: any;
  DealBuyButton: string | null; // nullable enum - get the values from the server-facing service
};

// Exactly one of these will be populated
// This makes one of
// export type ShopEvent = Basic | RandomSelect | SequencedPurchase
// Where Basic and SequencePurchase don't allow reveal weights but RandomSelect does

// The difference between the Json and WeightedJson pathways is at the ShopItemInstance level - whether they
// support Reveal Weights or not. We may be able to build controls and forms based around
// type AgnosticShopEvent = newShopEventJson | ShopEventWeightedJson
// and, down at the ShopItemInstance form, then decide whether to include the RevealWeights control or not
export type ShopEventContainerJson = {
  Basic?: NewShopEventJson | null;
  RandomSelect?: NewShopEventWeightedJson | null;
  SequencedPurchase?: NewShopEventJson | null;
};

// export type ShopItemJson = {
//   Id: string; // ShortGuid - matches the key on the Dictionary that contains them, provided here as well
//   Chips: number; // positive integer
//   IAPAndPriceId: string; // Reference into the PlatformIAPAndPrices set
// };

export type NewIAPAndPriceJson = {
  Id: string;
  IAPIdentifier: string; // com.playstudios.konami.x format
  Price: number; // Decimal-format dollars
};

export type ValidJson_2 = {
  MaxChipsPerTransaction: number; // positive integer
  ShopEvents: Dictionary<ShopEventContainerJson>; // Keys are the 'Id' field from the old schema
  ShopItems: Dictionary<ShopItemJson>; // Keys are the 'Id' field from the old schema
  PlatformIAPAndPrices: Dictionary<IAPAndPriceJson[]>; // Keys are the names of the stores ('Apple', 'GooglePlay', 'Amazon', 'Facebook')
};
