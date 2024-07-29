import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const youtubeInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  const { apiUrl, apiKey } = environment;

  const apiReq = req.clone({
    url: `${apiUrl}${req.url}`,
    setParams: { key: apiKey },
  });

  return next(apiReq);
};
