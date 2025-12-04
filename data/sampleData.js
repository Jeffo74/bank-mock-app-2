// Edit this file to change the hard-coded accounts and transaction history.
// This project is read-only UI: to change balances, edit the numbers here.

export default {
  accounts: [
    {
      id: "acc1",
      name: "TD STUDENT CHEQUING ACCOUNT",
      number: "6020442",
      initialBalance: 941.56,
      transactions: [
        {
          id: "t1",
          description: "LISA-KAYE WILLI PAY",
          amount: 72.56,
          date: "2025-11-27T09:00:00Z",
        },
        {
          id: "t2",
          description: "INTEREST CREDIT",
          amount: 0.01,
          date: "2025-11-28T12:30:00Z",
        },
        {
          id: "t3",
          description: "OTHER BANK FEES",
          amount: -2.0,
          date: "2025-11-28T12:00:00Z",
        },
        {
          id: "t4",
          description: "Nottawasaga Inn _M",
          amount: -9.01,
          date: "2025-12-01T10:00:00Z",
        },
      ],
    },
    {
      id: "acc2",
      name: "TD EVERY DAY SAVINGS ACCOUNT",
      number: "6461945",
      initialBalance: 41.62,
      transactions: [],
    },
  ],
};
