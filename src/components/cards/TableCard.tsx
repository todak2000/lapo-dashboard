/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type FC, type ReactNode } from "react";
import { Badge } from "../ui/Badge";

interface TableCardProps {
  title: string;
  columns: {
    key: string;
    header: string;
    width?: string;
  }[];
  data: any[];
  onRowClick?: (row: any) => void;
  renderCell?: (row: any, column: string) => ReactNode;
  showExpandIcon?: boolean;
  onExpand?: () => void;
  className?: string;
}

const TableCard: FC<TableCardProps> = ({
  title,
  columns,
  data,
  onRowClick,
  renderCell,
  showExpandIcon = false,
  onExpand,
  className = "",
}) => {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        variant: "success" | "warning" | "danger" | "info" | "neutral";
        text: string;
      }
    > = {
      Ready: { variant: "success", text: "Ready" },
      "In Progress": { variant: "info", text: "In Progress" },
      Acknowledged: { variant: "info", text: "Acknowledged" },
      Pending: { variant: "warning", text: "Pending" },
      Rejected: { variant: "danger", text: "Rejected" },
    };

    const config = statusMap[status] || { variant: "neutral", text: status };

    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-medium text-gray-800">{title}</h3>

        {showExpandIcon && (
          <button
            onClick={onExpand}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width || ""}`}
                >
                  {column.header}
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td
                    key={`${idx}-${column.key}`}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {renderCell ? (
                      renderCell(row, column.key)
                    ) : column.key === "status" ? (
                      getStatusBadge(row[column.key])
                    ) : (
                      <div className="text-sm text-gray-900">
                        {row[column.key]}
                      </div>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-blue-600 hover:text-blue-900">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(TableCard);
