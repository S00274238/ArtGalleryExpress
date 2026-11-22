import { createArtZSchema} from "../src/models/arts";
import {describe, it, expect} from "vitest";

const validArt = {
    "name": "popo",
    "genre": "lolo",
    "year":  2000
}

describe('Test Art Validation', () => {
    it('should pass for the following valid data', () => {

        expect(() => createArtZSchema.parse(
            validArt)).not.toThrow();
    });

  it('should pass for the following valid data - no date', () => {

        expect(() => createArtZSchema.parse(
            { ...validArt, "year": undefined })).not.toThrow();
    });

        it('should fail for the too early year ', () => {

        expect(() => createArtZSchema.parse(
            { ...validArt, "year": 1949 })).toThrow();
    });

    it('should fail for the unparsaable year ', () => {

        expect(() => createArtZSchema.parse(
            { ...validArt, "year": 'wrong year' })).toThrow();
    });

    it('should fail for the missing name ', () => {

        expect(() => createArtZSchema.parse(
            { ...validArt, "name": undefined })).toThrow();
    });

    it('should fail for the missing genre ', () => {

        expect(() => createArtZSchema.parse(
            { ...validArt, "genre": undefined })).toThrow();
    });
});

