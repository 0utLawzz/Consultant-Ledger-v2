export type EntryKind = "due" | "payment" | "note";

export type LedgerEntry = {
  id: string;
  date: string | null;
  folderNo: string;
  stage: string;
  tmNo: string;
  details: string;
  due: number;
  received: number;
  kind: EntryKind;
};

export type Consultant = {
  id: string;
  name: string;
  city?: string;
  phone?: string;
  notes?: string;
  /** Outstanding printed on the paper index. Null = blank in the book. */
  statedBalance: number | null;
  /** After the user edits this ledger, outstanding follows live entries. */
  live?: boolean;
  entries: LedgerEntry[];
};

export type Company = {
  name: string;
  legalName: string;
  office: string;
  bank: string;
  accountTitle: string;
  accountNo: string;
  iban: string;
};

export type SeedFile = {
  company: Company;
  consultants: Consultant[];
};
