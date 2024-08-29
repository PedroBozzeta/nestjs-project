import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import ProductoDto from './dtos/ProductoDto';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {

    }

    @Get()
    async getAll() {
        return await this.productoService.getAll()
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return await this.productoService.findById(id);
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() productoDto: ProductoDto) {
        return await this.productoService.create(productoDto)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() productoDto: ProductoDto) {
        return await this.productoService.update(id, productoDto)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.productoService.delete(id)
    }
}
