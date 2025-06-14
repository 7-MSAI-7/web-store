import { apiClient } from './client';
import type { 
  SearchParams, 
  UserBehaviorRequest,
  Product,
  UserBehavior,
  RecommedationsResponse
} from './types';

// 검색 API
export const searchProducts = async (params: SearchParams): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>('/api/v1/products', {
    params: {
      q: params.q
    }
  });
  return data;
};

// 사용자 행동 API
export const createUserBehavior = async (behavior: UserBehaviorRequest): Promise<UserBehavior[]> => {
  const response = await apiClient.post<UserBehavior[]>('/api/v1/customers/behaviors', behavior);
  return response.data;
};

// 추천 API (V1)
export const createV1Recommendations = async (): Promise<Product[]> => {
  const response = await apiClient.get<RecommedationsResponse>('/api/v1/recommendations');
  return response.data.data;
};

// 추천 API (V2)
export const createV2Recommendations = async (): Promise<Product[]> => {
  const response = await apiClient.get<RecommedationsResponse>('/api/v2/recommendations');
  return response.data.data;
}; 