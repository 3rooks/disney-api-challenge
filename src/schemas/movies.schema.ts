import { ENTITIES } from '#constants/entities.js';
import mongoose from 'mongoose';
import uuidv4 from 'uuid-random';

const { Schema, model } = mongoose;

const movieSchema = new Schema(
    {
        _id: {
            _id: false,
            type: String,
            unique: true,
            default: () => uuidv4()
        },
        title: {
            type: String,
            require: true,
            unique: true
        },
        image: {
            type: String,
            require: true
        },
        rated: {
            type: Number,/*  */
            require: true
        },
        releaseYear: {
            type: Number,
            require: true
        },
        characters: [
            {
                _id: { _id: false },
                character: {
                    type: Schema.Types.String,
                    ref: ENTITIES.CHARACTERS
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

movieSchema.pre('find', function () {
    this.populate('characters.character');
});
movieSchema.pre('findOne', function () {
    this.populate('characters.character');
});
movieSchema.pre('findById', function () {
    this.populate('characters.character');
});

export const movieModel = model(ENTITIES.MOVIES, movieSchema);