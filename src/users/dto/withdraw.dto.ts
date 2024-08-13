import { IsNumber, IsNotEmpty } from 'class-validator';

export class WithdrawDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}