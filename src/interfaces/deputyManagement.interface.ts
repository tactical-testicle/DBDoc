export default interface IDeputyManagement {
  uuid: string;           // uuid generado
  name: string;           // NOT NULL
  uuidManagement: string; // NOT NULL (relación con MANAGEMENT)
}