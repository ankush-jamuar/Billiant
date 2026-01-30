export const renderInvoiceTemplate = (template, invoice) => {
  const itemsHtml = invoice.items
    .map(
      (item) => `
      <tr>
        <td>${item.description}</td>
        <td>${item.quantity}</td>
        <td>₹${item.unitPrice}</td>
        <td>₹${item.total}</td>
      </tr>
    `
    )
    .join("");

  return template
    .replace("{{invoiceNumber}}", invoice.invoiceNumber)
    .replace("{{status}}", invoice.status.toUpperCase())
    .replace("{{issueDate}}", new Date(invoice.issueDate).toLocaleDateString())
    .replace("{{dueDate}}", new Date(invoice.dueDate).toLocaleDateString())
    .replace("{{clientName}}", invoice.clientId.name)
    .replace("{{clientEmail}}", invoice.clientId.email || "")
    .replace("{{items}}", itemsHtml)
    .replace("{{subtotal}}", `₹${invoice.subtotal}`)
    .replace("{{tax}}", invoice.tax)
    .replace("{{taxAmount}}", `₹${invoice.taxAmount}`)
    .replace("{{discount}}", `₹${invoice.discount}`)
    .replace("{{total}}", `₹${invoice.total}`);
};
