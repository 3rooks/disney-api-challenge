export interface IGender {
    _id?: string;
    name: string;
    image: string;
    movies?: { movie: string }[];
    createdAt?: Date;
    updatedAt?: Date;
}
