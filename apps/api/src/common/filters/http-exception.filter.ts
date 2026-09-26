import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ZodError } from "zod";

@Injectable()
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const isProd = process.env.NODE_ENV === "production";

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = "INTERNAL_ERROR";
    let message = "An unexpected error occurred";
    let details: unknown;

    if (exception instanceof ZodError) {
      status = HttpStatus.BAD_REQUEST;
      code = "VALIDATION_ERROR";
      message = "Request validation failed";
      details = exception.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      }));
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === "string") {
        message = body;
        code = HttpStatus[status] ?? "HTTP_ERROR";
      } else if (typeof body === "object" && body !== null) {
        const obj = body as Record<string, unknown>;
        message = String(obj.message ?? message);
        code = String(obj.code ?? HttpStatus[status] ?? "HTTP_ERROR");
        details = obj.details;
        if (Array.isArray(obj.message)) {
          message = "Request validation failed";
          code = "VALIDATION_ERROR";
          details = obj.message;
        }
      }
    } else if (exception instanceof Error) {
      this.logger.error(
        `Unhandled error on ${request.method} ${request.url}: ${exception.message}`,
        exception.stack,
      );
      if (!isProd) {
        message = exception.message;
      }
    }

    if (status >= 500 && !(exception instanceof Error)) {
      this.logger.error(`Unhandled error on ${request.url}`);
    }

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
        ...(details !== undefined && !isProd ? { details } : details && status < 500 ? { details } : {}),
      },
    });
  }
}
