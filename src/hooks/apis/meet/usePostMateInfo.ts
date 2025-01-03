import { AxiosError } from 'axios';

import { meetingQueryKeys, meetingUrls, post } from '@/libs';
import { PostMateInfoType } from '@/types';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const usePostMateInfo = (
  options?: UseMutationOptions<unknown, AxiosError, PostMateInfoType>
) =>
  useMutation({
    mutationKey: meetingQueryKeys.postMateInfo(),
    mutationFn: (body: PostMateInfoType) =>
      post(meetingUrls.postMateInfo(), body),
    ...options,
  });
