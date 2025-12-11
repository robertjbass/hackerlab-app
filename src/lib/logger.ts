enum LogLevel {
  Info = 'INFO',
  Error = 'ERROR',
  Log = 'LOG',
  Warn = 'WARN',
}

export function createLogger(
  prefix: string = '',
  options: { showPrefix?: boolean; showStacktrace?: boolean } = {},
) {
  const { showPrefix = true, showStacktrace = true } = options

  if (process.env.NODE_ENV !== 'development') {
    return {
      info: () => {},
      error: () => {},
      log: () => {},
      warn: () => {},
    }
  }

  const createLogFn =
    (level: string, consoleFn: typeof console.log) =>
    (...message: any[]) => {
      const logPrefix = prefix ? `\n[${prefix}]\n` : ''
      if (showPrefix && !!logPrefix) {
        consoleFn(logPrefix, ...message)
      } else {
        consoleFn(...message)
      }

      if (level === LogLevel.Error && showStacktrace) {
        const stack = new Error().stack?.split('\n').slice(3).join('\n')
        console.error(stack)
      }
    }

  return {
    info: createLogFn(LogLevel.Info, console.log),
    error: createLogFn(LogLevel.Error, console.error),
    log: createLogFn(LogLevel.Log, console.log),
    warn: createLogFn(LogLevel.Warn, console.warn),
  }
}
