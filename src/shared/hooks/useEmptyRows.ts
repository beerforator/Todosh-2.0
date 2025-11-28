import { useState, useLayoutEffect, RefObject } from 'react';

const TASK_ROW_HEIGHT = 58;
const MIN_EMPTY_ROWS = 0;

export const useEmptyRows = (
    containerRef: RefObject<HTMLElement | null>,
    itemCount: number
) => {
    const [emptyRowCount, setEmptyRowCount] = useState(0);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const containerHeight = containerRef.current.offsetHeight;
        const contentHeight = itemCount * (TASK_ROW_HEIGHT + 10);
        const remainingSpace = containerHeight - contentHeight;

        if (remainingSpace > 0) {
            const calculatedRows = Math.floor(remainingSpace / (TASK_ROW_HEIGHT + 10));
            setEmptyRowCount(Math.max(calculatedRows, MIN_EMPTY_ROWS));
        } else {
            setEmptyRowCount(MIN_EMPTY_ROWS);
        }

    }, [containerRef, itemCount]);

    return emptyRowCount;
};