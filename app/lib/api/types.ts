// 상품 타입 정의
export interface Product {
  id?: number;  // 선택적으로 변경
  name: string;
  price: string;
  image: string;
  seller: string;
}

// 사용자 행동 타입
export type UserEvent = 
  | 'item_view'
  | 'item_like'
  | 'item_add_to_cart_tap'
  | 'offer_make'
  | 'buy_start'
  | 'buy_comp';

// 사용자 행동 요청 타입
export interface UserBehaviorRequest {
  name: string;
  event: UserEvent;
}

export interface RecommedationsResponse {
    task_id: string;
    status: string;
    api_version: string;
    data: Product[];
}

export interface UserBehavior {
    name: string;
    event: string;
}

// 검색 파라미터 타입
export interface SearchParams {
  q: string;
} 