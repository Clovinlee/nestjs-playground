import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/guard';

// ROLE
// 1 <--- user
// 2 <--- admin
// 3 <--- superadmin

@UseGuards(JwtGuard) // <-- because of jwt.strategy.ts , we can access request.use
@Controller('users')
export class UserController {

    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @UseGuards(RoleGuard([1]))
    @Get('/user')
    getUser(@GetUser() user: User) {
        return `Welcome, User\n${JSON.stringify(user)}`;
    }

    @UseGuards(RoleGuard([2]))
    @Get('/admin')
    getAdmin(@GetUser() user: User) {
        return `Welcome, Admin\n${JSON.stringify(user)}`;
    }

    @UseGuards(RoleGuard([3]))
    @Get('/superadmin')
    getSuperAdmin(@GetUser() user: User) {
        return `Welcome, SuperAdmin\n${JSON.stringify(user)}`;
    }

}
