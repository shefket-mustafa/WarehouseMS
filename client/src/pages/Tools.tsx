import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { FiDownload, FiFileText, FiShoppingCart, FiPackage } from 'react-icons/fi';
import jsPDF from 'jspdf';
import { useData } from '../context/data/dataContext-hook';

const Tools = () => {
  const { orders, inventory } = useData();
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfContent, setPdfContent] = useState('');

  const totalOrders = orders.length;
  const totalOnlineOrders = orders.filter(order => order.status !== 'Pending').length;
  const totalProducts = inventory.length;
  const totalProductImages = 0; // Placeholder

  const generatePDF = () => {
    if (!pdfTitle || !pdfContent) {
      alert('Please fill in both title and content for the PDF');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(pdfTitle, 20, 20);
    doc.setFontSize(12);
    const splitContent = doc.splitTextToSize(pdfContent, 170);
    doc.text(splitContent, 20, 40);
    doc.save(`${pdfTitle.replace(/\s+/g, '_')}.pdf`);
  };

  const downloadOrdersList = () => {
    const csvContent = [
      ['Order ID', 'Shop Name', 'Email', 'Total', 'Status', 'Date'].join(','),
      ...orders.map(order => 
        [order.id, order.shopName, order.email, order.total, order.status, order.orderDate].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders_list.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-background bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tools</h1>
          <p className="text-muted-foreground">Statistics and data export tools</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <FiShoppingCart className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold text-foreground">{totalOrders}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
          </div>

          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <FiShoppingCart className="w-8 h-8 text-info" />
              <span className="text-3xl font-bold text-foreground">{totalOnlineOrders}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Online Orders</h3>
          </div>

          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <FiPackage className="w-8 h-8 text-success" />
              <span className="text-3xl font-bold text-foreground">{totalProducts}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Products</h3>
          </div>

          <div className="bg-card rounded-lg shadow-card border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <FiFileText className="w-8 h-8 text-secondary" />
              <span className="text-3xl font-bold text-foreground">{totalProductImages}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Product Images</h3>
          </div>
        </div>

        {/* PDF Generator */}
        <div className="bg-card rounded-lg shadow-card border border-border p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FiFileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-card-foreground">Create PDF Report</h2>
          </div>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Report Title"
              value={pdfTitle}
              onChange={(e) => setPdfTitle(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Report Content"
              value={pdfContent}
              onChange={(e) => setPdfContent(e.target.value)}
              variant="outlined"
              multiline
              rows={6}
              placeholder="Enter order information and details..."
            />
            <Button
              variant="contained"
              onClick={generatePDF}
              className="bg-primary! hover:bg-primary-hover! text-primary-foreground!"
              startIcon={<FiDownload />}
            >
              Generate PDF
            </Button>
          </div>
        </div>

        {/* Download Orders List */}
        <div className="bg-card rounded-lg shadow-card border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground mb-2">Orders List Export</h2>
              <p className="text-sm text-muted-foreground">Download complete orders list as CSV</p>
            </div>
            <Button
              variant="contained"
              onClick={downloadOrdersList}
              className="bg-secondary! hover:bg-secondary-hover! text-secondary-foreground!"
              startIcon={<FiDownload />}
            >
              Download List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
