"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

interface IPaginatorProps {
  page: number;
  pageCount: number;
  onOpenChangeAction: (page: number) => void;
}

export const Paginator: React.FC<IPaginatorProps> = ({
  page,
  pageCount,
  onOpenChangeAction,
}) => {
  if (pageCount === 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenChangeAction(Math.max(page - 1, 1));
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
                onOpenChangeAction(i + 1);
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
              onOpenChangeAction(Math.min(page + 1, pageCount));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
