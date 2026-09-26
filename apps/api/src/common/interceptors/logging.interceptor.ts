import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Request } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const started = Date.now();
    const { method, url } = req;

    return next.handle().pipe(
      tap({
        next: () => {
          this.logger.log(`${method} ${url} ${Date.now() - started}ms`);
        },
        error: () => {
          this.logger.warn(`${method} ${url} failed ${Date.now() - started}ms`);
        },
      }),
    );
  }
}
