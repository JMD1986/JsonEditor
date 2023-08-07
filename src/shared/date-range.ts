import { Moment } from "moment";
import moment from "moment";

export type PossibleMoments = [Moment | null | string, Moment | null | string];

type HasStartAndEnd = {
  StartTime: string | null;
  EndTime: string | null;
};

export class DateTimeRange {
  constructor(
    public readonly Start: Moment | null | string,
    public readonly End: Moment | null | string
  ) {}
  public static Default(): DateTimeRange {
    return new DateTimeRange(null, null);
  }
  public static FromJson(json: any): DateTimeRange {
    return new DateTimeRange(
      json.StartTime === null ? null : moment(json.StartTime),
      json.EndTime === null ? null : moment(json.EndTime)
    );
  }
  public static FromNewJson(json: any): DateTimeRange {
    return new DateTimeRange(
      json.StartTime === null ? null : moment(json.StartTime),
      json.EndTime === null ? null : moment(json.EndTime)
    );
  }
  public static FromInMemory(inMemory: PossibleMoments): DateTimeRange {
    return new DateTimeRange(inMemory[0], inMemory[1]);
  }
  public Serialized(): HasStartAndEnd {
    if (typeof this.Start === "string" || typeof this.End === "string") {
      return {
        StartTime: this.Start === null ? null : (this.Start as string),
        EndTime: this.End === null ? null : (this.End as string),
      };
    } else {
      return {
        StartTime: this.Start === null ? null : this.Start.utc().format(),
        EndTime: this.End === null ? null : this.End.utc().format(),
      };
    }
  }
  public AsInMemory(): PossibleMoments {
    return [this.Start, this.End];
  }
}
export class NewDateTimeRange {
  constructor(
    public readonly Start: Moment | null | string,
    public readonly End: Moment | null | string,
    public readonly Type: string,
    public readonly Duration?: number,
    public readonly Cooldown?: number
  ) {}
  public static Default(): NewDateTimeRange {
    return new NewDateTimeRange(null, null, "StartEnd");
  }
  public static FromJson(json: any): NewDateTimeRange {
    return new NewDateTimeRange(
      json.StartTime === null ? null : moment(json.StartTime),
      json.EndTime === null ? null : moment(json.EndTime),
      "Unknown"
    );
  }
  public static FromInMemory(
    inMemory: PossibleMoments,
    type: string
  ): NewDateTimeRange {
    return new NewDateTimeRange(inMemory[0], inMemory[1], type);
  }
  public Serialized(): HasStartAndEnd {
    if (typeof this.Start === "string" || typeof this.End === "string") {
      return {
        StartTime: this.Start === null ? null : (this.Start as string),
        EndTime: this.End === null ? null : (this.End as string),
      };
    } else {
      return {
        StartTime: this.Start === null ? null : this.Start.utc().format(),
        EndTime: this.End === null ? null : this.End.utc().format(),
      };
    }
  }
  public AsInMemory(): PossibleMoments {
    return [this.Start, this.End];
  }
}
