export class ErrorService {
  public sendError(ctx: any, message: string, statusCode: number, next: Function): void {
    ctx.res.statusCode = statusCode;
    next({message});
  }
}
