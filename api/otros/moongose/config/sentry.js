const Sentry = require("@sentry/node");
const  { nodeProfilingIntegration } = require("@sentry/profiling-node")

function configureSentry(app) {
  Sentry.init({
      //MAandar a process
      dsn: "https://ae0efaa5d4f342e8e152fe4583c6b5b7@o4507075988946944.ingest.us.sentry.io/4507075990650880",
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
        nodeProfilingIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 1.0,
  });
  return Sentry
}
module.exports = configureSentry;