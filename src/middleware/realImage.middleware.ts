import type { RequestHandler } from 'express';

async function returnsOk(imageUrl: unknown): Promise<boolean> {
  if (typeof imageUrl !== 'string') return false;

  try {
    const response = await fetch(imageUrl, {
      method: 'HEAD',
      redirect: 'manual',
      signal: AbortSignal.timeout(5000),
    });
    return response.status === 200;
  } catch {
    return false;
  }
}

export const validateRealImage: RequestHandler = async (req, res, next) => {
  if (!(await returnsOk(req.body?.imageUrl))) {
    res.status(400).json({
      message: 'Validation failed',
      errors: [{ path: ['imageUrl'], message: 'The image link must return HTTP 200' }],
    });
    return;
  }

  next();
};
