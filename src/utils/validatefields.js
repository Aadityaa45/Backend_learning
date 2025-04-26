export const validateFields = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value || value.trim() === "") {
            throw new ApiError(400, `${key} is required`);
        }
    }
};
