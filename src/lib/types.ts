export type Group = {
  _id: string;
  name: string;
};

export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  group?: Group;
};
