import { Router } from 'express';
import Spider, { type Config } from '@cindi/spider';

const router = Router();

router.post('/', async (req, res) => {
	const config = req.body as Config;
	const spider = new Spider(config);
	const page = spider.getPage();
	await page.open();
	const content = await page.getContent();
	page.close();
	res.json(content);
});

export default router;
