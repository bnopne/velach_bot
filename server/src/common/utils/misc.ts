export function getNextIndex(currentIndex: number, arraySize: number): number {
  return (currentIndex + 1) % arraySize;
}

export function getPreviousIndex(
  currentIndex: number,
  arraySize: number,
): number {
  if (currentIndex === 0) {
    return arraySize - 1;
  }

  return currentIndex - 1;
}

export function isNil(value: unknown): value is null | undefined {
  return value == null;
}
