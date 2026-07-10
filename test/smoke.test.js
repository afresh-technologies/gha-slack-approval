const { test } = require('node:test')
const assert = require('node:assert')

// Credential-free smoke test: verifies the Bolt app constructs cleanly with
// the options the action uses. Guards against the "Must provide an App-Level
// Token when initializing a Socket Mode Client" crash that Bolt v4 throws at
// construction time when appToken is empty. Uses dummy, non-empty tokens and
// disables token verification so no network call is made and no real secrets
// are needed. Runs against the compiled output, so `npm run build` runs first.
test('createApp constructs with Socket Mode and does not throw', () => {
  process.env.SLACK_BOT_TOKEN = 'xoxb-test'
  process.env.SLACK_SIGNING_SECRET = 'test-signing-secret'
  process.env.SLACK_APP_TOKEN = 'xapp-test'

  const { createApp } = require('../dist/app.js')

  let app
  assert.doesNotThrow(() => {
    app = createApp({ tokenVerificationEnabled: false })
  }, 'createApp should not throw when constructing the Socket Mode app')

  assert.ok(app, 'createApp should return an App instance')
  assert.strictEqual(typeof app.start, 'function', 'App should expose start()')
})
