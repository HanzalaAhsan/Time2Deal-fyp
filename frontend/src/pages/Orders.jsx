"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Printer, Calendar, User, Phone } from "lucide-react"

// Sample orders data - in a real app, this would come from an API
const sampleOrders = [
  {
    id: 1001,
    customer: {
      name: "MUNIR UD DIN",
      phone: "123-456-7890",
    },
    items: [
      { id: 1, name: "Panadol", price: 120, quantity: 2, total: 240 },
      { id: 3, name: "Citazin", price: 180, quantity: 1, total: 180 },
    ],
    subtotal: 420,
    tax: 42,
    total: 462,
    date: "2023-05-15T14:30:00Z",
    status: "completed",
  },
  {
    id: 1002,
    customer: {
      name: "HANZLA",
      phone: "987-654-3210",
    },
    items: [
      { id: 2, name: "Amoxicillin", price: 250, quantity: 1, total: 250 },
      { id: 5, name: "Metformin", price: 220, quantity: 3, total: 660 },
    ],
    subtotal: 910,
    tax: 91,
    total: 1001,
    date: "2023-05-16T10:15:00Z",
    status: "completed",
  },
  {
    id: 1003,
    customer: {
      name: "HASEEB",
      phone: "555-123-4567",
    },
    items: [
      { id: 4, name: "Omeprazole", price: 300, quantity: 1, total: 300 },
      { id: 6, name: "Diamicrozole", price: 450, quantity: 2, total: 900 },
      { id: 8, name: "Chloroperi Hybanate", price: 520, quantity: 1, total: 520 },
    ],
    subtotal: 1720,
    tax: 172,
    total: 1892,
    date: "2023-05-16T16:45:00Z",
    status: "completed",
  },
  {
    id: 1004,
    customer: {
      name: "HASSAN",
      phone: "333-888-9999",
    },
    items: [{ id: 7, name: "Omithrazole", price: 280, quantity: 2, total: 560 }],
    subtotal: 560,
    tax: 56,
    total: 616,
    date: "2023-05-17T09:20:00Z",
    status: "completed",
  },
  {
    id: 1005,
    customer: {
      name: "NOMAN",
      phone: "N/A",
    },
    items: [
      { id: 1, name: "Panadol", price: 120, quantity: 5, total: 600 },
      { id: 3, name: "Citazin", price: 180, quantity: 2, total: 360 },
      { id: 5, name: "Metformin", price: 220, quantity: 1, total: 220 },
    ],
    subtotal: 1180,
    tax: 118,
    total: 1298,
    date: "2023-05-17T14:10:00Z",
    status: "completed",
  },
]

export default function Orders() {
  const [orders] = useState(sampleOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Format date function (since date-fns might not be available)
  const formatDate = (dateString, format) => {
    const date = new Date(dateString)
    if (format === "yyyy-MM-dd") {
      return date.toISOString().split("T")[0]
    }
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toString().includes(searchTerm)

    const matchesDate = dateFilter ? formatDate(order.date, "yyyy-MM-dd") === dateFilter : true

    return matchesSearch && matchesDate
  })

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="p-6 bg-black-900 min-h-screen">
      <Card className="bg-black-800 border border-black-700 shadow-md">
        <CardHeader className="border-b border-black-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl font-bold text-black">Orders History</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 h-4 w-4" />
                <Input
                  placeholder="Search by customer or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black-700 border-black-600 text-black placeholder:text-black-400"
                />
              </div>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-black-700 border-black-600 text-black"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-black-700">
                  <TableHead className="text-black-300">Order ID</TableHead>
                  <TableHead className="text-black-300">Customer</TableHead>
                  <TableHead className="text-black-300">Date</TableHead>
                  <TableHead className="text-black-300 text-right">Items</TableHead>
                  <TableHead className="text-black-300 text-right">Total</TableHead>
                  <TableHead className="text-black-300">Status</TableHead>
                  <TableHead className="text-black-300 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow className="border-black-700">
                    <TableCell colSpan={7} className="text-center text-black-400 py-8">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-black-700">
                      <TableCell className="font-medium text-black">#{order.id}</TableCell>
                      <TableCell className="text-black-300">{order.customer.name}</TableCell>
                      <TableCell className="text-black-300">{formatDate(order.date)}</TableCell>
                      <TableCell className="text-right text-black-300">{order.items.length}</TableCell>
                      <TableCell className="text-right font-medium text-black">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-600 text-black">{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 hover:bg-black-700"
                          onClick={() => handleViewDetails(order)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-black-800 text-black border border-black-700 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">Order Details - #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-black-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Date: {formatDate(selectedOrder.date)}</span>
                  </div>
                  <div className="flex items-center text-black-300">
                    <User className="h-4 w-4 mr-2" />
                    <span>Customer: {selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex items-center text-black-300">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>Phone: {selectedOrder.customer.phone}</span>
                  </div>
                </div>
                <div className="space-y-2 md:text-right">
                  <div className="text-black-300">
                    <span>Subtotal: ${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="text-black-300">
                    <span>Tax: ${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="text-xl font-bold text-black">
                    <span>Total: ${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-black-700 pt-4">
                <h3 className="font-medium text-black mb-2">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="border-black-700">
                      <TableHead className="text-black-300">Item</TableHead>
                      <TableHead className="text-black-300 text-right">Price</TableHead>
                      <TableHead className="text-black-300 text-right">Quantity</TableHead>
                      <TableHead className="text-black-300 text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id} className="border-black-700">
                        <TableCell className="text-black">{item.name}</TableCell>
                        <TableCell className="text-right text-black-300">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-black-300">{item.quantity}</TableCell>
                        <TableCell className="text-right text-black">${item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  className="bg-black-700 border-black-600 text-black hover:bg-black-600"
                  onClick={handlePrint}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Receipt
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

