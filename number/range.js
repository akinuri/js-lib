function range(start, end, step = 1) {
    const result = [];
    if (step === 0) {
        throw new Error("Step cannot be zero.");
    }
    if (start <= end && step < 0) {
        throw new Error("Step must be positive when start is less than or equal to end.");
    }
    if (start >= end && step > 0) {
        throw new Error("Step must be negative when start is greater than or equal to end.");
    }
    for (let i = start; start < end ? i <= end : i >= end; i += step) {
        result.push(i);
    }
    return result;
}