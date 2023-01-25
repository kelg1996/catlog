import * as XLSX from 'xlsx'
interface Record {
  [key: string]: any;
}

export const exportToExcel = (data: Array<Record>) => {
  if (data.length === 0) {
    return ;
  }
  let wb = XLSX.utils.book_new()
  let sheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, sheet, 'Data');
  XLSX.writeFileXLSX(wb, "export.xlsx")
}
