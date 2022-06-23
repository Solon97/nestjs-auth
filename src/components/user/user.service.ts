import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { User } from './entities/user.entity'
@Injectable()
export class UserService {
  constructor (private readonly prisma: PrismaService) {}

  async create (createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }
    console.log('hash')
    const createdUser = await this.prisma.user.create({ data })

    return {
      ...createdUser,
      password: null
    }
  }

  findAll () {
    return 'This action returns all user'
  }

  async findById (id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  findByEmail (email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  update (id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove (id: number) {
    return `This action removes a #${id} user`
  }
}
