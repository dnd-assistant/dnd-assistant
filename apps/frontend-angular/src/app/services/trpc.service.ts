import { Injectable } from "@angular/core";
import { TRPCClientError, createTRPCProxyClient, httpLink } from "@trpc/client";
import type { AppRouter } from '@dnd-assistant/trpc';
import { ErrorHandlers, HttpErrorHandlerService } from "./http-error-handler.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class TRPCService {
  public trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpLink({
        url: "/api/trpc",
        headers: () => {
          const token = this.authService.token;
          return {
            Authorization: token ? `Bearer ${token}` : undefined,
          };
        },
      }),
    ],
  });

  constructor(
    private httpErrorHandler: HttpErrorHandlerService,
    private authService: AuthService,
  ) {}

  async handle<T>(result: Promise<T>, errorHandlers?: ErrorHandlers) {
    return result.catch((e) => {
      if (e instanceof TRPCClientError) {
        this.httpErrorHandler.handleTrpcError(e, errorHandlers);
      } else {
        throw e;
      }
    });
  }
}
