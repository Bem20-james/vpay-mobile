export const buildSuccessParams = (type: string, result: any) => {
  switch (type) {
    case "airtime":
      return {
        transactionType: "airtime",
        amount: result.amount,
        currency: "₦",
        recipient: result.phoneNumber,
        reference: result.reference,
        date: new Date().toLocaleString(),
      };
    case "transfer":
      return {
        transactionType: "transfer",
        recieved: result.amount_recieved,
        sent: result?.amount_sent,
        bank: result.bank,
        currency_recieved: result.currency_received,
        currency_sent: result.currency_sent,
        reference: result.reference,
        recipient: result.to,
        description: result.description,
        status: result.status,
        recipientAccount: result.account_number,
        date: result.date,
        totalDebited: result.total_debit,
        fee: result.transaction_fee,
      };
    default:
      return {};
  }
};
