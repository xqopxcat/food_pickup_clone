import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BRANCHES = '/branches';

export const branchesCoreApi = createApi({
    reducerPath: 'branchesCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/v1',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builders) => ({
        getBranches: builders.query({
            query: () => BRANCHES,
        })
    })
});

export const {
    useGetBranchesQuery
} = branchesCoreApi