import axios from 'axios';

// API 호스트 URL 설정
const API_HOST = process.env.NODE_ENV === 'production'
  ? 'https://4.230.41.237:8000'
  : 'http://localhost:8000';

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 포함
});

// API 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리
    if (error.response) {
      // 서버 응답이 있는 경우
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      console.error('Network Error:', error.request);
    } else {
      // 요청 설정 중 에러가 발생한 경우
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
); 