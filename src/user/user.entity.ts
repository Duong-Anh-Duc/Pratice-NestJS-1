import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArticleEntity } from '../article/article.entity';
@Entity({name : 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column()
    username : string

    @Column()
    email : string;

    @Column({default : ''})
    bio : string

    @Column({default : ''})
    image : string;

    @Column()
    @Exclude()
    password? : string

    @OneToMany(() => ArticleEntity, (article) => (article.author))
    articles : ArticleEntity[]

    @ManyToMany(() => ArticleEntity)
    @JoinTable()
    favorites: ArticleEntity[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password){
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt)
            
        }
    }

}
