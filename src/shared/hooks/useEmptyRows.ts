import { useState, useLayoutEffect, RefObject } from 'react';

export const useEmptyRows = (containerRef: RefObject<HTMLElement | null>, itemCount: number) => {
    const [emptyRowCount, setEmptyRowCount] = useState(0);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const containerHeight = containerRef.current.offsetHeight;
        const contentHeight = itemCount * (68);
        const remainingSpace = containerHeight - contentHeight;

        if (remainingSpace > 0) {
            const calculatedRows = Math.floor(remainingSpace / (68));
            setEmptyRowCount(Math.max(calculatedRows, 0));
        } else {
            setEmptyRowCount(0);
        }

    }, [containerRef, itemCount]);

    return emptyRowCount;
};