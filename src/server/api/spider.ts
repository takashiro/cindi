import { Router } from 'express';
import Spider from '@cindi/spider';
import FolderPage from '@cindi/spider/FolderPage';
import Config from '@cindi/spider/model/Config';

const router = Router();

router.post('/', async (req, res) => {
	const config = req.body as Config;
	const spider = new Spider(config);
	const page = spider.getPage();
	await page.open();
	if (page instanceof FolderPage) {
		res.json(page.getTopics());
	}
	page.close();
});

export default router;
