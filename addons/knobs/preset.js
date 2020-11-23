export function managerEntries(entry = [], options) {
  return [...entry, require.resolve('./dist/esm/register')];
}

export function config(entry = [], { addDecorator = true } = {}) {
  const knobsConfig = [];
  if (addDecorator) {
    knobsConfig.push(require.resolve('./dist/esm/preset/addDecorator'));
  }
  return [...entry, ...knobsConfig];
}
