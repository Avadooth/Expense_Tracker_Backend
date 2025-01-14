import PDFDocument from "pdfkit"

const generatePDF = (expenses, user) => {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];
  
        // Capture the PDF data in memory
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
  
        // Document Metadata
        doc.info.Title = 'Expense Report';
        doc.info.Author = 'Expense Tracker';
  
        // Title
        doc.fontSize(24).font('Helvetica-Bold').text('Expense Report', { align: 'center' });
        doc.moveDown(1);
  
        // User Information
        doc.fontSize(12).font('Helvetica').text(`User: ${user.email.split('@')[0]}`);
        doc.text(`Email: ${user.email}`);
        doc.text(`Report Date: ${new Date().toLocaleDateString()}`);
        doc.moveDown(2);
  
        // Table Header
        const tableTop = doc.y;
        doc.fontSize(12).font('Helvetica-Bold');
        const columnPositions = {
          date: 50,
          title: 150,
          category: 350,
          amount: 450
        };
  
        doc.text('Date', columnPositions.date, tableTop);
        doc.text('Title', columnPositions.title, tableTop);
        doc.text('Category', columnPositions.category, tableTop);
        doc.text('Amount', columnPositions.amount, tableTop);
        doc.moveDown(1);
  
        // Table Content
        doc.font('Helvetica');
        let rowY = doc.y;
  
        expenses.forEach((expense) => {
          doc.text(expense.date.toISOString().split('T')[0], columnPositions.date, rowY);
          doc.text(expense.title, columnPositions.title, rowY);
          doc.text(expense.category, columnPositions.category, rowY);
          doc.text(`₹${expense.amount.toFixed(2)}`, columnPositions.amount, rowY);
          rowY += 20; // Move to the next row
        });
  
        // Footer (Total)
        doc.moveDown(1);
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        doc.font('Helvetica-Bold').text(`Total: ₹${total.toFixed(2)}`, { align: 'right' });
  
        // Finalize the document
        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  };
  

export default generatePDF;
