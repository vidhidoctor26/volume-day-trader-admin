/** Contact inquiry as returned by GET /api/inquiries */
export type ContactSubmission = {
  id: string;
  ticketNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type InquiryDateFilter = "all" | "today" | "week";
