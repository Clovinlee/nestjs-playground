import { Injectable, CanActivate, ExecutionContext, ForbiddenException, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

// Using MIXIN concept for passable role
export const RoleGuard = (role: number | number[]) => {
    let roleNumbers = [];
    if (role instanceof Array) {
        roleNumbers = role;
    } else {
        roleNumbers.push(role);
    }

    @Injectable()
    class RoleGuardMixin implements CanActivate {
        constructor(public prisma: PrismaService,) { }

        canActivate(
            context: ExecutionContext,
        ): boolean | Promise<boolean> | Observable<boolean> {
            const request = context.switchToHttp().getRequest();
            return validateRequest(request, this.prisma);
        }
    }

    async function validateRequest(request: any, prisma: PrismaService): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: {
                id: request.user.id
            }
        })

        if (roleNumbers.includes(user.roleId)) {
            return true;
        }
        throw new ForbiddenException("Invalid Role Access to Process");
        //
    }

    const guard = mixin(RoleGuardMixin);
    return guard;
}