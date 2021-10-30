import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

/**
 * 缓存拦截器
 * 有时我们可能希望完全阻止调用处理程序并返回不同的值 (例如, 由于性能问题而从缓存中获取),
 * 这是有多种原因的。一个很好的例子是缓存拦截器，它将使用一些TTL存储缓存的响应。
 * 不幸的是, 这个功能需要更多的代码并且由于简化, 我们将仅提供简要解释主要概念的基本示例。
 */
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}
/**
 * 这是一个 CacheInterceptor，带有硬编码的 isCached 变量和硬编码的响应 [] 。
 * 我们在这里通过 of 运算符创建并返回了一个新的流, 因此路由处理程序根本不会被调用。
 * 当有人调用使用 CacheInterceptor 的端点时, 响应 (一个硬编码的空数组) 将立即返回。
 * 为了创建一个通用解决方案, 您可以利用 Reflector 并创建自定义修饰符。反射器 Reflector 在守卫章节描述的很好。
 */
