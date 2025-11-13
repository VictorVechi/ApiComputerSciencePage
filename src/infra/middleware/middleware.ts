import { container } from 'tsyringe';
import JwtService from '../service/JwtService';

export const requireAuth = (req: any, res: any, next: any) => {
  return container.resolve(JwtService).checkToken(req, res, next);
};

export const requireAuthWithUser = (req: any, res: any, next: any) => {
  return container.resolve(JwtService).checkTokenAndAddUserInfo(req, res, next);
};

export const requireAdmin = (req: any, res: any, next: any) => {
  return container.resolve(JwtService).checkAdminToken(req, res, next);
};