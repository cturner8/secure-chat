import log, { type LogLevelDesc } from "loglevel";
log.setLevel(process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevelDesc);
export { log as logger };
