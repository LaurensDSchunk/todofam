export type ApiSuccessResponse<T = undefined> = {
  success: true;
  data?: T;
};

export interface RouteInterface<Req = unknown, Res = unknown> {
  request: Req;
  response: Res;
}
