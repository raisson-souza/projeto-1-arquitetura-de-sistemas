import { Request, Response } from 'express'

type ControllerProps = {
    request: Request
    response: Response
}

export type { ControllerProps }
