export interface Login {
  email: string;
  password: string;
}

// tslint:disable-next-line:no-empty-interface
export interface Register extends Login {}
