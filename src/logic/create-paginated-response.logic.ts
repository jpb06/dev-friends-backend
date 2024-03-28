export const createPaginatedResponse =
  <TData>(page: number, byPage: number) =>
  (data: TData[]) => {
    const start = (page - 1) * byPage;
    const lastPage = Math.ceil(data.length / byPage);

    return {
      result: data.splice(start, byPage),
      PreviousPage: page === 1 ? undefined : page - 1,
      currentPage: page,
      nextPage: page === lastPage ? undefined : page + 1,
      lastPage,
    };
  };
