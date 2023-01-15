import { ENTITIES } from '@constants/entities';
import { ICharacter } from '@interfaces/character.interface';
import mongoose from 'mongoose';
import uuidv4 from 'uuid-random';

const { Schema, model } = mongoose;

const characterSchema = new Schema<ICharacter>(
    {
        _id: {
            _id: false,
            type: String,
            unique: true,
            default: () => uuidv4()
        },
        name: {
            type: String,
            require: true,
            unique: true
        },
        image: {
            type: String,
            require: true
        },
        age: {
            type: Number,
            require: true
        },
        history: {
            type: String,
            require: true
        },
        movies: [
            {
                _id: {
                    _id: false
                },
                movie: {
                    type: Schema.Types.String,
                    ref: ENTITIES.MOVIES
                }
            }
        ]
    },
    { timestamps: true, versionKey: false }
);

export const CharacterModel = model<ICharacter>(
    ENTITIES.CHARACTERS,
    characterSchema
);
