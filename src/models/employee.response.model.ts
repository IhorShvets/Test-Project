import { EmployeeModel } from './employee.model';

export class EmployeeResponseModel {
  public status: string;
  public data: EmployeeModel;
  public message: string;
}
