const month = parseInt(await ask("Month (1-12): "));
const year = parseInt(await ask("Year (YYYY): "));
const start = new Date(year, month - 1, 1);
const end = new Date(year, month, 0);
const txs = await Transaction.find({ date: { $gte: start, $lte: end } });
