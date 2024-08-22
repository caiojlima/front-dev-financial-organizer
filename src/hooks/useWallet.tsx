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
} from '../types';
import { QueryKeysEnum } from '../types/query-keys.enum';

export const useWallet = ({
  authorization,
  params,
}: GetWalletEntriesParams) => {
  const queryClient = useQueryClient();

  const sendWalletEntryMutation = useMutation({
    mutationFn: (data: CreateWalletEntryBody) => addWalletEntry(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.GET_WALLET] });
    },
  });

  const updateEntryMutation = useMutation({
    mutationFn: (data: UpdateWalletEntry) => updateEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.GET_WALLET] });
    },
  });

  const deleteEntryMutation = useMutation({
    mutationFn: (data: DeleteWalletEntry) => deleteEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.GET_WALLET] });
    },
  });

  const { data } = useQuery({
    queryKey: [QueryKeysEnum.GET_WALLET, authorization, params],
    queryFn: () => getAllWalletsEntries({ authorization, params }),
  });

  return {
    sendWalletEntryMutation,
    updateEntryMutation,
    deleteEntryMutation,
    entries: data?.data.entries,
    total: data?.data.total,
  };
};
