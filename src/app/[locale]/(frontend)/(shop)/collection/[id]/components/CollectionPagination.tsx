import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
    page: number,
    totalPages: number,
    goToPage: (page: number) => void;
}

const CollectionPagination = ({ page, totalPages, goToPage }: Props) => {
    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => goToPage(page - 1)}
                        className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    />
                </PaginationItem>

                {/* Dynamic Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                        <PaginationLink
                            href="#"
                            isActive={page === pageNum}
                            onClick={() => goToPage(pageNum)}
                        >
                            {pageNum}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => goToPage(page + 1)}
                        className={page === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default CollectionPagination;