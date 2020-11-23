const { ensureDocsBeforeControls } = require('./dist/cjs/preset/ensureDocsBeforeControls');

export function managerEntries(entry = [], options) {
  ensureDocsBeforeControls(options.configDir);
  return [...entry, require.resolve('./dist/esm/register')];
}
