import { Controller, Body, Post, UseGuards, Request, Get, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    
    @Get('todos')
    async findAll() {
        // get all posts in the db
        return await this.todoService.findAll();
    }
    // @UseGuards(AuthGuard('local'))
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@Body() todo: TodoDto, @Request() req): Promise<Todo> {
        // create a new post and return the newly created post
        console.log(req.user.id)
        return await this.todoService.create(todo,req.user.id);
    }

    
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Todo> {
        // find the post with this id
        const todo = await this.todoService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!todo) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // if post exist, return the post
        return todo;
    }
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() todo: TodoDto, @Request() req): Promise<Todo> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedTodo } = await this.todoService.update(id, todo,req.user.id);

        // if the number of row affected is zero, it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return the updated post
        return updatedTodo;
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the post with this id
        const deleted = await this.todoService.delete(id,req.user.id);

        // if the number of row affected is zero, then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }

    
}