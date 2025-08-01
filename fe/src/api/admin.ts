import { apiFetch, publicApiFetch } from './api';
import { saveLoginInfo } from '../store/user';
import { FULL_API_URLS } from '@iitp-dabt/common';
import type {
  AdminLoginReq,
  AdminLoginRes,
  AdminLogoutReq,
  AdminLogoutRes,
  AdminRefreshTokenReq,
  AdminRefreshTokenRes,
  AdminProfileRes,
  AdminProfileUpdateReq,
  AdminProfileUpdateRes,
  AdminPasswordChangeReq,
  AdminPasswordChangeRes,
  ApiResponse
} from '@iitp-dabt/common';

/**
 * 관리자 로그인
 */
export async function loginAdmin(params: AdminLoginReq): Promise<ApiResponse<AdminLoginRes>> {
  const response = await publicApiFetch<AdminLoginRes>(FULL_API_URLS.AUTH.ADMIN_LOGIN, {
    method: 'POST',
    body: JSON.stringify(params),
  });

  // 로그인 성공 시 토큰과 사용자 정보 저장
  if (response.success && response.data?.token && response.data?.refreshToken) {
    const userInfo = {
      userId: response.data.admin.adminId,
      email: '', // email 정보는 더 이상 제공되지 않음
      name: response.data.admin.name,
      userType: 'A' as const,
      role: response.data.admin.role,
    };
    saveLoginInfo(userInfo, response.data.token, response.data.refreshToken);
  }
  return response;
}

/**
 * 관리자 로그아웃
 */
export async function logoutAdmin(params: AdminLogoutReq): Promise<ApiResponse<AdminLogoutRes>> {
  return apiFetch<AdminLogoutRes>(FULL_API_URLS.AUTH.ADMIN_LOGOUT, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 관리자 토큰 갱신
 */
export async function refreshAdminToken(params: AdminRefreshTokenReq): Promise<ApiResponse<AdminRefreshTokenRes>> {
  return apiFetch<AdminRefreshTokenRes>(FULL_API_URLS.AUTH.ADMIN_REFRESH, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 관리자 프로필 조회
 */
export async function getAdminProfile(): Promise<ApiResponse<AdminProfileRes>> {
  return apiFetch<AdminProfileRes>(FULL_API_URLS.ADMIN.PROFILE.GET);
}

/**
 * 관리자 프로필 업데이트
 */
export async function updateAdminProfile(params: AdminProfileUpdateReq): Promise<ApiResponse<AdminProfileUpdateRes>> {
  return apiFetch<AdminProfileUpdateRes>(FULL_API_URLS.ADMIN.PROFILE.POST, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * 관리자 비밀번호 변경
 */
export async function changeAdminPassword(params: AdminPasswordChangeReq): Promise<ApiResponse<AdminPasswordChangeRes>> {
  return apiFetch<AdminPasswordChangeRes>(FULL_API_URLS.ADMIN.PASSWORD.POST, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

// TODO: Admin FAQ, QnA, Account 관리 API 함수들 추가 예정
// export async function getAdminFaqList(params: AdminFaqListReq): Promise<ApiResponse<AdminFaqListRes>> { ... }
// export async function createAdminFaq(params: AdminFaqCreateReq): Promise<ApiResponse<AdminFaqCreateRes>> { ... }
// export async function getAdminQnaList(params: AdminQnaListReq): Promise<ApiResponse<AdminQnaListRes>> { ... }
// export async function getAdminAccountList(params: AdminAccountListReq): Promise<ApiResponse<AdminAccountListRes>> { ... } 