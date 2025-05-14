export type ApiSuccessResponse<T extends object = {}> = {
  success: true;
} & Omit<T, "success">;

export interface RouteInterface<Req = unknown, Res = unknown> {
  request: Req;
  response: Res;
}
