import { Router } from 'express';
import { createTrip, getMyTrips, getTripById } from '../controllers/trip.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);

router.post('/', createTrip);
router.get('/', getMyTrips);
router.get('/:id', getTripById);

export default router;
