import request from "supertest";
import { app } from "../src/app";
import {describe, it, expect, beforeAll} from "vitest";
import { connectDB } from "../src/config/database";

beforeAll(async () => {
await connectDB();
});


describe('GET /arts', () => {

    it('returns all arts', async () => {

        const response = await request(app)
            .get('/api/v1/arts');

        expect(response.status).toBe(200);

    });

});
