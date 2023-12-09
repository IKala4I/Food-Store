import {HTTP_UNAUTHORIZED} from '../constans/http_status';
import {verify} from 'jsonwebtoken';

export default (req: any, res: any, next: any) => {
  const token = req.headers.access_token as string;

  if (!token)
    return res.status(HTTP_UNAUTHORIZED).send();

  try {
    req.user = verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    res.status(HTTP_UNAUTHORIZED).send();
  }

  return next();
}
