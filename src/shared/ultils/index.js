import { BASE_URL } from "../constannts/app";
export const getImageProduct = (imageName)=>{
    return `${BASE_URL}/assets/uploads/products/${imageName}`;
}
