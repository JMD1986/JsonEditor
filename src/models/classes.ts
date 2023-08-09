import { Dictionary } from "@reduxjs/toolkit";
import {
  TimedOfferJson,
  IAPAndPriceJson,
  NewIAPAndPriceJson,
  ShopItemJson,
  ShopShopItemJson,
  ShopShopItemUnweightedJson,
  ShopEventThemeJson,
  ShopLogicSelectorJson,
  ShopJson,
  ShopLogicJson,
  ShopLogicSetJson,
  PbwWedgeJson,
  StartEndJson,
  ShopEventContainerJson,
  PlatformIAPAndPricesJson,
  BuyOnceJson,
  NewDateTimeRangeJson,
  NewShopJson,
  NewShopLogicJson,
  NewShopLogicSetJson,
  NewTimedOfferJson,
  ShopItemInstanceJson,
  ShopItemInstanceWeightedJson,
  TimingContainerJson,
  ValidJson_2,
  ShopEventJson,
} from "./schema";
import { OrDefault, Require, D } from "./helpers";
import moment from "moment";
import { DateTimeRange, NewDateTimeRange } from "../shared/date-range";

export class TimedOffer {
  constructor(
    public readonly Duration: number,
    public readonly Cooldown: number | null
  ) {}
  public static Default(): TimedOffer {
    return new TimedOffer(0, null);
  }
  public static FromJson(json: any): TimedOffer {
    return new TimedOffer(json.Duration, json.Cooldown);
  }
  //
  public static FromNewJson(json: TimedOffer): TimedOffer {
    if (json.Cooldown !== undefined) {
      return new TimedOffer(json.Duration, json.Cooldown);
    } else {
      return TimedOffer.Default();
    }
  }
  public Serialized(): TimedOfferJson {
    return {
      Duration: OrDefault<number>(this.Duration, 0),
      Cooldown: this.Cooldown,
    };
  }
}

export class IAPAndPrice {
  constructor(
    public readonly Id: string,
    public readonly IAPIdentifier: string,
    public readonly Price: number
  ) {}
  public static Default(): IAPAndPrice {
    return new IAPAndPrice("", "", 0);
  }

  public static FromJson(json: IAPAndPriceJson): IAPAndPrice {
    Require(IAPAndPrice, json, "Id", "IAPIdentifier", "Price");

    return new IAPAndPrice(json.Id, json.IAPIdentifier, json.Price);
  }

  public Serialized(): IAPAndPriceJson {
    return {
      Id: this.Id,
      IAPIdentifier: this.IAPIdentifier,
      Price: this.Price,
    };
  }
}

export class ShopItem {
  constructor(
    public readonly Id: string,
    public readonly Chips: number,
    public readonly IAPAndPrice: IAPAndPrice
  ) {}
  public static Default(): ShopItem {
    return new ShopItem("", 0, IAPAndPrice.Default());
  }
  public static FromJson(
    json: ShopItemJson,
    iaps: IAPAndPriceJson[]
  ): ShopItem {
    Require(ShopItem, json, "Id", "Chips", "IAPAndPriceId");

    return new ShopItem(
      json.Id,
      json.Chips,
      IAPAndPrice.FromJson(
        iaps.filter((iap) => iap.Id === json.IAPAndPriceId)[0]
      )
    );
  }
  public Serialized(): ShopItemJson {
    return {
      Id: this.Id,
      Chips: this.Chips,
      IAPAndPriceId: this.IAPAndPrice.Id,
    };
  }
  public WithId(id: string): ShopItem {
    return new ShopItem(id, this.Chips, this.IAPAndPrice);
  }
}

export class ShopItemInstance {
  constructor(
    public readonly Name: string,
    public readonly PBWEnabled: boolean,
    public readonly BonusMultiplier: number | null,
    public readonly MLMTicketAmount: number | null,
    public readonly ShopItemId: string,
    public readonly RevealWeight?: number | null
  ) {}
  public static Default(): ShopItemInstance {
    return new ShopItemInstance("", false, null, null, "", null);
  }
  public static FromJson(json: ShopInstanceJsons) {
    Require(ShopItemInstance, json, "Name", "PBWEnabled", "ShopItemId");

    // if (!isWeighted(json)) {
    //   return new ShopItemInstance(
    //     json.Name,
    //     json.PBWEnabled,
    //     AtLeastNull(json.BonusMultiplier),
    //     AtLeastNull(json.MLMTicketAmount),
    //     json.ShopItemId
    //   );
    // } else if (json.RevealWeight !== null || json.RevealWeight !== undefined) {
    //   return new ShopItemInstance(
    //     json.Name,
    //     json.PBWEnabled,
    //     AtLeastNull(json.BonusMultiplier),
    //     AtLeastNull(json.MLMTicketAmount),
    //     json.ShopItemId,
    //     json.RevealWeight
    //   );
    // }
  }
  public static addOneToName(name: string) {
    return `${name}_1`;
  }
  public static alterForCloning(
    json: ShopItemInstanceWeightedJson | ShopItemInstanceJson
  ) {
    // if (!isWeighted(json)) {
    //   // console.log("shopitem isntance json", json);
    //   return new ShopItemInstance(
    //     this.addOneToName(json.Name),
    //     json.PBWEnabled,
    //     AtLeastNull(json.BonusMultiplier),
    //     AtLeastNull(json.MLMTicketAmount),
    //     json.ShopItemId
    //   );
    // } else {
    //   console.log("shopitem isntance json", json);
    //   return new ShopItemInstance(
    //     this.addOneToName(json.Name),
    //     json.PBWEnabled,
    //     AtLeastNull(json.BonusMultiplier),
    //     AtLeastNull(json.MLMTicketAmount),
    //     json.ShopItemId,
    //     json.RevealWeight
    //   );
    // }
  }

