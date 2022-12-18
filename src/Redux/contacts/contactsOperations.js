// import * as fetch from 'Utils/Api';
// import { createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => ({
        url: '/contacts',
        method: 'get',
      }),

      providesTags: ['Contacts'],
    }),
    postContacts: builder.mutation({
      query: value => ({
        url: '/contacts',
        method: 'post',
        data: value,
      }),
      invalidatesTags: ['Contacts'],
    }),
    changeContacts: builder.mutation({
      query: value => ({
        url: `/contacts/${value.id}`,
        method: 'PATCH',
        data: {
          name: value.name,
          number: value.number,
        },
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContacts: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  usePostContactsMutation,
  useDeleteContactsMutation,
  useChangeContactsMutation,
} = contactsApi;

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchContacts',
//   async (_, rejectWithValue) => {
//     try {
//       const contacts = await fetch.fetchContacts();
//       return contacts;
//     } catch (err) {
//       rejectWithValue(err);
//     }
//   }
// );

// export const deleteContacts = createAsyncThunk(
//   'contacts/deleteContacts',
//   async (id, rejectWithValue) => {
//     try {
//       const contact = await fetch.deleteContacts(id);
//       return contact;
//     } catch (err) {
//       rejectWithValue(err);
//     }
//   }
// );

// export const postContacts = createAsyncThunk(
//   'contacts/postContacts',
//   async (newContact, rejectWithValue) => {
//     try {
//       const contact = await fetch.postContacts(newContact);
//       return contact;
//     } catch (err) {
//       rejectWithValue(err);
//     }
//   }
// );

// export const changeContact = createAsyncThunk(
//   'contacts/changeContact',
//   async (newContact, rejectWithValue) => {
//     try {
//       const contact = await fetch.changeContact(newContact);
//       return contact;
//     } catch (err) {
//       rejectWithValue(err);
//     }
//   }
// );
