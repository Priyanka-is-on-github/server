//   import {authMiddleware} from '@clerk/clerk-sdk-node'

// export default authMiddleware({
//     publicRoutes:['/api/v1/webhook']  
// })

import { withAuth } from '@clerk/clerk-sdk-node';

const publicRoutes = ['/api/v1/webhook/webhookRoute'];

const authMiddleware = (req:any, res:any, next:any) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  return withAuth(req, res);
};

module.exports= authMiddleware;

