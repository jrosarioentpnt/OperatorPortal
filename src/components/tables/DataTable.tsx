import React from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTableColumn {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (info: any) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps {
  data?: any[];
  columns?: DataTableColumn[];
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  onFilter?: () => void;
  onRowAction?: (action: string, row: any) => void;
  bulkActions?: { label: string; action: string }[];
  pagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    onPageChange: (page: number) => void;
  };
}

const DataTable = ({
  data = [
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St",
      status: "Connected",
      signupDate: "2023-05-15",
      city: "Springfield",
      zone: "North",
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Oak Ave",
      status: "Install Scheduled",
      signupDate: "2023-06-02",
      city: "Springfield",
      zone: "East",
    },
    {
      id: 3,
      name: "Robert Johnson",
      address: "789 Pine Rd",
      status: "Signed Up",
      signupDate: "2023-06-10",
      city: "Riverdale",
      zone: "West",
    },
    {
      id: 4,
      name: "Emily Davis",
      address: "101 Cedar Ln",
      status: "Connected",
      signupDate: "2023-05-20",
      city: "Springfield",
      zone: "South",
    },
    {
      id: 5,
      name: "Michael Wilson",
      address: "202 Elm St",
      status: "Install Scheduled",
      signupDate: "2023-06-05",
      city: "Riverdale",
      zone: "Central",
    },
  ],
  columns = [
    {
      id: "name",
      header: "Customer Name",
      accessorKey: "name",
      sortable: true,
    },
    { id: "address", header: "Address", accessorKey: "address" },
    {
      id: "signupDate",
      header: "Signup Date",
      accessorKey: "signupDate",
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (info) => {
        const status = info.getValue();
        let variant = "default";

        if (status === "Connected") variant = "default";
        if (status === "Install Scheduled") variant = "secondary";
        if (status === "Signed Up") variant = "outline";

        return <Badge variant={variant}>{status}</Badge>;
      },
      sortable: true,
    },
    { id: "city", header: "City", accessorKey: "city" },
    { id: "zone", header: "Zone", accessorKey: "zone" },
  ],
  title = "Subscribers",
  searchPlaceholder = "Search subscribers...",
  onSearch = () => {},
  onFilter = () => {},
  onRowAction = () => {},
  bulkActions = [
    { label: "Send Notification", action: "notify" },
    { label: "Export Selected", action: "export" },
    { label: "Delete Selected", action: "delete" },
  ],
  pagination = {
    pageIndex: 0,
    pageSize: 10,
    pageCount: 5,
    onPageChange: () => {},
  },
}: DataTableProps) => {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchValue, setSearchValue] = React.useState("");

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleBulkAction = (action: string) => {
    // Handle bulk actions here
    console.log(`Performing ${action} on rows:`, selectedRows);
  };

  return (
    <div className="w-full bg-white rounded-md shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center space-x-2">
            {selectedRows.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    Actions <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {bulkActions.map((action) => (
                    <DropdownMenuItem
                      key={action.action}
                      onClick={() => handleBulkAction(action.action)}
                    >
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button variant="outline" onClick={onFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-10"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={
                    column.sortable ? "cursor-pointer select-none" : ""
                  }
                  onClick={
                    column.sortable
                      ? () => handleSort(column.accessorKey)
                      : undefined
                  }
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable &&
                      sortConfig &&
                      sortConfig.key === column.accessorKey &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onCheckedChange={() => handleSelectRow(row.id)}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${column.id}`}>
                    {column.cell
                      ? column.cell({ getValue: () => row[column.accessorKey] })
                      : row[column.accessorKey]}
                  </TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onRowAction("view", row)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onRowAction("edit", row)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onRowAction("notify", row)}
                      >
                        Send Notification
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
            {Math.min(
              (pagination.pageIndex + 1) * pagination.pageSize,
              data.length,
            )}{" "}
            of {data.length} entries
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.pageIndex > 0) {
                      pagination.onPageChange(pagination.pageIndex - 1);
                    }
                  }}
                  className={
                    pagination.pageIndex === 0
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: pagination.pageCount }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      pagination.onPageChange(i);
                    }}
                    isActive={pagination.pageIndex === i}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.pageIndex < pagination.pageCount - 1) {
                      pagination.onPageChange(pagination.pageIndex + 1);
                    }
                  }}
                  className={
                    pagination.pageIndex === pagination.pageCount - 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
