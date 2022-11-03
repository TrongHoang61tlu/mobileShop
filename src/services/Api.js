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

export const getProduct = (id, config) =>{
  return Http.get(`/products/${id}`, config);
}

export const getCommentsProduct = (id, config) =>{
   return Http.get(`/products/${id}/comments`, config)
}

export const createCommentsProduct = (id, data, config) =>{
  return Http.post(`/products/${id}/comments`, data, config)
}