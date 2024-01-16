export enum RPCCode {
  // 请求成功
  OK = 0,
  // 操作被取消
  CANCELLED = 1,
  // 未知错误
  UNKNOWN = 2,
  // 客户端给了无效的请求参数
  INVALID_ARGUMENT = 3,
  // 请求超过了截止时间
  DEADLINE_EXCEEDED = 4,
  // 请求资源未找到
  NOT_FOUND = 5,
  // 添加的内容已经存在
  ALREADY_EXISTS = 6,
  // 请求权限不足
  PERMISSION_DENIED = 7,
  // 资源耗尽
  RESOURCE_EXHAUSTED = 8,
  // 服务端上为准备好
  FAILED_PRECONDITION = 9,
  // 请求被中止
  ABORTED = 10,
  // 请求超出范围
  OUT_OF_RANGE = 11,
  // 未实现的操作
  UNIMPLEMENTED = 12,
  // 服务内部错误
  INTERNAL = 13,
  // 服务不可用。
  UNAVAILABLE = 14,
  // 数据丢失或者损毁
  DATA_LOSS = 15,
  // 请求未认证
  UNAUTHENTICATED = 16,
}
