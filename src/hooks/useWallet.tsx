import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addWalletEntry,
  deleteEntry,
  getAllWalletsEntries,
  updateEntry,
} from '../services';
import {
  CreateWalletEntryBody,
  DeleteWalletEntry,
  GetWalletEntriesParams,
  UpdateWalletEntry,
  WalletResponse,
} from '../types';
import { QueryKeysEnum } from '../types/query-keys.enum';
import { AxiosResponse } from 'axios';

export const useWallet = ({
  authorization,
  params,
}: GetWalletEntriesParams) => {
  const queryClient = useQueryClient();

  const sendWalletEntryMutation = useMutation({
    mutationFn: (data: CreateWalletEntryBody) => addWalletEntry(data),
    onSuccess: (result: AxiosResponse<any, any>) => {
      queryClient.setQueryData(
        [QueryKeysEnum.GET_WALLET],
        (prevCache: { data: WalletResponse }) => {
          prevCache.data.total += result.data.value;
          result.data.value = result.data.value.toString();

          prevCache.data.entries = [
            result.data,
            ...(prevCache.data.entries || []),
          ];

          return prevCache;
        },
      );
    },
  });

  const updateEntryMutation = useMutation({
    mutationFn: (data: UpdateWalletEntry) => updateEntry(data),
    onSuccess: (result: AxiosResponse<any, any>) => {
      queryClient.setQueryData(
        [QueryKeysEnum.GET_WALLET],
        (prevCache: { data: WalletResponse }) => {
          let prevValue: string | undefined;

          prevCache.data.entries = prevCache.data.entries.map((entry) => {
            if (entry.id === result.data.id) {
              prevValue = entry.value;
              return {
                ...entry,
                ...result.data,
                value: result.data.value.toString(),
              };
            }
            return entry;
          });

          if (
            prevValue !== undefined &&
            Number(prevValue) !== Number(result.data.value)
          ) {
            prevCache.data.total +=
              Number(result.data.value) - Number(prevValue);
          }

          return prevCache;
        },
      );
    },
  });

  const deleteEntryMutation = useMutation({
    mutationFn: async (data: DeleteWalletEntry) => {
      const result = await deleteEntry(data);

      queryClient.setQueryData(
        [QueryKeysEnum.GET_WALLET],
        (prevCache: { data: WalletResponse }) => {
          const entryToRemove = prevCache.data.entries.find(
            (entry) => entry.id === Number(data.id),
          );

          if (entryToRemove) {
            prevCache.data.total -= Number(entryToRemove.value);
            prevCache.data.entries = prevCache.data.entries.filter(
              (entry) => entry.id !== Number(data.id),
            );
          }

          return prevCache;
        },
      );

      return result;
    },
  });

  const { data, isPending } = useQuery({
    queryKey: [QueryKeysEnum.GET_WALLET],
    queryFn: () => getAllWalletsEntries({ authorization, params }),
  });

  return {
    sendWalletEntryMutation,
    updateEntryMutation,
    deleteEntryMutation,
    entries: data?.data.entries,
    total: data?.data.total,
    isLoading:
      sendWalletEntryMutation.isPending ||
      updateEntryMutation.isPending ||
      deleteEntryMutation.isPending ||
      isPending,
  };
};
