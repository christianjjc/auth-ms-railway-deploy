import { User } from '../../users/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('int')
  level: number;

  @Column('bool', { default: true, select: false })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone', nullable: false, select: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: false, select: false })
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.name = this.name.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
