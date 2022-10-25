import Http from "./Http";

export const getProducts = (config) => {
    return Http.get("/products", config);
};
