export default interface IUser {
  uuid: string;                // uuid generado
  fullName?: string;           // puede ser null en la BD
  email: string;               // NOT NULL y UNIQUE
  ficha: number;               // NOT NULL y UNIQUE
  uuidRole: string;            // NOT NULL
  uuidPermisions?: string;     // puede ser null
  status?: boolean;            // puede ser null
  startDate: Date;             // NOT NULL
  area: string;                // NOT NULL (uuid de otra tabla)
  twoFactor?: string;          // puede ser null
  password: string;
  salt: string;
  auditUsers: string;
}