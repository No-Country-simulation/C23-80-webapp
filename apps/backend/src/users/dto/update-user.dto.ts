import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProfileDto } from './profile.dto';
import { UserReviewDto } from './user-review.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsBoolean()
    status: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProfileDto)
    profile?: ProfileDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserReviewDto)
    review?: UserReviewDto[];
}