  public Serialized(): ShopShopItemJson {
    return {
      Name: this.Name,
      BonusMultiplier: this.BonusMultiplier,
      MLMTicketAmount: this.MLMTicketAmount,
      RevealWeight: this.RevealWeight,
      PBWEnabled: this.PBWEnabled,
      ShopItemId: this.ShopItemId,
    };
  }
}
export class ShopItemInstanceUnweighted {
  constructor(
    public readonly Name: string,
    public readonly PBWEnabled: boolean,
    public readonly BonusMultiplier: number | null,
    public readonly MLMTicketAmount: number | null,
    public readonly ShopItemId: string
  ) {}
  public static Default(): ShopItemInstance {
    return new ShopItemInstance("", false, null, null, "", null);
  }
  public static FromJson(json: ShopShopItemJson): ShopItemInstance {
    Require(ShopItemInstance, json, "Name", "PBWEnabled", "ShopItemId");

    return new ShopItemInstance(
      json.Name,
      json.PBWEnabled,
      AtLeastNull(json.BonusMultiplier),
      AtLeastNull(json.MLMTicketAmount),
      json.ShopItemId,
      AtLeastNull(json.RevealWeight)
    );
  }
  public Serialized(): ShopShopItemUnweightedJson {
    return {
      Name: this.Name,
      BonusMultiplier: this.BonusMultiplier,
      MLMTicketAmount: this.MLMTicketAmount,
      PBWEnabled: this.PBWEnabled,
      ShopItemId: this.ShopItemId,
    };
  }
}
//
export class ShopEventTheme {
  constructor(
    public readonly Name: string,
    public readonly ThemeId: string,
    public readonly Time: DateTimeRange
  ) {}
  public static Default(): ShopEventTheme {
    return new ShopEventTheme("", "", DateTimeRange.Default());
  }
  //
  public static FromJson(json: ShopEventThemeJson): ShopEventTheme {
    Require(ShopEventTheme, json, "Name", "ThemeId");
    return new ShopEventTheme(
      json.Name,
      json.ThemeId,
      DateTimeRange.FromJson(json)
    );
  }

  //
  public static FromNewJson(json: ShopEventThemeJson): ShopEventTheme {
    Require(ShopEventTheme, json, "Name", "ThemeId");
    if (json.StartTime !== null || json.StartTime !== null) {
      return new ShopEventTheme(
        json.Name,
        json.ThemeId,
        json.StartTime as DateTimeRange
      );
    } else {
      return ShopEventTheme.Default();
    }
  }

  public static NewSerialized(json: any): ShopEventThemeJson {
    // console.log("timing json", json);
    let timing;

    if (json.Time) {
      return {
        Name: json.Name,
        ThemeId: json.ThemeId,
        StartTime:
          json.Time.Start !== null
            ? json.Time.Start.utc().format()
            : json.Time.Start,
        EndTime:
          json.Time.End !== null ? json.Time.End.utc().format() : json.Time.End,
      };
    } else {
      return {
        Name: json.Name,
        ThemeId: json.ThemeId,
        StartTime: null,
        EndTime: null,
      };
    }
    // if (json.Time !== null) {
    //   timing = Timing.Serialized(json.Time);
    //
    // }
  }
  public Serialized(): ShopEventThemeJson {
    let Timing;
    if (this.Time !== null) {
      Timing = {
        StartTime: this.Time.Start,
        EndTime: this.Time.End,
      };
    }
    //

    return {
      Name: this.Name,
      ThemeId: this.ThemeId,
      StartTime: Timing!.StartTime,
      EndTime: Timing!.EndTime,
    };
  }
}

export class ShopLogicSelector {
  constructor(
    public readonly Value: string,
    public readonly LogicSelector: string
  ) {}
  public static Default(): ShopLogicSelector {
    return new ShopLogicSelector("", "");
  }
  public static FromNewJson(json: ShopLogicSelectorJson): ShopLogicSelector {
    return new ShopLogicSelector(json.Value, json.LogicSelector);
  }
  public static FromJson(json: ShopLogicSelectorJson): ShopLogicSelector {
    Require(ShopLogicSelector, json, "Value", "LogicSelector");
    return new ShopLogicSelector(json.Value, json.LogicSelector);
  }
  public Serialized(): ShopLogicSelectorJson {
    return {
      Value: this.Value,
      LogicSelector: this.LogicSelector,
    };
  }
}
////s
export class NewShop23 {
  constructor(
    public readonly Id: string,
    public readonly Name: string,
    public readonly ShopItemInstances: ShopInstanceJsons[],
    public readonly IsTimedOffer: boolean,
    public readonly TimedOffer?:
      | TimedOffer
      | NewTimedOfferJson
      | null
      | NewTimedOfferJson
  ) {}
  public static Default(): NewShop23 {
    return new NewShop23("", "", [ShopItemInstance.Default()], false);
  }
}
export class NewShop {
  constructor(
    public readonly Name: string,
    public readonly ShopItemInstances: ShopInstanceJsons[],
    public readonly IsTimedOffer: boolean,
    public readonly TimedOffer?:
      | TimedOffer
      | NewTimedOfferJson
      | null
      | NewTimedOfferJson
  ) {}
  public static Default(): NewShop {
    return new NewShop("", [ShopItemInstance.Default()], false);
  }
  public static Serialized(json: any) {
    if (json.TimedOffer) {
      if (
        json.TimedOffer.Duration === null &&
        json.TimedOffer.Cooldown === null
      ) {
        return {
          Name: json.Name,
          ShopItems: json.ShopItemInstances.map((j: any) =>
            ShopItemInstance.FromJson(j)
          ),
          IsTimedOffer: false,
        };
      }
      if (
        json.TimedOffer.Duration !== null &&
        json.TimedOffer.Cooldown !== null
      ) {
        return {
          Name: json.Name,
          ShopItems: json.ShopItemInstances.map((j: any) =>
            ShopItemInstance.FromJson(j)
          ),
          IsTimedOffer: true,
          TimedOffer: json.TimedOffer,
        };
      }
    } else {
      return {
        Name: json.Name,
        ShopItems: json.ShopItemInstances.map((j: any) =>
          ShopItemInstance.FromJson(j)
        ),
        IsTimedOffer: json.IsTimedOffer,
      };
    }
  }
  public static alterForCloning(json: any) {
    return new NewShop(
      json.Name,

      Array.isArray(json.ShopItemInstances)
        ? json.ShopItemInstances.map((x: any) =>
            ShopItemInstance.alterForCloning(x)
          )
        : ShopItemInstance.Default(),
      json.IsTimedOffer,
      json.TimedOffer
    );
  }
  public static returnCorrectInstances(
    shopLogic: ShopLogic,
    json: ShopItemInstance[]
  ): NewShop {
    return new NewShop(
      shopLogic.Shop.Name,
      json,
      shopLogic.Shop.IsTimedOffer,
      shopLogic.Shop.TimedOffer
    );
  }
}
//
export class Shop {
  constructor(
    public readonly Id: string,
    public readonly Name: string,
    public readonly ShopItemInstances: ShopItemInstance[],
    public readonly TimedOffer: any
  ) {}
  public static Default(): Shop {
    return new Shop("", "", [], null);
  }
  public static removeNullDurationAndCooldown(json: any) {
    if (json === null) {
      return null;
    }
    if (json.DurationMinutes === null && json.CooldownMinutes === null) {
      return null;
    } else {
      return json;
    }
  }
  //
  //
  public static NewSerialized(json: any) {
    if (json.TimedOffer) {
      if (
        (json.TimedOffer.Duration === null &&
          json.TimedOffer.Cooldown === null) ||
        (json.TimedOffer.Duration === undefined &&
          json.TimedOffer.Cooldown === undefined)
      ) {
        return {
          Name: json.Name,
          ShopItems: json.ShopItemInstances.map((j: any) =>
            ShopItemInstance.FromJson(j)
          ),
          IsTimedOffer: false,
        };
      }
      if (
        json.TimedOffer.Duration !== null &&
        json.TimedOffer.Cooldown !== null
      ) {
        return {
          Name: json.Name,
          ShopItems: json.ShopItemInstances.map((j: any) =>
            ShopItemInstance.FromJson(j)
          ),
          IsTimedOffer: true,
          TimedOffer: json.TimedOffer,
        };
      }
    } else {
      return {
        Name: json.Name,
        ShopItems: json.ShopItemInstances.map((j: any) =>
          ShopItemInstance.FromJson(j)
        ),
        IsTimedOffer: json.IsTimedOffer,
      };
    }
  }
  //
  // public static Serialized(json: NewShopJson): ShopJson {
  //   // if (json.isTimedOffer === true) {
  //   return {
  //     Name: json.Name,
  //     ShopItems: json.ShopItemInstances.map(j => ShopItemInstance.FromJson(j)),
  //     IsTimedOffer: json.IsTimedOffer,
  //     TimedOffer: json.TimedOffer
  //   };
  // }
  // tslint:disable-next-line: member-ordering
  public static FromNewJson(json: NewShopJson): NewShop {
    if (json.ShopItems) {
      return new NewShop(
        json.Name,
        json.ShopItems.map(
          (j) => ShopItemInstance.FromJson(j)
          // this is a hack TODO fix this
        ) as unknown as ShopInstanceJsons[],
        json.IsTimedOffer,
        json.TimedOffer
      ); //
    } else {
      throw new Error("Couldn't clone " + JSON.stringify(json));
    }
  }

