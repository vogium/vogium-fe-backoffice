/**
 * This hook provides form update functionality with field-level mutations.
 * It handles form validation, API calls, and notifications for update operations.
 */

import {
  BaseRecord,
  HttpError,
  PrevContext,
  UpdateResponse,
} from "@refinedev/core";
import { ObjectSchema } from "yup";
import { getRouteByField } from "../lib/routeByField";
import { resolveMutationPromises } from "../lib/requestPromiseResolver";
import { API_ROUTES } from "../contants/apiRoutes";
import { ISingleResourceKey } from "../types/IRoutes";
import { MutateFunction } from "@refinedev/core/dist/definitions/types";
import { UpdateParams } from "@refinedev/core/dist/hooks/data/useUpdate";

/**
 * Props required for form update operations
 * @template T - Type of form data extending BaseRecord
 */
interface FormUpdateProps<T extends BaseRecord> {
  dirtyValues: T | undefined; // Changed form values
  schema: ObjectSchema<any>; // Yup validation schema
  resourceName: keyof typeof API_ROUTES; // Resource name for API routes
  operation: ISingleResourceKey; // Operation type (e.g., "UPDATE")
  setLoadingState: (state: boolean) => void; // Loading state handler
  setIsDetailsModalOpen?: (state: boolean) => void; // Modal state handler
  validateForm: (props: any) => any; // Form validation function
  // mutate: (props: any) => Promise<any>; // Mutation function
  mutate: MutateFunction<
    UpdateResponse<BaseRecord>,
    HttpError,
    UpdateParams<BaseRecord, HttpError, BaseRecord>,
    PrevContext<BaseRecord>
  >;
  translate: (key: string, params?: any) => string; // Translation function
  open?: (props: any) => void; // Notification handler
}

export const useFormUpdate = <T extends BaseRecord>() => {
  /**
   * Handles form update process including validation and API calls
   * @param props FormUpdateProps object containing necessary parameters
   */
  const handleUpdateByFields = async ({
    dirtyValues,
    schema,
    resourceName,
    operation,
    setLoadingState,
    setIsDetailsModalOpen,
    validateForm,
    mutate,
    translate,
    open,
  }: FormUpdateProps<T>) => {
    // Start loading state
    setLoadingState(true);

    // Validate form data
    const validation = validateForm({
      body: dirtyValues,
      schema,
      errorCallBack: () => {
        open?.({
          message: translate("notifications.validationError"),
          type: "warning",
        });
        setLoadingState(false);
      },
    });

    if (validation.isValid) {
      // Process only if there are changes
      if (dirtyValues && Object.keys(dirtyValues).length) {
        // Create mutation promises for each changed field
        const promises = Object.keys(dirtyValues).map(async (key) => {
          const API_ROUTE_KEY = getRouteByField(resourceName, operation, key);

          if (!API_ROUTE_KEY) {
            console.error("API_ROUTE_KEY is not found for key: ", key);
            return;
          }

          return mutate({
            values: {
              serviceKey: API_ROUTE_KEY,
              data: {
                [key]: dirtyValues[key as keyof T],
              },
            },
          });
        });

        // Resolve all mutation promises
        await resolveMutationPromises({
          promises,
          setLoadingState,
          onSuccess: (result) => {
            open?.({
              message: translate("notifications.updateSuccess", {
                total: result.successCount,
              }),
              type: "success",
            });
            setIsDetailsModalOpen?.(false);
          },
          onError: (result) => {
            open?.({
              message: translate("notifications.error", {
                failed: result.failedCount,
                total: result.totalCount,
              }),
              type: "error",
            });
          },
        });
      } else {
        setIsDetailsModalOpen?.(false);
      }
      setLoadingState(false);
    }
  };

  return { handleUpdateByFields };
};
