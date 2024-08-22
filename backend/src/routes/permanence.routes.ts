import express from 'express';
import  * as fc  from '../controllers/permanence.controller';
import {isAdmin, isAdminCE, isTokenValid} from '../middlewares/permissions';

const permanenceRouter = express.Router();

permanenceRouter.post('', isAdminCE, fc.createPermanence);
permanenceRouter.get('/all', fc.getAllPermanences);
permanenceRouter.get('/:id', isAdminCE, fc.getPermanence);
permanenceRouter.delete('/:id', isAdminCE, fc.deletePermanence);
permanenceRouter.put('/:id', isAdminCE, fc.updatePermanence);
permanenceRouter.post('/openorclosej7', isAdminCE, fc.openOrclosePermanenceJ7);
permanenceRouter.post('/register/:id', isTokenValid, fc.registerPermanence);
permanenceRouter.delete('/unregister/:id', isTokenValid, fc.unRegisterPermanence);
permanenceRouter.get('/registrations/:id', isTokenValid, fc.getRegistrations);
permanenceRouter.get('/userpermanences/:userid', isTokenValid, fc.getUserPermanences)


export default permanenceRouter;