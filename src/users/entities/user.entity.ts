import { UserImage } from 'src/users/entities/user-image.entity';
import { Role } from '../../roles/entities/role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  @Index()
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('bool', { default: true, select: false })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone', nullable: false, select: false })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: false, select: false })
  updatedAt!: Date;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToMany(() => UserImage, (image) => image.user, { cascade: true, eager: true }) // 'cascade' para persistir automáticamente
  images: UserImage[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
