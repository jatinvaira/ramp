import { useState, useEffect } from "react";
import { InputCheckbox } from "../InputCheckbox";
import { TransactionPaneComponent } from "./types";

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
}) => {
  // Local state for transaction approval
  const [approved, setApproved] = useState(transaction.approved);

  // Sync local state with external prop
  useEffect(() => {
    setApproved(transaction.approved);
  }, [transaction.approved]);

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        {/* Display transaction details */}
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>

      {/* Approval checkbox */}
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        onChange={async (newValue) => {
          try {
            setApproved(newValue); // Optimistic UI update
            await consumerSetTransactionApproval({
              transactionId: transaction.id,
              newValue,
            });
          } catch (error) {
            console.error("Failed to update transaction approval:", error);
            setApproved(!newValue); // Rollback on failure
            alert("An error occurred while updating approval status.");
          }
        }}
      />
    </div>
  );
};

// Formatter for currency display
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