  //   public static alterForCloning(json: NewShopJson): NewShop {
  //     if (json.ShopItems !== undefined) {
  //       return new NewShop(
  //         json.Name,
  //         json.ShopItems.map((x) => ShopItemInstance.alterForCloning(x)),
  //         json.IsTimedOffer,
  //         json.TimedOffer
  //       );
  //     } else {
  //       throw new Error("Couldn't clone " + JSON.stringify(json));
  //     }
  //   }
  //
  public Serialized(): ShopJson {
    if (this.ShopItemInstances === undefined) {
      console.log("finding error", this.Id);
    }
    if (this.Id === undefined) {
      console.log("no id");
    }
    const isTimedOffer = this.TimedOffer !== null;
    return {
      Id: this.Id,
      Name: this.Name,
      ShopItems: this.ShopItemInstances.map((j) => j.Serialized()),
      IsTimedOffer: isTimedOffer,
      // TimedOffer: isTimedOffer ? this.TimedOffer!.Serialized() : null
      // tslint:disable-next-line: no-non-null-assertion
      TimedOffer: null,
    };
  }

  public NewSerialized(): NewShopJson {
    if (this.ShopItemInstances === undefined) {
      console.log("finding error", this.Id);
    }
    if (this.Id === undefined) {
      console.log("no id");
    }
    const isTimedOffer = this.TimedOffer !== null;
    return {
      Name: this.Name,
      ShopItems: this.ShopItemInstances.map((j) => j.Serialized()),
      IsTimedOffer: isTimedOffer,
      TimedOffer: isTimedOffer ? this.TimedOffer!.NewSerialized() : null,
    };
  }
}

export class ShopLogic {
  constructor(
    public readonly Priority: number,
    public readonly Name: string,
    public readonly ShopLogicSelectors: Array<ShopLogicSelector>,
    public readonly Shop: NewShop,
    public readonly Platforms: Array<string>
  ) {}
  public static Default(): ShopLogic {
    return new ShopLogic(0, "", [], NewShop.Default(), []);
  }
  public static FromNewJson(json: NewShopLogicJson) {
    return new ShopLogic(
      json.Priority,
      json.Name,
      json.ShopLogicSelectors.map((j) => ShopLogicSelector.FromJson(j)),
      Shop.FromNewJson(json.Shop as NewShopJson),
      json.Platforms || []
    );
  }
  public Serialized(): ShopLogicJson {
    return {
      Priority: this.Priority,
      Name: this.Name,
      ShopLogicSelectors: this.ShopLogicSelectors.map((j) => j.Serialized()),
      ShopId: "",
      Platforms: this.Platforms,
    };
  }
  public WithShop(shop: NewShop) {
    return new ShopLogic(
      this.Priority,
      this.Name,
      this.ShopLogicSelectors,
      shop,
      this.Platforms
    );
  }
}
//
export class ShopLogicSetWeighted {
  constructor(
    public readonly Id: string,
    public readonly Name: string,
    public readonly ShopLogics: Array<ShopLogic>
  ) {}
  public static Default(): ShopLogicSet {
    return new ShopLogicSet("", "", []);
  }
  public static FromJson(
    json: ShopLogicSetJson,
    shops: NewShopLogicJson
  ): ShopLogicSet {
    Require(ShopLogicSet, json, "Id", "Name", "ShopLogics");
    return new ShopLogicSet(
      json.Id,
      json.Name,
      json.ShopLogics.map((j) => ShopLogic.FromNewJson(shops))
    );
  }
  public Serialized(): ShopLogicSetJson {
    return {
      Id: this.Id,
      Name: this.Name,
      ShopLogics: this.ShopLogics.map((j) => j.Serialized()),
    };
  }
  public IdentifiedBy(id: string, parent: any) {
    return new ShopLogicSet(
      id,
      `${parent.Type}${parent.Name}`,
      this.ShopLogics
    );
  }
}
export class ShopLogicSet {
  constructor(
    public readonly Id: string,
    public readonly Name: string,
    public readonly ShopLogics: Array<ShopLogic>
  ) {}
  public static Default(): ShopLogicSet {
    return new ShopLogicSet("", "", []);
  }
  public static FromNewJson(json: NewShopLogicSetJson) {
    return new ShopLogicSet(
      "",
      json.Name,
      json.ShopLogics.map((j) => ShopLogic.FromNewJson(j))
    );
  }

