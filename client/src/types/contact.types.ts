export type ContactStatus = "unread" | "responded" | "archived";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  status: ContactStatus;
};
