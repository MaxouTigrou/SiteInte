import { Request, Response } from 'express';
import { RoleType } from '../schemas/user.schema';
import * as service from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { errorResponse, createResponse, okResponse } from '../utils/responses';
import { sign } from 'jsonwebtoken';
import { jwtSecret } from '../utils/secret';

export const register = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;

    first_name ?? errorResponse(res, { msg: "No firt name" });
    last_name ?? errorResponse(res, { msg: "No last name" });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await service.createUser(first_name, last_name, email, hashedPassword, RoleType.NewStudent);
        createResponse(res, {})
    } catch (error) {
        errorResponse(res, { error });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await service.getUserByEmail(email);
        if (user.length !== 1) {
            return errorResponse(res, { msg: "user doesn't exists" });
        }

        const passwordMatch = await bcrypt.compare(password, user[0].password);
        if (!passwordMatch) {
            return errorResponse(res, { msg: "password erroned" });
        }

        const role = user[0].role
        const token = sign({ email, role }, jwtSecret, { expiresIn: '1h' });
        okResponse(res, { data: token })
    } catch (error) {
        errorResponse(res, { error });
    }
}