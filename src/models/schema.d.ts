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

export type ShopEventContainerJson = {
  EventContainerGuid: string;
};
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
export type StartEndJson = {
  Start: DateTimeRange | null;
  End: DateTimeRange | null;
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
