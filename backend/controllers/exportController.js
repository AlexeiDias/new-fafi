import Transaction from '../models/Transaction.js';
import Bill from '../models/Bill.js';
import XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportTransactionsXLSX = async (req, res) => {
  const txs = await Transaction.find();
  const sheet = XLSX.utils.json_to_sheet(txs.map(t => t.toObject()));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, "Transactions");
  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  res.setHeader("Content-Disposition", "attachment; filename=transactions.xlsx");
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.send(buffer);
};

export const exportBillsPDF = async (req, res) => {
  const bills = await Bill.find();
  const doc = new jsPDF();
  autoTable(doc, {
    head: [["Name", "Amount", "Due Date", "Person"]],
    body: bills.map(b => [b.name, b.amount, new Date(b.dueDate).toLocaleDateString(), b.person]),
  });
  const buffer = doc.output("arraybuffer");
  res.setHeader("Content-Disposition", "attachment; filename=bills.pdf");
  res.setHeader("Content-Type", "application/pdf");
  res.send(Buffer.from(buffer));
};
