export type ISingleResourceKey = "GET" | "UPDATE" | "DELETE" | "CREATE";

export type ISingleResourceRoute = {
  [key in ISingleResourceKey]: Record<string, string>;
};

// export type IApiRouteResourceKey = "REPORTS" | "USERS" | "COMPLAINTS" | "VOGS";
