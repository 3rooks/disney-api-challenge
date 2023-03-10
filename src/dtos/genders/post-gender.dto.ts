import { imageType, titleType } from '@constants/dto-types';
import { IGender } from '@interfaces/gender.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

type Gender = Omit<IGender, '_id' | 'movies' | 'createdAt' | 'updatedAt'>;

const postGenderSchema: JSONSchemaType<Gender> = {
    type: 'object',
    properties: {
        name: titleType,
        image: imageType
    },
    required: ['name', 'image'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(postGenderSchema);

export const postGenderDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { name, image } = req.body;

    req.body = {
        name: String(name),
        image: String(image)
    };

    return next();
};