  public NewSerialized(): ShopLogicSetJson {
    return {
      Id: "",
      Name: this.Name,
      ShopLogics: this.ShopLogics.map((j) => j.Serialized()),
    };
  }
  public Serialized(): ShopLogicSetJson {
    return {
      Id: this.Id,
      Name: this.Name,
      ShopLogics: this.ShopLogics.map((j) => j.Serialized()),
    };
  }
  public IdentifiedBy(id: string, parent: ShopEvent) {
    return new ShopLogicSet(
      id,
      `${parent.Type}${parent.Name}`,
      this.ShopLogics
    );
  }
}

export class PbwWedge {
  constructor(
    public readonly Multiplier: number,
    public readonly Weight: number
  ) {}
  public static Default(): PbwWedge {
    return new PbwWedge(0, 0);
  }
  public static FromJson(json: PbwWedgeJson): PbwWedge {
    Require(PbwWedge, json, "Multiplier", "Weight");
    return new PbwWedge(json.Multiplier, json.Weight);
  }
  public static FromNewJson(json: PbwWedgeJson): PbwWedge {
    // json!== null
    //     ? json.map(j => PbwWedge.FromJson(j))
    //     : null,
    return new PbwWedge(json.Multiplier, json.Weight);
  }
  public Serialized(): PbwWedgeJson {
    return {
      Multiplier: this.Multiplier,
      Weight: this.Weight,
    };
  }
}
//

export class BonusMultiplier {
  constructor(
    public readonly Multiplier: number,
    public readonly DisplayType: string
  ) {}

  public static Default(): BonusMultiplier {
    return new BonusMultiplier(0, "Percent");
  }
}
export class Timing {
  public static Serialized(json: any): any {
    if (json.Type === "TimedOffer") {
      return {
        TimedOffer: {
          Start: moment(json.Start).format("YYYY-MM-DDTHH:mm:ssZ"),
          End: moment(json.End).format("YYYY-MM-DDTHH:mm:ssZ"),
          Duration: json.Duration,
          Cooldown: json.Cooldown,
        } as NewTimedOfferJson,
      };
    }
    if (json.Type === "BuyOnce") {
      return {
        BuyOnce: {
          Start: moment(json.Start).format("YYYY-MM-DDTHH:mm:ssZ"),
          End: moment(json.End).format("YYYY-MM-DDTHH:mm:ssZ"),
        } as BuyOnceJson,
      };
    }
    if ((json.Type = "StartEnd")) {
      return {
        StartEnd: {
          Start:
            json.Start === null
              ? null
              : moment(json.Start).format("YYYY-MM-DDTHH:mm:ssZ"),
          End:
            json.End === null
              ? null
              : moment(json.End).format("YYYY-MM-DDTHH:mm:ssZ"),
        } as StartEndJson,
      };
    } else {
      throw new Error(
        `unable to serialized timing dto with json.type: ${json.Type}`
      );
    }
  }

  public static convertToMoment(value: any) {
    // const newTime = moment(value);

    return value;
  }
  public static FromNewJson(json: TimingContainerJson): NewDateTimeRange {
    if (json.TimedOffer) {
      if (json.TimedOffer.Cooldown) {
        return new NewDateTimeRange(
          json.TimedOffer.Start,
          json.TimedOffer.End,
          Object.keys(json)[0],
          json.TimedOffer.Duration,
          json.TimedOffer.Cooldown
        );
      } else {
        return new NewDateTimeRange(
          json.TimedOffer.Start,
          json.TimedOffer.End,
          Object.keys(json)[0],
          json.TimedOffer.Duration
        );
      }
    }
    if (json.BuyOnce) {
      return new NewDateTimeRange(
        json.BuyOnce.Start,
        json.BuyOnce.End,
        Object.keys(json)[0]
      );
    }
    if (json.StartEnd) {
      if (json.StartEnd.Start && json.StartEnd.End) {
        return new NewDateTimeRange(
          json.StartEnd.Start,
          json.StartEnd.End,
          Object.keys(json)[0]
        );
      } else {
        return new NewDateTimeRange(
          json.StartEnd.Start ? json.StartEnd.Start : null,
          json.StartEnd.End ? json.StartEnd.End : null,
          Object.keys(json)[0]
        );
      }
    }
    throw new Error("Couldn't figure out what Timing it was");
  }
}
//
export class ShopEventWeighted {
  constructor(
    public readonly Id: string,
    public readonly Name: string,
    public readonly PlayerIds: string,
    public readonly ModGroup: number,
    public readonly ModValues: string,
    public readonly Timing: DateTimeRange,
    public readonly Platforms: Array<string> | null | undefined,
    public readonly Levels: string,
    public readonly BonusMultiplier: number | null,
    public readonly BonusMultiplierDisplayType: string | null,
    public readonly Priority: number,
    public readonly Type: string,
    public readonly PbwOverride: boolean,
    public readonly ShopLogicSet: ShopLogicSetWeighted,
    public readonly PbwWedges: Array<PbwWedge> | null,
    public readonly ShopEventThemes: ShopEventTheme[],
    public readonly DealBuyButton: string | null,
    public readonly ShopTypeSelector: string
  ) {}

