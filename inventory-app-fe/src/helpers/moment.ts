import moment, { MomentInput } from 'moment';

export const toDateTime = (value: MomentInput, format: string): string => {
  const momentObject = moment(value);
  if (!momentObject.isValid()) return '-';

  return momentObject.format(format);
};
