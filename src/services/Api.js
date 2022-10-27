import Http from "./Http";

export const getCategories = (config) => {
  return Http.get("/categories", config);
};

export const getCategory = (id, config)=>{
  return Http.get(`/categories/${id}`, config);
}


export const getProductCategories = (id, config) => {
  return Http.get(`/categories/${id}/products`, config);
};



export const getProducts = (config) => {
  return Http.get("/products", config);
};
