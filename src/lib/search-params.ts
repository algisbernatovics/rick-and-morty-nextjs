export function getSingleParam(
  value: string | string[] | undefined
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parsePageParam(value: string | string[] | undefined): number {
  const raw = getSingleParam(value);
  const page = Number.parseInt(raw ?? '1', 10);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return page;
}

export function getSearchName(value: string | string[] | undefined): string | undefined {
  const name = getSingleParam(value)?.trim();
  return name || undefined;
}
