export const buildSuccessParams = (type: string, result: any) => {
  switch (type) {
    case "airtime":
      return {
        transactionType: "airtime",
        amount: result.airtime_value,
        currency_sent: result.base_currency,
        currency_recieved: result.target_currency,
        totalDebited: result.converted_total,
        total: result.unconverted_total,
        recipient: result.phone,
        reference: result.reference,
        date: result.timestamp,
        status: result.status,
        bank: result.provider,
        totalFee: result.unconverted_fee,
        fee: result.converted_fee
      };
    case "transfer":
      return {
        transactionType: "transfer",
        recieved: result.amount_recieved,
        amount: result?.amount_sent,
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
        fee: result.transaction_fee
      };
    case "crypto":
      return {
        transactionType: "crypto",
        recieved: result.amount_recieved,
        sent: result?.amount_sent,
        bank: result.bank,
        currency_recieved: result.currency_received,
        currency_sent: result.currency_sent,
        reference: result.hash,
        recipient: result.to,
        description: result.description,
        status: result.status,
        recipientAccount: result.account_number,
        date: result.date,
        totalDebited: result.total_debit,
        fee: result.transaction_fee
      };
    case "betting":
      return {
        transactionType: "betting",
        recieved: result.amount_recieved,
        amount: result?.amount,
        bank: result.bank,
        currency_recieved: result.currency_received,
        currency_sent: result.currency,
        reference: result.hash,
        recipient: result.bet_account,
        description: result.description,
        status: result.status,
        recipientAccount: result.account_number,
        date: result.date,
        totalDebited: result.total_debit,
        fee: result.transaction_fee
      };
    default:
      return {};
  }
};
