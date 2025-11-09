import { AppDispatch } from "@/app/providers/store/types";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface ApiRequestOptions {
    preTry?: () => void,
    onTry?: () => void,
    onFinally?: () => void
}

export const useApiRequest = (asyncAction: any, options: ApiRequestOptions = {}) => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { preTry, onTry, onFinally } = options;

    const request = async (payload: any) => {
        if (preTry) {
            preTry();
        }

        if (isLoading) return;
        setIsLoading(true);
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
            if (onFinally) { // Используется в модалке календара
                onFinally();
            }
            setIsLoading(false);
        }
    };

    return [request, isLoading] as const;
};