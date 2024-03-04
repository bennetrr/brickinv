import { types } from 'mobx-state-tree';
import { DateTime } from 'luxon';

/**
 * Custom MST type for luxon's DateTime object that serializes to the ISO-8601 time format.
 */
const MSTDateTime = types.custom<number, DateTime>({
  name: 'DateTime',
  fromSnapshot(snapshot: number): DateTime {
    return DateTime.fromMillis(snapshot);
  },
  toSnapshot(value: DateTime): number {
    return value.toMillis()!;
  },
  isTargetType(value: DateTime | number): boolean {
    return value instanceof DateTime;
  },
  getValidationMessage(snapshot: number): string {
    const dt = DateTime.fromMillis(snapshot);
    return dt.isValid ? '' : dt.invalidExplanation!;
  }
});

export default MSTDateTime;