  public static Default(): ShopEventWeighted {
    return new ShopEventWeighted(
      "",
      "",
      "",
      1,
      "0+",
      DateTimeRange.Default(),
      [],
      "",
      null,
      null,
      0,
      "default",
      false,
      ShopLogicSet.Default(),
      [],
      [],
      null,
      "Basic"
    );
  }
  ///
  public static FromNewJson(
    json: ShopEventContainerJson,
    id: string
  ): ShopEvent | ShopEventWeighted {
    let shopEvent;

    if (json.Basic !== undefined && json.Basic !== null) {
      if (json.Basic.Platforms !== null || json.Basic.Platforms !== undefined) {
        shopEvent = new ShopEventWeighted(
          id,
          json.Basic.Name,
          json.Basic.PlayerIds,
          json.Basic.ModGroup,
          json.Basic.ModValues,
          Timing.FromNewJson(json.Basic.Timing),
          json.Basic.Platforms,
          json.Basic.Levels,
          json.Basic.BonusMultiplier,
          json.Basic.BonusMultiplierDisplayType,
          json.Basic.Priority,
          json.Basic.Type,
          json.Basic.PbwOverride,
          ShopLogicSet.FromNewJson(json.Basic.ShopLogicSet),
          json.Basic.PbwWedges !== null && json.Basic.PbwWedges !== undefined
            ? json.Basic.PbwWedges.map((j) => PbwWedge.FromNewJson(j))
            : null,
          OrDefault<ShopEventThemeJson[]>(json.Basic.ShopEventThemes, []).map(
            (set) => ShopEventTheme.FromJson(set)
          ),
          json.Basic.DealBuyButton,
          "Basic"
        );
      }
    } else if (json.RandomSelect !== undefined && json.RandomSelect !== null) {
      shopEvent = new ShopEventWeighted(
        id,
        json.RandomSelect.Name,
        json.RandomSelect.PlayerIds,
        json.RandomSelect.ModGroup,
        json.RandomSelect.ModValues,
        Timing.FromNewJson(json.RandomSelect.Timing),
        json.RandomSelect.Platforms,
        json.RandomSelect.Levels,
        json.RandomSelect.BonusMultiplier,
        json.RandomSelect.BonusMultiplierDisplayType,
        json.RandomSelect.Priority,
        json.RandomSelect.Type,
        json.RandomSelect.PbwOverride,
        ShopLogicSet.FromNewJson(json.RandomSelect.ShopLogicSet),
        json.RandomSelect.PbwWedges !== null &&
        json.RandomSelect.PbwWedges !== undefined
          ? json.RandomSelect.PbwWedges.map((j) => PbwWedge.FromNewJson(j))
          : null,
        OrDefault<ShopEventThemeJson[]>(
          json.RandomSelect.ShopEventThemes,
          []
        ).map((set) => ShopEventTheme.FromJson(set)),
        json.RandomSelect.DealBuyButton,
        "RandomSelect"
      );
      // tslint:disable-next-line: curly
    } else if (
      json.SequencedPurchase !== undefined &&
      json.SequencedPurchase !== null
    )
      if (
        json.SequencedPurchase.Platforms !== undefined &&
        json.SequencedPurchase.Platforms !== null
      ) {
        shopEvent = new ShopEventWeighted(
          id,
          json.SequencedPurchase.Name,
          json.SequencedPurchase.PlayerIds,
          json.SequencedPurchase.ModGroup,
          json.SequencedPurchase.ModValues,
          Timing.FromNewJson(json.SequencedPurchase.Timing),
          json.SequencedPurchase.Platforms,
          json.SequencedPurchase.Levels,
          json.SequencedPurchase.BonusMultiplier,
          json.SequencedPurchase.BonusMultiplierDisplayType,
          json.SequencedPurchase.Priority,
          json.SequencedPurchase.Type,
          json.SequencedPurchase.PbwOverride,
          ShopLogicSet.FromNewJson(json.SequencedPurchase.ShopLogicSet),
          json.SequencedPurchase.PbwWedges !== null &&
          json.SequencedPurchase.PbwWedges !== undefined
            ? json.SequencedPurchase.PbwWedges.map((j) =>
                PbwWedge.FromNewJson(j)
              )
            : null,
          OrDefault<ShopEventThemeJson[]>(
            json.SequencedPurchase.ShopEventThemes,
            []
          ).map((set) => ShopEventTheme.FromJson(set)),
          json.SequencedPurchase.DealBuyButton,
          "SequencedPurchase"
        );
      }
    //@ts-ignore
    return shopEvent;
    // }
    // public Serialized(): ShopEventJson {
    //   const Timing = this.Timing.Serialized();
    //   return {
    //     Id: this.Id,
    //     Name: this.Name,
    //     PlayerIds: this.PlayerIds,
    //     ModGroup: this.ModGroup,
    //     StartTime: Timing.StartTime,
    //     EndTime: Timing.EndTime,
    //     Platforms: this.Platforms,
    //     DealBuyButton: this.DealBuyButton,
    //     ModValues: this.ModValues,
    //     Levels: this.Levels,
    //     BonusMultiplier:
    //       this.BonusMultiplier === null ? null : this.BonusMultiplier.Multiplier,
    //     BonusMultiplierDisplayType:
    //       this.BonusMultiplier === null
    //         ? "Percent"
    //         : this.BonusMultiplier.DisplayType,
    //     Priority: this.Priority,
    //     Type: this.Type,
    //     PbwOverride: this.PbwOverride,
    //     ShopLogicSetId: this.ShopLogicSet.Id,
    //     PbwWedges:
    //       this.PbwWedges === null
    //         ? null
    //         : this.PbwWedges.map(j => j.Serialized()),
    //     ShopEventThemes: this.ShopEventThemes.map(set => set.Serialized()),
    //     ShopTypeSelector: this.ShopTypeSelector
    //   };
    // }
  }
  public WithIds(eventId: string, logicSetId: string): ShopEventWeighted {
    return new ShopEventWeighted(
      eventId,
      this.Name,
      this.PlayerIds,
      this.ModGroup,
      this.ModValues,
      this.Timing,
      this.Platforms,
      this.Levels,
      this.BonusMultiplier,
      this.BonusMultiplierDisplayType,
      this.Priority,
      this.Type,
      this.PbwOverride,
      this.ShopLogicSet.IdentifiedBy(logicSetId, this),
      this.PbwWedges,
      this.ShopEventThemes,
      this.DealBuyButton,
      this.ShopTypeSelector
    );
  }
  public WithNamingPoliciesEnsured(): ShopEventWeighted {
    if (
      this.ShopLogicSet.Name.includes(this.Name) &&
      this.ShopLogicSet.Name.includes(this.Type)
    ) {
      return this;
    } else {
      return new ShopEventWeighted(
        this.Id,
        this.Name,
        this.PlayerIds,
        this.ModGroup,
        this.ModValues,
        this.Timing,
        this.Platforms,
        this.Levels,
        this.BonusMultiplier,
        this.BonusMultiplierDisplayType,
        this.Priority,
        this.Type,
        this.PbwOverride,
        this.ShopLogicSet.IdentifiedBy(this.ShopLogicSet.Id, this),
        this.PbwWedges,
        this.ShopEventThemes,
        this.DealBuyButton,
        this.ShopTypeSelector
      );
    }
  }
}
export class ShopLogics {
  public static Serialized(x: any) {
    return {
      Priority: x.Priority,
      Name: x.Name,
      ShopLogicSelectors: x.ShopLogicSelectors,
      Shop: Shop.NewSerialized(x.Shop),
      Platforms: x.Platforms,
    };
  }
}
//
export class ShopEvent {
  constructor(
    public readonly Id: string,
    public readonly Name: string,
    public readonly PlayerIds: string,
    public readonly ModGroup: number,
    public readonly ModValues: string,
    public readonly Timing: NewDateTimeRange,
    public readonly Platforms: Array<string>,
    public readonly Levels: string,
    public readonly BonusMultiplier: number | null,
    public readonly BonusMultiplierDisplayType: string | null,
    public readonly Priority: number,
    public readonly Type: string,
    public readonly PbwOverride: boolean,
    public readonly ShopLogicSet: ShopLogicSet,
    public readonly PbwWedges: Array<PbwWedge> | null,
    public readonly ShopEventThemes: ShopEventTheme[],
    public readonly DealBuyButton: string | null,
    public readonly ShopTypeSelector: string
  ) {}
  public static Default(): ShopEvent {
    return new ShopEvent(
      "",
      "",
      "",
      1,
      "0+",
      NewDateTimeRange.Default(),
      [],
      "",
      null,
      null,
      0,
      "default",
      false,
      ShopLogicSet.Default(),
      [],
      [],
      null,
      "Basic"
    );
  }
  public static FromNewJson(
    json: ShopEventContainerJson,
    id: string
  ): ShopEvent | ShopEventWeighted {
    let shopEvent;

    if (json.Basic !== undefined && json.Basic !== null) {
      if (json.Basic.Platforms !== undefined || json.Basic.Platforms !== null) {
        shopEvent = new ShopEvent(
          id,
          json.Basic.Name,
          json.Basic.PlayerIds,
          json.Basic.ModGroup,
          json.Basic.ModValues,
          Timing.FromNewJson(json.Basic.Timing),
          json.Basic.Platforms,
          json.Basic.Levels,
          json.Basic.BonusMultiplier,
          json.Basic.BonusMultiplierDisplayType,
          json.Basic.Priority,
          json.Basic.Type,
          json.Basic.PbwOverride,
          ShopLogicSet.FromNewJson(json.Basic.ShopLogicSet),
          json.Basic.PbwWedges !== null && json.Basic.PbwWedges !== undefined
            ? json.Basic.PbwWedges.map((j) => PbwWedge.FromNewJson(j))
            : null,
          OrDefault<ShopEventThemeJson[]>(json.Basic.ShopEventThemes, []).map(
            (set) => ShopEventTheme.FromJson(set)
          ),
          json.Basic.DealBuyButton,
          "Basic"
        );
      }
    } else if (json.RandomSelect !== undefined && json.RandomSelect !== null) {
      shopEvent = new ShopEventWeighted(
        id,
        json.RandomSelect.Name,
        json.RandomSelect.PlayerIds,
        json.RandomSelect.ModGroup,
        json.RandomSelect.ModValues,
        Timing.FromNewJson(json.RandomSelect.Timing),
        json.RandomSelect.Platforms,
        json.RandomSelect.Levels,
        json.RandomSelect.BonusMultiplier,
        json.RandomSelect.BonusMultiplierDisplayType,
        json.RandomSelect.Priority,
        json.RandomSelect.Type,
        json.RandomSelect.PbwOverride,
        ShopLogicSet.FromNewJson(json.RandomSelect.ShopLogicSet),
        json.RandomSelect.PbwWedges !== null &&
        json.RandomSelect.PbwWedges !== undefined
          ? json.RandomSelect.PbwWedges.map((j) => PbwWedge.FromNewJson(j))
          : null,
        OrDefault<ShopEventThemeJson[]>(
          json.RandomSelect.ShopEventThemes,
          []
        ).map((set) => ShopEventTheme.FromJson(set)),
        json.RandomSelect.DealBuyButton,
        "RandomSelect"
      );
    } else if (
      json.SequencedPurchase !== undefined &&
      json.SequencedPurchase !== null
    ) {
      shopEvent = new ShopEvent(
        id,
        json.SequencedPurchase.Name,
        json.SequencedPurchase.PlayerIds,
        json.SequencedPurchase.ModGroup,
        json.SequencedPurchase.ModValues,
        Timing.FromNewJson(json.SequencedPurchase.Timing),
        json.SequencedPurchase.Platforms,
        json.SequencedPurchase.Levels,
        json.SequencedPurchase.BonusMultiplier,
        json.SequencedPurchase.BonusMultiplierDisplayType,
        json.SequencedPurchase.Priority,
        json.SequencedPurchase.Type,
        json.SequencedPurchase.PbwOverride,
        ShopLogicSet.FromNewJson(json.SequencedPurchase.ShopLogicSet),
        json.SequencedPurchase.PbwWedges !== null &&
        json.SequencedPurchase.PbwWedges !== undefined
          ? json.SequencedPurchase.PbwWedges.map((j) => PbwWedge.FromNewJson(j))
          : null,
        OrDefault<ShopEventThemeJson[]>(
          json.SequencedPurchase.ShopEventThemes,
          []
        ).map((set) => ShopEventTheme.FromJson(set)),
        json.SequencedPurchase.DealBuyButton,
        "SequencedPurchase"
      );
    }
    //@ts-ignore
    return shopEvent;
  }

