interface PromiseResult {
  success: boolean;
  totalCount: number;
  successCount: number;
  failedCount: number;
}

interface PromiseResolverProps {
  promises: Promise<any>[];
  onSuccess?: (result: PromiseResult) => void;
  onError?: (result: PromiseResult) => void;
  setLoadingState?: (loading: boolean) => void;
}

interface MutationResponse {
  success: boolean;
  data?: any;
  error?: any;
}

interface PromiseResult {
  success: boolean;
  totalCount: number;
  successCount: number;
  failedCount: number;
  responses: MutationResponse[];
}

export const resolveMutationPromises = async ({
  promises,
  onSuccess,
  onError,
  setLoadingState,
}: PromiseResolverProps): Promise<PromiseResult> => {
  try {
    setLoadingState?.(true);
    const results = await Promise.allSettled(promises);

    const responses: MutationResponse[] = results.map((result) => {
      if (result.status === "fulfilled") {
        // Refine mutation response
        const response = result.value?.data;
        return {
          success: response?.success ?? false,
          data: response?.data,
          error: response?.error,
        };
      }
      return {
        success: false,
        error: (result as PromiseRejectedResult).reason,
      };
    });

    const result = {
      success: true,
      totalCount: responses.length,
      successCount: responses.filter((r) => r.success).length,
      failedCount: responses.filter((r) => !r.success).length,
      responses,
    };

    if (result.failedCount > 0) {
      result.success = false;
      onError?.(result);
    } else {
      onSuccess?.(result);
    }

    return result;
  } finally {
    setLoadingState?.(false);
  }
};
