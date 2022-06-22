import { Prisma } from '@prisma/client'

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number
  email: string
  password: string
  name: string
  createdAt?: Date | string
  updatedAt?: Date | string
}
