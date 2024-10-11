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

const createGift = async (req, res) => {
    try {
        const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body;
        const query = `INSERT INTO gifts (name, pricepoint, audience, image, description, submittedby, submittedon) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [name, pricepoint, audience, image, description, submittedby, submittedon];

        const results = await pool.query(query, values);

        res.status(201).json(results.rows[0]);

    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const updateGift = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body;
        const results = await pool.query(
            `UPDATE gifts set name = $1, pricepoint = $2, audience = $3, image = $4, description = $5, submittedby = $6, submittedon = $7 WHERE id = $8 RETURNING *`,
            [name, pricepoint, audience, image, description, submittedby, submittedon, id]
        );

        res.status(200).json(results.rows[0]);

    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const deleteGift = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const results = await pool.query('DELETE FROM gifts WHERE id = $1', [id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export default {
    getGifts, getGiftById, createGift, updateGift, deleteGift
  };