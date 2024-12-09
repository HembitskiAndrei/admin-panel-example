import type { TDataTableProps } from "../types";
import { useState, useEffect } from "react";
import {
  chakra,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from "@chakra-ui/icons";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  SortingState,
  PaginationState,
  getSortedRowModel,
  getPaginationRowModel
} from "@tanstack/react-table";
import { useSearchParams  } from 'react-router-dom';

export function CustomTable<Data extends object>({
  data,
  columns
}: TDataTableProps<Data>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const regularExpressions = /[^0-9]/g;
  const searchPageIndex = (searchParams.get("page") || "0").replace(regularExpressions,"");
  const searchPageSize = (searchParams.get("size") || "10").replace(regularExpressions,""); 

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: searchPageIndex ? Math.max(0, Number(searchPageIndex) - 1) : 0,
    pageSize: searchPageSize ? Math.max(10, Number(searchPageSize)) : 10,
  });

  useEffect(() => {  
    setSearchParams({
      page: `${pagination.pageIndex + 1}`,
      size: `${pagination.pageSize}`
    })
  }, [pagination.pageIndex, pagination.pageSize]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      pagination,
    }
  });

  return (
    <>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {              
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span pl="4">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {              
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" m={4} alignItems="center">
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            onClick={() => table.firstPage()}
            isDisabled={!table.getCanPreviousPage()}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4} aria-label={""}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            icon={<ChevronLeftIcon h={6} w={6} />} aria-label={""}
          />
        </Tooltip>
      </Flex>

      <Flex alignItems="center">
        <Text flexShrink="0" mr={8}>
          Page{" "}
          <Text fontWeight="bold" as="span">
            {table.getState().pagination.pageIndex + 1}
          </Text>{" "}
          of{" "}
          <Text fontWeight="bold" as="span">
            {table.getPageCount().toLocaleString()}
          </Text>
        </Text>
        <Text flexShrink="0">Go to page:</Text>{" "}
        <NumberInput
          ml={2}
          mr={8}
          w={28}
          min={1}
          max={table.getPageCount()}
          onChange={(valueString: string, valueNumber: number) => {
            const page = valueString ? valueNumber - 1 : 0
            table.setPageIndex(page);            
          }}
          defaultValue={table.getState().pagination.pageIndex + 1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Select
          w={32}
          value={table.getState().pagination.pageSize}
          onChange={e => {
            const pageSize = Number(e.target.value);
            table.setPageSize(pageSize);          
          }}
        >
          {[10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon={<ChevronRightIcon h={6} w={6} />} aria-label={""}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            onClick={() => {table.lastPage(); console.log("last")}}
            disabled={!table.getCanNextPage()}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4} aria-label={""}
          />
        </Tooltip>
      </Flex>
      </Flex>
    </>
  );
}