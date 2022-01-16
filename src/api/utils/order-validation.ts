export const isValidStatus = (status: string): boolean => {
    const valid = ['open', 'complete'].includes(status);
    if (!valid) {
        throw new Error(
            `Please enter a valid order status ['open', 'complete']`
        );
    } else {
        return true;
    }
};
