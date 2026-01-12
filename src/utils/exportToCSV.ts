export const exportToCSV = (rows: any[], filename = "table_data.csv") => {
  if (!rows || rows.length === 0) return;

  const headers = Object.keys(rows[0]);

  const escapeValue = (value: any) => {
    if (value === null || value === undefined) return "null"; // represent empty as null
    const str = String(value);
    // escape quotes by doubling them
    return `"${str.replace(/"/g, '""')}"`;
  };

  const csvContent =
    headers.join(",") +
    "\n" +
    rows
      .map((row) => headers.map((h) => escapeValue(row[h])).join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url); // free memory
};
