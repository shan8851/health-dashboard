"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

type Props = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export function Paginator({ page, pageCount, onPageChange }: Props) {
  if (pageCount === 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.max(page - 1, 1));
            }}
          />
        </PaginationItem>

        {Array.from({ length: pageCount }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={page === i + 1}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i + 1);
              }}
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
              onPageChange(Math.min(page + 1, pageCount));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
