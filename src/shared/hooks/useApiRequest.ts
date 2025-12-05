import { AppDispatch } from "@/app/providers/store/types";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

interface ApiRequestOptions {
    preTry?: () => void,
    onTry?: () => void,
    onFinally?: () => void,
    useExternalLoading?: boolean
}

export const useApiRequest = (asyncAction: any, options: ApiRequestOptions = {}) => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { preTry, onTry, onFinally, useExternalLoading } = options;

    const request = useCallback(async (payload: any) => {
        if (preTry) {
            preTry();
        }

        if (isLoading) return;

        if (!useExternalLoading) {
            setIsLoading(true);
        }

        try {
            if (onTry) {
                onTry();
            }

            const result = await dispatch(asyncAction(payload)).unwrap();
            return result;
        } catch (error) {
            console.error(`API Request ${asyncAction} Failed: ${error}`);
            throw error;
        } finally {
            if (onFinally) {
                onFinally();
            }
            if (!useExternalLoading) {
                setIsLoading(false);
            }
        }
    }, [dispatch, asyncAction, preTry, onTry, onFinally, useExternalLoading])

    return [request, isLoading] as const;
};