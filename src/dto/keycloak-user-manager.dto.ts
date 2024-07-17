export class User {
  readonly id: string;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
}

export class UserCreateInput {
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  password: string;
}

export class UserUpdateInput {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
}
export class UserWhereUniqueInput {
  id: string;
}

export class ResetUserPasswordInput {
  id: string;
  password: string;
}