  // public Serialized(): ShopEventJson {
  //   const times = this.Timing.Serialized();
  //   return {
  //     Id: this.Id,
  //     Name: this.Name,
  //     PlayerIds: this.PlayerIds,
  //     ModGroup: this.ModGroup,
  //     StartTime: times.StartTime,
  //     EndTime: times.EndTime,
  //     Platforms: this.Platforms,
  //     DealBuyButton: this.DealBuyButton,
  //     ModValues: this.ModValues,
  //     Levels: this.Levels,
  //     BonusMultiplier:
  //       this.BonusMultiplier === null ? null : this.BonusMultiplier.Multiplier,
  //     BonusMultiplierDisplayType:
  //       this.BonusMultiplier === null
  //         ? "Percent"
  //         : this.BonusMultiplier.DisplayType,
  //     Priority: this.Priority,
  //     Type: this.Type,
  //     PbwOverride: this.PbwOverride,
  //     ShopLogicSetId: this.ShopLogicSet.Id,
  //     PbwWedges:
  //       this.PbwWedges === null
  //         ? null
  //         : this.PbwWedges.map(j => j.Serialized()),
  //     ShopEventThemes: this.ShopEventThemes.map(set => set.Serialized()),
  //     ShopTypeSelector: this.ShopTypeSelector
  //   };
  // }
  public WithIds(eventId: string, logicSetId: string): ShopEvent {
    return new ShopEvent(
      eventId,
      this.Name,
      this.PlayerIds,
      this.ModGroup,
      this.ModValues,
      this.Timing,
      this.Platforms,
      this.Levels,
      this.BonusMultiplier,
      this.BonusMultiplierDisplayType,
      this.Priority,
      this.Type,
      this.PbwOverride,
      this.ShopLogicSet.IdentifiedBy(logicSetId, this),
      this.PbwWedges,
      this.ShopEventThemes,
      this.DealBuyButton,
      this.ShopTypeSelector
    );
  }
  public WithNamingPoliciesEnsured(): ShopEvent {
    if (
      this.ShopLogicSet.Name.includes(this.Name) &&
      this.ShopLogicSet.Name.includes(this.Type)
    ) {
      return this;
    } else {
      return new ShopEvent(
        this.Id,
        this.Name,
        this.PlayerIds,
        this.ModGroup,
        this.ModValues,
        this.Timing,
        this.Platforms,
        this.Levels,
        this.BonusMultiplier,
        this.BonusMultiplierDisplayType,
        this.Priority,
        this.Type,
        this.PbwOverride,
        this.ShopLogicSet.IdentifiedBy(this.ShopLogicSet.Id, this),
        this.PbwWedges,
        this.ShopEventThemes,
        this.DealBuyButton,
        this.ShopTypeSelector
      );
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export class PlatformIAPAndPrice {
  constructor(
    public readonly StoreType: string,
    public readonly IAPAndPrices: readonly IAPAndPrice[]
  ) {}
  public static Default(): PlatformIAPAndPrice {
    return new PlatformIAPAndPrice("", []);
  }
  public static FromJson(
    json: PlatformIAPAndPricesJson,
    iaps: IAPAndPriceJson[]
  ): PlatformIAPAndPrice {
    Require(PlatformIAPAndPrice, json, "StoreType", "IAPAndPriceIds");
    return new PlatformIAPAndPrice(
      json.StoreType,
      json.IAPAndPriceIds.map((iapId) =>
        IAPAndPrice.FromJson(iaps.filter((iap) => iap.Id === iapId)[0])
      )
    );
  }
  public Serialized(): PlatformIAPAndPricesJson {
    return {
      StoreType: this.StoreType,
      IAPAndPriceIds: this.IAPAndPrices.map((iap) => iap.Id),
    };
  }
}
export class MockData {
  constructor(
    public readonly Shops: any[],
    public readonly ShopLogicSets: any[],
    public readonly ShopItems: ShopItemJson[],
    public readonly ShopEvents: ShopEventJson[],
    public readonly PlatformIAPAndPrices: any[],
    public readonly IAPAndPrices: any[],
    public readonly MaxChipsPerTransaction: number
  ) {}
  public static Default(): MockData {
    return new MockData(
      [{}],
      [ShopLogicSet.Default()],
      //@ts-ignore
      [ShopItem.Default()],
      [ShopEvent.Default()],
      [],
      [],
      0
    );
  }
}
export class ShopSystemState {
  constructor(
    public readonly ShopItems: Dictionary<ShopItem>,
    public readonly ShopEvents: Dictionary<ShopEvent | ShopEventWeighted>,
    public readonly PlatformIAPAndPrices: Dictionary<PlatformIAPAndPrice>,
    public readonly MaxChipsPerTransaction: number
  ) {}
  public static Default(): ShopSystemState {
    return new ShopSystemState({}, {}, {}, 0);
  }

  //   public static convertIaps(object: NewIapAndPriceJson) {
  //     const appleIds: string[] = [];
  //     const googleIds: string[] = [];
  //     const amazonIds: string[] = [];
  //     const facebookIds: string[] = [];
  //     object["Apple"].forEach((x) => {
  //       appleIds.push(x.Id);
  //     });
  //     object["GooglePlay"].forEach((x) => {
  //       googleIds.push(x.Id);
  //     });
  //     object["Amazon"].forEach((x) => {
  //       amazonIds.push(x.Id);
  //     });
  //     object["Facebook"].forEach((x) => {
  //       facebookIds.push(x.Id);
  //     });
  //     return [
  //       { StoreType: "Apple", IAPAndPriceIds: appleIds },
  //       { StoreType: "GooglePlay", IAPAndPriceIds: googleIds },
  //       { StoreType: "Amazon", IAPAndPriceIds: amazonIds },
  //       { StoreType: "Facebook", IAPAndPriceIds: facebookIds },
  //     ];
  //   }
  //   public static deduplicate<T, K>(array: T[], getKey: (t: T) => K): T[] {
  //     const [allFound, _] = array.reduce(
  //       ([foundItems, foundKeys], current) => {
  //         const key = getKey(current);
  //         if (foundKeys.includes(key)) {
  //           return [foundItems, foundKeys];
  //         } else {
  //           return [
  //             [...foundItems, current],
  //             [...foundKeys, key],
  //           ];
  //         }
  //       },
  //       [[], []] as [T[], K[]]
  //     );
  //     return allFound;
  //   }

  //   public static flattenValues<T>(json: Dictionary<Array<T>>): Array<T> {
  //     return D.reduce<Array<T>, Array<T>>(
  //       json,
  //       (items: Array<T>, value: Array<T>) => [...items, ...value],
  //       [] as Array<T>
  //     );
  //   }

  //

  // TODO fix types
  // tslint:disable-next-line: member-ordering
  //   public static fromNewJson(json: ValidJson_2): ShopSystemState {
  //     let pricesIap = this.deduplicate(
  //       this.flattenValues(json.PlatformIAPAndPrices),
  //       (iap) => iap.Id
  //     );
  //     let platformIap = this.convertIaps(json.PlatformIAPAndPrices as any);

  //     return new ShopSystemState(
  //       D.mapValues(json.ShopItems, (j) => ShopItem.FromJson(j, pricesIap)),
  //       D.mapValues(json.ShopEvents, (containerJson, id) =>
  //         ShopEvent.FromNewJson(containerJson, id || "")
  //       ),
  //       D.from(
  //         platformIap.map(
  //           (j) =>
  //             [j.StoreType, PlatformIAPAndPrice.FromJson(j, pricesIap)] as [
  //               string,
  //               PlatformIAPAndPrice
  //             ]
  //         )
  //       ),
  //       json.MaxChipsPerTransaction
  //     );
  //   }

  // tslint:disable-next-line: member-ordering
  public removeNullorUndefined(
    field: string | null | undefined
  ): string | null {
    if (field === null || field === undefined) {
      return "Percent";
    } else {
      return field;
    }
  }

  //   public NewSerialized(): ValidJson_2 {
  //     let MaxChipsPerTransaction: number; // positive integer
  //     let ShopEvents: Dictionary<ShopEventContainerJson> = {}; // Keys are the 'Id' field from the old schema
  //     let ShopItems: Dictionary<ShopItemJson> = D.mapValues<
  //       ShopItem,
  //       ShopItemJson
  //     >(this.ShopItems, (si) => ({
  //       Id: si.Id,
  //       Chips: si.Chips,
  //       IAPAndPriceId: si.IAPAndPrice.Id,
  //     })); // Keys are the 'Id' field from the old schema
  //     let PlatformIAPAndPrices: Dictionary<IAPAndPriceJson[]> = {};

  //     ShopEvents = D.mapValues<
  //       ShopEvent | ShopEventWeighted,
  //       ShopEventContainerJson
  //     >(this.ShopEvents, (se) => {
  //       let body;
  //       body = {
  //         Name: se.Name,
  //         PlayerIds: se.PlayerIds,
  //         ModGroup: se.ModGroup,
  //         ModValues: se.ModValues,
  //         ShopLogicSet: {
  //           // Name: se.ShopLogicSet.Name,
  //           Name: se.ShopLogicSet.Name,
  //           ShopLogics: se.ShopLogicSet.ShopLogics.map((x) =>
  //             ShopLogics.Serialized(x)
  //           ) as NewShopLogicJson[],
  //         },
  //         ////
  //         // ShopLogics: ShopLogics.Serialized(se.ShopLogicSet.ShopLogics)},
  //         Timing: Timing.Serialized(se.Timing as NewDateTimeRangeJson),
  //         Platforms: se.Platforms,
  //         Levels: se.Levels,
  //         BonusMultiplier: se.BonusMultiplier,
  //         BonusMultiplierDisplayType: this.removeNullorUndefined(
  //           se.BonusMultiplierDisplayType
  //         ),
  //         Priority: se.Priority,
  //         Type: se.Type,
  //         PbwOverride: se.PbwOverride,
  //         PbwWedges: se.PbwWedges,
  //         ShopEventThemes:
  //           se.ShopEventThemes !== [] || se.ShopEventThemes !== null
  //             ? se.ShopEventThemes.map((x) => ShopEventTheme.NewSerialized(x))
  //             : null,
  //         // ShopEventThemes: se.ShopEventThemes,

  //         DealBuyButton: se.DealBuyButton,
  //       };

  //       switch (se.ShopTypeSelector) {
  //         case "Basic":
  //           return { Basic: body };
  //         case "RandomSelect":
  //           return { RandomSelect: body };
  //         case "SequencedPurchase":
  //           return { SequencedPurchase: body };
  //         default:
  //           throw new Error();
  //       }
  //     });

  //     // PlatformIAPAndPrices
  //     for (let [key, value] of Object.entries(this.PlatformIAPAndPrices)) {
  //       PlatformIAPAndPrices[key] = value.IAPAndPrices.map((_) => {
  //         return _;
  //       });
  //     }
  //     MaxChipsPerTransaction = this.MaxChipsPerTransaction;
  //     return {
  //       ShopItems: ShopItems,
  //       ShopEvents: ShopEvents,
  //       PlatformIAPAndPrices: PlatformIAPAndPrices,
  //       MaxChipsPerTransaction: MaxChipsPerTransaction,
  //     };
  //   }
}

export type ShopInstanceJsons = ShopItemInstanceUnweighted | ShopItemInstance;
export function isWeighted(
  testJson: ShopInstanceJsons
): testJson is ShopItemInstanceUnweighted {
  //@ts-ignore
  return testJson["RevealWeight"] !== undefined;
}
function AtLeastNull(BonusMultiplier: any): number | null {
  throw new Error("Function not implemented.");
}
