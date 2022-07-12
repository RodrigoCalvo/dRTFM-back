import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Post('login')
    login(
        @Body() loginData: { email: string; password: string },
        @Headers('Authorization') token: string
    ) {
        if (token) {
            return this.userService.loginWithToken(token);
        }
        return this.userService.login(loginData);
    }
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Patch()
    update(
        @Headers('Authorization') token: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.userService.update(token, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

    @Delete()
    removeSelf(@Headers('Authorization') token: string) {
        return this.userService.removeSelf(token);
    }
}
