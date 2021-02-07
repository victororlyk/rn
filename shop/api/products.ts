import axios from 'axios';

export const createProduct = async (product: any): Promise<any> => {
  return await axios.post(`${process.env.API_URL}/products.json`, product);
}

export const fetchProducts = async (): Promise<any> => {
  return await axios.get(`${process.env.API_URL}/products.json`)
}
