export interface Invite {
  id: string;

  householdId: string;

  creatorName: string;
  creatorId: string;

  recipientName: string;

  status: "Accepted" | "Declined" | "Pending";

  createdAt: string;
}

export interface InviteCreateRequest {
  householdId: string;
  recipientEmail: string;
}
