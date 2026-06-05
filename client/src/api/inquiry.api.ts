import { INQUIRY_API_PREFIX } from "@/api/config";
import { apiRequest } from "@/api/http.client";

export { ApiError as InquiryApiError } from "@/api/http.client";

export type ApiInquiry = {
  _id?: string;
  id?: string;
  ticketNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

type ListInquiriesResponse = {
  count: number;
  inquiries: ApiInquiry[];
};

export const inquiryApi = {
  listInquiries(token: string) {
    return apiRequest<ListInquiriesResponse>(INQUIRY_API_PREFIX, { token });
  },
};
