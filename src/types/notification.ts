export interface notification {
  NotificationId: number;
  UserId: number;
  Message: string;
  Status: string; // "Unread", "Read"
  DateTime: string; // <-- add this
}
