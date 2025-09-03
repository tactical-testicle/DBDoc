export default interface IAudit {
  uuid: string;
  uuidUser: string;
  uuidDocument: string;
  what: string;
  when: Date;
}