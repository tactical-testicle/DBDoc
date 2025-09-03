export default interface IDocument {
  uuid: string;
  uuidUser: string;
  date: Date;
  uuidTypeDocument: string;
  record: string;
  folioSSESFI: string;
  affair: string;
  uuidStatus: string;
  documentDir?: string;
  documentRelation: string[];
  uuidAgreement: string;
  uuidResponsible?: string;
}