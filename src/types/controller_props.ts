import { NextFunction, Request, Response } from 'express'

type ControllerProps = {
    request: Request
    response: Response
    next: NextFunction
}

export type { ControllerProps }
