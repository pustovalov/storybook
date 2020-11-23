export function managerEntries(entry = []) {
  return [...entry, require.resolve('./dist/esm/register')];
}

export function config(entry = []) {
  return [
    ...entry,
    require.resolve('./dist/esm/a11yRunner'),
    require.resolve('./dist/esm/a11yHighlight'),
  ];
}
