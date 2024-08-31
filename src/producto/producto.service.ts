import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductoEntity from './producto.entity';
import ProductoRepository from './producto.repository';
import ProductoDto from './dtos/ProductoDto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private productoRepository: ProductoRepository,
  ) {}

  async getAll(): Promise<ProductoEntity[]> {
    const list = await this.productoRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'La lista está vacía' });
    }
    return list;
  }

  async findById(id: number): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException({
        message: 'No existe un producto con ese id',
      });
    }
    return producto;
  }

  async findByNombre(nombre: string): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({
      where: { nombre: nombre },
    });
    if (!producto) {
      throw new NotFoundException({
        message: 'No existe un producto con ese nombre',
      });
    }
    return producto;
  }

  async create(productoDto: ProductoDto): Promise<any> {
    const producto = this.productoRepository.create(productoDto);
    await this.productoRepository.save(producto);

    return { message: 'Producto agregado' };
  }

  async update(id: number, productoDto: ProductoDto): Promise<any> {
    const producto = await this.findById(id);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    productoDto.nombre
      ? (producto.nombre = productoDto.nombre)
      : (producto.nombre = producto.nombre);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    productoDto.precio
      ? (producto.precio = productoDto.precio)
      : (producto.precio = producto.precio);

    await this.productoRepository.save(producto);

    return { message: 'Producto actualizado' };
  }

  async delete(id: number): Promise<any> {
    const producto = await this.findById(id);
    // await this.productoRepository.delete(producto);
    // return { message: 'Producto eliminado' };
    if (producto) {
      const result = await this.productoRepository.delete(id);
      console.log('Resultado de eliminación:', result); // Agr
    } else {
      throw new NotFoundException('Producto no existente');
    }
  }
}
