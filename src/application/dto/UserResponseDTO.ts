export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

