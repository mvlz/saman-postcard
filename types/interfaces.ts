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
export type PaginationPropsType = {
    totalItems?: number,
    setPageItem: (data: { end: number, start: number }) => void
}
export interface ModalPropsType {
    open: boolean
    setOpen: (data: boolean) => void
    children?: string | JSX.Element | JSX.Element[]
}


