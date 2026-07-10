import { App, AppOptions, LogLevel } from '@slack/bolt'

// Builds the Bolt app used by the action. Kept separate from the approval flow
// so it can be constructed in a credential-free smoke test without starting
// Socket Mode or hitting Slack. Reads tokens from the environment at call time.
// `overrides` lets the smoke test disable the async token check that Bolt would
// otherwise fire at construction; production callers pass nothing.
export function createApp(overrides: Partial<AppOptions> = {}): App {
  return new App({
    token: process.env.SLACK_BOT_TOKEN || '',
    signingSecret: process.env.SLACK_SIGNING_SECRET || '',
    appToken: process.env.SLACK_APP_TOKEN || '',
    socketMode: true,
    logLevel: LogLevel.DEBUG,
    ...overrides,
  })
}
