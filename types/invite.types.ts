export interface Invite {
  id: string;

  householdId: string;

  creatorName: string;
  creatorId: string;

  recipientName: string; // The user's email if they have not registered
  recipientId?: string;

  status: "accepted" | "declined" | "pending";

  createdAt: string;
}

export interface InviteCreateRequest {
  householdId: string;
  recipientEmail: string;
}
