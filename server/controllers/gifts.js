import {pool} from '../config/database.js';

const getGifts = async (req, res) => {
    try {
    const results = await pool.query('SELECT * FROM gifts');

    res.status(200).json(results.rows);

    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getGiftById = async (req, res) => {
    try{
        const giftId = Number(req.params.giftId);
        const selectQuery = `SELECT name, pricePoint, audience, image, description, submittedBy, submittedOn 
        FROM gifts WHERE id = $1`;

        const value = [giftId];

        const results = await pool.query(selectQuery, value);

        res.status(200).json(results.rows[0]);

    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export default {
    getGifts, getGiftById
  };