type DateArg = Date | null | undefined

export const isToday = (startDate: DateArg, endDate: DateArg): boolean => {
    if (!startDate) {
        return false;
    }

    const todayStart = new Date();

    const todayEnd = new Date();

    const taskStart = new Date(startDate);

    const taskEnd = endDate ? new Date(endDate) : taskStart;

    return taskStart <= todayEnd && taskEnd >= todayStart;
};

export const isHasDate = (startDate: DateArg, endDate: DateArg): boolean => {
    if (!startDate || !endDate) return false;
    return true
}