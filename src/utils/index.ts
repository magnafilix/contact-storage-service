export const convertDataStringToTableFormat = (dataString: string): {
  headers: string[];
  rows: Record<string, string>[];
} => {
  let headers: string[] = [];
  let rows: Record<string, string>[] = [];

  try {
    const splittedDataString = dataString.split('\n');

    headers = splittedDataString.at(0)?.replace('\r', '').split(',') ?? [];
    rows = splittedDataString.slice(1).map((row) => row
      .replace('\r', '')
      .split(',')
      .reduce(
        (prev, value, i) => ({
          ...prev,
          [headers.at(i) ?? '']: value,
        }),
        {} as Record<string, string>,
      ),
    );
  } catch (error) {
    console.log('could not parse data', error);
  }

  return { headers, rows };
};
