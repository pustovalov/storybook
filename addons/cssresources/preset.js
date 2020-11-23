export function managerEntries(entry = [], options) {
  return [...entry, require.resolve('./dist/esm/register')];
}
