export type TService<T> = {
  [key in ServiceProperty]: (value?: any, data?: any) => Promise<T>;
};

enum ServiceProperty {
  GetAll = "getAll",
  GetById = "getById",
  Delete = "delete",
  Update = "update",
  Create = "create",
}
