import {RoleModel} from "./role.model";

export class UserModel {
  private readonly _id: string;
  private readonly _firstName: string;
  private readonly _middleName: string;
  private readonly _lastName: string;
  private readonly _email: string;
  private readonly _roles: RoleModel[] = [];


  constructor(id: string, firstName: string, middleName: string, lastName: string, email: string, roles: RoleModel[]) {
    this._id = id;
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
    this._email = email;
    this._roles = roles;
  }


  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get middleName(): string {
    return this._middleName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get roles(): RoleModel[] {
    return this._roles;
  }
}
