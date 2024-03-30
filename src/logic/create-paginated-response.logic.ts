export const createPaginatedResponse =
  <TData>(page: number, byPage: number) =>
  (data: TData[]) => {
    const start = (page - 1) * byPage;
    const lastPage = Math.ceil(data.length / byPage);

    return {
      result: data.slice(start, start + byPage),
      previousPage: page === 1 ? undefined : page - 1,
      currentPage: page,
      nextPage: page === lastPage ? undefined : page + 1,
      lastPage,
      total: data.length,
    };
  };
