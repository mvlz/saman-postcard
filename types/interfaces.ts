export type PostType = {
    userId?: number;
    id?: number;
    title: string;
    body?: string;
}
export type userDataType = {
    id?: number;
    name: string;
    username?: string;
}
export type PaginationPropTypes = {
    totalItems?: number,
    setPageItem: (data: { end: number, start: number }) => void
}


