interface ApiError {
  detail?: string;
}

/**
 * 从 API 错误响应中提取错误消息
 * @param error - API 返回的错误对象
 * @param defaultMessage - 如果无法提取错误信息，使用的默认消息
 * @returns 错误消息字符串
 */
export function extractErrorMessage(error: ApiError, defaultMessage: string): string {
  const detail = error?.detail;
  return typeof detail === "string" ? detail : defaultMessage;
}
