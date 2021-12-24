import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 100, {
    message: 'Имя должен быть не менее 3 символов',
  })
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(6, 10, {
    message: 'Пароль должен быть не менее 6 и не более 10 символов',
  })
  password?: string;
}
