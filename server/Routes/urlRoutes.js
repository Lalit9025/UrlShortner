import express from 'express'
import { getAllUrlsController, getUrlController, redirectController, searchUrlController } from '../controllers/urlController.js';


const router = express.Router();

//get the url
router.post('/get-url', getUrlController)

//get all url for table
router.get('/all-urls',getAllUrlsController)

// to search by note and url
router.get('/search/:searchText',searchUrlController)

//redirect route
router.get('/redirecr/:shortID',redirectController)
router.get('/:shortId', redirectController);
export default router;