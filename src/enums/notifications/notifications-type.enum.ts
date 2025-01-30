export enum NotificationsType {
  ERROR = "error",
  SUCCESS = "success",
  // the below protocol is required to show warning in toast and avoid type error
  // since warning can not be passed to provider, we need to pass it as progress
  // in provider it will be converted to warning
  WARNING = "progress",
}
