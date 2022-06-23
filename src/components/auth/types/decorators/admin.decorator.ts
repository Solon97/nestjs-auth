import { SetMetadata } from '@nestjs/common';

export const ADMIN_PERMISSION_KEY = 'adminPermission';
export const Admin = () => SetMetadata(ADMIN_PERMISSION_KEY, true);