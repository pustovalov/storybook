export function managerEntries(entry = []) {
  return [...entry, require.resolve('./dist/esm/register')];
}

export function config(entry = [], { addDecorator = true } = {}) {
  const linkConfig = [];
  if (addDecorator) {
    linkConfig.push(require.resolve('./dist/esm/preset/addDecorator'));
  }
  return [...entry, ...linkConfig];
}
