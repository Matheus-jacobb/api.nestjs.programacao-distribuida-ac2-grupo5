import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt-auth.guard';

export function ProtectRoute(): MethodDecorator {
    return applyDecorators(
        UseGuards(JwtAuthGuard),
        ApiBearerAuth(),
        ApiForbiddenResponse({ description: 'Você não tem permissão para acessar esse recurso.' }),
    );
}