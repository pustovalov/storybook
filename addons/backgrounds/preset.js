export function config(entry = []) {
  return [
    ...entry,
    require.resolve('./dist/esm/preset/addDecorator'),
    require.resolve('./dist/esm/preset/addParameter'),
  ];
}

export function managerEntries(entry = [], options) {
  return [...entry, require.resolve('./dist/esm/register')];
}
