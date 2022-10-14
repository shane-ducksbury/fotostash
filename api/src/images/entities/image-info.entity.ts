import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Image } from "./image.entity";

@Entity()
export class ImageInfo{
    @PrimaryColumn("uuid")
    infoId: string;
    
    @OneToOne(() => Image, image => image.id)
    imageId: string;
    
    @Column()
    dateTime: string;

    @Column()
    imageHeight: number;

    @Column()
    imageWidth: number;

    @Column({nullable: true})
    cameraMake?: string;

    @Column({nullable: true})
    cameraModel?: string;

    @Column({nullable: true})
    offsetTime?: string;

    @Column({nullable: true})
    shutterSpeed?: string;

    @Column({nullable: true})
    apertureValue?: string;

    @Column({nullable: true})
    fNumber?: string;

    @Column({nullable: true})
    flash?: string;

    @Column({nullable: true})
    exposureMode?: string;

    @Column({nullable: true})
    whiteBalance?: string;

    @Column({nullable: true})
    lensSpecification?:string;

    @Column({nullable: true})
    gpsLatitude?: string;

    @Column({nullable: true})
    gpsLongitude?: string;




}