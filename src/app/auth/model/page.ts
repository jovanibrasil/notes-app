export interface Page<T> {
    content: T[],
    totalPages: number,
    totalElements: number,
    first: boolean,
    last: boolean,
    size: number,
    number: number,
    sort: any,
    numberOfElements: number,
    empty: boolean,
    pageable: any,
}

    
    
