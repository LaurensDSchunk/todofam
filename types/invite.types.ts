export interface Invite {
  id: string;
  houseId: string;
  houseName: string;
  recipientEmail: string;
  status: "Accepted" | "Declined" | "Pending";
  createdAt: string;
}
