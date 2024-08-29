import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('producto')
export default class ProductoEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
    nombre: string;
    @Column({ type: 'float', nullable: false })
    precio: number;
}