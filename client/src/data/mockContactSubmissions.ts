import type { ContactSubmission } from "@/types/contact.types";

export const MOCK_CONTACT_SUBMISSIONS: ContactSubmission[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    message:
      "Hi Team,\n\nI am interested in learning more about the PTA indicators and would like to understand which plan would be best suited for intraday trading.\n\nThank you.",
    submittedAt: "2026-06-03T09:15:00",
    status: "unread",
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@tradeco.io",
    phone: "+44 7700 900123",
    message:
      "Hello,\n\nWe represent a prop trading firm and would like to discuss enterprise licensing for Wyckoff Wave indicators across 40 seats.\n\nPlease contact me at your earliest convenience.",
    submittedAt: "2026-06-03T08:42:00",
    status: "unread",
  },
  {
    id: "3",
    name: "Marcus Chen",
    email: "marcus.chen@gmail.com",
    phone: "+1 (415) 882-3341",
    message:
      "Interested in learning more about your indicators and whether they work on TradingView for ES futures.",
    submittedAt: "2026-06-02T16:30:00",
    status: "responded",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    email: "elena.r@volumeedge.com",
    phone: "+34 612 345 678",
    message:
      "I completed the free course and want to upgrade to lifetime access. Can you confirm what's included in the bundle?",
    submittedAt: "2026-06-02T11:05:00",
    status: "responded",
  },
  {
    id: "5",
    name: "David Park",
    email: "dpark.fx@outlook.com",
    phone: "+82 10-2345-6789",
    message:
      "Having issues accessing the Discord community after my subscription renewal. My email is the one above.",
    submittedAt: "2026-06-01T19:22:00",
    status: "unread",
  },
  {
    id: "6",
    name: "Amanda Foster",
    email: "amanda.foster@yahoo.com",
    phone: "+1 (312) 555-0198",
    message:
      "Would love a demo of the cumulative volume indicator on crypto pairs. Available for a call this week.",
    submittedAt: "2026-06-01T14:00:00",
    status: "responded",
  },
  {
    id: "7",
    name: "James Okonkwo",
    email: "j.okonkwo@protraders.ng",
    phone: "+234 803 123 4567",
    message:
      "Requesting partnership information for affiliate program in West Africa region.",
    submittedAt: "2026-05-31T09:48:00",
    status: "archived",
  },
  {
    id: "8",
    name: "Priya Sharma",
    email: "priya.sharma@indiatrade.in",
    phone: "+91 98765 43210",
    message:
      "Hi, I'm a swing trader focused on Nifty. Does your VSA course cover index futures specifically?",
    submittedAt: "2026-05-30T22:15:00",
    status: "unread",
  },
];
