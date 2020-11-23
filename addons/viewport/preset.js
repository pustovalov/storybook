export function managerEntries(entry = []) {
  return [...entry, require.resolve('./dist/esm/register')];
}
