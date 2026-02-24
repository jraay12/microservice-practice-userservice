import { randomUUID } from "crypto";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export class User {
  private constructor(
    private readonly _id: string,
    private _name: string,
    private _email: string,
    private _password: string,
    private _role: UserRole,
    private _isActive: boolean,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  // ================= STATIC =================

  static create(data: {
    id?: string;
    name: string;
    role?: UserRole;
    password: string;
    email: string;
  }): User {
    if (data.name.length < 2) {
      throw new Error("Name must be at least 2 characters");
    }

    if (!data.email.includes("@")) {
      throw new Error("Email must be valid");
    }

    if (data.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const now = new Date();

    return new User(
      data.id ?? randomUUID(),
      data.name,
      data.email,
      data.password,
      data.role ?? UserRole.USER,
      true,
      now,
      now,
    );
  }

  static rehydrate(data: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.role,
      data.isActive,
      data.createdAt,
      data.updatedAt,
    );
  }

  // ================= BEHAVIOR =================

  deactivate() {
    if (!this._isActive) {
      throw new Error("User is already inactive");
    }

    this._isActive = false;
    this.touch();
  }

  activate() {
    if (this._isActive) {
      throw new Error("User is already active");
    }

    this._isActive = true;
    this.touch();
  }

  changeName(newName: string) {
    if (newName.length < 2) {
      throw new Error("Name must be at least 2 characters");
    }

    this._name = newName;
    this.touch();
  }

  changeEmail(newEmail: string) {
    if (!newEmail.includes("@")) {
      throw new Error("Invalid email format");
    }

    this._email = newEmail;
    this.touch();
  }

  updatePassword(hashPassword: string) {
    this._password = hashPassword;
  }

  changePassword(newPassword: string) {
    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    this._password = newPassword;
    this.touch();
  }

  promoteToAdmin() {
    if (this._role === UserRole.ADMIN) {
      throw new Error("User is already admin");
    }

    this._role = UserRole.ADMIN;
    this.touch();
  }

  // ================= INTERNAL =================

  private touch() {
    this._updatedAt = new Date();
  }

  // ================= GETTERS =================

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get role() {
    return this._role;
  }

  get isActive() {
    return this._isActive;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get getPassword() {
    return this._password;
  }
}
