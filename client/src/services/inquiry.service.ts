import { inquiryApi, type ApiInquiry } from "@/api/inquiry.api";
import type { ContactSubmission } from "@/types/contact.types";
import { getPersistedAuth } from "@/utils/authStorage";

function mapInquiry(raw: ApiInquiry): ContactSubmission {
  return {
    id: String(raw._id ?? raw.id ?? ""),
    ticketNumber: raw.ticketNumber,
    firstName: raw.firstName,
    lastName: raw.lastName,
    email: raw.email,
    phone: raw.phone ?? "",
    message: raw.message,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

export const inquiryService = {
  async listInquiries(): Promise<ContactSubmission[]> {
    const session = getPersistedAuth();
    if (!session?.accessToken) {
      throw new Error("Not authenticated");
    }

    const data = await inquiryApi.listInquiries(session.accessToken);
    return data.inquiries.map(mapInquiry);
  },
};
