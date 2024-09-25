import { IsOptional, IsString } from 'class-validator';

export class TitlesPageDto {
  @IsOptional()
  @IsString()
  spaceId: string;
}