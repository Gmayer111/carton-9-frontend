export type TServices<T, K> = {
  [Property in keyof K]: (value?: any, data?: any) => Promise<T>;
};

export type TServiceProperties = {
  getAll: string;
  create: string;
  update: string;
  delete: string;
  getById: string;
};

export type TComicServices = TServiceProperties & {
  getComicAssociations: string;
};
