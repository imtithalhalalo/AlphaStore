import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item } from "../interfaces/Item";


export const itemsApi = createApi({
    // We set the name of the reducer to let this API client use it to manage its state.
    reducerPath: 'itemsApi',

    //Then we defined the common base URL for all the endpoints within the API client, making it easier to create and manage API requests.
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),

    /** 
     * @param builder Builder query indicates that the endpoint returns an array of items objects and doesn't require any other parameters.
     * @returns 
     */
    endpoints: (builder) => ({
        items: builder.query<Item[], void>({
            query: () => '/items'
        })
    })
})


// generated hook is automatically named to use Mongoose Query.
/**
 * Its name is derived from the endpoint name, starting with a capital letter in line with the convention of prefixing use and appending query with a capital letter.
 */
export const { useItemsQuery } = itemsApi;